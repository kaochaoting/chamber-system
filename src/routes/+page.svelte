<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let inviteCode = '';
	let error = '';

	$: if ($page.data.user) {
		if ($page.data.user.status === 'active') {
			goto('/app');
		} else {
			goto('/pending');
		}
	}

	function handleRegisterClick() {
		const form = document.querySelector('form') as HTMLFormElement;
		if (form) {
			form.submit();
		}
	}
</script>

<div class="container">
	<h1>商會系統</h1>
	<p>勞工大學創新創業專班的雙層商會系統。</p>

	<div class="form-section">
		<h2>會員註冊</h2>

		{#if error}
			<div class="error">{error}</div>
		{/if}

		<form method="POST" action="?/default" class="register-form">
			<div class="form-group">
				<label for="name">姓名</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					placeholder="請輸入姓名"
				/>
			</div>

			<div class="form-group">
				<label for="email">信箱</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					placeholder="your@email.com"
				/>
			</div>

			<div class="form-group">
				<label for="password">密碼</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					minlength="8"
					placeholder="至少 8 碼"
				/>
			</div>

			<div class="form-group">
				<label for="invite">邀請碼（可選）</label>
				<input
					type="text"
					id="invite"
					name="invite"
					bind:value={inviteCode}
					placeholder="例: KLU-115-WELCOME"
				/>
				<small>
					{#if inviteCode}
						帶邀請碼註冊會直接進入成員區域
					{:else}
						不帶邀請碼會進入待核准狀態
					{/if}
				</small>
			</div>

			<button type="submit">註冊</button>
		</form>
	</div>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	:global(p) {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	.form-section {
		background: #f9f9f9;
		padding: 2rem;
		border-radius: 8px;
		margin-top: 2rem;
	}

	.form-section h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
	}

	small {
		display: block;
		margin-top: 0.5rem;
		color: #666;
		font-size: 0.875rem;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	button:hover {
		background: #0056b3;
	}

	.error {
		background: #f8d7da;
		color: #721c24;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}
</style>
