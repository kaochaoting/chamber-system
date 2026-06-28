<script lang="ts">
	let name = '';
	let email = '';
	let password = '';
	let invite = '';
	let error = '';
	let loading = false;

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;

		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('email', email);
			formData.append('password', password);
			formData.append('invite', invite);

			const response = await fetch('/', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				// Server will redirect
			} else {
				error = '註冊失敗，請檢查輸入後重試。';
			}
		} catch (err) {
			error = '網路錯誤，請稍後重試。';
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<h1>高創坊</h1>
	<p>高雄創新創業社群商會系統</p>

	<div class="form-section">
		<h2>會員註冊</h2>

		{#if error}
			<div class="error">{error}</div>
		{/if}

		<form on:submit={handleSubmit} class="register-form">
			<div class="form-group">
				<label for="name">姓名</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					required
					placeholder="請輸入姓名"
					disabled={loading}
				/>
			</div>

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
					minlength="8"
					placeholder="至少 8 碼"
					disabled={loading}
				/>
			</div>

			<div class="form-group">
				<label for="invite">邀請碼（可選）</label>
				<input
					type="text"
					id="invite"
					bind:value={invite}
					placeholder="例: KLU-115-WELCOME"
					disabled={loading}
				/>
				<small>
					{#if invite}
						帶邀請碼註冊會直接進入成員區域
					{:else}
						不帶邀請碼會進入待核准狀態
					{/if}
				</small>
			</div>

			<button type="submit" disabled={loading}>
				{loading ? '註冊中...' : '註冊'}
			</button>
		</form>

		<p class="footer-text">
			已有帳號？<a href="/login">前往登入</a>
		</p>
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

	input:disabled {
		background: #f5f5f5;
		cursor: not-allowed;
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
		font-size: 0.875rem;
	}

	.footer-text {
		text-align: center;
		font-size: 0.875rem;
		color: #666;
		margin-top: 1.5rem !important;
	}

	.footer-text a {
		color: #007bff;
		text-decoration: none;
	}

	.footer-text a:hover {
		text-decoration: underline;
	}
</style>
