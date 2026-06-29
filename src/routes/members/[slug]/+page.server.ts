import { error } from '@sveltejs/kit';
import { eq, and, inArray } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { profiles, ventures, products } from '$lib/server/db/schema';
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

	// 產品/服務（依 kind 分流）；僅公開
	let services: any[] = [];
	let goods: any[] = [];
	let gallery: string[] = [];
	if (venture) {
		const items = await db
			.select({
				id: products.id,
				kind: products.kind,
				name: products.name,
				description: products.description,
				priceLabel: products.priceLabel,
				imageKeys: products.imageKeys,
				externalUrl: products.externalUrl
			})
			.from(products)
			.where(and(eq(products.ventureId, venture.id), eq(products.isPublic, true)));
		services = items.filter((i) => i.kind === 'service');
		goods = items.filter((i) => i.kind !== 'service');
		gallery = items.flatMap((i) => (i.imageKeys as string[] | null) ?? []);
	}

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

	return {
		profile: {
			displayName: prof.displayName,
			bio: prof.bio,
			avatarKey: prof.avatarKey,
			publicContact: prof.publicContact,
			socials: prof.socials
		},
		venture: venture
			? {
					name: venture.name,
					tagline: venture.tagline,
					description: venture.description,
					websiteUrl: venture.websiteUrl,
					logoKey: venture.logoKey
				}
			: null,
		services,
		goods,
		gallery,
		jsonLd
	};
};
