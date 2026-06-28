// Simplified auth without database dependency
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;

export interface SimpleUser {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	status: 'pending' | 'active' | 'suspended';
	role: 'member' | 'mentor' | 'assistant' | 'admin';
	cohort?: string;
}

// In-memory store (will be lost on restart)
const users = new Map<string, SimpleUser>();
const sessions = new Map<string, { userId: string; expiresAt: Date }>();

export async function hashPassword(password: string): Promise<string> {
	return bcryptjs.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcryptjs.compare(password, hash);
}

export function createSessionToken(): string {
	return uuidv4();
}

export function registerUser(data: {
	name: string;
	email: string;
	passwordHash: string;
	status: 'pending' | 'active';
	cohort?: string;
	role?: 'member' | 'mentor' | 'assistant' | 'admin';
}): SimpleUser {
	const user: SimpleUser = {
		id: uuidv4(),
		role: data.role || 'member',
		...data
	};
	users.set(user.email, user);
	return user;
}

export function findUserByEmail(email: string): SimpleUser | undefined {
	return users.get(email);
}

export function createSession(userId: string): string {
	const token = createSessionToken();
	sessions.set(token, {
		userId,
		expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
	});
	return token;
}

export function getSessionUser(token: string): SimpleUser | undefined {
	const session = sessions.get(token);
	if (!session || session.expiresAt < new Date()) {
		sessions.delete(token);
		return undefined;
	}
	// Find user by userId
	for (const user of users.values()) {
		if (user.id === session.userId) {
			return user;
		}
	}
	return undefined;
}

export function deleteSession(token: string): void {
	sessions.delete(token);
}

export function getAllUsers(): SimpleUser[] {
	return Array.from(users.values()).sort((a, b) => {
		if (a.status !== b.status) {
			const statusOrder = { pending: 0, active: 1, suspended: 2 };
			return statusOrder[a.status] - statusOrder[b.status];
		}
		return a.email.localeCompare(b.email);
	});
}

export function getPendingUsers(): SimpleUser[] {
	return Array.from(users.values()).filter(u => u.status === 'pending');
}

export function updateUserStatus(email: string, status: 'pending' | 'active' | 'suspended'): SimpleUser | undefined {
	const user = users.get(email);
	if (!user) return undefined;
	user.status = status;
	users.set(email, user);
	return user;
}

export function updateUserRole(email: string, role: 'member' | 'mentor' | 'assistant' | 'admin'): SimpleUser | undefined {
	const user = users.get(email);
	if (!user) return undefined;
	user.role = role;
	users.set(email, user);
	return user;
}

// Demo data for testing
export function initializeDemoData(): void {
	const demoEmail = 'demo@khubs.net';
	const existing = findUserByEmail(demoEmail);
	if (!existing) {
		hashPassword('demo1234').then(hash => {
			registerUser({
				name: 'Demo User',
				email: demoEmail,
				passwordHash: hash,
				status: 'active',
				role: 'admin',
				cohort: '115'
			});
		});
	}
}
