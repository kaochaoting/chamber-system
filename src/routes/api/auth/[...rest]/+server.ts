import { createAuth } from '$lib/server/auth';
import { getRequestEvent } from '$app/server';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, platform }) => {
	const env = platform!.env as any;
	const auth = createAuth(env);

	return auth.handler(request);
};

export const GET: RequestHandler = async ({ request, platform }) => {
	const env = platform!.env as any;
	const auth = createAuth(env);

	return auth.handler(request);
};
