import { desc } from 'drizzle-orm';
import type { DB } from './db/client';
import { auditLogs } from './db/schema';

/** 寫入一筆操作軌跡。 */
export async function logAudit(db: DB, actorId: string, action: string, target?: string) {
	await db.insert(auditLogs).values({ actorId, action, target: target ?? null });
}

/** 取最近的操作軌跡（後台檢視用）。 */
export async function getAuditLogs(db: DB, limit = 100) {
	return db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit);
}

export const AUDIT = {
	USER_APPROVED: 'user.approved',
	USER_SUSPENDED: 'user.suspended',
	USER_REACTIVATED: 'user.reactivated',
	ROLE_CHANGED: 'role.changed',
	POST_CREATED: 'post.created',
	POST_PUBLISHED: 'post.published',
	POST_UNPUBLISHED: 'post.unpublished',
	POST_DELETED: 'post.deleted',
	INVITE_CREATED: 'invite.created'
} as const;
