import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { posts, user as userTable } from '$lib/server/db/schema';
import { articleJsonLd, jsonLdScript } from '$lib/server/seo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform, url }) => {
	const db = getDb((platform!.env as any).DB);

	const row = (
		await db
			.select({
				title: posts.title,
				body: posts.body,
				type: posts.type,
				createdAt: posts.createdAt,
				authorName: userTable.name
			})
			.from(posts)
			.leftJoin(userTable, eq(posts.authorId, userTable.id))
			.where(
				and(
					eq(posts.slug, params.slug),
					eq(posts.visibility, 'public'),
					eq(posts.status, 'published')
				)
			)
			.limit(1)
	)[0];

	if (!row) throw error(404, '找不到這篇內容。');

	const pageUrl = url.origin + url.pathname;
	const jsonLd = jsonLdScript(
		articleJsonLd({
			title: row.title,
			url: pageUrl,
			authorName: row.authorName ?? '高創坊',
			datePublished: new Date(row.createdAt * 1000).toISOString()
		})
	);

	return { post: row, jsonLd };
};
