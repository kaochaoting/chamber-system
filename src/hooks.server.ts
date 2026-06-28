import type { Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db/client';
import { getSessionCookieName } from '$lib/server/auth';
import { initializeDatabase } from '$lib/server/db/init';
import { user as userTable, session as sessionTable } from '$lib/server/db/schema';

export const handle: Handle = async ({ event, resolve }) => {
	const env = event.platform?.env as any;

	if (env?.DB) {
		try {
			// Ensure database is initialized
			await initializeDatabase(env.DB);

			const token = event.cookies.get(getSessionCookieName());
			if (token) {
				const db = getDb(env.DB);

				// 查詢 session
				const sessions = await db
					.select()
					.from(sessionTable)
					.where(eq(sessionTable.token, token));

				if (sessions.length > 0) {
					const session = sessions[0];

					// 檢查 session 是否過期
					if (new Date(session.expiresAt) > new Date()) {
						const users = await db.select().from(userTable).where(eq(userTable.id, session.userId));
						if (users.length > 0) {
							const user = users[0];
							event.locals.user = user;
							event.locals.session = session;
						}
					}
				}
			}
		} catch {
			// 出錯時，不中斷請求
		}
	}

	event.locals.user ??= null;
	event.locals.session ??= null;

	const path = event.url.pathname;
	const isPrivate = path.startsWith('/app') || path.startsWith('/admin');

	const response = await resolve(event);
	if (isPrivate) response.headers.set('X-Robots-Tag', 'noindex');
	return response;
};
