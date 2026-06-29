<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();

	function fmtDate(ts: Date | number) {
		const d = ts instanceof Date ? ts : new Date(Number(ts) * 1000);
		return d.toLocaleDateString('zh-TW');
	}
	function excerpt(b: string | null) {
		if (!b) return '';
		const c = b.replace(/\s+/g, ' ').trim();
		return c.length > 90 ? c.slice(0, 90) + '…' : c;
	}
</script>

<svelte:head><title>內部論壇｜高創坊</title></svelte:head>

<section class="wrap">
	<header class="head">
		<span class="eyebrow">會員限定</span>
		<h1>內部論壇</h1>
		<p>與同學交流、提問、分享。<a href="/app">← 回會員中心</a></p>
	</header>

	<details class="composer" open={!!form?.message}>
		<summary>＋ 發起新討論</summary>
		{#if form?.success}<p class="ok">已發佈。</p>{/if}
		{#if form?.message}<p class="error">{form.message}</p>{/if}
		<form method="POST" action="?/create" use:enhance>
			<input name="title" placeholder="討論標題" required />
			<textarea name="body" rows="4" placeholder="想聊些什麼？" required></textarea>
			<button type="submit" class="btn btn-primary">發佈討論</button>
		</form>
	</details>

	{#if data.threads.length === 0}
		<div class="empty"><div class="ic">💬</div><p>還沒有討論，當第一個開話題的人。</p></div>
	{:else}
		<ul class="list">
			{#each data.threads as t (t.id)}
				<li>
					<a href="/app/forum/{t.id}">
						<h3>{t.title}</h3>
						<p class="ex">{excerpt(t.body)}</p>
						<div class="meta"><span>{t.authorName ?? '會員'}</span><span>{fmtDate(t.createdAt)}</span><span class="c">💬 {t.comments}</span></div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.wrap { max-width: 760px; padding: var(--space-12) 0; }
	.head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-2) 0; }
	.head p { color: var(--color-ink-soft); font-size: var(--text-small); }
	.head a { color: var(--color-teal); }
	.composer { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-4) var(--space-6); margin: var(--space-8) 0; }
	.composer summary { cursor: pointer; font-weight: var(--weight-semibold); }
	.composer form { display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-4); }
	input, textarea { padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: inherit; font-size: var(--text-body); }
	.btn-primary { align-self: flex-start; }
	.ok { color: var(--color-success); font-size: var(--text-small); }
	.error { color: var(--color-danger); font-size: var(--text-small); }
	.list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
	.list a { display: block; padding: var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; color: inherit; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
	.list a:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
	.list h3 { font-size: var(--text-h3); font-weight: var(--weight-semibold); }
	.ex { color: var(--color-ink-soft); font-size: var(--text-small); margin: var(--space-2) 0; }
	.meta { display: flex; gap: var(--space-4); color: var(--color-ink-soft); font-size: var(--text-caption); }
	.meta .c { margin-left: auto; }
	.empty { text-align: center; padding: var(--space-16); background: var(--color-surface-alt); border-radius: var(--radius-lg); }
	.empty .ic { font-size: 40px; }
	.empty p { color: var(--color-ink-soft); margin-top: var(--space-3); }
</style>
