// 審計日誌系統

export interface AuditLog {
	id: string;
	actorId: string;
	action: string;
	target: string;
	details?: Record<string, any>;
	createdAt: Date;
}

const auditLogs: AuditLog[] = [];

export function logAudit(
	actorId: string,
	action: string,
	target: string,
	details?: Record<string, any>
): AuditLog {
	const log: AuditLog = {
		id: Math.random().toString(36).substring(7),
		actorId,
		action,
		target,
		details,
		createdAt: new Date()
	};

	auditLogs.push(log);
	return log;
}

export function getAuditLogs(
	filter?: {
		actorId?: string;
		action?: string;
		target?: string;
		startDate?: Date;
		endDate?: Date;
	}
): AuditLog[] {
	let results = [...auditLogs];

	if (filter?.actorId) {
		results = results.filter(log => log.actorId === filter.actorId);
	}

	if (filter?.action) {
		results = results.filter(log => log.action === filter.action);
	}

	if (filter?.target) {
		results = results.filter(log => log.target.includes(filter.target));
	}

	if (filter?.startDate) {
		results = results.filter(log => log.createdAt >= filter.startDate!);
	}

	if (filter?.endDate) {
		results = results.filter(log => log.createdAt <= filter.endDate!);
	}

	return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// 預定義的操作
export const AUDIT_ACTIONS = {
	USER_CREATED: 'user_created',
	USER_UPDATED: 'user_updated',
	USER_APPROVED: 'user_approved',
	USER_SUSPENDED: 'user_suspended',
	ROLE_CHANGED: 'role_changed',
	POST_CREATED: 'post_created',
	POST_PUBLISHED: 'post_published',
	POST_DELETED: 'post_deleted',
	PROFILE_UPDATED: 'profile_updated',
	INVITE_GENERATED: 'invite_generated',
	INVITE_USED: 'invite_used'
};
