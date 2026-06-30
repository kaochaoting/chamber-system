<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	let { data, form } = $props();

	let inApp = $state(false); // 是否在 App 內建瀏覽器
	let appName = $state('');
	let externalUrl = $state('');

	onMount(() => {
		const ua = navigator.userAgent || '';
		if (/\bLine\//i.test(ua)) { inApp = true; appName = 'LINE'; }
		else if (/FBAN|FBAV|Instagram/i.test(ua)) { inApp = true; appName = /Instagram/i.test(ua) ? 'Instagram' : 'Facebook'; }

		// LINE 專用：加上 openExternalBrowser=1 可請 LINE 用系統瀏覽器開啟
		const u = new URL(window.location.href);
		u.searchParams.set('openExternalBrowser', '1');
		externalUrl = u.toString();
	});

	async function copyLink() {
		try { await navigator.clipboard.writeText(window.location.href.replace(/[&?]openExternalBrowser=1/, '')); } catch {}
	}
</script>

<svelte:head><title>加入高創坊</title></svelte:head>

<section class="join">
	<span class="eyebrow">邀請加入</span>
	<h1>加入高創坊</h1>
	{#if data.referrerName}
		<p class="ref"><strong>{data.referrerName}</strong> 邀請你加入</p>
	{/if}
	<p class="sub">高雄勞工大學創新創業專班的社群商會。建立你的創業品牌頁，被看見、被選擇。</p>

	{#if inApp}
		<div class="warn">
			<p>⚠️ 你正在 <strong>{appName}</strong> 內建瀏覽器，Google 登入在這裡無法使用。</p>
			{#if appName === 'LINE'}
				<a class="btn btn-primary big" href={externalUrl}>用外部瀏覽器開啟</a>
				<p class="tip">若沒反應：點右上角「⋯」→「以其他瀏覽器開啟」。</p>
			{:else}
				<p class="tip">請點右上角「⋯」選單 →「在瀏覽器開啟 / Open in browser」，再用 Google 登入。</p>
				<button class="btn btn-ghost" onclick={copyLink}>複製連結，貼到瀏覽器開啟</button>
			{/if}
		</div>
	{:else}
		{#if form?.message}<p class="error">{form.message}</p>{/if}
		<form method="POST" action="?/signIn" use:enhance>
			<button type="submit" class="gbtn">
				<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
					<path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
					<path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
					<path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/>
					<path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
				</svg>
				使用 Google 登入加入
			</button>
		</form>
		<p class="tip">登入後帳號會進入待審核，審核通過即可建立品牌頁。</p>
	{/if}

	<p class="alt"><a href="/">← 回首頁</a></p>
</section>

<style>
	.join { max-width: 460px; margin: var(--space-24) auto; padding: 0 var(--space-4); text-align: center; }
	h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-3) 0; }
	.ref { color: var(--color-ink); font-size: var(--text-h3); }
	.ref strong { color: var(--color-teal); }
	.sub { color: var(--color-ink-soft); font-size: var(--text-small); line-height: var(--leading-body); }
	.gbtn {
		display: inline-flex; align-items: center; gap: var(--space-3);
		margin-top: var(--space-8); padding: 14px 28px; border-radius: var(--radius-pill);
		border: 1px solid var(--color-border); background: var(--color-card); color: var(--color-ink);
		font-family: var(--font-body); font-size: var(--text-body); font-weight: var(--weight-medium); cursor: pointer;
	}
	.gbtn:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
	.warn { margin-top: var(--space-8); padding: var(--space-6); background: var(--color-amber-soft); border-radius: var(--radius-md); }
	.warn p { color: var(--color-warn); font-size: var(--text-small); }
	.big { display: inline-block; margin: var(--space-4) 0; font-size: var(--text-body); }
	.tip { color: var(--color-ink-soft); font-size: var(--text-caption); margin-top: var(--space-3); }
	.error { color: var(--color-danger); font-size: var(--text-small); margin-top: var(--space-4); }
	.alt { margin-top: var(--space-8); font-size: var(--text-small); }
	.alt a { color: var(--color-teal); }
</style>
