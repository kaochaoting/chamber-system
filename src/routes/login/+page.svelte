<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	$: if ($page.data.user) {
		if ($page.data.user.status === 'active') {
			goto('/app');
		} else {
			goto('/pending');
		}
	}

	async function handleLogin() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/auth/sign-in/email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				// Login successful, reload page to update session
				window.location.href = '/';
			} else {
				error = '登入失敗，請檢查信箱與密碼。';
			}
		} catch (err) {
			error = '登入出錯，請稍後重試。';
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<h1>登入</h1>
	<p>高創坊成員登入</p>

	<div class="form-section">
		{#if error}
			<div class="error">{error}</div>
		{/if}

		<form on:submit|preventDefault={handleLogin}>
			<div class="form-group">
				<label for="email">信箱</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					placeholder="your@email.com"
					disabled={loading}
				/>
			</div>

			<div class="form-group">
				<label for="password">密碼</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					placeholder="密碼"
					disabled={loading}
				/>
			</div>

			<button type="submit" disabled={loading}>
				{loading ? '登入中...' : '登入'}
			</button>
		</form>

		<p class="footer-text">
			還沒註冊？<a href="/">前往註冊</a>
		</p>
	</div>
</div>

<style>
	.container {
		max-width: 400px;
		margin: 4rem auto;
		padding: 2rem;
	}

	h1 {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 0.5rem;
		color: #1a1a1a;
	}

	p {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	.form-section {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #e5e5e5;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #1a1a1a;
		font-size: 14px;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 15px;
	}

	input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
	}

	input:disabled {
		background: #f5f5f5;
		cursor: not-allowed;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 15px;
		font-weight: 500;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		background: #0056b3;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error {
		background: #f8d7da;
		color: #721c24;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		font-size: 14px;
	}

	.footer-text {
		text-align: center;
		font-size: 14px;
		color: #666;
		margin-top: 1.5rem;
	}

	a {
		color: #007bff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
