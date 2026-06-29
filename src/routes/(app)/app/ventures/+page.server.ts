import { fail } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { ventures, products, profiles } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

async function myVenture(db: any, userId: string) {
	return (await db.select().from(ventures).where(eq(ventures.userId, userId)).limit(1))[0];
}

export const load: PageServerLoad = async ({ locals, platform }) => {
	const db = getDb((platform!.env as any).DB);
	const userId = (locals.user as any).id as string;
	const venture = await myVenture(db, userId);
	let items: any[] = [];
	if (venture) {
		items = await db.select().from(products).where(eq(products.ventureId, venture.id));
	}
	const prof = (await db.select({ slug: profiles.slug, isPublic: profiles.isPublic }).from(profiles).where(eq(profiles.userId, userId)).limit(1))[0];
	return {
		venture: venture ?? null,
		services: items.filter((i) => i.kind === 'service'),
		goods: items.filter((i) => i.kind !== 'service'),
		profileSlug: prof?.slug ?? null,
		profilePublic: prof?.isPublic ?? false
	};
};

export const actions: Actions = {
	saveVenture: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const userId = (locals.user as any).id as string;
		const f = await request.formData();
		const name = String(f.get('name') ?? '').trim();
		if (!name) return fail(400, { message: '請填寫創業／品牌名稱。' });

		let galleryKeys: string[] = [];
		try {
			const raw = String(f.get('galleryKeys') ?? '[]');
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) galleryKeys = parsed.filter((k) => typeof k === 'string');
		} catch {
			galleryKeys = [];
		}

		const values = {
			name,
			tagline: String(f.get('tagline') ?? '').trim() || null,
			description: String(f.get('description') ?? '').trim() || null,
			websiteUrl: String(f.get('websiteUrl') ?? '').trim() || null,
			logoKey: String(f.get('logoKey') ?? '').trim() || null,
			galleryKeys: galleryKeys.length ? galleryKeys : null,
			isPublic: f.get('isPublic') === 'on'
		};

		const existing = await myVenture(db, userId);
		if (existing) {
			await db.update(ventures).set(values).where(eq(ventures.id, existing.id));
		} else {
			await db.insert(ventures).values({ ...values, userId });
		}
		return { success: true, scope: 'venture' };
	},

	addItem: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const userId = (locals.user as any).id as string;
		const venture = await myVenture(db, userId);
		if (!venture) return fail(400, { message: '請先建立創業／品牌，才能新增項目。' });

		const f = await request.formData();
		const name = String(f.get('name') ?? '').trim();
		const kind = String(f.get('kind') ?? 'product') === 'service' ? 'service' : 'product';
		if (!name) return fail(400, { message: '請填寫項目名稱。' });

		const imageKey = String(f.get('imageKey') ?? '').trim();
		await db.insert(products).values({
			ventureId: venture.id,
			kind,
			name,
			description: String(f.get('description') ?? '').trim() || null,
			priceLabel: String(f.get('priceLabel') ?? '').trim() || null,
			externalUrl: String(f.get('externalUrl') ?? '').trim() || null,
			imageKeys: imageKey ? [imageKey] : null,
			isPublic: true
		});
		return { success: true, scope: 'item' };
	},

	deleteItem: async ({ request, locals, platform }) => {
		const db = getDb((platform!.env as any).DB);
		const userId = (locals.user as any).id as string;
		const venture = await myVenture(db, userId);
		if (!venture) return fail(400, { message: '找不到創業。' });
		const id = Number((await request.formData()).get('id'));
		if (!id) return fail(400, { message: '缺少項目 ID。' });
		// 僅能刪自己 venture 的項目
		await db.delete(products).where(and(eq(products.id, id), eq(products.ventureId, venture.id)));
		return { success: true, scope: 'item' };
	}
};
