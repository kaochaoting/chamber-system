import { error, redirect } from '@sveltejs/kit';

export type Role = 'member' | 'mentor' | 'assistant' | 'admin';
export type Status = 'pending' | 'active' | 'suspended';
export type SessionUser = { id: string; email: string; role: Role; status: Status; cohort: string | null };

/** 要求已登入且為 active；否則導向。 */
export function requireActive(user: SessionUser | null, redirectTo = '/') {
	if (!user) throw redirect(302, `/login?redirect=${encodeURIComponent(redirectTo)}`);
	if (user.status !== 'active') throw redirect(302, '/pending');
	return user;
}

/** 要求特定角色之一；否則 403。 */
export function requireRole(user: SessionUser | null, roles: Role[]) {
	const u = requireActive(user);
	if (!roles.includes(u.role)) throw error(403, '權限不足。');
	return u;
}

export const isStaff = (u: { role: Role } | null) =>
	!!u && (u.role === 'assistant' || u.role === 'admin');
