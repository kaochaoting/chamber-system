<script lang="ts">
	import '$lib/styles/tokens.css';
	let { data, children } = $props();
</script>

<header class="nav">
	<a href="/" class="brand">高創坊</a>
	<nav>
		{#if data.user}
			<a href="/app" class="cta">會員中心</a>
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
	}
	.brand { font-family: var(--font-display); font-size: var(--text-h3); color: var(--color-ink); text-decoration: none; }
	nav { display: flex; gap: var(--space-4); align-items: center; font-size: var(--text-small); }
	nav a { color: var(--color-ink-soft); text-decoration: none; }
	nav a:hover { color: var(--color-ink); }
	.cta { color: var(--color-amber) !important; font-weight: var(--weight-medium); }
	main { max-width: var(--content-max); margin: 0 auto; padding: 0 var(--space-4); min-height: 60vh; }
	footer {
		max-width: var(--content-max); margin: var(--space-16) auto 0;
		padding: var(--space-8) var(--space-4); border-top: 1px solid var(--color-border);
		color: var(--color-ink-soft); font-size: var(--text-small);
	}
</style>
