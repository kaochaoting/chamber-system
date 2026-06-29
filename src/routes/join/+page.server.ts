import { redirect } from '@sveltejs/kit';
import { createAuth } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

const REF_COOKIE = 'khubs_ref';

// 邀請連結入口：/join?ref=<邀請人 user.id>
// 記錄邀請人到 cookie，再導向 Google 登入；註冊完成後由 hooks 寫入 referred_by。
export const load: PageServerLoad = async ({ url, cookies, platform }) => {
	const ref = url.searchParams.get('ref')?.trim();
	if (ref) {
		cookies.set(REF_COOKIE, ref, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 30 // 30 分鐘內完成註冊即記錄
		});
	}

	const env = platform!.env as any;
	const auth = createAuth(env, url.origin);
	const res: any = await auth.api.signInSocial({
		body: { provider: 'google', callbackURL: '/app' }
	});
	if (res?.url) throw redirect(302, res.url);
	throw redirect(302, '/login');
};
