import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { profiles } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

function slugify(s: string) {
	return (
		s
			.toLowerCase()
			.trim()
			.replace(/[^\p{L}\p{N}]+/gu, '-')
			.replace(/^-+|-+$/g, '') || 'member'
	);
}

export const load: PageServerLoad = async ({ locals, platform }) => {
	const db = getDb((platform!.env as any).DB);
	const rows = await db
		.select()
		.from(profiles)
		.where(eq(profiles.userId, (locals.user as any).id))
		.limit(1);
	return { profile: rows[0] ?? null };
};

export const actions: Actions = {
	default: async ({ request, locals, platform }) => {
		const userId = (locals.user as any).id as string;
		const db = getDb((platform!.env as any).DB);
		const form = await request.formData();

		const displayName = String(form.get('displayName') ?? '').trim();
		if (!displayName) return fail(400, { message: '請填寫顯示名稱。' });

		const bio = String(form.get('bio') ?? '').trim() || null;
		const isPublic = form.get('isPublic') === 'on';
		const publicContact = { email: String(form.get('publicEmail') ?? '').trim() };
		const privateContact = { phone: String(form.get('privatePhone') ?? '').trim() };
		const socials = { website: String(form.get('website') ?? '').trim() };

		const existing = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
		const slug = existing[0]?.slug ?? `${slugify(displayName)}-${userId.slice(0, 6)}`;
		const now = new Date();

		const values = {
			userId,
			slug,
			displayName,
			bio,
			isPublic,
			publicContact,
			privateContact,
			socials,
			updatedAt: now
		};

		if (existing[0]) {
			await db.update(profiles).set(values).where(eq(profiles.userId, userId));
		} else {
			await db.insert(profiles).values(values);
		}
		return { success: true };
	}
};
