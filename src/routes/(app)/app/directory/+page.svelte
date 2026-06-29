<script lang="ts">
	let { data } = $props();
	let q = $state('');

	const roleLabel: Record<string, string> = { member: '成員', mentor: '導師', assistant: '助教', admin: '管理員' };

	const filtered = $derived.by(() =>
		data.members.filter((m) => {
			const hay = `${m.displayName ?? ''} ${m.name ?? ''} ${m.email ?? ''} ${m.cohort ?? ''}`.toLowerCase();
			return hay.includes(q.toLowerCase());
		})
	);
</script>

<svelte:head><title>完整名錄｜高創坊</title></svelte:head>

<section class="wrap">
	<header class="head">
		<span class="eyebrow">會員限定</span>
		<h1>完整名錄</h1>
		<p>含內部聯絡方式，僅限已啟用會員檢視，請勿外流。<a href="/app">← 回會員中心</a></p>
	</header>

	<input class="search" placeholder="搜尋姓名、信箱或期別…" bind:value={q} />

	<div class="table">
		<div class="tr th">
			<span>姓名</span><span>角色</span><span>期別</span><span>信箱</span><span>電話</span><span>品牌頁</span>
		</div>
		{#each filtered as m (m.email)}
			<div class="tr">
				<span class="nm">{m.displayName ?? m.name}</span>
				<span><span class="role">{roleLabel[m.role] ?? m.role}</span></span>
				<span>{m.cohort ?? '—'}</span>
				<span class="mono">{m.publicContact?.email || m.email}</span>
				<span class="mono">{m.privateContact?.phone || '—'}</span>
				<span>
					{#if m.isPublic && m.slug}<a href="/members/{m.slug}" target="_blank">查看 →</a>{:else}<span class="muted">未公開</span>{/if}
				</span>
			</div>
		{:else}
			<p class="empty">查無符合的會員。</p>
		{/each}
	</div>
	<p class="count">共 {filtered.length} 位</p>
</section>

<style>
	.wrap { max-width: 1000px; padding: var(--space-12) 0; }
	.head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-2) 0; }
	.head p { color: var(--color-ink-soft); font-size: var(--text-small); }
	.head a { color: var(--color-teal); }
	.search { width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-pill); font-size: var(--text-body); margin: var(--space-6) 0; }
	.table { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
	.tr { display: grid; grid-template-columns: 1.4fr 0.8fr 0.6fr 1.6fr 1.1fr 0.8fr; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-top: 1px solid var(--color-border); align-items: center; font-size: var(--text-small); }
	.tr:first-child { border-top: none; }
	.th { background: var(--color-surface-alt); color: var(--color-ink-soft); font-weight: var(--weight-medium); }
	.nm { font-weight: var(--weight-medium); }
	.role { background: #e7f3ff; color: #0056b3; padding: 1px 8px; border-radius: var(--radius-pill); font-size: var(--text-caption); }
	.mono { font-family: var(--font-mono); font-size: var(--text-caption); color: var(--color-ink-soft); word-break: break-all; }
	.muted { color: var(--color-ink-soft); }
	a { color: var(--color-teal); text-decoration: none; }
	.empty { padding: var(--space-8); text-align: center; color: var(--color-ink-soft); }
	.count { color: var(--color-ink-soft); font-size: var(--text-small); margin-top: var(--space-3); }
	@media (max-width: 720px) {
		.tr { grid-template-columns: 1fr 1fr; }
		.th { display: none; }
		.tr span:empty { display: none; }
	}
</style>
