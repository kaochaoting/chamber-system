import { fail, redirect } from '@sveltejs/kit';
import { createAuth } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	// email/密碼
	default: async ({ request, platform, url }) => {
		const env = platform!.env as any;
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		if (!email || !password) return fail(400, { email, message: '請輸入信箱與密碼。' });

		const auth = createAuth(env);
		try {
			// sveltekitCookies plugin 會在此設定 session cookie
			await auth.api.signInEmail({ body: { email, password }, headers: request.headers });
		} catch {
			return fail(400, { email, message: '帳號或密碼錯誤。' });
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
