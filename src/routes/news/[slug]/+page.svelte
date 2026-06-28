<script lang="ts">
	let { data } = $props();
	const post = data.post;

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>{post.title} | 高創坊</title>
	<meta name="description" content={post.content.substring(0, 150)} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.content.substring(0, 150)} />
	<meta property="og:type" content="article" />
	
	<!-- JSON-LD Schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": "{post.title}",
			"description": "{post.content.substring(0, 150)}",
			"datePublished": "{post.createdAt.toISOString()}",
			"dateModified": "{post.updatedAt.toISOString()}"
		}
	</script>
</svelte:head>

<div class="container">
	<article class="post">
		<div class="header">
			<h1>{post.title}</h1>
			<div class="meta">
				<time>{formatDate(post.createdAt)}</time>
				<span class="type">{post.type === 'news' ? '消息' : post.type === 'article' ? '文章' : '討論'}</span>
			</div>
		</div>

		<div class="content">
			{@html post.content.replace(/\n/g, '<br>')}
		</div>

		<div class="footer">
			<a href="/news" class="back-link">← 回到消息列表</a>
		</div>
	</article>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	.post {
		background: white;
		border-radius: 8px;
		padding: 2rem;
		border: 1px solid #e5e5e5;
	}

	.header {
		margin-bottom: 2rem;
	}

	h1 {
		margin: 0 0 1rem 0;
		font-size: 2rem;
		color: #333;
	}

	.meta {
		display: flex;
		gap: 1rem;
		align-items: center;
		color: #666;
		font-size: 0.9rem;
	}

	.type {
		background: #f0f0f0;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
	}

	.content {
		color: #555;
		line-height: 1.8;
		margin-bottom: 2rem;
		word-break: break-word;
	}

	.footer {
		padding-top: 1rem;
		border-top: 1px solid #e5e5e5;
	}

	.back-link {
		color: #007bff;
		text-decoration: none;
		font-weight: 500;
	}

	.back-link:hover {
		text-decoration: underline;
	}
</style>
