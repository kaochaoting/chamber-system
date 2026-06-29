<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>後台管理｜高創坊</title>
</svelte:head>

<div class="wrap">
	<header class="head">
		<span class="eyebrow">後台治理</span>
		<h1>後台管理</h1>
		<p>歡迎，{data.user.name}（{data.user.role}）</p>
	</header>

	<div class="admin-menu">
		<a href="/admin/members" class="menu-item">
			<div class="ic">👥</div>
			<h2>會員管理</h2>
			<p>審核待核准帳號、指派角色、停權</p>
			<span class="go">進入 →</span>
		</a>
		<a href="/admin/posts" class="menu-item">
			<div class="ic">📝</div>
			<h2>內容管理</h2>
			<p>發佈消息、管理文章、上下架</p>
			<span class="go">進入 →</span>
		</a>
		<a href="/admin/invites" class="menu-item">
			<div class="ic">🔑</div>
			<h2>邀請碼管理</h2>
			<p>產生新邀請碼、管理期別</p>
			<span class="go">進入 →</span>
		</a>
	</div>
</div>

<style>
	.wrap { padding: var(--space-12) 0; }
	.head { margin-bottom: var(--space-8); }
	.head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-3) 0 var(--space-2); }
	.head p { color: var(--color-ink-soft); font-family: var(--font-mono); font-size: var(--text-small); }

	.admin-menu {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: var(--space-6);
	}
	.menu-item {
		display: flex;
		flex-direction: column;
		padding: var(--space-8);
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		text-decoration: none;
		color: var(--color-ink);
		transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
	}
	.menu-item:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
	.ic {
		width: 56px; height: 56px;
		display: grid; place-items: center; font-size: 28px;
		background: var(--color-amber-soft); border-radius: var(--radius-md);
		margin-bottom: var(--space-4);
	}
	.menu-item h2 { font-size: var(--text-h3); font-weight: var(--weight-semibold); margin: 0 0 var(--space-2); }
	.menu-item p { color: var(--color-ink-soft); font-size: var(--text-small); margin: 0 0 var(--space-6); flex-grow: 1; }
	.go { font-weight: var(--weight-semibold); color: var(--color-ink); }
</style>
