import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();
	if (user) {
		return { user };
	}
	return {};
}) satisfies PageServerLoad;
