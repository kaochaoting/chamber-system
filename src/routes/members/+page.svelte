<script lang="ts">
	import MemberCard from '$lib/components/MemberCard.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>會員名錄｜高創坊</title>
	<meta name="description" content="高雄勞工大學創新創業專班成員與其創業、產品服務。" />
</svelte:head>

<section class="members">
	<header class="page-head">
		<span class="eyebrow">對外開放索引</span>
		<h1>會員名錄</h1>
		<p>認識高創坊的創業者。每一位都經社群驗證，值得被選擇。</p>
	</header>

	{#if data.members.length === 0}
		<div class="empty">
			<div class="empty-ic">👥</div>
			<p>還沒有公開的成員檔案。<br />第一個公開，就第一個被看見。</p>
		</div>
	{:else}
		<div class="grid">
			{#each data.members as m}
				<MemberCard slug={m.slug} name={m.displayName} bio={m.bio} verified />
			{/each}
		</div>
	{/if}
</section>

<style>
	.members { padding: var(--space-16) 0; }
	.page-head { text-align: center; max-width: 640px; margin: 0 auto var(--space-12); }
	.page-head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-3) 0; }
	.page-head p { color: var(--color-ink-soft); }
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-6); }
	.empty { max-width: 480px; margin: 0 auto; text-align: center; padding: var(--space-16) var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-lg); }
	.empty-ic { font-size: 48px; margin-bottom: var(--space-4); }
	.empty p { color: var(--color-ink-soft); }
</style>
