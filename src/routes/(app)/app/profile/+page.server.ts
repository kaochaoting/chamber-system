import { fail } from '@sveltejs/kit';
import { getProfile, saveProfile } from '$lib/server/data-store';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = getProfile(locals.user!.id);
	return { profile };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await request.formData();
		const displayName = String(form.get('displayName') ?? '').trim();
		const bio = String(form.get('bio') ?? '').trim();
		const website = String(form.get('website') ?? '').trim();
		const publicEmail = String(form.get('publicEmail') ?? '').trim();
		const privatePhone = String(form.get('privatePhone') ?? '').trim();
		const isPublic = form.get('isPublic') === 'on';

		if (!displayName) {
			return fail(400, { message: '顯示名稱為必填' });
		}

		try {
			saveProfile(locals.user!.id, {
				displayName,
				bio,
				website: website || undefined,
				publicEmail: publicEmail || undefined,
				privatePhone: privatePhone || undefined,
				isPublic
			});

			return { success: true, message: '已儲存' };
		} catch (err) {
			return fail(500, { message: '儲存失敗，請稍後重試' });
		}
	}
};
