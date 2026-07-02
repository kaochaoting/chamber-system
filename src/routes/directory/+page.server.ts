import { eq, and } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { ventures, profiles } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb((platform!.env as any).DB);
	// 只列公開創業；附帶創辦人公開檔案 slug
	const rows = await db
		.select({
			id: ventures.id,
			name: ventures.name,
			tagline: ventures.tagline,
			description: ventures.description,
			websiteUrl: ventures.websiteUrl,
			logoKey: ventures.logoKey,
			galleryKeys: ventures.galleryKeys,
			ownerSlug: profiles.slug,
			ownerName: profiles.displayName
		})
		.from(ventures)
		.leftJoin(profiles, eq(ventures.userId, profiles.userId))
		.where(and(eq(ventures.isPublic, true)));
	return { ventures: rows };
};
