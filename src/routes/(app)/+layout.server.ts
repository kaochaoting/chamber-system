import { requireActive } from '$lib/server/rbac';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const user = requireActive(locals.user as any, url.pathname);
	return { user };
};
