<script lang="ts">
	import { onMount } from 'svelte';
	let { data } = $props();
	const { profile, venture, services, goods, gallery } = data;

	const initial = (profile.displayName ?? '會').trim()[0];
	const img = (key: string | null | undefined) => (key ? `/img/${encodeURIComponent(key)}` : null);

	// 膠卷場景：有真實圖用圖；無圖則用暮光佔位場景（讓輪播仍可展示）
	const reel: (string | null)[] = gallery.length ? gallery : [null, null, null, null];

	let reelEl: HTMLDivElement;
	function nudge(dir: number) {
		reelEl?.scrollBy({ left: dir * Math.min(520, reelEl.clientWidth * 0.8), behavior: 'smooth' });
	}

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const els = Array.from(document.querySelectorAll('[data-reveal]'));
		if (reduce) {
			els.forEach((e) => e.classList.add('in'));
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const en of entries)
					if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
			},
			{ threshold: 0, rootMargin: '0px 0px -8% 0px' }
		);
		els.forEach((e) => {
			// 已在視窗內或之上者直接顯示，其餘交給 IO
			const r = e.getBoundingClientRect();
			if (r.top < window.innerHeight * 0.95) e.classList.add('in');
			else io.observe(e);
		});
		// 安全網：1.8s 後仍未顯示者強制顯示，避免任何內容永久隱形
		const safety = setTimeout(() => els.forEach((e) => e.classList.add('in')), 1800);
		return () => { io.disconnect(); clearTimeout(safety); };
	});
</script>

