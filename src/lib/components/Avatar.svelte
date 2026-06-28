<script lang="ts">
	let { src, alt = '頭像', size = 'md' } = $props();

	const sizeMap = {
		sm: '32px',
		md: '64px',
		lg: '128px'
	};
</script>

<div class="avatar" style="width: {sizeMap[size]}; height: {sizeMap[size]}">
	{#if src}
		<img {src} {alt} />
	{:else}
		<div class="placeholder">👤</div>
	{/if}
</div>

<style>
	.avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: #f0f0f0;
		overflow: hidden;
		flex-shrink: 0;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.placeholder {
		font-size: 2rem;
	}
</style>
