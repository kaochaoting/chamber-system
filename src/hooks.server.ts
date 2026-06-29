import type { Handle } from '@sveltejs/kit';
import { eq, and, isNull } from 'drizzle-orm';
import { createAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db/client';
import { user as userTable } from '$lib/server/db/schema';

const REF_COOKIE = 'khubs_ref';

export const handle: Handle = async ({ event, resolve }) => {
	const env = event.platform?.env as any;

	if (env?.DB && env?.BETTER_AUTH_SECRET) {
		try {
			const auth = createAuth(env, event.url.origin);
			const data = await auth.api.getSession({ headers: event.request.headers });
			event.locals.user = (data?.user as any) ?? null;
			event.locals.session = (data?.session as any) ?? null;

			// 邀請連結：首次登入後寫入邀請人（僅一次、不可自薦、邀請人需存在）
			const me = event.locals.user as any;
			const ref = event.cookies.get(REF_COOKIE);
			if (me?.id && ref && ref !== me.id) {
				const db = getDb(env.DB);
				const current = (
					await db.select({ referredBy: userTable.referredBy }).from(userTable).where(eq(userTable.id, me.id)).limit(1)
				)[0];
				if (current && !current.referredBy) {
					const referrer = (
						await db.select({ id: userTable.id }).from(userTable).where(eq(userTable.id, ref)).limit(1)
					)[0];
					if (referrer) {
						await db.update(userTable).set({ referredBy: ref }).where(and(eq(userTable.id, me.id), isNull(userTable.referredBy)));
					}
				}
				event.cookies.delete(REF_COOKIE, { path: '/' });
			}
		} catch {
			event.locals.user = null;
			event.locals.session = null;
		}
	} else {
		// 本機若未設定綁定/機密，避免整站崩潰
		event.locals.user = null;
		event.locals.session = null;
	}

	const path = event.url.pathname;
	const isPrivate = path.startsWith('/app') || path.startsWith('/admin');

	const response = await resolve(event);
	if (isPrivate) response.headers.set('X-Robots-Tag', 'noindex');
	return response;
};
