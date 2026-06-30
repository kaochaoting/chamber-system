import { eq, desc } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { user as userTable, profiles } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

const catLabel: Record<string, string> = {
	organizer: '主辦單位',
	student: '學員',
	member: '會員'
};

export const load: PageServerLoad = async ({ locals, platform, url }) => {
	const db = getDb((platform!.env as any).DB);
	const meId = (locals.user as any).id as string;

	// 我推薦的人
	const referred = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			status: userTable.status,
			category: userTable.category,
			displayName: profiles.displayName,
			slug: profiles.slug,
			createdAt: userTable.createdAt
		})
		.from(userTable)
		.leftJoin(profiles, eq(profiles.userId, userTable.id))
		.where(eq(userTable.referredBy, meId))
		.orderBy(desc(userTable.createdAt));

	// 我的邀請人
	const meRow = (
		await db.select({ referredBy: userTable.referredBy }).from(userTable).where(eq(userTable.id, meId)).limit(1)
	)[0];
	let referrer: { name: string } | null = null;
	if (meRow?.referredBy) {
		const r = (await db.select({ name: userTable.name }).from(userTable).where(eq(userTable.id, meRow.referredBy)).limit(1))[0];
		referrer = r ?? null;
	}

	return {
		// openExternalBrowser=1：LINE 內點連結會改用系統瀏覽器開啟（避免 Google 擋內建瀏覽器）；其他平台忽略
		joinUrl: `${url.origin}/join?ref=${meId}&openExternalBrowser=1`,
		referred: referred.map((r) => ({ ...r, categoryLabel: catLabel[r.category] ?? r.category })),
		referrer
	};
};
