import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { createAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db/client';
import { validateInvite, consumeInvite } from '$lib/server/invites';
import { user as userTable } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
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

		// 邀請碼路徑：先驗證碼有效，後續升級為 active
		let invite = null;
		if (code) {
			invite = await validateInvite(db, code);
			if (!invite) return fail(400, { name, email, message: '邀請碼無效或已過期。' });
		}

		const auth = createAuth(env);
		let newUserId: string;
		try {
			const res = await auth.api.signUpEmail({ body: { name, email, password } });
			newUserId = (res as any).user.id;
		} catch {
			return fail(400, { name, email, message: '註冊失敗，此信箱可能已被使用。' });
		}

		if (invite) {
			await db
				.update(userTable)
				.set({ status: 'active', cohort: invite.cohort })
				.where(eq(userTable.id, newUserId));
			await consumeInvite(db, code, newUserId);
			throw redirect(303, '/app');
		}

		// 無碼申請：維持 pending，待後台審核
		throw redirect(303, '/pending');
	}
};
