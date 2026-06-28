import { fail, redirect } from '@sveltejs/kit';
import { createAuth } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	// email/密碼（命名 action，與 google 並存；不可用 default）
	email: async ({ request, platform, url }) => {
		const env = platform!.env as any;
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		if (!email || !password) return fail(400, { email, message: '請輸入信箱與密碼。' });

		const auth = createAuth(env);
		try {
			// sveltekitCookies plugin 會在此設定 session cookie（與註冊相同，不另傳 headers）
			await auth.api.signInEmail({ body: { email, password } });
		} catch (err: any) {
			// 認證失敗（密碼錯誤等）會丟 APIError；其他錯誤一併回報訊息以利診斷
			const msg = err?.body?.message || err?.message || '帳號或密碼錯誤。';
			return fail(400, { email, message: msg });
		}
		throw redirect(303, url.searchParams.get('redirect') ?? '/app');
	},

	// Google：取得授權 URL 後導向
	google: async ({ platform }) => {
		const env = platform!.env as any;
		const auth = createAuth(env);
		const res: any = await auth.api.signInSocial({
			body: { provider: 'google', callbackURL: '/app' }
		});
		if (res?.url) throw redirect(302, res.url);
		return fail(500, { message: '無法啟動 Google 登入，請確認已設定 GOOGLE_CLIENT_ID/SECRET。' });
	}
};
