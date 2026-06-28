<script lang="ts">
	let { role, verified = false } = $props();

	const roleIcons = {
		member: '👤',
		mentor: '🎓',
		assistant: '🛠️',
		admin: '👑'
	};

	const roleLabels = {
		member: '成員',
		mentor: '導師',
		assistant: '助理',
		admin: '管理員'
	};
</script>

<div class="seal">
	<span class="icon">{roleIcons[role]}</span>
	<span class="label">{roleLabels[role]}</span>
	{#if verified}
		<span class="verified" title="已驗證">✓</span>
	{/if}
</div>

<style>
	.seal {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.25rem 0.75rem;
		background: #f0f8ff;
		border: 1px solid #b0d4ff;
		border-radius: 4px;
		font-size: 0.85rem;
		font-weight: 600;
		color: #0056b3;
	}

	.icon {
		font-size: 1rem;
	}

	.verified {
		color: #28a745;
		margin-left: 0.25rem;
	}
</style>
