import { eq, and, isNull, or, gt } from 'drizzle-orm';
import { invites } from './db/schema';

/** 回傳有效且未使用、未過期的邀請；否則回 null。 */
export async function validateInvite(db: any, code: string) {
	const now = new Date();
	const rows = await db
		.select()
		.from(invites)
		.where(
			and(
				eq(invites.code, code),
				isNull(invites.usedBy),
				or(isNull(invites.expiresAt), gt(invites.expiresAt, now))
			)
		)
		.limit(1);
	return rows[0] ?? null;
}

/** 標記邀請碼已被某使用者使用。 */
export async function consumeInvite(db: DB, code: string, usedBy: string) {
	await db.update(invites).set({ usedBy }).where(eq(invites.code, code));
}
