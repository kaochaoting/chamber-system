import { fail } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { posts } from '$lib/server/db/schema';
import { logAudit, AUDIT } from '$lib/server/audit';
import type { Actions, PageServerLoad } from './$types';

function slugify(s: string) {
	return (
		s
			.toLowerCase()
			.trim()
			.replace(/[^\p{L}\p{N}]+/gu, '-')
			.replace(/^-+|-+$/g, '') || 'post'
	);
}

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	const rows = await db
		.select({
			id: posts.id,
			title: posts.title,
			slug: posts.slug,
			type: posts.type,
			visibility: posts.visibility,
			status: posts.status,
			createdAt: posts.createdAt
		})
		.from(posts)
		.orderBy(desc(posts.createdAt));
	return { posts: rows };
};

export const actions: Actions = {
	create: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		const body = String(form.get('body') ?? '').trim();
		const type = String(form.get('type') ?? 'news');
		const visibility = String(form.get('visibility') ?? 'public');
		const publish = form.get('publish') === 'on';

		if (!title || !body) return fail(400, { message: '請填寫標題與內容。' });

		const slug = `${slugify(title)}-${Date.now().toString(36)}`;
		await db.insert(posts).values({
			authorId: (locals.user as any).id,
			type: type as any,
			title,
			slug,
			body,
			visibility: visibility as any,
			status: publish ? 'published' : 'draft'
		});
		await logAudit(db, (locals.user as any).id, publish ? AUDIT.POST_PUBLISHED : AUDIT.POST_CREATED, slug);
		return { success: true };
	},

	togglePublish: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const id = Number(form.get('id'));
		const current = String(form.get('status') ?? '');
		if (!id) return fail(400, { message: '缺少文章 ID。' });

		const next = current === 'published' ? 'draft' : 'published';
		await db.update(posts).set({ status: next }).where(eq(posts.id, id));
		await logAudit(
			db,
			(locals.user as any).id,
			next === 'published' ? AUDIT.POST_PUBLISHED : AUDIT.POST_UNPUBLISHED,
			String(id)
		);
		return { success: true };
	},

	delete: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const id = Number(form.get('id'));
		if (!id) return fail(400, { message: '缺少文章 ID。' });

		await db.delete(posts).where(eq(posts.id, id));
		await logAudit(db, (locals.user as any).id, AUDIT.POST_DELETED, String(id));
		return { success: true };
	}
};
