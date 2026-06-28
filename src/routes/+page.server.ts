import { fail, redirect, type Cookies } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, getSessionCookieName, createSessionExpiresAt, createSessionToken } from '$lib/server/auth';
import { getDb } from '$lib/server/db/client';
import { validateInvite, consumeInvite } from '$lib/server/invites';
import { user as userTable, session as sessionTable } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform, cookies }) => {
		const env = platform!.env as any;
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		const code = String(form.get('invite') ?? '').trim();

		if (!name || !email || !password) {
			return fail(400, { name, email, message: '請填寫姓名、信箱與密碼。' });
		}
		if (password.length < 8) {
			return fail(400, { name, email, message: '密碼至少 8 碼。' });
		}

		const db = getDb(env.DB);

		// 檢查 email 是否已存在
		const existing = await db.select().from(userTable).where(eq(userTable.email, email));
		if (existing.length > 0) {
			return fail(400, { name, email, message: '此信箱已被使用。' });
		}

		// 邀請碼路徑：先驗證碼有效
		let invite = null;
		if (code) {
			invite = await validateInvite(db, code);
			if (!invite) return fail(400, { name, email, message: '邀請碼無效或已過期。' });
		}

		try {
			const userId = uuidv4();
			const passwordHash = await hashPassword(password);
			const now = new Date();

			// 建立 user
			await db.insert(userTable).values({
				id: userId,
				name,
				email,
				passwordHash,
				status: invite ? 'active' : 'pending',
				cohort: invite?.cohort || null,
				role: 'member',
				createdAt: now,
				updatedAt: now
			});

			// 如果有邀請碼，消費它
			if (invite) {
				await consumeInvite(db, code, userId);
			}

			// 建立 session
			const sessionId = uuidv4();
			const token = createSessionToken();
			const expiresAt = createSessionExpiresAt();

			await db.insert(sessionTable).values({
				id: sessionId,
				userId,
				token,
				expiresAt,
				createdAt: now,
				updatedAt: now
			});

			// 設置 session cookie
			cookies.set(getSessionCookieName(), token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				maxAge: 30 * 24 * 60 * 60 // 30 days
			});

			throw redirect(303, invite ? '/app' : '/pending');
		} catch (err) {
			// 重新拋出 redirect
			if (err instanceof Error && 'status' in err && err.status) {
				throw err;
			}
			console.error('Registration error:', err);
			return fail(400, { name, email, message: '註冊失敗，請稍後重試。' });
		}
	}
};
