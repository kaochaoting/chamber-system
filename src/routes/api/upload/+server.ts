import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: RequestHandler = async ({ request, locals, platform }) => {
	const user = locals.user as any;
	if (!user) throw error(401, '請先登入。');

	const bucket = (platform!.env as any).BUCKET;
	if (!bucket) throw error(500, '儲存空間未設定。');

	const formData = await request.formData();
	const file = formData.get('file');
	if (!(file instanceof File)) throw error(400, '缺少檔案。');

	if (!ALLOWED.includes(file.type)) throw error(400, '僅接受 JPEG／PNG／WebP／GIF。');
	if (file.size > MAX_SIZE) throw error(400, '檔案不可超過 5MB。');

	const ext = file.type.split('/')[1];
	const key = `${user.id}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

	await bucket.put(key, await file.arrayBuffer(), {
		httpMetadata: { contentType: file.type }
	});

	return json({ key, url: `/img/${encodeURIComponent(key)}` });
};
