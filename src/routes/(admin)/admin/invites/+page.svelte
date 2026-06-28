<script lang="ts">
	let { data } = $props();
	let cohort = '';

	function handleGenerateCode() {
		if (!cohort) {
			alert('請填寫期別');
			return;
		}
		// TODO: 實現生成邀請碼
		alert(`已生成 ${cohort} 期的邀請碼`);
		cohort = '';
	}
</script>

<svelte:head>
	<title>邀請碼管理｜高創坊</title>
</svelte:head>

<div class="container">
	<h1>🔐 邀請碼管理</h1>

	<div class="panel">
		<h2>產生新邀請碼</h2>
		<form onsubmit={(e) => { e.preventDefault(); handleGenerateCode(); }}>
			<div class="form-group">
				<label>期別（例：115、116）</label>
				<input
					type="text"
					bind:value={cohort}
					placeholder="期別編號"
				/>
			</div>
			<button type="submit" class="btn">產生邀請碼</button>
		</form>
	</div>

	<div class="panel">
		<h2>現有邀請碼</h2>
		<table>
			<thead>
				<tr>
					<th>邀請碼</th>
					<th>期別</th>
					<th>已使用</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>KLU-115-WELCOME</code></td>
					<td>115</td>
					<td>1</td>
					<td><button class="btn-danger">停用</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 2rem;
	}

	.panel {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #ddd;
		margin-bottom: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
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
	}

	input:focus {
		outline: none;
		border-color: #007bff;
	}

	.btn,
	.btn-danger {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.btn {
		background: #007bff;
		color: white;
	}

	.btn:hover {
		background: #0056b3;
	}

	.btn-danger {
		background: #dc3545;
		color: white;
	}

	.btn-danger:hover {
		background: #c82333;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		background: #f9f9f9;
		font-weight: 600;
	}

	code {
		background: #f4f4f4;
		padding: 0.25rem 0.5rem;
		border-radius: 3px;
		font-family: monospace;
	}
</style>
