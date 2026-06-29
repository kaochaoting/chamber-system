<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	let { data, form } = $props();
	const p = data.profile;
	let avatarKey = $state(p?.avatarKey ?? '');
</script>

<svelte:head><title>個人資料｜高創坊</title></svelte:head>

<section class="profile">
	<h1>個人資料</h1>
	<p class="lead">這裡編輯的內容會顯示在你的<strong>公開品牌頁</strong>。建議上傳直式頭像（建議 800×1000，比例 4:5）。</p>
	{#if form?.success}<p class="ok" role="status">已儲存。<a href="/members/{data.profile?.slug}" target="_blank">查看品牌頁 →</a></p>{/if}
	{#if form?.message}<p class="error" role="alert">{form.message}</p>{/if}

	<form method="POST" use:enhance>
		<fieldset>
			<legend>公開資訊</legend>
			<ImageUpload name="avatarKey" bind:value={avatarKey} label="頭像／品牌頁主體" ratio="4/5" hint="建議 800×1000（4:5），≤5MB" />
			<label>顯示名稱<input name="displayName" value={p?.displayName ?? ''} required /></label>
			<label>一句話簡介<textarea name="bio" rows="3">{p?.bio ?? ''}</textarea></label>
			<label>公開信箱<input type="email" name="publicEmail" value={p?.publicContact?.email ?? ''} /></label>
			<label>官網／通路（會成為對外反向鏈結）<input name="website" value={p?.socials?.website ?? ''} /></label>
			<div class="socials">
				<label>LINE<input name="line" value={p?.socials?.line ?? ''} placeholder="LINE 連結或 ID" /></label>
				<label>Facebook<input name="facebook" value={p?.socials?.facebook ?? ''} placeholder="https://facebook.com/…" /></label>
				<label>Instagram<input name="instagram" value={p?.socials?.instagram ?? ''} placeholder="https://instagram.com/…" /></label>
			</div>
			<label class="check"><input type="checkbox" name="isPublic" checked={p?.isPublic ?? false} />在對外名錄公開我的檔案</label>
		</fieldset>

		<fieldset>
			<legend>私密資訊（僅內部會員可見）</legend>
			<label>聯絡電話<input name="privatePhone" value={p?.privateContact?.phone ?? ''} /></label>
		</fieldset>

		<Button type="submit">儲存變更</Button>
	</form>
</section>

<style>
	.profile { max-width: 560px; padding: var(--space-12) 0; }
	.lead { color: var(--color-ink-soft); font-size: var(--text-small); margin-top: var(--space-2); }
	.ok a { color: var(--color-teal); margin-left: var(--space-2); }
	form { display: flex; flex-direction: column; gap: var(--space-6); margin-top: var(--space-6); }
	fieldset { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
	legend { padding: 0 var(--space-2); color: var(--color-ink-soft); font-size: var(--text-small); }
	label { display: flex; flex-direction: column; gap: var(--space-1); font-size: var(--text-small); }
	.check { flex-direction: row; align-items: center; gap: var(--space-2); }
	input, textarea {
		padding: var(--space-3); border: 1px solid var(--color-border);
		border-radius: var(--radius-sm); background: var(--color-card); color: var(--color-ink);
		font-size: var(--text-body); font-family: inherit;
	}
	.check input { padding: 0; }
	.ok { color: var(--color-success); font-size: var(--text-small); }
	.error { color: var(--color-danger); font-size: var(--text-small); }
</style>
