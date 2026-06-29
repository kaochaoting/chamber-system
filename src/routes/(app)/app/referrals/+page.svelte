<script lang="ts">
	let { data } = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(data.joinUrl);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			copied = false;
		}
	}

	const statusLabel: Record<string, string> = { pending: '待審核', active: '已啟用', suspended: '已停用' };
</script>

<svelte:head><title>邀請與推薦｜高創坊</title></svelte:head>

<section class="wrap">
	<header class="head">
		<span class="eyebrow">會員限定</span>
		<h1>邀請與推薦</h1>
		<p>把你的專屬連結分享給朋友，對方點擊用 Google 加入後，就會記在你的推薦名下。<a href="/app">← 回會員中心</a></p>
	</header>

	<div class="panel">
		<h2>我的專屬邀請連結</h2>
		<div class="linkbox">
			<input readonly value={data.joinUrl} onclick={(e) => e.currentTarget.select()} />
			<button class="btn btn-primary" onclick={copy}>{copied ? '已複製 ✓' : '複製連結'}</button>
		</div>
		<p class="hint">對方點此連結 → 用 Google 登入 → 自動成為你推薦的會員（仍需後台審核啟用）。</p>
	</div>

	{#if data.referrer}
		<p class="referrer">你的邀請人：<strong>{data.referrer.name}</strong></p>
	{/if}

	<div class="panel">
		<h2>我推薦的人（{data.referred.length}）</h2>
		{#if data.referred.length === 0}
			<p class="muted">還沒有人透過你的連結加入。分享出去，讓社群長大。</p>
		{:else}
			<ul class="list">
				{#each data.referred as r (r.id)}
					<li>
						<span class="nm">{r.displayName ?? r.name}</span>
						<span class="cat">{r.categoryLabel}</span>
						<span class="badge {r.status}">{statusLabel[r.status] ?? r.status}</span>
						{#if r.slug && r.status === 'active'}<a href="/members/{r.slug}" target="_blank">品牌頁 →</a>{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<style>
	.wrap { max-width: 720px; padding: var(--space-12) 0; }
	.head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-2) 0; }
	.head p { color: var(--color-ink-soft); font-size: var(--text-small); }
	.head a { color: var(--color-teal); }
	.panel { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-6); margin-top: var(--space-6); }
	.panel h2 { font-size: var(--text-h3); font-weight: var(--weight-semibold); margin-bottom: var(--space-4); }
	.linkbox { display: flex; gap: var(--space-3); flex-wrap: wrap; }
	.linkbox input { flex: 1; min-width: 240px; padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: var(--text-small); }
	.hint { color: var(--color-ink-soft); font-size: var(--text-small); margin-top: var(--space-3); }
	.referrer { margin-top: var(--space-6); color: var(--color-ink-soft); font-size: var(--text-small); }
	.muted { color: var(--color-ink-soft); font-size: var(--text-small); }
	.list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
	.list li { display: flex; gap: var(--space-3); align-items: center; padding: var(--space-3) 0; border-top: 1px solid var(--color-border); font-size: var(--text-small); }
	.list li:first-child { border-top: none; }
	.nm { font-weight: var(--weight-medium); flex-grow: 1; }
	.cat { background: #eef2ff; color: #3a4ea8; padding: 1px 8px; border-radius: var(--radius-pill); font-size: var(--text-caption); }
	.badge { padding: 1px 8px; border-radius: var(--radius-pill); font-size: var(--text-caption); }
	.badge.active { background: #e3f5ec; color: var(--color-success); }
	.badge.pending { background: var(--color-amber-soft); color: var(--color-warn); }
	.badge.suspended { background: #fde8e8; color: var(--color-danger); }
	a { color: var(--color-teal); text-decoration: none; }
</style>
