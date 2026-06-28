import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface Session {
	id: string;
	userId: string;
	token: string;
	expiresAt: Date;
	ipAddress?: string;
	userAgent?: string;
}

export interface User {
	id: string;
	email: string;
	name: string;
	passwordHash: string;
	role: 'member' | 'mentor' | 'assistant' | 'admin';
	status: 'pending' | 'active' | 'suspended';
	cohort?: string;
	createdAt: Date;
	updatedAt: Date;
}

const SALT_ROUNDS = 10;
const SESSION_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days
const SESSION_COOKIE_NAME = 'khubs_session';

export async function hashPassword(password: string): Promise<string> {
	return bcryptjs.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcryptjs.compare(password, hash);
}

export function createSessionToken(): string {
	return uuidv4();
}

export function createSessionExpiresAt(): Date {
	return new Date(Date.now() + SESSION_MAX_AGE);
}

export function getSessionCookieName(): string {
	return SESSION_COOKIE_NAME;
}
