// 前端圖片上傳助手：選檔 → POST /api/upload → 回傳 { key, url }
export interface UploadResult {
	key: string;
	url: string;
}

export async function uploadImage(file: File): Promise<UploadResult> {
	const fd = new FormData();
	fd.append('file', file);
	const res = await fetch('/api/upload', { method: 'POST', body: fd });
	if (!res.ok) {
		let msg = '上傳失敗';
		try {
			const j = await res.json();
			msg = (j as any).message ?? (j as any).error ?? msg;
		} catch {
			/* ignore */
		}
		throw new Error(msg);
	}
	return (await res.json()) as UploadResult;
}
