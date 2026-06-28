import { fail, redirect } from '@sveltejs/kit';
import { hashPassword, registerUser, findUserByEmail, createSession } from '$lib/server/auth-simple';
import type { Actions } from './$types';

const INVITE_CODE_ACTIVE = 'KLU-115-WELCOME';
const SESSION_COOKIE = 'khubs_session';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
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

		// Check if email already exists
		const existing = findUserByEmail(email);
		if (existing) {
			return fail(400, { name, email, message: '此信箱已被使用。' });
		}

		try {
			const passwordHash = await hashPassword(password);

			// Determine status based on invite code
			const isActive = code === INVITE_CODE_ACTIVE;
			const cohort = isActive ? '115' : undefined;

			// Register user
			const user = registerUser({
				name,
				email,
				passwordHash,
				status: isActive ? 'active' : 'pending',
				cohort
			});

			// Create session and set cookie
			const token = createSession(user.id);
			cookies.set(SESSION_COOKIE, token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				maxAge: 30 * 24 * 60 * 60 // 30 days
			});

			throw redirect(303, isActive ? '/app' : '/pending');
		} catch (err) {
			if (err instanceof Error && 'status' in err && (err as any).status) {
				throw err;
			}
			return fail(400, { name, email, message: '註冊失敗，請稍後重試。' });
		}
	}
};
