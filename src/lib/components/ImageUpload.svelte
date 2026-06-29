<script lang="ts">
	import { uploadImage } from '$lib/upload';

	let {
		name,
		value = $bindable(''),
		label = '圖片',
		ratio = '4/5',
		hint = ''
	}: {
		name: string;
		value?: string;
		label?: string;
		ratio?: string;
		hint?: string;
	} = $props();

	let busy = $state(false);
	let err = $state('');

	async function onPick(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		busy = true;
		err = '';
		try {
			const r = await uploadImage(file);
			value = r.key;
		} catch (e: any) {
			err = e?.message ?? '上傳失敗';
		} finally {
			busy = false;
			input.value = '';
		}
	}

	function clear() {
		value = '';
	}
</script>

<div class="upload">
	<span class="lbl">{label}</span>
	<div class="row">
		<div class="preview" style="aspect-ratio:{ratio}">
			{#if value}
				<img src={`/img/${value}`} alt="預覽" />
				<button type="button" class="rm" onclick={clear} aria-label="移除">×</button>
			{:else}
				<span class="ph">無圖</span>
			{/if}
		</div>
		<div class="ctrl">
			<label class="pick">
				{busy ? '上傳中…' : '選擇圖片'}
				<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onchange={onPick} disabled={busy} />
			</label>
			{#if hint}<small>{hint}</small>{/if}
			{#if err}<small class="err">{err}</small>{/if}
		</div>
	</div>
	<input type="hidden" {name} {value} />
</div>

<style>
	.upload { display: flex; flex-direction: column; gap: var(--space-2); }
	.lbl { font-size: var(--text-small); color: var(--color-ink-soft); }
	.row { display: flex; gap: var(--space-4); align-items: flex-start; }
	.preview {
		width: 96px; flex: none; position: relative;
		border: 1px solid var(--color-border); border-radius: var(--radius-md);
		overflow: hidden; background: var(--color-surface-alt);
		display: grid; place-items: center;
	}
	.preview img { width: 100%; height: 100%; object-fit: cover; }
	.ph { color: var(--color-ink-soft); font-size: var(--text-caption); }
	.rm { position: absolute; top: 4px; right: 4px; width: 22px; height: 22px;
		border: none; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; cursor: pointer; line-height: 1; }
	.ctrl { display: flex; flex-direction: column; gap: var(--space-2); }
	.pick {
		display: inline-block; padding: 9px 16px; border-radius: var(--radius-pill);
		border: 1px solid var(--color-border); background: var(--color-card);
		font-size: var(--text-small); cursor: pointer; width: fit-content;
	}
	.pick:hover { border-color: var(--color-ink); }
	.pick input { display: none; }
	small { font-size: var(--text-caption); color: var(--color-ink-soft); }
	small.err { color: var(--color-danger); }
</style>
