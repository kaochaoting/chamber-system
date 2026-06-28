import { error } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { profiles, ventures } from '$lib/server/db/schema';
import { memberJsonLd, jsonLdScript } from '$lib/server/seo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform, url }) => {
	const db = getDb((platform!.env as any).DB);

	const prof = (
		await db
			.select()
			.from(profiles)
			.where(and(eq(profiles.slug, params.slug), eq(profiles.isPublic, true)))
			.limit(1)
	)[0];
	if (!prof) throw error(404, '找不到這位成員。');

	const venture = (
		await db
			.select()
			.from(ventures)
			.where(and(eq(ventures.userId, prof.userId), eq(ventures.isPublic, true)))
			.limit(1)
	)[0];

	const pageUrl = url.origin + url.pathname;
	const jsonLd = jsonLdScript(
		memberJsonLd({
			name: prof.displayName,
			url: pageUrl,
			bio: prof.bio,
			socials: prof.socials,
			venture: venture
				? { name: venture.name, url: venture.websiteUrl, description: venture.description }
				: null
		})
	);

	// 僅回傳公開欄位，私密聯絡方式不外洩
	return {
		profile: {
			displayName: prof.displayName,
			bio: prof.bio,
			publicContact: prof.publicContact,
			socials: prof.socials
		},
		venture: venture
			? { name: venture.name, tagline: venture.tagline, description: venture.description, websiteUrl: venture.websiteUrl }
			: null,
		jsonLd
	};
};
