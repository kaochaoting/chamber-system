<script lang="ts">
	import '$lib/styles/tokens.css';
	import { page } from '$app/stores';
	let { data, children } = $props();
</script>

<header class="nav">
	<div class="nav-inner">
		<a href="/" class="brand">高創坊</a>
		<nav class="links">
			<a href="/members" class:active={$page.url.pathname.startsWith('/members')}>會員名錄</a>
			<a href="/directory" class:active={$page.url.pathname.startsWith('/directory')}>產品服務</a>
			<a href="/news" class:active={$page.url.pathname.startsWith('/news')}>最新消息</a>
		</nav>
		<div class="nav-cta">
			{#if data.user}
				<a href="/app" class="btn btn-primary btn-sm">會員中心</a>
			{:else}
				<a href="/login" class="login">登入</a>
				<a href="/register" class="btn btn-primary btn-sm">申請加入</a>
			{/if}
		</div>
	</div>
</header>

<main>{@render children()}</main>

<footer>
	<div class="foot-inner">
		<div class="foot-brand">
			<a href="/" class="brand brand-light">高創坊</a>
			<p class="tagline">不只讓人看見你，而是讓人選擇你。</p>
		</div>
		<nav class="foot-links">
			<a href="/members">會員名錄</a>
			<a href="/directory">產品服務</a>
			<a href="/news">最新消息</a>
			<a href="/register">申請加入</a>
			<a href="/privacy">隱私權政策</a>
		</nav>
	</div>
	<div class="foot-base">
		<span>© 2026 高創坊 · 高雄勞工大學創新創業專班</span>
		<span>khubs.net</span>
	</div>
</footer>

<style>
	/* ── Nav ── */
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--color-surface) 88%, transparent);
		backdrop-filter: saturate(140%) blur(10px);
		border-bottom: 1px solid var(--color-border);
	}
	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: var(--space-3) var(--space-4);
		gap: var(--space-6);
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-display);
		font-size: var(--text-h3);
		font-weight: var(--weight-bold);
		color: var(--color-ink);
		text-decoration: none;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}
	/* 字標末尾一點萊姆，之後可換成 <img class="brand-logo"> 圖片標誌 */
	.brand::after {
		content: '';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-accent);
		margin-left: 1px;
		align-self: flex-end;
		margin-bottom: 6px;
	}
	.brand-light { color: #fff; }
	.links { display: flex; gap: var(--space-6); align-items: center; font-size: var(--text-small); }
	.links a { color: var(--color-ink-soft); text-decoration: none; font-weight: var(--weight-medium); }
	.links a:hover, .links a.active { color: var(--color-ink); }
	.nav-cta { display: flex; gap: var(--space-4); align-items: center; }
	.login { color: var(--color-ink-soft); text-decoration: none; font-size: var(--text-small); font-weight: var(--weight-medium); }
	.login:hover { color: var(--color-ink); }
	.btn-sm { padding: 9px 18px; font-size: var(--text-small); white-space: nowrap; }

	/* 手機：品牌+CTA 一排，連結折到第二排置中 */
	@media (max-width: 640px) {
		.nav-inner { flex-wrap: wrap; gap: var(--space-3); }
		.brand { font-size: var(--text-body); }
		.links { order: 3; width: 100%; justify-content: center; gap: var(--space-4); padding-top: var(--space-2); border-top: 1px solid var(--color-border); }
		.nav-cta { gap: var(--space-3); }
	}

	main { max-width: var(--content-max); margin: 0 auto; padding: 0 var(--space-4); min-height: 60vh; }

	/* ── Footer ── */
	footer {
		background: var(--color-ink);
		color: rgba(255, 255, 255, 0.7);
		margin-top: var(--space-24);
	}
	.foot-inner {
		max-width: var(--content-max);
		margin: 0 auto;
		padding: var(--space-16) var(--space-4) var(--space-8);
		display: flex;
		justify-content: space-between;
		gap: var(--space-8);
		flex-wrap: wrap;
	}
	footer .brand { color: #fff; }
	.tagline { margin: var(--space-3) 0 0; color: rgba(255, 255, 255, 0.6); font-size: var(--text-small); max-width: 280px; }
	.foot-links { display: flex; flex-direction: column; gap: var(--space-3); }
	.foot-links a { color: rgba(255, 255, 255, 0.7); text-decoration: none; font-size: var(--text-small); }
	.foot-links a:hover { color: var(--color-accent); }
	.foot-base {
		max-width: var(--content-max);
		margin: 0 auto;
		padding: var(--space-4);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: space-between;
		gap: var(--space-4);
		flex-wrap: wrap;
		font-size: var(--text-caption);
		color: rgba(255, 255, 255, 0.5);
	}
</style>
