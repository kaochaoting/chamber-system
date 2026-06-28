<script lang="ts">
	let { label, type = 'default', removable = false, onRemove } = $props();

	const typeStyles = {
		default: 'background: #f0f0f0; color: #333;',
		primary: 'background: #007bff; color: white;',
		success: 'background: #28a745; color: white;',
		warning: 'background: #ffc107; color: #333;'
	};
</script>

<span class="chip" style={typeStyles[type]}>
	{label}
	{#if removable}
		<button class="remove" onclick={onRemove} aria-label="刪除">×</button>
	{/if}
</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.75rem;
		border-radius: 16px;
		font-size: 0.85rem;
		font-weight: 500;
		white-space: nowrap;
	}

	.remove {
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		font-size: 1.2rem;
		padding: 0;
		opacity: 0.7;
	}

	.remove:hover {
		opacity: 1;
	}
</style>
