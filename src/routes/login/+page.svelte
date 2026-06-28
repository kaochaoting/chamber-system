<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	let { form } = $props();
</script>

<svelte:head><title>登入｜商會系統</title></svelte:head>

<section class="auth">
	<h1>登入</h1>
	{#if form?.message}<p class="error" role="alert">{form.message}</p>{/if}

	<form method="POST" action="?/email" use:enhance>
		<label>信箱<input type="email" name="email" value={form?.email ?? ''} required /></label>
		<label>密碼<input type="password" name="password" required /></label>
		<Button type="submit">登入</Button>
	</form>

	<form method="POST" action="?/google" use:enhance class="social">
		<Button type="submit" variant="secondary">用 Google 登入</Button>
	</form>

	<p class="alt">還不是會員？<a href="/register">申請加入</a></p>
</section>

<style>
	.auth { max-width: 420px; margin: var(--space-16) auto; padding: 0 var(--space-4); }
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
