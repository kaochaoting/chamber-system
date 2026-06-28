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

	<div class="menu">
		<a href="/app/profile" class="menu-item">⚙️ 編輯個人資料</a>
		{#if data.user?.role === 'admin' || data.user?.role === 'assistant'}
			<a href="/admin" class="menu-item admin">🔐 後台管理</a>
		{/if}
	</div>

	<div class="info">
		<p><strong>信箱：</strong> {data.user?.email}</p>
		<p><strong>身份：</strong> {data.user?.role}</p>
		<p><strong>期別：</strong> {data.user?.cohort || '未設定'}</p>
	</div>

	<button on:click={handleLogout} class="btn-logout">登出</button>
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
