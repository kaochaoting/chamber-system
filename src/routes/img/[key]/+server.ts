import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
	const bucket = (platform!.env as any).BUCKET;
	if (!bucket) throw error(500, '儲存空間未設定。');

	const key = decodeURIComponent(params.key);
	const obj = await bucket.get(key);
	if (!obj) throw error(404, '找不到圖片。');

	const headers = new Headers();
	headers.set('Content-Type', obj.httpMetadata?.contentType ?? 'application/octet-stream');
	headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	headers.set('etag', obj.httpEtag);

	return new Response(obj.body, { headers });
};
