import { createAuth } from '$lib/server/auth';
import type { RequestHandler } from './$types';

const handler: RequestHandler = ({ request, platform, url }) => {
	const auth = createAuth(platform!.env as any, url.origin);
	return auth.handler(request);
};

export const GET = handler;
export const POST = handler;
