import { fail, redirect } from '@sveltejs/kit';
import { createAuth } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	// 統一 Google 登入：取得授權 URL 後導向
	default: async ({ platform, url }) => {
		const env = platform!.env as any;
		const auth = createAuth(env, url.origin);
		const callbackURL = url.searchParams.get('redirect') ?? '/app';
		const res: any = await auth.api.signInSocial({
			body: { provider: 'google', callbackURL }
		});
		if (res?.url) throw redirect(302, res.url);
		return fail(500, { message: '無法啟動 Google 登入，請確認後台已設定 GOOGLE_CLIENT_ID／SECRET。' });
	}
};
