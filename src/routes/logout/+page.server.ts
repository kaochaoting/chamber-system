import { redirect } from '@sveltejs/kit';
import { createAuth } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const env = platform!.env as any;
		const auth = createAuth(env);
		try {
			await auth.api.signOut({ headers: request.headers });
		} catch {
			/* 已登出亦無妨 */
		}
		throw redirect(303, '/');
	}
};
