<script lang="ts">
	import TrustSeal from './TrustSeal.svelte';
	let {
		slug,
		name,
		bio = null,
		verified = false
	}: { slug: string; name: string; bio?: string | null; verified?: boolean } = $props();
</script>

<a class="card" href="/members/{slug}">
	{#if verified}<TrustSeal {name} size={40} />{/if}
	<div class="body">
		<h3>{name}</h3>
		{#if bio}<p>{bio}</p>{/if}
	</div>
</a>

<style>
	.card {
		display: flex; gap: var(--space-3); align-items: center;
		padding: var(--space-4); background: var(--color-card);
		border: 1px solid var(--color-border); border-radius: var(--radius-md);
		text-decoration: none; color: var(--color-ink);
		transition: box-shadow var(--dur) var(--ease);
	}
	.card:hover { box-shadow: var(--shadow-md); }
	h3 { font-size: var(--text-h3); }
	.body p { color: var(--color-ink-soft); font-size: var(--text-small); margin-top: 2px; }
</style>
