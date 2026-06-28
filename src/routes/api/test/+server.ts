import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	const env = platform?.env as any;

	const result: any = {
		timestamp: new Date().toISOString(),
		db_available: !!env?.DB,
		env_keys: env ? Object.keys(env) : []
	};

	if (!env?.DB) {
		return json({ ...result, error: 'D1 binding not available' }, { status: 500 });
	}

	try {
		// Test basic query
		const testResult = await env.DB.prepare('SELECT 1 as test').first();
		result.db_connected = true;
		result.test_query_result = testResult;

		// Try to insert a test user
		const testInsert = await env.DB.prepare(`
			INSERT INTO user (id, name, email, password_hash, role, status, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`).bind(
			'test-' + Date.now(),
			'Test User',
			'test-' + Date.now() + '@test.com',
			'dummy-hash',
			'member',
			'pending',
			Math.floor(Date.now() / 1000),
			Math.floor(Date.now() / 1000)
		).run();

		result.insert_success = testInsert.success;
		result.insert_result = testInsert;

		return json(result);
	} catch (err: any) {
		result.db_connected = false;
		result.error = err?.message || String(err);
		return json(result, { status: 500 });
	}
};
