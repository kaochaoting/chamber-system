import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/');
	}

	if (locals.user.status !== 'active') {
		throw redirect(303, '/pending');
	}

	return { user: locals.user };
};
