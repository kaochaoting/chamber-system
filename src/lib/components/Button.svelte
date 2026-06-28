<script lang="ts">
	let {
		variant = 'primary',
		type = 'button',
		children,
		...rest
	}: {
		variant?: 'primary' | 'secondary' | 'ghost';
		type?: 'button' | 'submit';
		children: import('svelte').Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<button {type} class="btn {variant}" {...rest}>{@render children()}</button>

<style>
	.btn {
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-sm);
		font-size: var(--text-body);
		font-weight: var(--weight-medium);
		cursor: pointer;
		border: 1px solid transparent;
		transition: filter var(--dur) var(--ease);
	}
	.btn:hover { filter: brightness(0.96); }
	.primary { background: var(--color-amber); color: #fff; }
	.secondary { background: var(--color-card); color: var(--color-ink); border-color: var(--color-border); }
	.ghost { background: none; color: var(--color-ink); }
</style>
