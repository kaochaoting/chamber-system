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
	<title>最新消息｜商會系統</title>
	<meta name="description" content="勞工大學創新創業專班商會的課程公告、學員故事與產業觀察。" />
</svelte:head>

<section class="news">
	<h1>最新消息</h1>
	{#if data.posts.length === 0}
		<p class="empty">目前還沒有公開的消息。</p>
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
	.news { padding: var(--space-12) 0; max-width: 720px; }
	h1 { margin-bottom: var(--space-8); }
	.empty { color: var(--color-ink-soft); }
	.list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
	.list a { display: block; padding: var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; color: inherit; transition: border-color 0.15s; }
	.list a:hover { border-color: var(--color-amber); }
	.type { font-family: var(--font-mono); font-size: var(--text-caption); color: var(--color-teal); }
	.list h2 { font-size: var(--text-h3); margin: var(--space-2) 0; }
	.excerpt { color: var(--color-ink-soft); font-size: var(--text-small); }
	time { font-size: var(--text-caption); color: var(--color-ink-soft); }
</style>
