import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// 模擬R2存儲（實際環境應連接Cloudflare R2）
const uploadedFiles = new Map<string, { data: ArrayBuffer; type: string }>();

export const POST: RequestHandler = async ({ request, locals }) => {
	// 需要登入
	if (!locals.user) {
		return json({ error: '未登入' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return json({ error: '缺少文件' }, { status: 400 });
		}

		// 驗證文件類型
		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
		if (!allowedTypes.includes(file.type)) {
			return json({ error: '不支持的文件類型' }, { status: 400 });
		}

		// 驗證文件大小 (5MB)
		if (file.size > 5 * 1024 * 1024) {
			return json({ error: '文件過大' }, { status: 400 });
		}

		// 生成key
		const key = `${locals.user.id}/${Date.now()}-${file.name}`;
		const buffer = await file.arrayBuffer();

		// 存儲文件
		uploadedFiles.set(key, {
			data: buffer,
			type: file.type
		});

		return json({
			success: true,
			key,
			url: `/img/${encodeURIComponent(key)}`
		});
	} catch (error) {
		return json({ error: '上傳失敗' }, { status: 500 });
	}
};
