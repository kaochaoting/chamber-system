import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { verifyPassword, getSessionCookieName, createSessionToken, createSessionExpiresAt } from '$lib/server/auth';
import { getDb } from '$lib/server/db/client';
import { user as userTable, session as sessionTable } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const env = platform!.env as any;
	const url = new URL(request.url);
	const pathname = url.pathname;

	if (pathname.endsWith('/sign-in/email')) {
		return handleSignIn(request, env, cookies);
	}

	if (pathname.endsWith('/sign-out')) {
		return handleSignOut(cookies);
	}

	return json({ error: 'Not found' }, { status: 404 });
};

async function handleSignIn(request: Request, env: any, cookies: any) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return json({ error: '信箱與密碼為必填。' }, { status: 400 });
		}

		const db = getDb(env.DB);

		// 查詢使用者
		const users = await db.select().from(userTable).where(eq(userTable.email, email));
		if (users.length === 0) {
			return json({ error: '登入失敗。' }, { status: 401 });
		}

		const user = users[0];
		const isValid = await verifyPassword(password, user.passwordHash);
		if (!isValid) {
			return json({ error: '登入失敗。' }, { status: 401 });
		}

		// 建立 session
		const sessionId = uuidv4();
		const token = createSessionToken();
		const expiresAt = createSessionExpiresAt();
		const now = new Date();

		await db.insert(sessionTable).values({
			id: sessionId,
			userId: user.id,
			token,
			expiresAt,
			createdAt: now,
			updatedAt: now
		});

		// 設置 cookie
		cookies.set(getSessionCookieName(), token, {
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
	cookies.delete(getSessionCookieName(), { path: '/' });
	return json({ success: true });
}
