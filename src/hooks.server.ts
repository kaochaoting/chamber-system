import type { Handle } from '@sveltejs/kit';
import { getSessionUser, initializeDemoData } from '$lib/server/auth-simple';

const SESSION_COOKIE = 'khubs_session';

// Initialize demo data on startup
initializeDemoData();

export const handle: Handle = async ({ event, resolve }) => {
	// Load session from cookie
	const token = event.cookies.get(SESSION_COOKIE);
	if (token) {
		const user = getSessionUser(token);
		if (user) {
			event.locals.user = user;
		}
	}

	event.locals.user ??= null;
	event.locals.session ??= null;

	const path = event.url.pathname;
	const isPrivate = path.startsWith('/app') || path.startsWith('/admin');

	const response = await resolve(event);
	if (isPrivate) response.headers.set('X-Robots-Tag', 'noindex');
	return response;
};
