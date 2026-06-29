<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	let { form } = $props();
</script>

<svelte:head><title>申請加入｜高創坊</title></svelte:head>

<section class="auth">
	<h1>申請加入</h1>
	<p class="hint">有邀請碼可直接啟用；沒有也可申請，由單位審核後開通。</p>

	{#if form?.message}<p class="error" role="alert">{form.message}</p>{/if}

	<form method="POST" use:enhance>
		<label>姓名<input name="name" value={form?.name ?? ''} required /></label>
		<label>信箱<input type="email" name="email" value={form?.email ?? ''} required /></label>
		<label>密碼（至少 8 碼）<input type="password" name="password" minlength="8" required /></label>
		<label>邀請碼（選填）<input name="invite" placeholder="有碼直接啟用" /></label>
		<Button type="submit">送出申請</Button>
	</form>

	<form method="POST" action="/login?/google" use:enhance class="social">
		<Button type="submit" variant="secondary">用 Google 申請／登入</Button>
	</form>

	<p class="alt">已經是會員？<a href="/login">登入</a></p>
</section>

<style>
	.auth { max-width: 420px; margin: var(--space-16) auto; padding: 0 var(--space-4); }
	.hint { color: var(--color-ink-soft); font-size: var(--text-small); }
	form { display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-6); }
	label { display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--text-small); }
	input {
		padding: var(--space-3); border: 1px solid var(--color-border);
		border-radius: var(--radius-sm); background: var(--color-card); color: var(--color-ink);
		font-size: var(--text-body);
	}
	.social { margin-top: var(--space-4); }
	.error { color: var(--color-danger); font-size: var(--text-small); }
	.alt { margin-top: var(--space-6); font-size: var(--text-small); }
</style>
