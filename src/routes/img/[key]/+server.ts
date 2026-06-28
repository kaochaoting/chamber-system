import type { RequestHandler } from '@sveltejs/kit';

// 模擬R2存儲（與上傳API共享）
const uploadedFiles = new Map<string, { data: ArrayBuffer; type: string }>();

export const GET: RequestHandler = async ({ params }) => {
	try {
		const key = decodeURIComponent(params.key);
		const file = uploadedFiles.get(key);

		if (!file) {
			return new Response('Not found', { status: 404 });
		}

		return new Response(file.data, {
			headers: {
				'Content-Type': file.type,
				'Cache-Control': 'public, max-age=31536000'
			}
		});
	} catch (error) {
		return new Response('Error', { status: 500 });
	}
};
