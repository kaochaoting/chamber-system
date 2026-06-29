import { eq, desc } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { user as userTable, profiles } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	// 僅 active 會員；含私密聯絡方式（此頁本身受 (app) 守門，僅 active 會員可進）
	const rows = await db
		.select({
			name: userTable.name,
			email: userTable.email,
			role: userTable.role,
			cohort: userTable.cohort,
			displayName: profiles.displayName,
			slug: profiles.slug,
			isPublic: profiles.isPublic,
			publicContact: profiles.publicContact,
			privateContact: profiles.privateContact,
			socials: profiles.socials
		})
		.from(userTable)
		.leftJoin(profiles, eq(profiles.userId, userTable.id))
		.where(eq(userTable.status, 'active'))
		.orderBy(desc(userTable.cohort));

	return { members: rows };
};
