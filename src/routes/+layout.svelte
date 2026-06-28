<script lang="ts">
	import '$lib/styles/tokens.css';
	import { goto } from '$app/navigation';
	let { data, children } = $props();

	async function handleLogout() {
		await fetch('/api/auth/sign-out', { method: 'POST' });
		goto('/');
	}
</script>

<header class="nav">
	<a href="/" class="brand">🏢 高創坊</a>
	<nav>
		<a href="/members">👥 會員名錄</a>
		<a href="/news">📰 最新消息</a>
		{#if data.user}
			{#if data.user.role === 'admin' || data.user.role === 'assistant'}
				<a href="/admin">🔐 後台</a>
			{/if}
			<div class="user-menu">
				<span class="user-name">{data.user.name}</span>
				<a href="/app" class="cta">會員中心</a>
				<button onclick={handleLogout} class="btn-logout">登出</button>
			</div>
		{:else}
			<a href="/login" class="cta">登入</a>
		{/if}
	</nav>
</header>

<main>{@render children()}</main>

<footer>
	<p>不只讓人看見你，而是讓人選擇你。</p>
</footer>

<style>
	.nav {
		display: flex; align-items: center; justify-content: space-between;
		max-width: var(--content-max); margin: 0 auto;
		padding: var(--space-4); gap: var(--space-4);
		background: #f9f9f9;
		border-bottom: 1px solid var(--color-border);
	}
	.brand { font-family: var(--font-display); font-size: var(--text-h3); color: var(--color-ink); text-decoration: none; }
	nav {
		display: flex;
		gap: var(--space-4);
		align-items: center;
		font-size: var(--text-small);
	}
	nav a { color: var(--color-ink-soft); text-decoration: none; }
	nav a:hover { color: var(--color-ink); }
	.cta { color: var(--color-amber) !important; font-weight: var(--weight-medium); }

	.user-menu {
		display: flex;
		gap: 1rem;
		align-items: center;
		border-left: 1px solid var(--color-border);
		padding-left: 1rem;
	}

	.user-name {
		color: var(--color-ink);
		font-weight: 500;
	}

	.btn-logout {
		background: none;
		border: none;
		color: var(--color-ink-soft);
		cursor: pointer;
		font-size: var(--text-small);
		text-decoration: underline;
	}

	.btn-logout:hover {
		color: var(--color-ink);
	}

	main { max-width: var(--content-max); margin: 0 auto; padding: 0 var(--space-4); min-height: 60vh; }
	footer {
		max-width: var(--content-max); margin: var(--space-16) auto 0;
		padding: var(--space-8) var(--space-4); border-top: 1px solid var(--color-border);
		color: var(--color-ink-soft); font-size: var(--text-small);
	}
</style>
