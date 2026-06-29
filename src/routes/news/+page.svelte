<script lang="ts">
	let { data } = $props();

	function fmtDate(ts: number) {
		return new Date(ts * 1000).toLocaleDateString('zh-TW');
	}
	function excerpt(body: string | null) {
		if (!body) return '';
		return body.length > 80 ? body.slice(0, 80) + '…' : body;
	}
</script>

<svelte:head>
	<title>最新消息｜高創坊</title>
	<meta name="description" content="高雄勞工大學創新創業專班商會的課程公告、學員故事與產業觀察。" />
</svelte:head>

<section class="news">
	<header class="page-head">
		<span class="eyebrow">課程公告 · 學員故事 · 產業觀察</span>
		<h1>最新消息</h1>
	</header>
	{#if data.posts.length === 0}
		<div class="empty"><div class="empty-ic">📰</div><p>目前還沒有公開的消息。</p></div>
	{:else}
		<ul class="list">
			{#each data.posts as p (p.slug)}
				<li>
					<a href="/news/{p.slug}">
						<span class="type">{p.type === 'news' ? '消息' : '文章'}</span>
						<h2>{p.title}</h2>
						<p class="excerpt">{excerpt(p.body)}</p>
						<time>{fmtDate(p.createdAt)}</time>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.news { padding: var(--space-16) 0; max-width: 760px; margin: 0 auto; }
	.page-head { text-align: center; margin-bottom: var(--space-12); }
	.page-head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin-top: var(--space-3); }
	.empty { text-align: center; padding: var(--space-16) var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-lg); }
	.empty-ic { font-size: 48px; margin-bottom: var(--space-4); }
	.empty p { color: var(--color-ink-soft); }
	.list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
	.list a { display: block; padding: var(--space-6); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; color: inherit; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
	.list a:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
	.type { font-family: var(--font-mono); font-size: var(--text-caption); color: var(--color-teal); }
	.list h2 { font-size: var(--text-h3); margin: var(--space-2) 0; }
	.excerpt { color: var(--color-ink-soft); font-size: var(--text-small); }
	time { font-size: var(--text-caption); color: var(--color-ink-soft); }
</style>
