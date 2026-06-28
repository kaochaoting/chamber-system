import { error } from '@sveltejs/kit';
import { getAllUsers, getPendingUsers, updateUserStatus, updateUserRole } from '$lib/server/auth-simple';

export async function load() {
	const allUsers = getAllUsers();
	const pendingUsers = getPendingUsers();

	return {
		allUsers,
		pendingUsers
	};
}

export const actions = {
	approve: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		if (!email) {
			return { success: false, error: '缺少信箱' };
		}

		const updated = updateUserStatus(email, 'active');
		if (!updated) {
			return { success: false, error: '用戶不存在' };
		}

		return { success: true, user: updated };
	},

	updateRole: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const role = data.get('role') as any;

		if (!email || !role) {
			return { success: false, error: '缺少必要信息' };
		}

		const updated = updateUserRole(email, role);
		if (!updated) {
			return { success: false, error: '用戶不存在' };
		}

		return { success: true, user: updated };
	},

	suspend: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		if (!email) {
			return { success: false, error: '缺少信箱' };
		}

		const updated = updateUserStatus(email, 'suspended');
		if (!updated) {
			return { success: false, error: '用戶不存在' };
		}

		return { success: true, user: updated };
	}
};
