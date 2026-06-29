<script lang="ts">
	let { data } = $props();
	const post = data.post;

	function fmtDate(ts: Date | number) {
		const d = ts instanceof Date ? ts : new Date(Number(ts) * 1000);
		return d.toLocaleDateString('zh-TW');
	}
</script>

<svelte:head>
	<title>{post.title}｜高創坊</title>
	<meta name="description" content={(post.body ?? '').slice(0, 120)} />
	{@html `<script type="application/ld+json">${data.jsonLd}<\/script>`}
</svelte:head>

<article class="post">
	<a class="back" href="/news">← 返回最新消息</a>
	<span class="type">{post.type === 'news' ? '消息' : '文章'}</span>
	<h1>{post.title}</h1>
	<div class="meta">
		<span>{post.authorName ?? '高創坊'}</span>
		<time>{fmtDate(post.createdAt)}</time>
	</div>
	<div class="body">
		{#each (post.body ?? '').split('\n') as line}
			<p>{line}</p>
		{/each}
	</div>
</article>

<style>
	.post { padding: var(--space-12) 0; max-width: 680px; }
	.back { font-size: var(--text-small); color: var(--color-teal); text-decoration: none; }
	.type { display: block; font-family: var(--font-mono); font-size: var(--text-caption); color: var(--color-teal); margin-top: var(--space-4); }
	h1 { font-size: var(--text-h1); margin: var(--space-2) 0 var(--space-4); }
	.meta { display: flex; gap: var(--space-4); color: var(--color-ink-soft); font-size: var(--text-small); margin-bottom: var(--space-8); }
	.body { line-height: var(--leading-body); }
	.body p { margin: 0 0 var(--space-4); }
</style>
