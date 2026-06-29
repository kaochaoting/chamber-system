<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<svelte:head><title>登入｜高創坊</title></svelte:head>

<section class="auth">
	<span class="eyebrow">會員登入</span>
	<h1>登入高創坊</h1>
	<p class="sub">高創坊統一使用 Google 帳號登入。第一次登入會建立帳號，待後台審核通過後即可進入會員區。</p>

	{#if form?.message}<p class="error" role="alert">{form.message}</p>{/if}

	<form method="POST" use:enhance>
		<button type="submit" class="gbtn">
			<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
				<path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
				<path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
				<path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/>
				<path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
			</svg>
			使用 Google 登入
		</button>
	</form>

	<p class="alt">登入即代表你同意我們的 <a href="/privacy">隱私權政策</a>。</p>
</section>

<style>
	.auth { max-width: 440px; margin: var(--space-24) auto; padding: 0 var(--space-4); text-align: center; }
	h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-3) 0; }
	.sub { color: var(--color-ink-soft); font-size: var(--text-small); line-height: var(--leading-body); }
	form { margin-top: var(--space-8); }
	.gbtn {
		display: inline-flex; align-items: center; gap: var(--space-3);
		padding: 14px 28px; border-radius: var(--radius-pill);
		border: 1px solid var(--color-border); background: var(--color-card); color: var(--color-ink);
		font-family: var(--font-body); font-size: var(--text-body); font-weight: var(--weight-medium);
		cursor: pointer; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
	}
	.gbtn:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
	.error { color: var(--color-danger); font-size: var(--text-small); margin-top: var(--space-4); }
	.alt { margin-top: var(--space-8); font-size: var(--text-small); color: var(--color-ink-soft); }
	.alt a { color: var(--color-teal); }
</style>
