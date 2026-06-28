import { getAllPosts } from '$lib/server/data-store';

export async function load() {
	const posts = getAllPosts();
	return { posts };
}
