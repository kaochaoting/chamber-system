<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	const t = data.thread;

	function fmt(ts: Date | number) {
		const d = ts instanceof Date ? ts : new Date(Number(ts) * 1000);
		return d.toLocaleString('zh-TW', { dateStyle: 'medium', timeStyle: 'short' });
	}
</script>

<svelte:head><title>{t.title}｜內部論壇</title></svelte:head>

<section class="wrap">
	<a class="back" href="/app/forum">← 返回論壇</a>

	<article class="thread">
		<h1>{t.title}</h1>
		<div class="meta"><span>{t.authorName ?? '會員'}</span><span>{fmt(t.createdAt)}</span></div>
		<div class="body">{#each (t.body ?? '').split('\n') as line}<p>{line}</p>{/each}</div>
	</article>

	<h2>回應（{data.replies.length}）</h2>
	<ul class="replies">
		{#each data.replies as r (r.id)}
			<li>
				<div class="r-head"><strong>{r.authorName ?? '會員'}</strong><time>{fmt(r.createdAt)}</time></div>
				<div class="r-body">{#each (r.body ?? '').split('\n') as line}<p>{line}</p>{/each}</div>
			</li>
		{:else}
			<p class="muted">還沒有回應，留下第一則。</p>
		{/each}
	</ul>

	<form method="POST" action="?/reply" use:enhance={() => async ({ update }) => { await update(); }}>
		{#if form?.message}<p class="error">{form.message}</p>{/if}
		<textarea name="body" rows="3" placeholder="寫下你的回應…" required></textarea>
		<button type="submit" class="btn btn-primary">送出回應</button>
	</form>
</section>

<style>
	.wrap { max-width: 720px; padding: var(--space-12) 0; }
	.back { color: var(--color-teal); text-decoration: none; font-size: var(--text-small); }
	.thread { margin: var(--space-6) 0 var(--space-12); }
	.thread h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); }
	.meta { display: flex; gap: var(--space-4); color: var(--color-ink-soft); font-size: var(--text-small); margin: var(--space-2) 0 var(--space-6); }
	.body { line-height: var(--leading-body); }
	.body p, .r-body p { margin: 0 0 var(--space-3); }
	h2 { font-size: var(--text-h3); font-weight: var(--weight-semibold); margin-bottom: var(--space-4); }
	.replies { list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-8); }
	.replies li { border-left: 3px solid var(--color-accent); padding: var(--space-2) var(--space-4); background: var(--color-surface-alt); border-radius: 0 var(--radius-md) var(--radius-md) 0; }
	.r-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-2); }
	.r-head time { color: var(--color-ink-soft); font-size: var(--text-caption); }
	.muted { color: var(--color-ink-soft); font-size: var(--text-small); }
	form { display: flex; flex-direction: column; gap: var(--space-3); }
	textarea { padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: inherit; font-size: var(--text-body); }
	.btn-primary { align-self: flex-start; }
	.error { color: var(--color-danger); font-size: var(--text-small); }
</style>
