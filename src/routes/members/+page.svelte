<script lang="ts">
	import MemberCard from '$lib/components/MemberCard.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>會員名錄｜商會系統</title>
	<meta name="description" content="勞工大學創新創業專班成員與其創業、產品服務。" />
</svelte:head>

<section class="members">
	<h1>會員名錄</h1>
	{#if data.members.length === 0}
		<p class="empty">還沒有公開的成員檔案。第一個公開，就第一個被看見。</p>
	{:else}
		<div class="grid">
			{#each data.members as m}
				<MemberCard slug={m.slug} name={m.displayName} bio={m.bio} verified />
			{/each}
		</div>
	{/if}
</section>

<style>
	.members { padding: var(--space-12) 0; }
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-4); margin-top: var(--space-8); }
	.empty { color: var(--color-ink-soft); margin-top: var(--space-6); }
</style>
