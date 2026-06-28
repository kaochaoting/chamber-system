<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let loading = $state(false);

	function getStatusBadge(status: string) {
		const badges: Record<string, { text: string; class: string }> = {
			pending: { text: '待核准', class: 'pending' },
			active: { text: '已核准', class: 'active' },
			suspended: { text: '已停用', class: 'suspended' }
		};
		return badges[status] || { text: status, class: '' };
	}

	function getRoleLabel(role: string) {
		const labels: Record<string, string> = {
			member: '成員',
			mentor: '導師',
			assistant: '助理',
			admin: '管理員'
		};
		return labels[role] || role;
	}
</script>

<svelte:head>
	<title>會員管理｜高創坊</title>
</svelte:head>

<div class="container">
	<h1>👥 會員管理</h1>

	{#if data.pendingUsers.length > 0}
		<div class="panel">
			<h2>待核准的帳號 ({data.pendingUsers.length})</h2>
			<table>
				<thead>
					<tr>
						<th>名字</th>
						<th>信箱</th>
						<th>期別</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					{#each data.pendingUsers as user (user.email)}
						<tr>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.cohort || '-'}</td>
							<td>
								<form method="POST" action="?/approve" use:enhance={() => { loading = true; return async () => { loading = false; }; }}>
									<input type="hidden" name="email" value={user.email} />
									<button type="submit" class="btn-approve" {loading}>核准</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="panel">
			<h2>待核准的帳號</h2>
			<p class="empty">目前沒有待核准的帳號</p>
		</div>
	{/if}

	<div class="panel">
		<h2>所有會員 ({data.allUsers.length})</h2>
		<table>
			<thead>
				<tr>
					<th>名字</th>
					<th>信箱</th>
					<th>狀態</th>
					<th>角色</th>
					<th>期別</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				{#each data.allUsers as user (user.email)}
					{@const badge = getStatusBadge(user.status)}
					<tr>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>
							<span class="badge {badge.class}">{badge.text}</span>
						</td>
						<td>
							<form method="POST" action="?/updateRole" use:enhance={() => { loading = true; return async () => { loading = false; }; }}>
								<input type="hidden" name="email" value={user.email} />
								<select name="role" value={user.role} onchange={(e) => e.currentTarget.form?.submit()}>
									<option value="member">成員</option>
									<option value="mentor">導師</option>
									<option value="assistant">助理</option>
									<option value="admin">管理員</option>
								</select>
							</form>
						</td>
						<td>{user.cohort || '-'}</td>
						<td>
							{#if user.status !== 'suspended'}
								<form method="POST" action="?/suspend" use:enhance={() => { loading = true; return async () => { loading = false; }; }}>
									<input type="hidden" name="email" value={user.email} />
									<button type="submit" class="btn-danger">停用</button>
								</form>
							{:else}
								<span class="text-muted">已停用</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 2rem;
	}

	.panel {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #ddd;
		margin-bottom: 2rem;
	}

	.panel h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
	}

	.empty {
		color: #999;
		text-align: center;
		padding: 2rem;
		margin: 0;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		background: #f9f9f9;
		font-weight: 600;
	}

	select {
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.badge {
		display: inline-block;
		padding: 0.35rem 0.75rem;
		border-radius: 12px;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.badge.pending {
		background: #fff3cd;
		color: #856404;
	}

	.badge.active {
		background: #d4edda;
		color: #155724;
	}

	.badge.suspended {
		background: #f8d7da;
		color: #721c24;
	}

	.btn-approve,
	.btn-danger {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		display: inline-block;
	}

	.btn-approve {
		background: #28a745;
		color: white;
	}

	.btn-approve:hover {
		background: #218838;
	}

	.btn-danger {
		background: #dc3545;
		color: white;
	}

	.btn-danger:hover {
		background: #c82333;
	}

	.text-muted {
		color: #999;
	}

	form {
		display: inline;
	}
</style>
