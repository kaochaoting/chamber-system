<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>產品與服務｜高創坊</title>
	<meta name="description" content="高創坊成員提供的產品與服務型錄。" />
</svelte:head>

<section class="page">
	<header class="page-head">
		<span class="eyebrow">對外開放索引</span>
		<h1>產品與服務</h1>
		<p>高創坊成員的創業、產品與服務，讓客戶找得到、選得到。</p>
	</header>

	{#if data.ventures.length === 0}
		<div class="empty">
			<div class="empty-ic">🚀</div>
			<h2>型錄即將上線</h2>
			<p>成員的創業檔案陸續建立中。先看看 <a href="/members">會員名錄</a>，認識社群裡的創業者。</p>
			<a class="btn btn-primary" href="/members">瀏覽會員名錄</a>
		</div>
	{:else}
		<div class="grid">
			{#each data.ventures as v (v.id)}
				<article class="card">
					<h3>{v.name}</h3>
					{#if v.tagline}<p class="tagline">{v.tagline}</p>{/if}
					{#if v.description}<p class="desc">{v.description}</p>{/if}
					<div class="meta">
						{#if v.ownerSlug}<a class="owner" href="/members/{v.ownerSlug}">{v.ownerName}</a>{/if}
						{#if v.websiteUrl}
							<a class="site" href={v.websiteUrl} target="_blank" rel="noopener">官網 →</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.page { padding: var(--space-16) 0; }
	.page-head { text-align: center; max-width: 640px; margin: 0 auto var(--space-12); }
	.page-head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-3) 0; }
	.page-head p { color: var(--color-ink-soft); }

	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-6); }
	.card {
		display: flex; flex-direction: column;
		padding: var(--space-6); background: var(--color-card);
		border: 1px solid var(--color-border); border-radius: var(--radius-md);
		transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
	}
	.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
	.card h3 { font-size: var(--text-h3); font-weight: var(--weight-semibold); }
	.tagline { color: var(--color-teal); margin: var(--space-1) 0 var(--space-3); font-size: var(--text-small); }
	.desc { color: var(--color-ink-soft); flex-grow: 1; }
	.meta { display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--color-border); }
	.owner { color: var(--color-ink); text-decoration: none; font-size: var(--text-small); font-weight: var(--weight-medium); }
	.site { color: var(--color-ink); font-weight: var(--weight-semibold); text-decoration: none; font-size: var(--text-small); }
	.site:hover, .owner:hover { color: var(--color-teal); }

	.empty {
		max-width: 480px; margin: 0 auto; text-align: center;
		padding: var(--space-16) var(--space-6);
		background: var(--color-surface-alt); border-radius: var(--radius-lg);
	}
	.empty-ic { font-size: 48px; margin-bottom: var(--space-4); }
	.empty h2 { font-size: var(--text-h3); font-weight: var(--weight-semibold); }
	.empty p { color: var(--color-ink-soft); margin: var(--space-3) 0 var(--space-8); }
	.empty a:not(.btn) { color: var(--color-teal); }
</style>
