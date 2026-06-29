<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	const me = data.user?.id;
	let kind = $state('offer');
</script>

<svelte:head><title>互通有無｜高創坊</title></svelte:head>

<section class="wrap">
	<header class="head">
		<span class="eyebrow">會員限定</span>
		<h1>互通有無</h1>
		<p>供給與需求看板 ── 有資源、找資源都在這裡媒合。<a href="/app">← 回會員中心</a></p>
	</header>

	<details class="composer" open={!!form?.message}>
		<summary>＋ 張貼一則</summary>
		{#if form?.success}<p class="ok">已張貼。</p>{/if}
		{#if form?.message}<p class="error">{form.message}</p>{/if}
		<form method="POST" action="?/create" use:enhance>
			<label>類型
				<select name="kind" bind:value={kind}>
					<option value="offer">我可提供（供給）</option>
					<option value="need">我在尋找（需求）</option>
				</select>
			</label>
			<input name="title" placeholder="一句話標題" required />
			<textarea name="description" rows="3" placeholder="詳細說明"></textarea>
			<input name="contact" placeholder="聯絡方式（選填，例：email / line）" />
			<button type="submit" class="btn btn-primary">張貼</button>
		</form>
	</details>

	{#if data.items.length === 0}
		<div class="empty"><div class="ic">🤝</div><p>還沒有項目。第一個張貼供給或需求。</p></div>
	{:else}
		<div class="grid">
			{#each data.items as it (it.id)}
				<article class="card {it.status}">
					<div class="top">
						<span class="tag {it.kind}">{it.kind === 'offer' ? '供給' : '需求'}</span>
						{#if it.status === 'closed'}<span class="closed">已結束</span>{/if}
					</div>
					<h3>{it.title}</h3>
					{#if it.description}<p class="desc">{it.description}</p>{/if}
					<div class="foot">
						<span class="by">{it.authorName ?? '會員'}{#if it.contact}　·　{it.contact}{/if}</span>
						{#if it.userId === me}
							<span class="owner-actions">
								<form method="POST" action="?/toggle" use:enhance><input type="hidden" name="id" value={it.id} /><input type="hidden" name="status" value={it.status} /><button class="mini">{it.status === 'open' ? '標記結束' : '重新開啟'}</button></form>
								<form method="POST" action="?/remove" use:enhance><input type="hidden" name="id" value={it.id} /><button class="mini del">刪除</button></form>
							</span>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.wrap { max-width: 900px; padding: var(--space-12) 0; }
	.head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-2) 0; }
	.head p { color: var(--color-ink-soft); font-size: var(--text-small); }
	.head a { color: var(--color-teal); }
	.composer { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-4) var(--space-6); margin: var(--space-8) 0; }
	.composer summary { cursor: pointer; font-weight: var(--weight-semibold); }
	.composer form { display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-4); }
	label { display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--text-small); }
	input, textarea, select { padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: inherit; font-size: var(--text-body); }
	.btn-primary { align-self: flex-start; }
	.ok { color: var(--color-success); font-size: var(--text-small); }
	.error { color: var(--color-danger); font-size: var(--text-small); }
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); }
	.card { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-5); display: flex; flex-direction: column; }
	.card.closed { opacity: 0.6; }
	.top { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); }
	.tag { font-size: var(--text-caption); font-weight: var(--weight-semibold); padding: 2px 10px; border-radius: var(--radius-pill); }
	.tag.offer { background: var(--color-amber-soft); color: var(--color-warn); }
	.tag.need { background: #e7f0ff; color: #2456b5; }
	.closed { font-size: var(--text-caption); color: var(--color-ink-soft); }
	.card h3 { font-size: var(--text-h3); font-weight: var(--weight-semibold); }
	.desc { color: var(--color-ink-soft); font-size: var(--text-small); margin: var(--space-2) 0; flex-grow: 1; }
	.foot { display: flex; justify-content: space-between; align-items: center; gap: var(--space-2); margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border); }
	.by { font-size: var(--text-caption); color: var(--color-ink-soft); }
	.owner-actions { display: flex; gap: var(--space-2); }
	.mini { background: none; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 3px 8px; font-size: var(--text-caption); cursor: pointer; color: var(--color-ink-soft); }
	.mini.del { color: var(--color-danger); border-color: var(--color-danger); }
	.empty { text-align: center; padding: var(--space-16); background: var(--color-surface-alt); border-radius: var(--radius-lg); }
	.empty .ic { font-size: 40px; }
	.empty p { color: var(--color-ink-soft); margin-top: var(--space-3); }
</style>
