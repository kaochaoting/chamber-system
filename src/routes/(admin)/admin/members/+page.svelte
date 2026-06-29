<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();

	const roleLabels: Record<string, string> = {
		member: '成員',
		mentor: '導師',
		assistant: '助教',
		admin: '管理員'
	};
	const statusLabels: Record<string, string> = {
		pending: '待審核',
		active: '已啟用',
		suspended: '已停權'
	};
	const categoryLabels: Record<string, string> = {
		organizer: '主辦單位',
		student: '學員',
		member: '會員'
	};
</script>

<svelte:head><title>會員管理｜後台</title></svelte:head>

<div class="wrap">
	<h1>會員管理</h1>

	{#if form?.success}
		<div class="alert success">✓ 已更新</div>
	{:else if form?.message}
		<div class="alert error">✕ {form.message}</div>
	{/if}

	<section>
		<h2>待審核 ({data.pending.length})</h2>
		{#if data.pending.length === 0}
			<p class="empty">目前沒有待審核的申請。</p>
		{:else}
			<table>
				<thead>
					<tr><th>姓名</th><th>信箱</th><th>期別</th><th>操作</th></tr>
				</thead>
				<tbody>
					{#each data.pending as u (u.id)}
						<tr>
							<td>{u.name}</td>
							<td>{u.email}</td>
							<td colspan="2">
								<form method="POST" action="?/approve" use:enhance class="inline">
									<input type="hidden" name="id" value={u.id} />
									<input type="text" name="cohort" placeholder="期別 115" class="cohort" />
									<button type="submit" class="btn approve">核准</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</section>

	<section>
		<h2>所有會員 ({data.members.length})</h2>
		{#if data.members.length === 0}
			<p class="empty">尚無已啟用的會員。</p>
		{:else}
			<table>
				<thead>
					<tr><th>姓名</th><th>信箱</th><th>分類</th><th>角色</th><th>狀態</th><th>期別</th><th>操作</th></tr>
				</thead>
				<tbody>
					{#each data.members as u (u.id)}
						<tr>
							<td>{u.name}</td>
							<td>{u.email}</td>
							<td>
								<form method="POST" action="?/setCategory" use:enhance class="inline">
									<input type="hidden" name="id" value={u.id} />
									<select name="category" onchange={(e) => e.currentTarget.form?.requestSubmit()}>
										{#each Object.entries(categoryLabels) as [val, label]}
											<option value={val} selected={u.category === val}>{label}</option>
										{/each}
									</select>
								</form>
							</td>
							<td>
								<form method="POST" action="?/setRole" use:enhance class="inline">
									<input type="hidden" name="id" value={u.id} />
									<select name="role" onchange={(e) => e.currentTarget.form?.requestSubmit()}>
										{#each Object.entries(roleLabels) as [val, label]}
											<option value={val} selected={u.role === val}>{label}</option>
										{/each}
									</select>
								</form>
							</td>
							<td><span class="badge {u.status}">{statusLabels[u.status]}</span></td>
							<td>{u.cohort ?? '—'}</td>
							<td>
								{#if u.status === 'suspended'}
									<form method="POST" action="?/reactivate" use:enhance class="inline">
										<input type="hidden" name="id" value={u.id} />
										<button type="submit" class="btn">恢復</button>
									</form>
								{:else}
									<form method="POST" action="?/suspend" use:enhance class="inline">
										<input type="hidden" name="id" value={u.id} />
										<button type="submit" class="btn danger">停權</button>
									</form>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</section>
</div>

<style>
	.wrap { padding: var(--space-8) 0; }
	h1 { margin-bottom: var(--space-6); }
	h2 { margin: var(--space-8) 0 var(--space-4); font-size: var(--text-h3); }
	.alert { padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-4); }
	.alert.success { background: var(--color-amber-soft); color: var(--color-warn); }
	.alert.error { background: #fde8e8; color: var(--color-danger); }
	.empty { color: var(--color-ink-soft); }
	table { width: 100%; border-collapse: collapse; }
	th, td { padding: var(--space-3); text-align: left; border-bottom: 1px solid var(--color-border); font-size: var(--text-small); }
	th { color: var(--color-ink-soft); font-weight: var(--weight-medium); }
	.inline { display: inline; }
	.cohort { width: 80px; padding: var(--space-1) var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
	select { padding: var(--space-1) var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
	.btn { padding: var(--space-1) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-card); cursor: pointer; font-size: var(--text-small); }
	.btn.approve { background: var(--color-teal); color: #fff; border-color: var(--color-teal); }
	.btn.danger { color: var(--color-danger); border-color: var(--color-danger); }
	.badge { padding: 2px 8px; border-radius: var(--radius-sm); font-size: var(--text-caption); }
	.badge.active { background: #e3f5ec; color: var(--color-success); }
	.badge.suspended { background: #fde8e8; color: var(--color-danger); }
	.badge.pending { background: var(--color-amber-soft); color: var(--color-warn); }
</style>
