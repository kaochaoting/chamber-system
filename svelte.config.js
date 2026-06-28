import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// 預設整站交給 Worker 處理；如需把特定預渲染路由排除，調整 routes。
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			// 本機 dev/preview 時，依 wrangler.jsonc 模擬 D1/R2/KV 綁定
			platformProxy: {
				configPath: './wrangler.jsonc',
				persist: { path: '.wrangler/state/v3' }
			}
		})
	}
};

export default config;
