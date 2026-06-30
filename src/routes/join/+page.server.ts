import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { createAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db/client';
import { user as userTable, profiles } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

const REF_COOKIE = 'khubs_ref';

// 邀請連結落地頁：記錄邀請人 cookie，顯示邀請人資訊與「Google 登入加入」按鈕。
// 不自動跳 Google（App 內建瀏覽器會被 Google 擋下），改由使用者點按鈕觸發。
export const load: PageServerLoad = async ({ url, cookies, platform, locals }) => {
	const ref = url.searchParams.get('ref')?.trim();
	if (ref) {
		cookies.set(REF_COOKIE, ref, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 // 1 小時內完成註冊即記錄
		});
	}

	// 已登入就直接進會員區
	if (locals.user) throw redirect(303, '/app');

	// 取邀請人名稱（給落地頁顯示「XXX 邀請你加入」）
	let referrerName: string | null = null;
	if (ref) {
		const db = getDb((platform!.env as any).DB);
		const r = (
			await db
				.select({ name: userTable.name, displayName: profiles.displayName })
				.from(userTable)
				.leftJoin(profiles, eq(profiles.userId, userTable.id))
				.where(eq(userTable.id, ref))
				.limit(1)
		)[0];
		referrerName = r?.displayName ?? r?.name ?? null;
	}

	return { referrerName };
};

export const actions: Actions = {
	signIn: async ({ platform, url }) => {
		const env = platform!.env as any;
		const auth = createAuth(env, url.origin);
		const res: any = await auth.api.signInSocial({ body: { provider: 'google', callbackURL: '/app' } });
		if (res?.url) throw redirect(302, res.url);
		return fail(500, { message: '無法啟動 Google 登入，請稍後再試。' });
	}
};
