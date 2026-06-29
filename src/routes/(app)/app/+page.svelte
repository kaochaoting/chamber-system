<script lang="ts">
	let { data } = $props();
</script>

<svelte:head><title>會員中心｜高創坊</title></svelte:head>

<section class="dash">
	<h1>會員中心</h1>
	<p class="welcome">{data.user.email}（{data.user.role}・{data.user.cohort ?? '未分期'}）</p>

	<div class="grid">
		<a href="/app/profile" class="tile"><h3>個人資料</h3><p>編輯公開與私密資訊、品牌頁內容</p></a>
		{#if data.user.role === 'admin' || data.user.role === 'assistant'}
			<a href="/admin" class="tile staff"><h3>後台管理</h3><p>審核・內容・角色</p></a>
		{/if}
		<div class="tile soon"><span class="badge">即將推出</span><h3>創業與產品</h3><p>管理你的展示內容</p></div>
		<div class="tile soon"><span class="badge">即將推出</span><h3>內部論壇</h3><p>與同學交流</p></div>
		<div class="tile soon"><span class="badge">即將推出</span><h3>互通有無</h3><p>供給與需求看板</p></div>
		<div class="tile soon"><span class="badge">即將推出</span><h3>完整名錄</h3><p>含內部聯絡方式</p></div>
	</div>

	<form method="POST" action="/logout?/default" class="logout"><button>登出</button></form>
</section>

<style>
	.dash { padding: var(--space-12) 0; }
	.welcome { color: var(--color-ink-soft); font-family: var(--font-mono); font-size: var(--text-small); }
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-4); margin-top: var(--space-8); }
	.tile {
		display: block; padding: var(--space-6); background: var(--color-card);
		border: 1px solid var(--color-border); border-radius: var(--radius-md);
		text-decoration: none; color: var(--color-ink); transition: box-shadow var(--dur) var(--ease);
	}
	a.tile:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
	.tile h3 { font-size: var(--text-h3); margin-bottom: var(--space-1); }
	.tile p { color: var(--color-ink-soft); font-size: var(--text-small); }
	.staff { border-color: var(--color-accent); }
	.tile.soon { position: relative; opacity: 0.6; cursor: default; background: var(--color-surface-alt); }
	.tile.soon .badge {
		position: absolute; top: var(--space-3); right: var(--space-3);
		font-family: var(--font-mono); font-size: var(--text-caption); letter-spacing: 0.08em;
		color: var(--color-ink-soft); border: 1px solid var(--color-border);
		padding: 2px 8px; border-radius: var(--radius-pill);
	}
	.logout { margin-top: var(--space-12); }
	.logout button { background: none; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: var(--space-2) var(--space-4); color: var(--color-ink-soft); cursor: pointer; }
</style>
