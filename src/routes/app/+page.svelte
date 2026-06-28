<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	async function handleLogout() {
		try {
			await fetch('/api/auth/sign-out', { method: 'POST' });
			goto('/');
		} catch (err) {
			console.error('登出失敗:', err);
		}
	}
</script>

<div class="container">
	<h1>高創坊 - 成員區域</h1>
	<p>歡迎，{data.user?.name}！</p>
	<p>信箱：{data.user?.email}</p>
	<p>身份：{data.user?.role}</p>
	<p>期別：{data.user?.cohort}</p>

	<button on:click={handleLogout}>登出</button>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	button {
		padding: 0.5rem 1rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background: #0056b3;
	}
</style>
