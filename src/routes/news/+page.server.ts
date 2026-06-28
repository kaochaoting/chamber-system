import { and, eq, desc, inArray } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { posts } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	// 只列公開、已發佈的消息/文章
	const rows = await db
		.select({
			title: posts.title,
			slug: posts.slug,
			type: posts.type,
			body: posts.body,
			createdAt: posts.createdAt
		})
		.from(posts)
		.where(
			and(
				eq(posts.visibility, 'public'),
				eq(posts.status, 'published'),
				inArray(posts.type, ['news', 'article'])
			)
		)
		.orderBy(desc(posts.createdAt));
	return { posts: rows };
};
