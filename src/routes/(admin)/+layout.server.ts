import { requireRole } from '$lib/server/rbac';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = requireRole(locals.user as any, ['assistant', 'admin']);
	return { user };
};
