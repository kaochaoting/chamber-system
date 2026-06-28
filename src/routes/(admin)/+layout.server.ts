import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// 只有 admin 可以進入後台
	if (locals.user.role !== 'admin' && locals.user.role !== 'assistant') {
		throw redirect(303, '/app');
	}

	return { user: locals.user };
};
