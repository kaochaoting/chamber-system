<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>後台管理｜高創坊</title>
</svelte:head>

<div class="container">
	<h1>後台管理</h1>
	<p>歡迎 {data.user.name}！</p>

	<div class="admin-menu">
		<div class="menu-item">
			<h2>👥 會員管理</h2>
			<p>審核待核准帳號、指派角色</p>
			<a href="/admin/members" class="btn">進入</a>
		</div>

		<div class="menu-item">
			<h2>📝 內容管理</h2>
			<p>發佈消息、管理文章</p>
			<a href="/admin/posts" class="btn">進入</a>
		</div>

		<div class="menu-item">
			<h2>🔐 邀請碼管理</h2>
			<p>產生新邀請碼、管理期別</p>
			<a href="/admin/invites" class="btn">進入</a>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 1rem;
	}

	.admin-menu {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.menu-item {
		background: #f9f9f9;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #e5e5e5;
	}

	.menu-item h2 {
		margin: 0 0 0.5rem;
		font-size: 1.3rem;
	}

	.menu-item p {
		color: #666;
		margin: 0 0 1.5rem;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: #007bff;
		color: white;
		text-decoration: none;
		border-radius: 4px;
	}

	.btn:hover {
		background: #0056b3;
	}
</style>
