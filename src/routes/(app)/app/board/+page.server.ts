import { fail } from '@sveltejs/kit';
import { eq, and, desc } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { boardItems, user as userTable } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	const rows = await db
		.select({
			id: boardItems.id,
			userId: boardItems.userId,
			kind: boardItems.kind,
			title: boardItems.title,
			description: boardItems.description,
			contact: boardItems.contact,
			status: boardItems.status,
			authorName: userTable.name
		})
		.from(boardItems)
		.leftJoin(userTable, eq(boardItems.userId, userTable.id))
		.orderBy(desc(boardItems.id));
	// open 在前
	rows.sort((a, b) => (a.status === b.status ? 0 : a.status === 'open' ? -1 : 1));
	return { items: rows };
};

export const actions: Actions = {
	create: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const f = await request.formData();
		const title = String(f.get('title') ?? '').trim();
		const kind = String(f.get('kind') ?? 'offer') === 'need' ? 'need' : 'offer';
		if (!title) return fail(400, { message: '請填寫標題。' });
		await db.insert(boardItems).values({
			userId: (locals.user as any).id,
			kind,
			title,
			description: String(f.get('description') ?? '').trim() || null,
			contact: String(f.get('contact') ?? '').trim() || null,
			status: 'open'
		});
		return { success: true };
	},

	toggle: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const f = await request.formData();
		const id = Number(f.get('id'));
		const status = String(f.get('status') ?? '') === 'open' ? 'closed' : 'open';
		await db
			.update(boardItems)
			.set({ status })
			.where(and(eq(boardItems.id, id), eq(boardItems.userId, (locals.user as any).id)));
		return { success: true };
	},

	remove: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const id = Number((await request.formData()).get('id'));
		await db
			.delete(boardItems)
			.where(and(eq(boardItems.id, id), eq(boardItems.userId, (locals.user as any).id)));
		return { success: true };
	}
};
