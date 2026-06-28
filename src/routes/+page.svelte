<svelte:head>
	<title>商會系統｜不只讓人看見你，而是讓人選擇你</title>
	<meta name="description" content="勞工大學創新創業專班商會：成員型錄、產品服務、最新消息。" />
</svelte:head>

<section class="hero">
	<p class="eyebrow">勞工大學創新創業專班</p>
	<h1>不只讓人看見你，<br />而是讓人選擇你。</h1>
	<p class="lede">一個讓同學的創業、產品與需求能被看見、被信任、被選擇的商會。</p>
	<div class="actions">
		<a class="primary" href="/members">瀏覽會員名錄</a>
		<a class="ghost" href="/register">申請加入</a>
	</div>
</section>

<style>
	.hero { padding: var(--space-16) 0; max-width: 720px; }
	.eyebrow { font-family: var(--font-mono); color: var(--color-teal); font-size: var(--text-caption); letter-spacing: 0.08em; }
	h1 { font-size: var(--text-display); line-height: var(--leading-display); margin: var(--space-4) 0; }
	.lede { color: var(--color-ink-soft); font-size: var(--text-h3); }
	.actions { display: flex; gap: var(--space-3); margin-top: var(--space-8); }
	.actions a { padding: var(--space-3) var(--space-6); border-radius: var(--radius-sm); text-decoration: none; font-weight: var(--weight-medium); }
	.primary { background: var(--color-amber); color: #fff; }
	.ghost { border: 1px solid var(--color-border); color: var(--color-ink); }
</style>
