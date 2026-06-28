import { defineConfig } from 'drizzle-kit';

// Drizzle Kit 設定（Cloudflare D1 / SQLite）
// 工作流：db:generate 產生 SQL → wrangler d1 migrations apply 套用
export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './migrations',
	dialect: 'sqlite',

	// 若要用 drizzle-kit studio / push 直接連線遠端 D1，取消下列註解並填憑證：
	// driver: 'd1-http',
	// dbCredentials: {
	//   accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
	//   databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
	//   token: process.env.CLOUDFLARE_D1_TOKEN!
	// },

	verbose: true,
	strict: true
});
