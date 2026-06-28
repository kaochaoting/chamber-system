import type { Handle } from '@sveltejs/kit';
import { createAuth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const env = event.platform?.env as any;

	if (env?.DB && env?.BETTER_AUTH_SECRET) {
		try {
			const auth = createAuth(env);
			const data = await auth.api.getSession({ headers: event.request.headers });
			event.locals.user = (data?.user as any) ?? null;
			event.locals.session = (data?.session as any) ?? null;
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
