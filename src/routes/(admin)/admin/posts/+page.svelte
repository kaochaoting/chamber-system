<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let title = $state('');
	let content = $state('');
	let isPublished = $state(false);
	let loading = $state(false);

	function handlePublish() {
		loading = true;
	}

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>內容管理｜高創坊</title>
</svelte:head>

<div class="container">
	<h1>📝 內容管理</h1>

	<div class="panel">
		<h2>發佈新消息</h2>
		<form method="POST" action="?/publish" use:enhance={() => {
			loading = true;
			return async ({ result }) => {
				loading = false;
				if (result.type === 'success') {
					title = '';
					content = '';
					isPublished = false;
				}
			};
		}}>
			<div class="form-group">
				<label>標題</label>
				<input
					type="text"
					name="title"
					bind:value={title}
					placeholder="消息標題"
					required
				/>
			</div>

			<div class="form-group">
				<label>內容</label>
				<textarea
					name="content"
					bind:value={content}
					rows="6"
					placeholder="消息內容"
					required
				></textarea>
			</div>

			<div class="form-group checkbox">
				<label>
					<input type="checkbox" name="isPublished" bind:checked={isPublished} />
					<span>直接發佈</span>
				</label>
			</div>

			<button type="submit" class="btn" disabled={loading}>
				{loading ? '發佈中...' : '發佈'}
			</button>
		</form>
	</div>

	<div class="panel">
		<h2>已發佈的消息 ({data.allPosts.length})</h2>
		{#if data.allPosts.length > 0}
			<div class="posts-list">
				{#each data.allPosts as post (post.id)}
					<div class="post-card">
						<div class="post-header">
							<h3>{post.title}</h3>
							<span class="badge {post.published ? 'published' : 'draft'}">
								{post.published ? '已發佈' : '草稿'}
							</span>
						</div>
						<p class="post-meta">
							發佈時間：{formatDate(post.createdAt)} | 類型：{post.type}
						</p>
						<p class="post-excerpt">{post.content.substring(0, 100)}...</p>
						<div class="post-actions">
							<form method="POST" action="?/togglePublish" style="display:inline">
								<input type="hidden" name="postId" value={post.id} />
								<input type="hidden" name="published" value={post.published.toString()} />
								<button type="submit" class="btn-toggle">
									{post.published ? '取消發佈' : '發佈'}
								</button>
							</form>
							<form method="POST" action="?/delete" style="display:inline" onsubmit={(e) => { if (!confirm('確定要刪除嗎？')) e.preventDefault(); }}>
								<input type="hidden" name="postId" value={post.id} />
								<button type="submit" class="btn-delete">刪除</button>
							</form>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty">目前沒有消息</p>
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 800px;
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
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-family: inherit;
		font-size: 1rem;
		box-sizing: border-box;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
	}

	.form-group.checkbox label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.form-group.checkbox input {
		width: auto;
	}

	.btn,
	.btn-toggle,
	.btn-delete {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.btn {
		background: #007bff;
		color: white;
	}

	.btn:hover {
		background: #0056b3;
	}

	.btn:disabled {
		background: #ccc;
		cursor: not-allowed;
	}

	.btn-toggle {
		background: #6c757d;
		color: white;
		padding: 0.5rem 1rem;
		font-size: 0.85rem;
		margin-right: 0.5rem;
	}

	.btn-toggle:hover {
		background: #5a6268;
	}

	.btn-delete {
		background: #dc3545;
		color: white;
		padding: 0.5rem 1rem;
		font-size: 0.85rem;
	}

	.btn-delete:hover {
		background: #c82333;
	}

	.empty {
		color: #999;
		text-align: center;
		padding: 2rem;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.post-card {
		border: 1px solid #eee;
		padding: 1.5rem;
		border-radius: 6px;
		background: #fafafa;
	}

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 0.75rem;
	}

	.post-header h3 {
		margin: 0;
		font-size: 1.2rem;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.badge.published {
		background: #d4edda;
		color: #155724;
	}

	.badge.draft {
		background: #fff3cd;
		color: #856404;
	}

	.post-meta {
		color: #666;
		font-size: 0.9rem;
		margin: 0.5rem 0 1rem;
	}

	.post-excerpt {
		color: #333;
		margin: 1rem 0;
		line-height: 1.5;
	}

	.post-actions {
		display: flex;
		gap: 0.5rem;
	}
</style>
