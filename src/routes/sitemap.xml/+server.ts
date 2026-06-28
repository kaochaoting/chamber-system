import { text } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getAllPublicProfiles } from '$lib/server/data-store';
import { getAllPosts } from '$lib/server/data-store';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://khubs.net';
	
	// 靜態頁面
	const staticPages = [
		{ url: '/', changefreq: 'weekly', priority: '1.0' },
		{ url: '/members', changefreq: 'daily', priority: '0.9' },
		{ url: '/news', changefreq: 'daily', priority: '0.8' }
	];

	// 動態成員頁面
	const profiles = getAllPublicProfiles();
	const memberPages = profiles.map(p => ({
		url: `/members/${p.userId}`,
		changefreq: 'weekly',
		priority: '0.7'
	}));

	// 動態新聞頁面
	const posts = getAllPosts('news', 'public');
	const newsPages = posts.map(p => ({
		url: `/news/${p.slug}`,
		changefreq: 'weekly',
		priority: '0.6',
		lastmod: p.updatedAt.toISOString().split('T')[0]
	}));

	const allPages = [...staticPages, ...memberPages, ...newsPages];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return text(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
