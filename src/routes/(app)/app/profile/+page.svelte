<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	const p = data.profile;
</script>

<svelte:head><title>個人資料｜高創坊</title></svelte:head>

<div class="container">
	<h1>個人資料編輯</h1>

	{#if form?.success}
		<div class="alert success">✓ 已儲存</div>
	{/if}
	{#if form?.message && !form.success}
		<div class="alert error">✕ {form.message}</div>
	{/if}

	<form method="POST" use:enhance class="form">
		<fieldset>
			<legend>公開資訊</legend>

			<div class="form-group">
				<label for="displayName">顯示名稱</label>
				<input
					id="displayName"
					type="text"
					name="displayName"
					value={p?.displayName ?? ''}
					required
					placeholder="你希望被看到的名字"
				/>
			</div>

			<div class="form-group">
				<label for="bio">一句話簡介</label>
				<textarea
					id="bio"
					name="bio"
					rows="3"
					placeholder="描述你的身份或興趣"
				>{p?.bio ?? ''}</textarea>
			</div>

			<div class="form-group">
				<label for="website">官網或作品集連結</label>
				<input
					id="website"
					type="url"
					name="website"
					value={p?.website ?? ''}
					placeholder="https://..."
				/>
				<small>這會成為對外的推薦連結</small>
			</div>

			<div class="form-group">
				<label for="publicEmail">公開聯絡信箱</label>
				<input
					id="publicEmail"
					type="email"
					name="publicEmail"
					value={p?.publicEmail ?? ''}
					placeholder="選填：想要公開的信箱"
				/>
			</div>

			<div class="form-group checkbox">
				<label>
					<input type="checkbox" name="isPublic" checked={p?.isPublic ?? false} />
					<span>在對外名錄公開我的檔案</span>
				</label>
				<small>關閉此選項則只有成員可見</small>
			</div>
		</fieldset>

		<fieldset>
			<legend>私密資訊</legend>
			<small>僅高創坊內部成員可見</small>

			<div class="form-group">
				<label for="privatePhone">聯絡電話</label>
				<input
					id="privatePhone"
					type="tel"
					name="privatePhone"
					value={p?.privatePhone ?? ''}
					placeholder="選填"
				/>
			</div>
		</fieldset>

		<button type="submit" class="btn-primary">儲存變更</button>
	</form>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 1.5rem;
	}

	.alert {
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}

	.alert.success {
		background: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.alert.error {
		background: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	fieldset {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	legend {
		font-weight: 600;
		color: #333;
		margin-bottom: 0.5rem;
	}

	fieldset > small {
		color: #999;
		font-size: 0.85rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group.checkbox {
		gap: 0.25rem;
	}

	.form-group.checkbox label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.form-group.checkbox input {
		width: auto;
	}

	label {
		font-weight: 500;
		color: #333;
		font-size: 0.95rem;
	}

	input,
	textarea {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		font-family: inherit;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
	}

	small {
		color: #999;
		font-size: 0.85rem;
	}

	.btn-primary {
		padding: 0.75rem 1.5rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		align-self: flex-start;
	}

	.btn-primary:hover {
		background: #0056b3;
	}
</style>
