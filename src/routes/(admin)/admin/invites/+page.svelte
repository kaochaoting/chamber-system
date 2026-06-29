<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
</script>

<svelte:head><title>邀請碼管理｜後台</title></svelte:head>

<div class="wrap">
	<h1>邀請碼管理</h1>

	{#if form?.success}
		<div class="alert success">✓ 已產生邀請碼：<code>{form.code}</code></div>
	{:else if form?.message}
		<div class="alert error">✕ {form.message}</div>
	{/if}

	<section class="composer">
		<h2>產生新邀請碼</h2>
		<form method="POST" action="?/create" use:enhance class="form">
			<label>
				期別
				<input type="text" name="cohort" placeholder="115" required />
			</label>
			<label>
				自訂碼（選填）
				<input type="text" name="code" placeholder="留空則自動產生" />
			</label>
			<button type="submit" class="btn primary">產生</button>
		</form>
	</section>

	<section>
		<h2>所有邀請碼 ({data.invites.length})</h2>
		{#if data.invites.length === 0}
			<p class="empty">尚無邀請碼。</p>
		{:else}
			<table>
				<thead>
					<tr><th>邀請碼</th><th>期別</th><th>狀態</th></tr>
				</thead>
				<tbody>
					{#each data.invites as inv (inv.code)}
						<tr>
							<td><code>{inv.code}</code></td>
							<td>{inv.cohort}</td>
							<td>
								{#if inv.usedBy}
									<span class="badge used">已使用</span>
								{:else}
									<span class="badge open">可用</span>
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
	.composer { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-6); }
	.form { display: flex; gap: var(--space-4); align-items: flex-end; flex-wrap: wrap; }
	.form label { display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--text-small); color: var(--color-ink-soft); }
	.form input { padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
	table { width: 100%; border-collapse: collapse; }
	th, td { padding: var(--space-3); text-align: left; border-bottom: 1px solid var(--color-border); font-size: var(--text-small); }
	th { color: var(--color-ink-soft); font-weight: var(--weight-medium); }
	code { font-family: var(--font-mono); background: var(--color-surface); padding: 2px 6px; border-radius: var(--radius-sm); }
	.btn { padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-card); cursor: pointer; }
	.btn.primary { background: var(--color-accent); color: var(--color-on-accent); border-color: var(--color-accent); }
	.badge { padding: 2px 8px; border-radius: var(--radius-sm); font-size: var(--text-caption); }
	.badge.open { background: #e3f5ec; color: var(--color-success); }
	.badge.used { background: var(--color-surface); color: var(--color-ink-soft); }
</style>
