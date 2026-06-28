<script lang="ts">
	import TrustSeal from '$lib/components/TrustSeal.svelte';
	let { data } = $props();
	const { profile, venture } = data;
</script>

<svelte:head>
	<title>{profile.displayName}｜商會系統</title>
	{#if profile.bio}<meta name="description" content={profile.bio} />{/if}
	{@html `<script type="application/ld+json">${data.jsonLd}<\/script>`}
</svelte:head>

<article class="member">
	<header>
		<TrustSeal name={profile.displayName} />
		<div>
			<h1>{profile.displayName}</h1>
			{#if profile.bio}<p class="bio">{profile.bio}</p>{/if}
		</div>
	</header>

	{#if venture}
		<section class="venture">
			<h2>{venture.name}</h2>
			{#if venture.tagline}<p class="tagline">{venture.tagline}</p>{/if}
			{#if venture.description}<p>{venture.description}</p>{/if}
			{#if venture.websiteUrl}
				<a class="site" href={venture.websiteUrl} target="_blank" rel="noopener">前往官網 →</a>
			{/if}
		</section>
	{/if}

	{#if profile.publicContact?.email}
		<p class="contact">聯絡：{profile.publicContact.email}</p>
	{/if}
</article>

<style>
	.member { max-width: 680px; padding: var(--space-12) 0; }
	header { display: flex; gap: var(--space-4); align-items: center; }
	h1 { font-size: var(--text-h1); }
	.bio { color: var(--color-ink-soft); margin-top: var(--space-1); }
	.venture { margin-top: var(--space-8); padding: var(--space-6); background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
	.venture h2 { font-size: var(--text-h2); }
	.tagline { color: var(--color-teal); margin: var(--space-1) 0 var(--space-3); }
	.site { display: inline-block; margin-top: var(--space-4); color: var(--color-amber); font-weight: var(--weight-medium); text-decoration: none; }
	.contact { margin-top: var(--space-6); color: var(--color-ink-soft); font-size: var(--text-small); }
</style>
