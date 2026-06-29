import { error, fail } from '@sveltejs/kit';
import { eq, and, asc } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { posts, comments, user as userTable } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = getDb((platform!.env as any).DB);
	const id = Number(params.id);
	if (!id) throw error(404, '找不到討論。');

	const thread = (
		await db
			.select({
				id: posts.id,
				title: posts.title,
				body: posts.body,
				createdAt: posts.createdAt,
				authorName: userTable.name
			})
			.from(posts)
			.leftJoin(userTable, eq(posts.authorId, userTable.id))
			.where(and(eq(posts.id, id), eq(posts.type, 'thread')))
			.limit(1)
	)[0];
	if (!thread) throw error(404, '找不到討論。');

	const replies = await db
		.select({
			id: comments.id,
			body: comments.body,
			createdAt: comments.createdAt,
			authorName: userTable.name
		})
		.from(comments)
		.leftJoin(userTable, eq(comments.authorId, userTable.id))
		.where(eq(comments.postId, id))
		.orderBy(asc(comments.createdAt));

	return { thread, replies };
};

export const actions: Actions = {
	reply: async ({ request, params, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const id = Number(params.id);
		const body = String((await request.formData()).get('body') ?? '').trim();
		if (!body) return fail(400, { message: '請輸入內容。' });
		await db.insert(comments).values({ postId: id, authorId: (locals.user as any).id, body });
		return { success: true };
	}
};
