import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { profiles } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	// 只列公開檔案
	const rows = await db
		.select({
			slug: profiles.slug,
			displayName: profiles.displayName,
			bio: profiles.bio,
			avatarKey: profiles.avatarKey
		})
		.from(profiles)
		.where(eq(profiles.isPublic, true));
	return { members: rows };
};
