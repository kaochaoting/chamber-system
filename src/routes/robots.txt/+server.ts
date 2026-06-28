import { text } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const robots = `User-agent: *
Allow: /
Allow: /members
Allow: /news

Disallow: /app
Disallow: /admin
Disallow: /api
Disallow: /login
Disallow: /register
Disallow: /logout

Sitemap: https://khubs.net/sitemap.xml`;

	return text(robots);
};
