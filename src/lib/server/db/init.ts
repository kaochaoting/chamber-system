import type { D1Database } from '@cloudflare/workers-types';

export async function initializeDatabase(db: D1Database): Promise<void> {
	try {
		// 嘗試查詢 user 表，如果失敗則表示表不存在
		await db.prepare('SELECT 1 FROM user LIMIT 1').first();
	} catch {
		// 表不存在，創建它們
		console.log('Initializing database tables...');

		const statements = [
			`CREATE TABLE IF NOT EXISTS user (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL,
				email TEXT NOT NULL UNIQUE,
				email_verified INTEGER NOT NULL DEFAULT 0,
				image TEXT,
				password_hash TEXT NOT NULL DEFAULT '',
				role TEXT NOT NULL DEFAULT 'member',
				status TEXT NOT NULL DEFAULT 'pending',
				cohort TEXT,
				created_at INTEGER NOT NULL,
				updated_at INTEGER NOT NULL
			)`,
			`CREATE TABLE IF NOT EXISTS session (
				id TEXT PRIMARY KEY,
				user_id TEXT NOT NULL,
				token TEXT NOT NULL UNIQUE,
				expires_at INTEGER NOT NULL,
				ip_address TEXT,
				user_agent TEXT,
				created_at INTEGER NOT NULL,
				updated_at INTEGER NOT NULL,
				FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
			)`,
			`CREATE TABLE IF NOT EXISTS account (
				id TEXT PRIMARY KEY,
				user_id TEXT NOT NULL,
				account_id TEXT NOT NULL,
				provider_id TEXT NOT NULL,
				access_token TEXT,
				refresh_token TEXT,
				id_token TEXT,
				access_token_expires_at INTEGER,
				refresh_token_expires_at INTEGER,
				scope TEXT,
				password TEXT,
				created_at INTEGER NOT NULL,
				updated_at INTEGER NOT NULL,
				FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
			)`,
			`CREATE TABLE IF NOT EXISTS verification (
				id TEXT PRIMARY KEY,
				identifier TEXT NOT NULL,
				value TEXT NOT NULL,
				expires_at INTEGER NOT NULL,
				created_at INTEGER,
				updated_at INTEGER
			)`,
			`CREATE TABLE IF NOT EXISTS invites (
				code TEXT PRIMARY KEY,
				cohort TEXT NOT NULL,
				created_by TEXT,
				used_by TEXT,
				expires_at INTEGER,
				created_at INTEGER NOT NULL
			)`
		];

		for (const stmt of statements) {
			try {
				await db.prepare(stmt).run();
			} catch (err) {
				console.warn('Error creating table:', err);
				// Continue even if some tables fail
			}
		}

		console.log('Database initialization complete');
	}
}
