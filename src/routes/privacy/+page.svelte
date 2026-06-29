<svelte:head>
	<title>隱私權政策｜高創坊</title>
	<meta name="description" content="高創坊（khubs.net）隱私權政策：我們蒐集、使用與保護個人資料的方式。" />
</svelte:head>

<article class="legal">
	<header>
		<span class="eyebrow">法律聲明</span>
		<h1>隱私權政策</h1>
		<p class="updated">最後更新：2026 年 6 月 29 日</p>
	</header>

	<section>
		<h2>一、總則</h2>
		<p>高創坊（khubs.net，以下稱「本平台」）由高雄勞工大學創新創業專班社群營運。我們重視您的隱私，本政策說明本平台如何蒐集、處理、利用與保護您的個人資料，並依《個人資料保護法》規範辦理。</p>
	</section>

	<section>
		<h2>二、我們蒐集的資料</h2>
		<ul>
			<li><strong>帳號資料：</strong>姓名、電子信箱、密碼（以雜湊方式儲存，本平台無法還原）、期別、角色。</li>
			<li><strong>個人檔案：</strong>您自行填寫的顯示名稱、簡介、公開聯絡方式、官網連結、頭像與品牌頁圖片。</li>
			<li><strong>私密聯絡方式：</strong>如電話，僅限平台內已啟用之會員可見，不對外公開、不被搜尋引擎索引。</li>
			<li><strong>操作軌跡：</strong>為維護治理，後台操作（審核、角色變更、內容發佈等）會記錄操作者與時間。</li>
		</ul>
	</section>

	<section>
		<h2>三、資料的使用目的</h2>
		<ul>
			<li>提供會員身分驗證、個人與創業品牌頁展示。</li>
			<li>對外公開名錄與產品服務索引（僅限您選擇「公開」的欄位）。</li>
			<li>社群治理：會員審核、角色管理、內容管理。</li>
		</ul>
	</section>

	<section>
		<h2>四、公開與私密的界線</h2>
		<p>本平台採「對內封閉信任 × 對外開放索引」雙層設計：</p>
		<ul>
			<li><strong>公開：</strong>您在個人資料勾選「在對外名錄公開我的檔案」後，顯示名稱、簡介、公開信箱、官網、產品與服務才會對外顯示並可被搜尋。</li>
			<li><strong>私密：</strong>未勾選公開的檔案與所有私密聯絡方式，僅限平台內已啟用會員可見；<code>/app</code> 與 <code>/admin</code> 一律標記 <code>noindex</code>，不被搜尋引擎收錄。</li>
		</ul>
	</section>

	<section>
		<h2>五、資料儲存與安全</h2>
		<p>資料儲存於 Cloudflare 邊緣服務（D1 資料庫、R2 物件儲存）。密碼以單向雜湊保存。傳輸全程採用 HTTPS 加密。圖片以物件金鑰存取，依可見性授權。</p>
	</section>

	<section>
		<h2>六、第三方服務</h2>
		<p>本平台使用 Cloudflare 提供之基礎設施與 Google Fonts 字體服務。若您選用 Google 登入，將依 Google 之隱私政策處理您的驗證資訊；本平台僅取得必要之識別資料。</p>
	</section>

	<section>
		<h2>七、您的權利</h2>
		<p>您得隨時查詢、更正、刪除您的個人資料，或要求停止蒐集、處理與利用。多數操作可於「會員中心 → 個人資料」自行完成；如需刪除帳號，請來信聯絡。</p>
	</section>

	<section>
		<h2>八、聯絡我們</h2>
		<p>如對本政策有任何疑問，請來信：<a href="mailto:hello@khubs.net">hello@khubs.net</a></p>
	</section>
</article>

<style>
	.legal { max-width: 760px; margin: 0 auto; padding: var(--space-16) 0 var(--space-24); }
	header { margin-bottom: var(--space-12); }
	header h1 { font-size: var(--text-h1); font-weight: var(--weight-bold); margin: var(--space-3) 0; }
	.updated { color: var(--color-ink-soft); font-family: var(--font-mono); font-size: var(--text-small); }
	section { margin-bottom: var(--space-8); }
	h2 { font-size: var(--text-h3); font-weight: var(--weight-semibold); margin-bottom: var(--space-3); }
	p { color: var(--color-ink-soft); line-height: var(--leading-body); margin: 0 0 var(--space-3); }
	ul { color: var(--color-ink-soft); line-height: var(--leading-body); padding-left: var(--space-6); }
	li { margin-bottom: var(--space-2); }
	strong { color: var(--color-ink); }
	code { font-family: var(--font-mono); background: var(--color-surface-alt); padding: 1px 6px; border-radius: var(--radius-sm); font-size: 0.9em; }
	a { color: var(--color-teal); }
</style>
