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
		padding: 13px 26px;
		border-radius: var(--radius-pill);
		font-family: var(--font-body);
		font-size: var(--text-body);
		font-weight: var(--weight-medium);
		cursor: pointer;
		border: 1px solid transparent;
		transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
	}
	.btn:hover { transform: translateY(-2px); }
	.primary { background: var(--color-accent); color: var(--color-on-accent); }
	.primary:hover { box-shadow: 0 8px 24px color-mix(in srgb, var(--color-accent) 50%, transparent); }
	.secondary { background: var(--color-card); color: var(--color-ink); border-color: var(--color-border); }
	.secondary:hover { border-color: var(--color-ink); }
	.ghost { background: none; color: var(--color-ink); }
</style>
