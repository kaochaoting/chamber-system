# Phase 3 — Compiled Spec（會員品牌頁）

## External Library Decision
- Q1 core motion：scroll narrative + 橫向膠卷輪播 + 進場 reveal。
- Q2 native 可達成：是。scroll-snap(CSS) 做膠卷；IntersectionObserver(輕量自寫 JS) 做進場。
- Q3：不需外部庫。
- Decision：**no external library**，原生 CSS + 輕量 JS（IntersectionObserver）。

## Tokens 擴充（加進 tokens.css，不破壞既有）
- `--stage-ink: #12141d`（= 既有 ink，語意別名）
- `--dusk: #2a1d4a`（暮光紫，氛圍底）
- `--spot: var(--color-accent)`（聚光燈 = lime）
- `--grain`：極淡 SVG 顆粒（opacity 0.04）
- 寬銀幕字距：標題 `letter-spacing: -0.02em`，eyebrow `0.18em`

## Entrance Map（≥4 種，fadeUp ≤2）
- Curtain-up(hero)：聚光圈 scale-in + 影像 clip mask（custom，CSS @keyframes，載入即播）
- Monologue：clip-wipe-up 逐行（fadeUp #1）
- Acts：序號 count/flip + 條目 slide-left（IO 觸發）
- Set pieces：zigzag alternate slide（左/右交錯，IO 觸發）
- Reel：無進場，scroll-snap 互動
- Curtain-call：fade-from-black（背景壓暗 + 文字浮現，fadeUp #2）

## 互動預算
- 1 重互動：橫向膠卷（scroll-snap + 拖曳慣性，CSS 為主）
- 2 注目 reveal：hero 聚光 scale-in、Acts 序號 flip
- 其餘從屬

## 結構（Svelte：/members/[slug]/+page.svelte）
1. `.stage-hero`（全幅出血、暗場、暮光徑向 + lime 聚光）
   - 右偏移主體影像（avatarKey→/img；無則漸層佔位 + 首字）
   - 左下寬銀幕落字：displayName(大) + venture.tagline + 角色/期別 pill
   - 細 letterbox 上下留白
2. `.monologue`（關於）：偏移大字引言 = bio
3. `.acts`（服務 kind='service'）：序號 01.. 水平條清單
4. `.setpieces`（產品 kind='product'）：zigzag 大圖文
5. `.reel`（膠卷）：橫向 scroll-snap，場景角標 01/N；圖源 imageKeys→/img，無則漸層場景
6. `.curtain-call`（CTA）：暗場置中，email / 官網 藥丸
- 回上層：`← 會員名錄`

## JS（輕量，放頁內 <script>）
- `onMount`：IntersectionObserver 對 `[data-reveal]` 加 `.in`；reduce-motion 直接全顯示。
- 膠卷：CSS scroll-snap 為主；可加左右箭頭 scrollBy（漸進增強）。

## 佔位圖策略（使用者選佔位）
- 無真實圖時用 CSS 漸層場景 + 大首字/emoji，色調走暮光→lime。
- 真實圖路徑：`/img/{key}`（既有 R2 端點）。

## Grid fallback test：通過（見 storyboard）。
## 品質檢查：hero≥3 視覺元素(影像/聚光/落字/letterbox)✓；進場 4 種✓；fadeUp 2 次✓；1 重互動✓。
