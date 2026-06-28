import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import * as schema from './schema';

/**
 * 以「請求內」的 D1 綁定建立 drizzle 實例。
 * Workers 無全域連線，務必每次請求從 platform.env.DB 注入。
 */
export function getDb(d1: D1Database) {
	return drizzle(d1, { schema });
}

export type DB = ReturnType<typeof getDb>;
