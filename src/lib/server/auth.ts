import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import type { D1Database } from '@cloudflare/workers-types';
import { getDb } from './db/client';
import * as schema from './db/schema';

export type AuthEnv = {
	DB: D1Database;
	BETTER_AUTH_SECRET: string;
	BETTER_AUTH_URL?: string;
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
};

/**
 * 以請求環境建立 Better Auth 實例（Workers 需請求內注入 D1 綁定）。
 * 高創坊統一採用 Google 登入（不開放 email/密碼）。
 *
 * 重點：
 *  - db 由 platform.env.DB 注入、adapter provider = 'sqlite'
 *  - sveltekitCookies 必須是 plugins 陣列的「最後一個」
 *  - 新帳號 status 預設 'pending'（Google 新帳號一律待後台審核）
 */
export function createAuth(env: AuthEnv, baseURL?: string) {
	const db = getDb(env.DB);

	const social =
		env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
			? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET } }
			: undefined;

	return betterAuth({
		// 優先用請求 origin（直接部署時 plain_text env 可能未注入），其次才用環境變數
		baseURL: baseURL ?? env.BETTER_AUTH_URL,
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, { provider: 'sqlite', schema }),
		emailAndPassword: { enabled: false }, // 統一 Google 登入，關閉密碼登入
		socialProviders: social,
		user: {
			additionalFields: {
				role: { type: 'string', defaultValue: 'member', input: false },
				status: { type: 'string', defaultValue: 'pending', input: false },
				cohort: { type: 'string', required: false, input: false }
			}
		},
		plugins: [sveltekitCookies(getRequestEvent)] // ← 必須置於最後
	});
}

export type Auth = ReturnType<typeof createAuth>;
