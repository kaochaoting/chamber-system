<script lang="ts">
	let { data } = $props();
	let searchEmail = $state('');

	$: filteredMembers = data.members.filter(m =>
		m.name.toLowerCase().includes(searchEmail.toLowerCase()) ||
		m.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
		m.profile?.displayName.toLowerCase().includes(searchEmail.toLowerCase())
	);
</script>

<svelte:head>
	<title>會員名錄｜高創坊</title>
</svelte:head>

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
			<a href="/members/{member.id}" class="member-card">
				<h3>{member.profile?.displayName || member.name}</h3>
				{#if member.profile?.bio}
					<p class="bio">{member.profile.bio}</p>
				{/if}
				{#if member.profile?.website}
					<p><a href={member.profile.website} target="_blank">📌 {member.profile.website}</a></p>
				{/if}
				{#if member.profile?.publicEmail}
					<p><strong>聯絡：</strong> {member.profile.publicEmail}</p>
				{/if}
				<div class="footer">
					<span class="role">{member.role === 'mentor' ? '🎓 導師' : member.role === 'assistant' ? '🛠️ 助理' : member.role === 'admin' ? '👑 管理員' : '成員'}</span>
					{#if member.cohort}
						<span class="cohort">{member.cohort} 期</span>
					{/if}
				</div>
			</a>
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
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
	}

	.member-card:hover {
		border-color: #007bff;
		box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
	}

	.member-card h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: #333;
		font-size: 1.1rem;
	}

	.member-card p {
		margin: 0.25rem 0;
		font-size: 0.9rem;
		color: #666;
	}

	.member-card .bio {
		color: #555;
		line-height: 1.4;
		margin-bottom: 0.5rem;
	}

	.member-card a {
		color: #007bff;
		text-decoration: none;
		font-size: 0.85rem;
	}

	.member-card a:hover {
		text-decoration: underline;
	}

	.footer {
		display: flex;
		gap: 0.75rem;
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid #e0e0e0;
	}

	.role,
	.cohort {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.role {
		background: #e7f3ff;
		color: #0056b3;
	}

	.cohort {
		background: #f0f0f0;
		color: #666;
	}

	.empty {
		text-align: center;
		color: #999;
		grid-column: 1 / -1;
		padding: 3rem 1rem;
	}
</style>
