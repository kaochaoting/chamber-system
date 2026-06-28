<script lang="ts">
	let searchEmail = '';

	// Mock data - will connect to real database later
	const members = [
		{ id: '1', name: 'Demo User', email: 'demo@khubs.net', role: 'member', cohort: '115', status: 'active' }
	];

	$: filteredMembers = members.filter(m =>
		m.name.toLowerCase().includes(searchEmail.toLowerCase()) ||
		m.email.toLowerCase().includes(searchEmail.toLowerCase())
	);
</script>

<div class="container">
	<h1>會員名錄</h1>

	<div class="search-section">
		<input
			type="text"
			placeholder="搜尋會員名字或信箱..."
			bind:value={searchEmail}
		/>
	</div>

	<div class="members-grid">
		{#each filteredMembers as member (member.id)}
			<div class="member-card">
				<h3>{member.name}</h3>
				<p><strong>信箱：</strong> {member.email}</p>
				<p><strong>身份：</strong> {member.role}</p>
				<p><strong>期別：</strong> {member.cohort}</p>
				<span class="status {member.status}">{member.status === 'active' ? '已激活' : '待核准'}</span>
			</div>
		{:else}
			<p class="empty">沒有找到符合條件的會員</p>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.search-section {
		margin-bottom: 2rem;
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
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
	}

	.members-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.member-card {
		background: #f9f9f9;
		padding: 1.5rem;
		border-radius: 8px;
		border: 1px solid #e5e5e5;
	}

	.member-card h3 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: #333;
	}

	.member-card p {
		margin: 0.5rem 0;
		font-size: 0.9rem;
		color: #666;
	}

	.status {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.status.active {
		background: #d4edda;
		color: #155724;
	}

	.status.pending {
		background: #fff3cd;
		color: #856404;
	}

	.empty {
		text-align: center;
		color: #999;
		grid-column: 1 / -1;
	}
</style>
