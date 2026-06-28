import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.status !== 'active') {
		throw redirect(303, locals.user ? '/pending' : '/login');
	}
	return { user: locals.user };
};
