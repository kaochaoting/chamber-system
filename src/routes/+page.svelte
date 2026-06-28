<svelte:head>
	<title>高創坊｜不只讓人看見你，而是讓人選擇你</title>
	<meta name="description" content="高雄勞工大學創新創業專班商會：成員型錄、產品服務、最新消息。對內封閉信任，對外開放索引。" />
</svelte:head>

<!-- Hero：深色 navy-black 底 + 萊姆綠強調 -->
<section class="hero">
	<div class="hero-inner">
		<span class="eyebrow eyebrow-dark">高雄勞工大學 · 創新創業專班</span>
		<h1>讓你的創業<br /><span class="hl">被看見、被選擇</span></h1>
		<p class="lede">
			高創坊是一個讓同學的創業、產品與需求能被看見、被信任、被選擇的商會。
			對內封閉信任，對外開放索引。
		</p>
		<div class="actions">
			<a class="btn btn-primary" href="/members">瀏覽會員名錄</a>
			<a class="btn btn-on-dark" href="/register">申請加入 →</a>
		</div>
		<dl class="stats">
			<div><dt>對外索引</dt><dd>SEO 友善</dd></div>
			<div><dt>對內社群</dt><dd>封閉信任</dd></div>
			<div><dt>創業背書</dt><dd>互鏈外溢</dd></div>
		</dl>
	</div>
</section>

<!-- 三大價值 -->
<section class="features">
	<div class="features-head">
		<span class="eyebrow">為什麼加入高創坊</span>
		<h2>不只是名片，而是被選擇的理由</h2>
	</div>
	<div class="grid">
		<article class="card">
			<div class="ic">🪪</div>
			<h3>個人與創業檔案</h3>
			<p>建立公開／私密分流的成員檔案，展示你的創業、產品與服務。</p>
		</article>
		<article class="card">
			<div class="ic">🔎</div>
			<h3>對外開放索引</h3>
			<p>可被搜尋的成員型錄，含 Schema.org 結構化資料，讓客戶找得到你。</p>
		</article>
		<article class="card">
			<div class="ic">🤝</div>
			<h3>對內封閉信任</h3>
			<p>內部名錄、互通有無、商會背書，讓同屆與跨屆彼此選擇、彼此成就。</p>
		</article>
	</div>
</section>

<!-- CTA 條 -->
<section class="cta">
	<div class="cta-inner">
		<h2>準備好被看見了嗎？</h2>
		<p>用邀請碼加入，立即建立你的創業檔案。</p>
		<a class="btn btn-primary" href="/register">申請加入高創坊</a>
	</div>
</section>

<style>
	/* ── Hero ── */
	.hero {
		background: var(--color-ink);
		color: #fff;
		margin: 0 calc(-1 * var(--space-4));
		padding: var(--space-24) var(--space-4) var(--space-16);
		border-radius: 0 0 var(--radius-lg) var(--radius-lg);
		background-image: radial-gradient(
			circle at 80% 0%,
			color-mix(in srgb, var(--color-accent) 14%, transparent),
			transparent 45%
		);
	}
	.hero-inner { max-width: 860px; margin: 0 auto; text-align: center; }
	.eyebrow-dark { color: rgba(255, 255, 255, 0.8); border-color: rgba(255, 255, 255, 0.2); }
	.hero h1 {
		color: #fff;
		font-size: var(--text-display);
		font-weight: var(--weight-bold);
		line-height: var(--leading-display);
		margin: var(--space-6) 0 var(--space-4);
	}
	.hl { color: var(--color-accent); }
	.lede {
		color: rgba(255, 255, 255, 0.82);
		font-size: var(--text-h3);
		line-height: 1.6;
		max-width: 620px;
		margin: 0 auto;
	}
	.actions {
		display: flex;
		gap: var(--space-3);
		justify-content: center;
		flex-wrap: wrap;
		margin-top: var(--space-8);
	}
	.stats {
		display: flex;
		justify-content: center;
		gap: var(--space-12);
		margin: var(--space-16) 0 0;
		flex-wrap: wrap;
	}
	.stats dt { font-family: var(--font-mono); font-size: var(--text-caption); color: var(--color-accent); letter-spacing: 0.08em; text-transform: uppercase; }
	.stats dd { margin: var(--space-1) 0 0; font-size: var(--text-h3); font-weight: var(--weight-semibold); color: #fff; }

	/* ── Features ── */
	.features { padding: var(--space-24) 0 var(--space-16); }
	.features-head { text-align: center; max-width: 640px; margin: 0 auto var(--space-12); }
	.features-head h2 { font-size: var(--text-h2); font-weight: var(--weight-bold); margin-top: var(--space-3); }
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-6);
	}
	.card {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-8);
		transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
	}
	.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
	.ic {
		width: 56px; height: 56px;
		display: grid; place-items: center;
		font-size: 28px;
		background: var(--color-amber-soft);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-4);
	}
	.card h3 { font-size: var(--text-h3); font-weight: var(--weight-semibold); margin: 0 0 var(--space-2); }
	.card p { color: var(--color-ink-soft); margin: 0; }

	/* ── CTA ── */
	.cta { padding: 0 0 var(--space-24); }
	.cta-inner {
		background: var(--color-ink);
		color: #fff;
		border-radius: var(--radius-lg);
		padding: var(--space-16) var(--space-8);
		text-align: center;
		background-image: radial-gradient(
			circle at 50% 120%,
			color-mix(in srgb, var(--color-accent) 18%, transparent),
			transparent 55%
		);
	}
	.cta-inner h2 { color: #fff; font-size: var(--text-h2); font-weight: var(--weight-bold); }
	.cta-inner p { color: rgba(255, 255, 255, 0.8); margin: var(--space-3) 0 var(--space-8); }
</style>
