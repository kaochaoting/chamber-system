<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import GalleryUpload from '$lib/components/GalleryUpload.svelte';
	let { data, form } = $props();
	const v = data.venture;

	let logoKey = $state(v?.logoKey ?? '');
	let galleryKeys = $state<string[]>((v?.galleryKeys as string[]) ?? []);
	let newImageKey = $state('');
	let newKind = $state('product');
</script>

<svelte:head><title>創業與產品｜高創坊</title></svelte:head>

<section class="wrap">
	<header class="head">
		<span class="eyebrow">會員中心</span>
		<h1>創業與產品</h1>
		<p>這裡的內容會顯示在你的公開品牌頁的「服務／產品／膠卷」。<a href="/app">← 回會員中心</a></p>
	</header>

	{#if form?.success}
		<p class="ok" role="status">已儲存。
			{#if data.profileSlug}<a href="/members/{data.profileSlug}" target="_blank">查看品牌頁 →</a>{/if}
		</p>
	{/if}
	{#if form?.message}<p class="error" role="alert">{form.message}</p>{/if}
	{#if data.venture && !data.profilePublic}
		<p class="warn">提醒：你的品牌頁目前未公開。到 <a href="/app/profile">個人資料</a> 勾選「在對外名錄公開」後才會對外顯示。</p>
	{/if}

	<!-- 創業／品牌 -->
	<div class="panel">
		<h2>品牌資訊</h2>
		<form method="POST" action="?/saveVenture" use:enhance>
			<ImageUpload name="logoKey" bind:value={logoKey} label="品牌 Logo（選填）" ratio="1/1" hint="建議 512×512（1:1）" />
			<label>創業／品牌名稱 *<input name="name" value={v?.name ?? ''} required /></label>
			<label>一句話標語<input name="tagline" value={v?.tagline ?? ''} placeholder="例：高雄在地法式甜點" /></label>
			<label>品牌介紹<textarea name="description" rows="3">{v?.description ?? ''}</textarea></label>
			<label>官網連結<input name="websiteUrl" value={v?.websiteUrl ?? ''} placeholder="https://..." /></label>
			<GalleryUpload name="galleryKeys" bind:value={galleryKeys} min={5} />
			<label class="check"><input type="checkbox" name="isPublic" checked={v ? v.isPublic : true} />在「產品與服務」對外公開</label>
			<button type="submit" class="btn btn-primary">{v ? '更新品牌' : '建立品牌'}</button>
		</form>
	</div>

	{#if v}
		<!-- 服務 -->
		<div class="panel">
			<h2>服務（{data.services.length}）</h2>
			{#if data.services.length}
				<ul class="items">
					{#each data.services as s (s.id)}
						<li>
							<div class="it-main"><strong>{s.name}</strong>{#if s.priceLabel}<span class="price">{s.priceLabel}</span>{/if}
								{#if s.description}<p>{s.description}</p>{/if}</div>
							<form method="POST" action="?/deleteItem" use:enhance><input type="hidden" name="id" value={s.id} /><button class="btn-del">刪除</button></form>
						</li>
					{/each}
				</ul>
			{:else}<p class="muted">尚無服務。</p>{/if}
		</div>

		<!-- 產品 -->
		<div class="panel">
			<h2>產品／作品（{data.goods.length}）</h2>
			{#if data.goods.length}
				<ul class="items">
					{#each data.goods as g (g.id)}
						<li>
							{#if (g.imageKeys ?? [])[0]}<img class="thumb" src={`/img/${(g.imageKeys ?? [])[0]}`} alt={g.name} />{/if}
							<div class="it-main"><strong>{g.name}</strong>{#if g.priceLabel}<span class="price">{g.priceLabel}</span>{/if}
								{#if g.description}<p>{g.description}</p>{/if}</div>
							<form method="POST" action="?/deleteItem" use:enhance><input type="hidden" name="id" value={g.id} /><button class="btn-del">刪除</button></form>
						</li>
					{/each}
				</ul>
			{:else}<p class="muted">尚無產品。</p>{/if}
		</div>

		<!-- 新增項目 -->
		<div class="panel">
			<h2>新增項目</h2>
			<form method="POST" action="?/addItem" use:enhance={() => async ({ update }) => { await update(); newImageKey = ''; }}>
				<label>類型
					<select name="kind" bind:value={newKind}>
						<option value="product">產品／作品</option>
						<option value="service">服務</option>
					</select>
				</label>
				<label>名稱 *<input name="name" required /></label>
				<label>說明<textarea name="description" rows="2"></textarea></label>
				<label>價格標示<input name="priceLabel" placeholder="例：NT$880 起 / 專案報價" /></label>
				<label>外部連結（選填）<input name="externalUrl" placeholder="https://..." /></label>
				{#if newKind === 'product'}
					<ImageUpload name="imageKey" bind:value={newImageKey} label="產品圖（選填）" ratio="4/3" hint="建議 1200×900（4:3）；也會進品牌膠卷" />
				{:else}
					<input type="hidden" name="imageKey" value="" />
				{/if}
				<button type="submit" class="btn btn-primary">新增</button>
			</form>
		</div>
	{/if}
</section>

<style>
	.wrap { max-width: 680px; padding: var(--space-12) 0; }
	.head h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-2) 0; }
	.head p { color: var(--color-ink-soft); font-size: var(--text-small); }
	.head a { color: var(--color-teal); }
	.ok { color: var(--color-success); font-size: var(--text-small); }
	.ok a { color: var(--color-teal); margin-left: var(--space-2); }
	.error { color: var(--color-danger); font-size: var(--text-small); }
	.warn { color: var(--color-warn); font-size: var(--text-small); margin-top: var(--space-2); }
	.warn a { color: var(--color-teal); }
	.panel { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-6); margin-top: var(--space-6); }
	.panel h2 { font-size: var(--text-h3); font-weight: var(--weight-semibold); margin-bottom: var(--space-4); }
	form { display: flex; flex-direction: column; gap: var(--space-3); }
	label { display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--text-small); }
	.check { flex-direction: row; align-items: center; gap: var(--space-2); }
	input, textarea, select { padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-card); color: var(--color-ink); font-size: var(--text-body); font-family: inherit; }
	.check input { padding: 0; }
	.btn-primary { align-self: flex-start; }
	.items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-3); }
	.items li { display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-3) 0; border-top: 1px solid var(--color-border); }
	.thumb { width: 64px; height: 48px; object-fit: cover; border-radius: var(--radius-sm); flex: none; }
	.it-main { flex-grow: 1; }
	.it-main p { color: var(--color-ink-soft); font-size: var(--text-small); margin-top: 2px; }
	.price { font-family: var(--font-mono); font-size: var(--text-caption); color: var(--color-ink-soft); margin-left: var(--space-2); }
	.btn-del { background: none; border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-danger); padding: 4px 10px; cursor: pointer; font-size: var(--text-small); flex: none; }
	.muted { color: var(--color-ink-soft); font-size: var(--text-small); }
</style>
