<script lang="ts">
	let { data } = $props();

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>最新消息｜高創坊</title>
</svelte:head>

<div class="container">
	<h1>📰 最新消息</h1>

	{#if data.posts.length > 0}
		<div class="news-list">
			{#each data.posts as post (post.id)}
				<article class="news-item">
					<div class="news-header">
						<div>
							<h2>{post.title}</h2>
							<p class="content">{post.content.substring(0, 200)}{post.content.length > 200 ? '...' : ''}</p>
						</div>
						<span class="date">{formatDate(post.createdAt)}</span>
					</div>
					<div class="news-footer">
						<span class="type">{post.type === 'news' ? '消息' : post.type === 'article' ? '文章' : '討論'}</span>
						<span class="visibility">{post.visibility === 'public' ? '公開' : '會員限定'}</span>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="empty">
			<p>暫時沒有最新消息</p>
		</div>
	{/if}
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

	.news-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.news-item {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #e5e5e5;
		transition: all 0.2s ease;
	}

	.news-item:hover {
		border-color: #007bff;
		box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
	}

	.news-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.news-header > div {
		flex: 1;
	}

	.news-item h2 {
		margin: 0 0 0.75rem 0;
		color: #333;
		font-size: 1.3rem;
	}

	.date {
		background: #f0f0f0;
		color: #666;
		padding: 0.35rem 0.75rem;
		border-radius: 4px;
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.content {
		color: #666;
		line-height: 1.6;
		margin: 0;
		font-size: 0.95rem;
	}

	.news-footer {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e5e5e5;
	}

	.type,
	.visibility {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.type {
		background: #e7f3ff;
		color: #0056b3;
	}

	.visibility {
		background: #f0f0f0;
		color: #666;
	}

	.empty {
		text-align: center;
		padding: 4rem 2rem;
		color: #999;
	}
</style>
