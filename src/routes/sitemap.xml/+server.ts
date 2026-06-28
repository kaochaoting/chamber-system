import { and, eq, inArray } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { profiles, posts } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform, url }) => {
	const base = `${url.protocol}//${url.host}`;
	const db = getDb((platform!.env as any).DB);

	const staticUrls = ['/', '/members', '/news', '/register'];

	const pubProfiles = await db
		.select({ slug: profiles.slug })
		.from(profiles)
		.where(eq(profiles.isPublic, true));

	const pubPosts = await db
		.select({ slug: posts.slug })
		.from(posts)
		.where(
			and(
				eq(posts.visibility, 'public'),
				eq(posts.status, 'published'),
				inArray(posts.type, ['news', 'article'])
			)
		);

	const urls = [
		...staticUrls.map((u) => `${base}${u}`),
		...pubProfiles.map((p) => `${base}/members/${p.slug}`),
		...pubPosts.map((p) => `${base}/news/${p.slug}`)
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
