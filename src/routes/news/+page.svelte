<script lang="ts">
	const news = [
		{
			id: '1',
			title: '高創坊正式上線',
			date: '2026-06-28',
			content: '高創坊（高雄創新創業社群商會系統）正式上線，歡迎所有創業者加入我們的社群！',
			author: '高創坊管理員'
		},
		{
			id: '2',
			title: '邀請碼開放申請',
			date: '2026-06-27',
			content: '115期邀請碼已開放，使用邀請碼 KLU-115-WELCOME 可直接進入成員區域。',
			author: '高創坊管理員'
		}
	];

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}
</script>

<div class="container">
	<h1>最新消息</h1>

	<div class="news-list">
		{#each news as article (article.id)}
			<article class="news-item">
				<div class="news-header">
					<h2>{article.title}</h2>
					<span class="date">{formatDate(article.date)}</span>
				</div>
				<p class="content">{article.content}</p>
				<p class="author">作者：{article.author}</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.news-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.news-item {
		background: #f9f9f9;
		padding: 2rem;
		border-radius: 8px;
		border-left: 4px solid #007bff;
	}

	.news-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.news-item h2 {
		margin: 0;
		color: #333;
		flex-grow: 1;
	}

	.date {
		background: #e7f3ff;
		color: #0056b3;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.85rem;
		white-space: nowrap;
	}

	.content {
		color: #666;
		line-height: 1.6;
		margin: 1rem 0;
	}

	.author {
		font-size: 0.85rem;
		color: #999;
		margin: 0;
	}
</style>
