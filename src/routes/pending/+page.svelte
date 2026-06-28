<svelte:head><title>申請審核中｜商會系統</title></svelte:head>

<section class="pending">
	<div class="seal">審</div>
	<h1>申請已送出，等待開通</h1>
	<p>你的帳號已建立，正由單位審核。通過後即可進入會員中心。</p>
	<p class="hint">若有邀請碼，可重新以邀請碼註冊以直接啟用。</p>
	<form method="POST" action="/logout?/default">
		<button>登出</button>
	</form>
</section>

<style>
	.pending { max-width: 480px; margin: var(--space-16) auto; padding: 0 var(--space-4); text-align: center; }
	.seal {
		width: 56px; height: 56px; margin: 0 auto var(--space-4);
		display: grid; place-items: center;
		border: 2px solid var(--color-amber); border-radius: var(--radius-seal);
		background: var(--color-amber-soft); color: var(--color-amber);
		font-family: var(--font-display); font-size: 1.5rem;
	}
	.hint { color: var(--color-ink-soft); font-size: var(--text-small); }
	button {
		margin-top: var(--space-6); padding: var(--space-2) var(--space-4);
		background: none; border: 1px solid var(--color-border);
		border-radius: var(--radius-sm); color: var(--color-ink-soft); cursor: pointer;
	}
</style>
