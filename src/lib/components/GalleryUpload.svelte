<script lang="ts">
	import { uploadImage } from '$lib/upload';

	let {
		name,
		value = $bindable([]),
		min = 5,
		hint = '建議 1280×800（16:10），≤5MB／張'
	}: {
		name: string;
		value?: string[];
		min?: number;
		hint?: string;
	} = $props();

	let busy = $state(false);
	let err = $state('');

	async function onPick(e: Event) {
		const input = e.target as HTMLInputElement;
		const files = Array.from(input.files ?? []);
		if (!files.length) return;
		busy = true;
		err = '';
		try {
			for (const f of files) {
				const r = await uploadImage(f);
				value = [...value, r.key];
			}
		} catch (e: any) {
			err = e?.message ?? '上傳失敗';
		} finally {
			busy = false;
			input.value = '';
		}
	}

	function remove(i: number) {
		value = value.filter((_, idx) => idx !== i);
	}
	function move(i: number, dir: number) {
		const j = i + dir;
		if (j < 0 || j >= value.length) return;
		const next = [...value];
		[next[i], next[j]] = [next[j], next[i]];
		value = next;
	}
</script>

<div class="gallery">
	<div class="head">
		<span class="lbl">品牌膠卷照片</span>
		<span class="count" class:ok={value.length >= min}>{value.length} / 建議 {min} 張以上</span>
	</div>

	<div class="thumbs">
		{#each value as key, i (key)}
			<figure class="thumb">
				<img src={`/img/${key}`} alt="膠卷 {i + 1}" />
				<figcaption>{i + 1}</figcaption>
				<div class="ops">
					<button type="button" onclick={() => move(i, -1)} disabled={i === 0} aria-label="左移">‹</button>
					<button type="button" class="del" onclick={() => remove(i)} aria-label="移除">×</button>
					<button type="button" onclick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="右移">›</button>
				</div>
			</figure>
		{/each}
		<label class="add">
			<span>{busy ? '上傳中…' : '＋ 加照片'}</span>
			<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onchange={onPick} disabled={busy} />
		</label>
	</div>

	<small class="hint">{hint}　可一次選多張、拖拉箭頭排序。</small>
	{#if value.length < min}<small class="warn">還差 {min - value.length} 張就達到建議數量。</small>{/if}
	{#if err}<small class="err">{err}</small>{/if}

	<input type="hidden" {name} value={JSON.stringify(value)} />
</div>

<style>
	.gallery { display: flex; flex-direction: column; gap: var(--space-2); }
	.head { display: flex; justify-content: space-between; align-items: baseline; }
	.lbl { font-size: var(--text-small); color: var(--color-ink-soft); }
	.count { font-family: var(--font-mono); font-size: var(--text-caption); color: var(--color-warn); }
	.count.ok { color: var(--color-success); }
	.thumbs { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: var(--space-3); }
	.thumb { position: relative; margin: 0; aspect-ratio: 16/10; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--color-border); }
	.thumb img { width: 100%; height: 100%; object-fit: cover; }
	.thumb figcaption { position: absolute; top: 4px; left: 4px; background: rgba(0,0,0,0.6); color: #fff; font-size: var(--text-caption); padding: 0 6px; border-radius: var(--radius-sm); }
	.ops { position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-between; background: rgba(0,0,0,0.5); }
	.ops button { flex: 1; background: none; border: none; color: #fff; cursor: pointer; padding: 2px 0; font-size: 0.9rem; }
	.ops button:disabled { opacity: 0.3; cursor: default; }
	.ops .del { color: #ff8a8a; }
	.add { aspect-ratio: 16/10; display: grid; place-items: center; border: 1px dashed var(--color-border); border-radius: var(--radius-sm); cursor: pointer; color: var(--color-ink-soft); font-size: var(--text-small); }
	.add:hover { border-color: var(--color-ink); }
	.add input { display: none; }
	.hint { font-size: var(--text-caption); color: var(--color-ink-soft); }
	.warn { font-size: var(--text-caption); color: var(--color-warn); }
	.err { font-size: var(--text-caption); color: var(--color-danger); }
</style>
