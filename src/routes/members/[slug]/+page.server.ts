import { error } from '@sveltejs/kit';
import { getProfile, getAllPublicProfiles } from '$lib/server/data-store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	// 簡化：使用 user ID 作為 slug
	const allProfiles = getAllPublicProfiles();
	const profile = allProfiles.find(p => p.userId === params.slug);

	if (!profile) {
		throw error(404, '找不到此成員');
	}

	return { profile };
};
