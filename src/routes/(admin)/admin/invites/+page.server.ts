import { fail } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { invites } from '$lib/server/db/schema';
import { logAudit, AUDIT } from '$lib/server/audit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	const rows = await db.select().from(invites).orderBy(desc(invites.code));
	return { invites: rows };
};

export const actions: Actions = {
	create: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const cohort = String(form.get('cohort') ?? '').trim();
		const customCode = String(form.get('code') ?? '').trim();
		if (!cohort) return fail(400, { message: '請填寫期別。' });

		const code = customCode || `KLU-${cohort}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

		try {
			await db.insert(invites).values({ code, cohort, createdBy: (locals.user as any).id });
		} catch {
			return fail(400, { message: '邀請碼已存在，請換一個。' });
		}
		await logAudit(db, (locals.user as any).id, AUDIT.INVITE_CREATED, code);
		return { success: true, code };
	}
};
