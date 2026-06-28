<script lang="ts">
	import Avatar from './Avatar.svelte';
	import TrustSeal from './TrustSeal.svelte';

	let { member, href } = $props();
</script>

<a {href} class="card">
	<div class="avatar-container">
		<Avatar src={member.profile?.avatar} alt={member.name} size="lg" />
	</div>

	<div class="content">
		<h3>{member.profile?.displayName || member.name}</h3>

		{#if member.profile?.bio}
			<p class="bio">{member.profile.bio}</p>
		{/if}

		<div class="meta">
			<TrustSeal role={member.role} verified={member.status === 'active'} />
			{#if member.cohort}
				<span class="cohort">{member.cohort}期</span>
			{/if}
		</div>

		{#if member.profile?.website}
			<a href={member.profile.website} target="_blank" class="link" onclick={(e) => e.stopPropagation()}>
				📌 官網
			</a>
		{/if}
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: white;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
	}

	.card:hover {
		border-color: #007bff;
		box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
	}

	.avatar-container {
		display: flex;
		justify-content: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #333;
	}

	.bio {
		margin: 0;
		color: #666;
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.meta {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.cohort {
		background: #f0f0f0;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		color: #666;
	}

	.link {
		color: #007bff;
		font-size: 0.85rem;
		text-decoration: none;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
