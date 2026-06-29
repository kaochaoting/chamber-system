# Phase 2 — Storyboard（會員品牌頁 /members/[slug]）

## Site cinematic grammar（站體電影文法）
- Shell logic：深藏青「劇場暗場」全幅舞台，內容是被聚光燈選中的單一主體。
- Navigation posture：沿用站體 sticky 玻璃 nav（保持站內一致），但品牌頁 hero 蓋到 nav 下、全幅出血。
- Framing discipline：寬銀幕感 — 大字距標題、左下/偏移落字、細的上下 letterbox 留白。
- Density cadence：spectacle(封面) → 呼吸(關於) → 資訊(服務幕次) → spectacle(產品膠卷) → 呼吸(輪播) → 決斷(CTA)。
- Recurring material：聚光燈徑向輝光(lime)、暮光紫藍漸層、細顆粒 grain、場景編號(01/02…)。

## One big idea
**「會員＝踏入聚光燈的表演者」**：整頁是一座舞台，把單一會員的品牌打在光圈裡，被看見、被選擇。

## Page scene thesis
這是電影的「個人獨白場」——燈暗下來，聚光燈打在一個人身上，觀眾（潛在客戶）安靜看他表演他的產品與服務。

## Hero dominance statement
封面用全幅暗場 + 偏移單主體影像 + 萊姆聚光徑向光，主體名字以寬銀幕大字壓在光圈邊緣 — 一眼就是「主角登場」，而非通用置中標語。

## Restraint statement
- 只用 1 個重互動（橫向膠卷輪播）。
- 不加多餘玻璃卡、不堆漸層；暮光與 grain 克制到「幾乎察覺不到」。
- 不沿用首頁置中 hero 與 3 卡矩陣（shell-ban）。

## Signature composition（本頁專屬，不可退化成網格）
**Spotlight Stage + Filmstrip（聚光燈舞台 + 橫向膠卷）**
- Hero：全幅暗場，右側偏移大幅主體影像被 lime 徑向光選中；左下角寬銀幕落字（會員名 + 一句 tagline）。
- 服務＝**幕次清單 Acts**：大號序號 01/02/03 + 服務名 + 描述，左序號右內容的水平條，非卡片網格。
- 產品＝**舞台道具 set pieces**：交錯（zigzag）大圖文，不是等寬卡。
- 照片輪播＝**膠卷 the reel**：橫向 scroll-snap，場景編號角標。
- CTA＝謝幕：暗場置中單句 + 藥丸（聯絡/官網）。

## 頁面敘事弧（beats，非 Hero→Features→CTA）
1. Curtain-up 開場：聚光燈封面（主角登場）
2. Monologue 獨白：關於這位會員（偏移大字引言 + 期別/角色印記）
3. The Acts 幕次：服務清單（編號水平條）
4. Set pieces 道具：產品（交錯大圖文）
5. The Reel 膠卷：照片輪播（橫向 snap）
6. Curtain-call 謝幕：聯絡 / 官網 CTA

## Entrance map（每區不同進場，≥4 種）
- Hero：聚光燈淡入（光圈 scale + 影像 mask-reveal）
- 獨白：大字逐行上移（clip-reveal，≤2 次 fadeUp 配額之一）
- 幕次：序號數字「翻牌」+ 條目左側滑入
- 產品：交錯左右滑入（zigzag alternate）
- 膠卷：橫向慣性滑動（無進場動畫，靠互動）
- 謝幕：暗場聚焦（背景壓暗 + 文字浮現）

## Grid fallback test
退化成卡片網格會失去：聚光主體、寬銀幕落字、幕次序號、膠卷橫滑 → 失去整個「舞台敘事」。構圖成立。

## 資料對應（D1 schema）
- 封面/獨白：profiles(displayName, bio, avatarKey 當主體影像), ventures(tagline)
- 幕次(服務)：products WHERE kind='service'
- 道具(產品)：products WHERE kind='product'
- 膠卷：products.imageKeys 彙整；無圖則用佔位漸層場景
- 謝幕：profiles.publicContact.email, ventures.websiteUrl
