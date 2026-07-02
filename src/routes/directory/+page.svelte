<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>產品與服務｜高創坊</title>
	<meta name="description" content="高創坊成員提供的產品與服務型錄。" />
</svelte:head>

<!-- 聚光舞台 hero -->
<section class="stage">
	<div class="stage-inner">
		<span class="eyebrow eyebrow-dark">對外開放索引</span>
		<h1>產品與<span class="hl">服務</span></h1>
		<p class="lede">高創坊成員的創業、產品與服務 ── 讓客戶找得到、被選擇。</p>
	</div>
</section>

<section class="page">
	{#if data.ventures.length === 0}
		<div class="empty">
			<div class="empty-ic">🎬</div>
			<h2>型錄即將上線</h2>
			<p>成員的創業檔案陸續建立中。先看看 <a href="/members">會員名錄</a>，認識社群裡的創業者。</p>
			<a class="btn btn-primary" href="/members">瀏覽會員名錄</a>
		</div>
	{:else}
		<div class="grid">
			{#each data.ventures as v, i (v.id)}
				{@const cover = v.logoKey ?? (v.galleryKeys ?? [])[0]}
				<article class="card">
					<div class="poster" class:has-img={cover} style="--h:{(i * 67 + 250) % 360}">
						{#if cover}
							<img src={`/img/${cover}`} alt={v.name} />
						{:else}
							<span class="poster-mark">{v.name?.[0] ?? '創'}</span>
						{/if}
						<span class="no">{String(i + 1).padStart(2, '0')}</span>
					</div>
					<div class="body">
						<h3>{v.name}</h3>
						{#if v.tagline}<p class="tagline">{v.tagline}</p>{/if}
						{#if v.description}<p class="desc">{v.description}</p>{/if}
						<div class="meta">
							{#if v.ownerSlug}<a class="owner" href="/members/{v.ownerSlug}">{v.ownerName} →</a>{/if}
							{#if v.websiteUrl}<a class="site" href={v.websiteUrl} target="_blank" rel="noopener">官網</a>{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	/* 聚光舞台（背景圖 + 左側深色漸罩，確保文字可讀）*/
	.stage {
		position: relative; overflow: hidden;
		color: #fff;
		margin: 0 calc(-1 * var(--space-4));
		padding: var(--space-24) var(--space-4) var(--space-16);
		min-height: 340px;
		background-color: var(--color-ink);
		background-image:
			linear-gradient(90deg, rgba(18,20,29,0.92) 0%, rgba(18,20,29,0.70) 42%, rgba(18,20,29,0.30) 100%),
			url('/hero-directory.png');
		background-size: cover, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
		display: flex; align-items: center;
	}
	.stage-inner { position: relative; z-index: 2; max-width: 760px; }
	.eyebrow-dark { color: rgba(255,255,255,0.78); border-color: rgba(255,255,255,0.2); }
	.stage h1 { color: #fff; font-weight: 700; letter-spacing: -0.02em;
		font-size: var(--text-display); line-height: 1.05; margin: var(--space-4) 0 var(--space-3); }
	.hl { color: var(--color-accent); }
	.lede { color: rgba(255,255,255,0.82); font-size: var(--text-h3); max-width: 560px; }

	.page { padding: var(--space-16) 0; }
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-6); }
	.card {
		display: flex; flex-direction: column; overflow: hidden;
		background: var(--color-card); border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
	}
	.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
	.poster { position: relative; aspect-ratio: 16/9; display: grid; place-items: center; overflow: hidden;
		background: linear-gradient(150deg, hsl(calc(var(--h) * 1deg) 42% 24%), var(--dusk) 55%, var(--color-ink)); }
	.poster img { width: 100%; height: 100%; object-fit: contain; padding: var(--space-4); box-sizing: border-box; }
	.poster.has-img { background: #fff; }
	.poster-mark { font-family: var(--font-display); font-weight: 700; font-size: 3.4rem;
		color: color-mix(in srgb, var(--color-accent) 80%, #fff); }
	.poster .no { position: absolute; left: var(--space-3); bottom: var(--space-2);
		font-family: var(--font-mono); font-size: var(--text-caption); color: rgba(255,255,255,0.7); }
	.body { padding: var(--space-6); display: flex; flex-direction: column; flex-grow: 1; }
	.card h3 { font-size: var(--text-h3); font-weight: var(--weight-semibold); }
	.tagline { color: var(--color-teal); margin: var(--space-1) 0 var(--space-3); font-size: var(--text-small); }
	.desc { color: var(--color-ink-soft); flex-grow: 1; font-size: var(--text-small); }
	.meta { display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--color-border); }
	.owner { color: var(--color-ink); text-decoration: none; font-size: var(--text-small); font-weight: var(--weight-medium); }
	.site { color: var(--color-on-accent); background: var(--color-accent); padding: 6px 14px; border-radius: var(--radius-pill); font-weight: var(--weight-medium); text-decoration: none; font-size: var(--text-small); }
	.owner:hover { color: var(--color-teal); }

	.empty { max-width: 480px; margin: 0 auto; text-align: center;
		padding: var(--space-16) var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-lg); }
	.empty-ic { font-size: 48px; margin-bottom: var(--space-4); }
	.empty h2 { font-size: var(--text-h3); font-weight: var(--weight-semibold); }
	.empty p { color: var(--color-ink-soft); margin: var(--space-3) 0 var(--space-8); }
	.empty a:not(.btn) { color: var(--color-teal); }
</style>
