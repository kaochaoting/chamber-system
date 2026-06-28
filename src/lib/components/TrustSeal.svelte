<script lang="ts">
	let { name, size = 48 }: { name: string; size?: number } = $props();
	const ch = $derived(name?.trim()?.[0] ?? '會');
</script>

<span class="seal" style="--seal-size:{size}px" title="已驗證會員" aria-label="已驗證會員">{ch}</span>

<style>
	.seal {
		width: var(--seal-size); height: var(--seal-size);
		display: grid; place-items: center; flex: none;
		border-radius: var(--radius-md);
		background: var(--color-ink); color: var(--color-accent);
		font-family: var(--font-display); font-weight: var(--weight-bold);
		font-size: calc(var(--seal-size) * 0.42);
		line-height: 1;
	}
</style>
