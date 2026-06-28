import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;

export function getDb(d1: D1Database) {
	if (!db) {
		db = drizzle(d1, { schema });
	}
	return db;
}
