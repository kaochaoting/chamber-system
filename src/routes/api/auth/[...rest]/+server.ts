import { json } from '@sveltejs/kit';
import { verifyPassword, createSession, getSessionUser, findUserByEmail, deleteSession, hashPassword, registerUser } from '$lib/server/auth-simple';
import type { RequestHandler } from '@sveltejs/kit';

const SESSION_COOKIE = 'khubs_session';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const url = new URL(request.url);
	const pathname = url.pathname;

	if (pathname.endsWith('/sign-in/email')) {
		return handleSignIn(request, cookies);
	}

	if (pathname.endsWith('/sign-out')) {
		return handleSignOut(cookies);
	}

	return json({ error: 'Not found' }, { status: 404 });
};

async function handleSignIn(request: Request, cookies: any) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return json({ error: '信箱與密碼為必填。' }, { status: 400 });
		}

		// Ensure demo user exists (for first login)
		if (email === 'demo@khubs.net' && !findUserByEmail(email)) {
			const demoHash = await hashPassword('demo1234');
			registerUser({
				name: 'Demo User',
				email: email,
				passwordHash: demoHash,
				status: 'active',
				role: 'admin',
				cohort: '115'
			});
		}

		const user = findUserByEmail(email);
		if (!user) {
			return json({ error: '登入失敗。' }, { status: 401 });
		}

		const isValid = await verifyPassword(password, user.passwordHash);
		if (!isValid) {
			return json({ error: '登入失敗。' }, { status: 401 });
		}

		// Create session
		const token = createSession(user.id);

		// Set cookie
		cookies.set(SESSION_COOKIE, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 // 30 days
		});

		return json({ success: true, user });
	} catch (err) {
		return json({ error: '登入出錯。' }, { status: 500 });
	}
}

function handleSignOut(cookies: any) {
	const token = cookies.get(SESSION_COOKIE);
	if (token) {
		deleteSession(token);
		cookies.delete(SESSION_COOKIE, { path: '/' });
	}
	return json({ success: true });
}
