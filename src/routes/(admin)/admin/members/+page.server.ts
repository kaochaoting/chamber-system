import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { user as userTable } from '$lib/server/db/schema';
import { logAudit, AUDIT } from '$lib/server/audit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	const rows = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			email: userTable.email,
			role: userTable.role,
			status: userTable.status,
			cohort: userTable.cohort
		})
		.from(userTable);

	const pending = rows.filter((u) => u.status === 'pending');
	const members = rows.filter((u) => u.status !== 'pending');
	return { pending, members };
};

export const actions: Actions = {
	approve: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const cohort = String(form.get('cohort') ?? '').trim() || null;
		if (!id) return fail(400, { message: '缺少使用者 ID。' });

		await db.update(userTable).set({ status: 'active', cohort }).where(eq(userTable.id, id));
		await logAudit(db, (locals.user as any).id, AUDIT.USER_APPROVED, id);
		return { success: true };
	},

	suspend: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { message: '缺少使用者 ID。' });

		await db.update(userTable).set({ status: 'suspended' }).where(eq(userTable.id, id));
		await logAudit(db, (locals.user as any).id, AUDIT.USER_SUSPENDED, id);
		return { success: true };
	},

	reactivate: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { message: '缺少使用者 ID。' });

		await db.update(userTable).set({ status: 'active' }).where(eq(userTable.id, id));
		await logAudit(db, (locals.user as any).id, AUDIT.USER_REACTIVATED, id);
		return { success: true };
	},

	setRole: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const role = String(form.get('role') ?? '');
		const allowed = ['member', 'mentor', 'assistant', 'admin'];
		if (!id || !allowed.includes(role)) return fail(400, { message: '參數錯誤。' });

		await db.update(userTable).set({ role: role as any }).where(eq(userTable.id, id));
		await logAudit(db, (locals.user as any).id, AUDIT.ROLE_CHANGED, `${id}:${role}`);
		return { success: true };
	}
};