<svelte:head>
	<title>{profile.displayName}｜高創坊</title>
	{#if profile.bio}<meta name="description" content={profile.bio} />{/if}
	{@html `<script type="application/ld+json">${data.jsonLd}<\/script>`}
</svelte:head>

<!-- ① Curtain-up：聚光燈封面 -->
<section class="stage-hero">
	<div class="grain" aria-hidden="true"></div>
	<div class="spot" aria-hidden="true"></div>
	<div class="subject" data-reveal>
		{#if img(profile.avatarKey)}
			<img src={img(profile.avatarKey)} alt={profile.displayName} />
		{:else}
			<div class="subject-ph"><span>{initial}</span></div>
		{/if}
	</div>
	<div class="marquee">
		<span class="eyebrow">高創坊 · 會員品牌</span>
		<h1>{profile.displayName}</h1>
		{#if venture?.tagline}<p class="tagline">{venture.tagline}</p>{/if}
		<a class="back" href="/members">← 會員名錄</a>
	</div>
	<div class="bar top" aria-hidden="true"></div>
	<div class="bar bottom" aria-hidden="true"></div>
</section>

<!-- ② Monologue：關於 -->
{#if profile.bio}
	<section class="monologue" data-reveal>
		<span class="scene-no">01 — 關於</span>
		<p class="quote">{profile.bio}</p>
		{#if venture?.name}<p class="venture-name">{venture.name}{#if venture.description}　·　{venture.description}{/if}</p>{/if}
	</section>
{/if}

<!-- ③ The Acts：服務（幕次清單）-->
{#if services.length}
	<section class="acts">
		<header class="sec-head" data-reveal><span class="scene-no">02 — 服務</span><h2>提供的服務</h2></header>
		<ol class="act-list">
			{#each services as s, i (s.id)}
				<li class="act" data-reveal>
					<span class="no">{String(i + 1).padStart(2, '0')}</span>
					<div class="act-body">
						<h3>{s.name}</h3>
						{#if s.description}<p>{s.description}</p>{/if}
					</div>
					{#if s.priceLabel}<span class="price">{s.priceLabel}</span>{/if}
				</li>
			{/each}
		</ol>
	</section>
{/if}

<!-- ④ Set pieces：產品（交錯大圖文）-->
{#if goods.length}
	<section class="setpieces">
		<header class="sec-head" data-reveal><span class="scene-no">03 — 產品</span><h2>產品與作品</h2></header>
		{#each goods as g, i (g.id)}
			<article class="piece" class:flip={i % 2 === 1} data-reveal>
				<div class="piece-media">
					{#if img((g.imageKeys ?? [])[0])}
						<img src={img((g.imageKeys ?? [])[0])} alt={g.name} />
					{:else}
						<div class="media-ph" style="--h:{(i * 67) % 360}"><span>{g.name?.[0] ?? '品'}</span></div>
					{/if}
				</div>
				<div class="piece-copy">
					<h3>{g.name}</h3>
					{#if g.description}<p>{g.description}</p>{/if}
					{#if g.priceLabel}<span class="price">{g.priceLabel}</span>{/if}
					{#if g.externalUrl}<a class="btn btn-primary" href={g.externalUrl} target="_blank" rel="noopener">了解更多 →</a>{/if}
				</div>
			</article>
		{/each}
	</section>
{/if}

<!-- ⑤ The Reel：照片輪播（膠卷）-->
{#if reel.length}
	<section class="reel-wrap">
		<header class="sec-head" data-reveal><span class="scene-no">04 — 影像</span><h2>品牌膠卷</h2>
			<div class="reel-nav"><button onclick={() => nudge(-1)} aria-label="上一張">‹</button><button onclick={() => nudge(1)} aria-label="下一張">›</button></div>
		</header>
		<div class="reel" bind:this={reelEl}>
			{#each reel as key, i (i)}
				<figure class="frame">
					{#if key}
						<img src={img(key)} alt="" loading="lazy" />
					{:else}
						<div class="frame-ph" style="--h:{(i * 84 + 250) % 360}"></div>
					{/if}
					<figcaption>{String(i + 1).padStart(2, '0')} / {String(reel.length).padStart(2, '0')}</figcaption>
				</figure>
			{/each}
		</div>
	</section>
{/if}

<!-- ⑥ Curtain-call：CTA -->
<section class="curtain" data-reveal>
	<h2>想與 {profile.displayName} 合作？</h2>
	<div class="cta-row">
		{#if profile.publicContact?.email}<a class="btn btn-primary" href={`mailto:${profile.publicContact.email}`}>聯絡 {profile.displayName}</a>{/if}
		{#if venture?.websiteUrl}<a class="btn btn-on-dark" href={venture.websiteUrl} target="_blank" rel="noopener">前往官網 →</a>{/if}
	</div>
</section>

<style>
	/* 全幅出血：抵銷 main 的左右 padding */
	.stage-hero, .acts, .setpieces, .reel-wrap, .curtain, .monologue {
		margin-left: calc(-1 * var(--space-4));
		margin-right: calc(-1 * var(--space-4));
		padding-left: var(--space-4);
		padding-right: var(--space-4);
	}

	/* ① Hero 聚光燈舞台 */
	.stage-hero {
		position: relative;
		min-height: 86vh;
		background: var(--color-ink);
		color: #fff;
		overflow: hidden;
		display: grid;
		align-items: end;
		padding-top: var(--space-16);
		padding-bottom: var(--space-16);
		background-image: radial-gradient(120% 90% at 78% 18%, var(--dusk), transparent 60%);
	}
	.spot {
		position: absolute; inset: 0;
		background: radial-gradient(40% 50% at 72% 42%, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 70%);
		filter: blur(8px);
		animation: spot-in 1200ms var(--ease) both;
	}
	@keyframes spot-in { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
	.grain { position: absolute; inset: 0; opacity: 0.05; pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
	.bar { position: absolute; left: 0; right: 0; height: 28px; background: #000; opacity: 0.5; }
	.bar.top { top: 0; } .bar.bottom { bottom: 0; }

	.subject {
		position: absolute; top: 50%; right: 6%; transform: translateY(-50%);
		width: min(42vw, 460px); aspect-ratio: 4/5;
		border-radius: var(--radius-lg); overflow: hidden;
		box-shadow: 0 30px 80px rgba(0,0,0,0.5);
		clip-path: inset(0 0 0 0);
		opacity: 0; transition: opacity 900ms var(--ease), transform 900ms var(--ease);
		transform: translateY(-50%) scale(1.04);
	}
	.subject:global(.in) { opacity: 1; transform: translateY(-50%) scale(1); }
	.subject img { width: 100%; height: 100%; object-fit: cover; }
	.subject-ph { width: 100%; height: 100%; display: grid; place-items: center;
		background: linear-gradient(160deg, var(--dusk), var(--color-ink));
		color: var(--color-accent); font-family: var(--font-display); font-weight: 700; font-size: 8rem; }

	.marquee { position: relative; z-index: 2; max-width: 60%; }
	.marquee .eyebrow { color: rgba(255,255,255,0.75); border-color: rgba(255,255,255,0.2); }
	.marquee h1 {
		color: #fff; font-weight: 700; letter-spacing: -0.02em;
		font-size: clamp(2.5rem, 7vw, 5.5rem); line-height: 1.02;
		margin: var(--space-4) 0 var(--space-3);
	}
	.tagline { color: var(--color-accent); font-size: var(--text-h3); font-weight: 500; }
	.back { display: inline-block; margin-top: var(--space-6); color: rgba(255,255,255,0.7); text-decoration: none; font-size: var(--text-small); }
	.back:hover { color: #fff; }

	/* ② Monologue */
	.monologue { padding-top: var(--space-24); padding-bottom: var(--space-16); max-width: 1000px; margin-inline: auto; }
	.scene-no { font-family: var(--font-mono); font-size: var(--text-caption); letter-spacing: 0.18em; color: var(--color-teal); text-transform: uppercase; }
	.quote { font-family: var(--font-display); font-weight: 600; letter-spacing: -0.01em;
		font-size: clamp(1.5rem, 3.4vw, 2.6rem); line-height: 1.35; margin: var(--space-4) 0 0; }
	.venture-name { color: var(--color-ink-soft); margin-top: var(--space-4); }

	/* 通用區段標頭 */
	.sec-head { display: flex; align-items: baseline; gap: var(--space-4); margin-bottom: var(--space-8); flex-wrap: wrap; }
	.sec-head h2 { font-size: var(--text-h2); font-weight: 700; }

	/* ③ Acts 幕次 */
	.acts { padding-block: var(--space-16); max-width: 1000px; margin-inline: auto; }
	.act-list { list-style: none; margin: 0; padding: 0; }
	.act { display: grid; grid-template-columns: auto 1fr auto; gap: var(--space-6); align-items: center;
		padding: var(--space-6) 0; border-top: 1px solid var(--color-border);
		opacity: 0; transform: translateX(-24px); transition: opacity 600ms var(--ease), transform 600ms var(--ease); }
	.act:global(.in) { opacity: 1; transform: none; }
	.act:last-child { border-bottom: 1px solid var(--color-border); }
	.act .no { font-family: var(--font-display); font-weight: 700; font-size: clamp(2rem, 5vw, 3.5rem); color: var(--color-accent); line-height: 1; }
	.act-body h3 { font-size: var(--text-h3); font-weight: 600; }
	.act-body p { color: var(--color-ink-soft); margin-top: var(--space-1); }
	.price { font-family: var(--font-mono); font-size: var(--text-small); color: var(--color-ink-soft); white-space: nowrap; }

	/* ④ Set pieces 交錯 */
	.setpieces { padding-block: var(--space-16); max-width: 1100px; margin-inline: auto; }
	.piece { display: grid; grid-template-columns: 1.05fr 1fr; gap: var(--space-12); align-items: center; margin-bottom: var(--space-16);
		opacity: 0; transform: translateX(-32px); transition: opacity 700ms var(--ease), transform 700ms var(--ease); }
	.piece.flip { transform: translateX(32px); }
	.piece.flip .piece-media { order: 2; }
	.piece:global(.in) { opacity: 1; transform: none; }
	.piece-media { aspect-ratio: 4/3; border-radius: var(--radius-md); overflow: hidden; }
	.piece-media img { width: 100%; height: 100%; object-fit: cover; }
	.media-ph { width: 100%; height: 100%; display: grid; place-items: center;
		background: linear-gradient(150deg, hsl(calc(var(--h) * 1deg) 45% 22%), var(--color-ink));
		color: var(--color-accent); font-family: var(--font-display); font-weight: 700; font-size: 4rem; }
	.piece-copy h3 { font-size: var(--text-h2); font-weight: 700; }
	.piece-copy p { color: var(--color-ink-soft); margin: var(--space-3) 0 var(--space-6); }
	.piece-copy .btn { margin-top: var(--space-2); }

	/* ⑤ Reel 膠卷 */
	.reel-wrap { padding-block: var(--space-16); background: var(--color-ink); color: #fff;
		padding-top: var(--space-16); padding-bottom: var(--space-16); }
	.reel-wrap .sec-head { max-width: 1100px; margin-inline: auto; justify-content: space-between; }
	.reel-wrap h2 { color: #fff; }
	.reel-nav button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3);
		background: transparent; color: #fff; font-size: 1.2rem; cursor: pointer; margin-left: var(--space-2); }
	.reel-nav button:hover { background: var(--color-accent); color: var(--color-on-accent); border-color: var(--color-accent); }
	.reel { display: flex; gap: var(--space-4); overflow-x: auto; scroll-snap-type: x mandatory;
		padding: var(--space-2) max(var(--space-4), calc((100% - 1100px) / 2)) var(--space-6);
		scrollbar-width: none; }
	.reel::-webkit-scrollbar { display: none; }
	.frame { flex: 0 0 auto; width: min(70vw, 460px); aspect-ratio: 16/10; scroll-snap-align: center;
		position: relative; border-radius: var(--radius-md); overflow: hidden; margin: 0; }
	.frame img { width: 100%; height: 100%; object-fit: cover; }
	.frame-ph { width: 100%; height: 100%;
		background: linear-gradient(135deg, hsl(calc(var(--h) * 1deg) 40% 24%), var(--dusk) 60%, var(--color-ink));
		position: relative; }
	.frame-ph::after { content: '高創坊'; position: absolute; inset: 0; display: grid; place-items: center;
		font-family: var(--font-display); font-weight: 700; font-size: 1.4rem;
		color: color-mix(in srgb, var(--color-accent) 70%, transparent); letter-spacing: 0.2em; }
	.frame figcaption { position: absolute; left: var(--space-3); bottom: var(--space-3);
		font-family: var(--font-mono); font-size: var(--text-caption); color: #fff;
		background: rgba(0,0,0,0.5); padding: 2px 8px; border-radius: var(--radius-sm); }

	/* ⑥ Curtain-call */
	.curtain { background: var(--color-ink); color: #fff; text-align: center;
		padding-top: var(--space-24); padding-bottom: var(--space-24);
		background-image: radial-gradient(60% 60% at 50% 120%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 60%);
		opacity: 0; transition: opacity 800ms var(--ease); }
	.curtain:global(.in) { opacity: 1; }
	.curtain h2 { color: #fff; font-size: var(--text-h2); font-weight: 700; }
	.cta-row { display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; margin-top: var(--space-8); }

	/* RWD */
	@media (max-width: 760px) {
		.subject { position: relative; top: auto; right: auto; transform: none; width: 100%; margin-bottom: var(--space-8); aspect-ratio: 3/2; }
		.subject:global(.in) { transform: none; }
		.marquee { max-width: 100%; }
		.act { grid-template-columns: auto 1fr; }
		.act .price { grid-column: 2; }
		.piece, .piece.flip { grid-template-columns: 1fr; gap: var(--space-6); }
		.piece.flip .piece-media { order: 0; }
	}
</style>
