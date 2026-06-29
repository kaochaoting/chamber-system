import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

/* ============================================================
   Better Auth 核心表
   ⚠️ 版本相依：Better Auth 的期望 schema 可能隨版本微調。
   建議以 `npx @better-auth/cli generate` 產生後比對／覆蓋本段，
   再保留下方 role/status/cohort 三個 additionalFields 欄位。
   ============================================================ */

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
	image: text('image'),
	// ── 自訂欄位（additionalFields）──
	role: text('role').notNull().default('member'), // member | mentor | assistant | admin
	status: text('status').notNull().default('pending'), // pending | active | suspended
	category: text('category').notNull().default('member'), // organizer 主辦單位 | student 學員 | member 會員
	cohort: text('cohort'), // 期別，例 "115"
	referredBy: text('referred_by'), // 邀請人 user.id（透過邀請連結加入）
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	token: text('token').notNull().unique(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const account = sqliteTable('account', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
	refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
	scope: text('scope'),
	password: text('password'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const verification = sqliteTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
});

/* ============================================================
   業務表（見 docs/SSD.md §3）
   ============================================================ */

export const industries = sqliteTable('industries', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique()
});

export const categories = sqliteTable('categories', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique()
});

export const profiles = sqliteTable('profiles', {
	userId: text('user_id')
		.primaryKey()
		.references(() => user.id, { onDelete: 'cascade' }),
	slug: text('slug').notNull().unique(),
	displayName: text('display_name').notNull(),
	avatarKey: text('avatar_key'),
	bio: text('bio'),
	publicContact: text('public_contact', { mode: 'json' }).$type<Record<string, string>>(),
	privateContact: text('private_contact', { mode: 'json' }).$type<Record<string, string>>(),
	socials: text('socials', { mode: 'json' }).$type<Record<string, string>>(),
	isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(false),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const ventures = sqliteTable('ventures', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	tagline: text('tagline'),
	description: text('description'),
	logoKey: text('logo_key'),
	industryId: integer('industry_id').references(() => industries.id),
	websiteUrl: text('website_url'), // 對外導出回鏈
	galleryKeys: text('gallery_keys', { mode: 'json' }).$type<string[]>(), // 品牌膠卷照片（建議 ≥5）
	status: text('status').notNull().default('active'),
	isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(true)
});

export const products = sqliteTable('products', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	ventureId: integer('venture_id')
		.notNull()
		.references(() => ventures.id, { onDelete: 'cascade' }),
	kind: text('kind').notNull().default('product'), // product | service
	name: text('name').notNull(),
	description: text('description'),
	priceLabel: text('price_label'),
	imageKeys: text('image_keys', { mode: 'json' }).$type<string[]>(),
	externalUrl: text('external_url'),
	isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(true)
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	authorId: text('author_id')
		.notNull()
		.references(() => user.id),
	type: text('type').notNull(), // news | article | thread
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	body: text('body'),
	categoryId: integer('category_id').references(() => categories.id),
	visibility: text('visibility').notNull().default('members'), // public | members
	status: text('status').notNull().default('draft'), // draft | published
	pinned: integer('pinned', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const comments = sqliteTable('comments', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	postId: integer('post_id')
		.notNull()
		.references(() => posts.id, { onDelete: 'cascade' }),
	authorId: text('author_id')
		.notNull()
		.references(() => user.id),
	body: text('body').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const boardItems = sqliteTable('board_items', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	kind: text('kind').notNull(), // offer | need
	title: text('title').notNull(),
	description: text('description'),
	contact: text('contact'),
	status: text('status').notNull().default('open') // open | closed
});

export const invites = sqliteTable('invites', {
	code: text('code').primaryKey(),
	cohort: text('cohort').notNull(),
	createdBy: text('created_by').references(() => user.id),
	usedBy: text('used_by').references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' })
});

export const auditLogs = sqliteTable('audit_logs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	actorId: text('actor_id').references(() => user.id),
	action: text('action').notNull(),
	target: text('target'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});
