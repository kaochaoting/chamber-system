import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/server/data-store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = getPostBySlug(params.slug);

	if (!post || !post.published || post.visibility !== 'public') {
		throw error(404, '文章不存在');
	}

	return {
		post
	};
};
