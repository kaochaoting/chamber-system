import { getAllUsers } from '$lib/server/auth-simple';
import { getAllPublicProfiles } from '$lib/server/data-store';

export async function load() {
	const users = getAllUsers().filter(u => u.status === 'active');
	const profiles = getAllPublicProfiles();

	// Merge user data with profile data
	const members = users.map(user => {
		const profile = profiles.find(p => p.userId === user.id);
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			cohort: user.cohort,
			status: user.status,
			profile: profile || { displayName: user.name, bio: '', website: '', publicEmail: '', isPublic: false }
		};
	});

	return { members };
}
