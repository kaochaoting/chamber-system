<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();

	const typeLabels: Record<string, string> = { news: '消息', article: '文章', thread: '討論' };

	function fmtDate(ts: number | Date) {
		const d = ts instanceof Date ? ts : new Date(ts * 1000);
		return d.toLocaleDateString('zh-TW');
	}
</script>

<svelte:head><title>內容管理｜後台</title></svelte:head>

<div class="wrap">
	<h1>內容管理</h1>

	{#if form?.success}
		<div class="alert success">✓ 已更新</div>
	{:else if form?.message}
		<div class="alert error">✕ {form.message}</div>
	{/if}

	<section class="composer">
		<h2>發佈新內容</h2>
		<form method="POST" action="?/create" use:enhance>
			<div class="row">
				<input type="text" name="title" placeholder="標題" required />
			</div>
			<div class="row">
				<textarea name="body" rows="6" placeholder="內容" required></textarea>
			</div>
			<div class="row options">
				<label>
					類型
					<select name="type">
						<option value="news">消息</option>
						<option value="article">文章</option>
					</select>
				</label>
				<label>
					可見性
					<select name="visibility">
						<option value="public">公開（對外可見）</option>
						<option value="members">會員限定</option>
					</select>
				</label>
				<label class="check">
					<input type="checkbox" name="publish" /> 立即發佈
				</label>
				<button type="submit" class="btn primary">送出</button>
			</div>
		</form>
	</section>

	<section>
		<h2>所有內容 ({data.posts.length})</h2>
		{#if data.posts.length === 0}
			<p class="empty">尚無內容。</p>
		{:else}
			<table>
				<thead>
					<tr><th>標題</th><th>類型</th><th>可見性</th><th>狀態</th><th>日期</th><th>操作</th></tr>
				</thead>
				<tbody>
					{#each data.posts as p (p.id)}
						<tr>
							<td>{p.title}</td>
							<td>{typeLabels[p.type] ?? p.type}</td>
							<td>{p.visibility === 'public' ? '公開' : '會員'}</td>
							<td><span class="badge {p.status}">{p.status === 'published' ? '已發佈' : '草稿'}</span></td>
							<td>{fmtDate(p.createdAt)}</td>
							<td class="actions">
								<form method="POST" action="?/togglePublish" use:enhance class="inline">
									<input type="hidden" name="id" value={p.id} />
									<input type="hidden" name="status" value={p.status} />
									<button type="submit" class="btn">{p.status === 'published' ? '下架' : '發佈'}</button>
								</form>
								<form method="POST" action="?/delete" use:enhance class="inline">
									<input type="hidden" name="id" value={p.id} />
									<button type="submit" class="btn danger">刪除</button>
								</form>
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
	.row { margin-bottom: var(--space-3); }
	input[type='text'], textarea, select { width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: inherit; }
	.options { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }
	.options label { display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--text-small); color: var(--color-ink-soft); }
	.options select { width: auto; }
	.options .check { flex-direction: row; align-items: center; }
	table { width: 100%; border-collapse: collapse; }
	th, td { padding: var(--space-3); text-align: left; border-bottom: 1px solid var(--color-border); font-size: var(--text-small); }
	th { color: var(--color-ink-soft); font-weight: var(--weight-medium); }
	.inline { display: inline; }
	.actions { display: flex; gap: var(--space-2); }
	.btn { padding: var(--space-1) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-card); cursor: pointer; font-size: var(--text-small); }
	.btn.primary { background: var(--color-accent); color: var(--color-on-accent); border-color: var(--color-accent); }
	.btn.danger { color: var(--color-danger); border-color: var(--color-danger); }
	.badge { padding: 2px 8px; border-radius: var(--radius-sm); font-size: var(--text-caption); }
	.badge.published { background: #e3f5ec; color: var(--color-success); }
	.badge.draft { background: var(--color-amber-soft); color: var(--color-warn); }
</style>
