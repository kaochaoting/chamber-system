import { fail } from '@sveltejs/kit';
import { eq, and, desc, sql } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { posts, comments, user as userTable } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

function slugify(s: string) {
	return (
		s.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'thread'
	);
}

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	const rows = await db
		.select({
			id: posts.id,
			title: posts.title,
			body: posts.body,
			createdAt: posts.createdAt,
			authorName: userTable.name,
			comments: sql<number>`count(${comments.id})`
		})
		.from(posts)
		.leftJoin(userTable, eq(posts.authorId, userTable.id))
		.leftJoin(comments, eq(comments.postId, posts.id))
		.where(eq(posts.type, 'thread'))
		.groupBy(posts.id)
		.orderBy(desc(posts.createdAt));
	return { threads: rows };
};

export const actions: Actions = {
	create: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const f = await request.formData();
		const title = String(f.get('title') ?? '').trim();
		const body = String(f.get('body') ?? '').trim();
		if (!title || !body) return fail(400, { message: '請填寫標題與內容。' });

		const slug = `${slugify(title)}-${Date.now().toString(36)}`;
		await db.insert(posts).values({
			authorId: (locals.user as any).id,
			type: 'thread',
			title,
			slug,
			body,
			visibility: 'members',
			status: 'published'
		});
		return { success: true };
	}
};
