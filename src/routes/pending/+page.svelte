<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

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
	<h1>等待核准</h1>
	<p>感謝您註冊高創坊。</p>
	<p>您的帳號目前待後台審核，核准後即可進入成員區域。</p>
	<p>如有問題，請與我們聯繫。</p>

	<div class="info">
		<p><strong>登錄的信箱：</strong> {$page.data.user?.email}</p>
	</div>

	<button on:click={handleLogout}>登出</button>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
	}

	.info {
		background: #f0f0f0;
		padding: 1rem;
		border-radius: 4px;
		margin: 2rem 0;
	}

	button {
		padding: 0.5rem 1rem;
		background: #6c757d;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background: #5a6268;
	}
</style>
