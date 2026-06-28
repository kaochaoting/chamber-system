// See https://svelte.dev/docs/kit/types#app.d.ts
import type { D1Database, R2Bucket, KVNamespace } from '@cloudflare/workers-types';

// Locals 的 user/session 型別在 M2 建立 src/lib/server/auth.ts 後，
// 改為從 Better Auth 推導（取消下列註解、移除暫時型別）：
// import type { auth } from '$lib/server/auth';

declare global {
	namespace App {
		interface Locals {
			// 暫時型別（M2 完成後改為 Better Auth $Infer.Session）
			user:
				| {
						id: string;
						email: string;
						role: 'member' | 'mentor' | 'assistant' | 'admin';
						status: 'pending' | 'active' | 'suspended';
						cohort: string | null;
				  }
				| null;
			session: { id: string; userId: string } | null;
			// user: typeof auth.$Infer.Session.user | null;
			// session: typeof auth.$Infer.Session.session | null;
		}

		interface Platform {
			env: {
				DB: D1Database;
				BUCKET: R2Bucket;
				KV: KVNamespace;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
