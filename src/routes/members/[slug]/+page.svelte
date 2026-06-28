<script lang="ts">
	let { data } = $props();
	const { profile } = data;
</script>

<svelte:head>
	<title>{profile.displayName} - 高創坊</title>
	<meta name="description" content={profile.bio} />
</svelte:head>

<div class="container">
	<div class="profile-header">
		<div class="avatar">👤</div>
		<div class="info">
			<h1>{profile.displayName}</h1>
			<p class="bio">{profile.bio}</p>
		</div>
	</div>

	<div class="profile-details">
		{#if profile.website}
			<div class="detail">
				<strong>官網：</strong>
				<a href={profile.website} target="_blank" rel="noopener">
					{profile.website}
				</a>
			</div>
		{/if}

		{#if profile.publicEmail}
			<div class="detail">
				<strong>信箱：</strong>
				<a href="mailto:{profile.publicEmail}">
					{profile.publicEmail}
				</a>
			</div>
		{/if}
	</div>

	<p class="back-link">
		<a href="/members">← 回到會員名錄</a>
	</p>
</div>

<style>
	.container {
		max-width: 700px;
		margin: 0 auto;
		padding: 2rem;
	}

	.profile-header {
		display: flex;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.avatar {
		font-size: 4rem;
		width: 120px;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f0f0f0;
		border-radius: 8px;
	}

	.info {
		flex: 1;
	}

	h1 {
		margin: 0 0 0.5rem;
	}

	.bio {
		color: #666;
		line-height: 1.6;
		margin: 0;
	}

	.profile-details {
		background: #f9f9f9;
		padding: 2rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}

	.detail {
		margin-bottom: 1rem;
	}

	.detail:last-child {
		margin-bottom: 0;
	}

	.detail strong {
		display: block;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.detail a {
		color: #007bff;
		text-decoration: none;
		word-break: break-all;
	}

	.detail a:hover {
		text-decoration: underline;
	}

	.back-link {
		text-align: center;
	}

	.back-link a {
		color: #007bff;
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}
</style>
