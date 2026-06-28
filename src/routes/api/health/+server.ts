import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	const env = platform?.env as any;

	try {
		if (!env?.DB) {
			return json({ status: 'error', message: 'DB binding not available' }, { status: 500 });
		}

		// Test simple DB connection
		const result = await env.DB.prepare('SELECT 1 as ok').first();

		return json({
			status: 'ok',
			db: result ? 'connected' : 'failed'
		});
	} catch (err: any) {
		return json({
			status: 'error',
			message: err?.message || 'Unknown error'
		}, { status: 500 });
	}
};
