# Phase 1 — Decisions（高創坊 會員品牌頁）

## 起手式 / 設定（來自使用者）
- 起手式：以 Astra 模板逆向
- 圖片：先用佔位圖
- 電影語言：由 AI 配置
- Niche：創新創業社群商會的「會員品牌頁」(member brand mini-site)
- 頁面骨架需求：封面 hero → 照片輪播 → 產品區 → 服務區 → 聯絡/CTA

## Astra 結構參考（逆向，非照抄）
- 參考模板：`archmasters-architecture-02`（建築事務所）
- 借用的「品質維度」而非整段構圖：
  - 多區獨立頁骨架：Home(封面) / About / Services / Portfolio(作品=產品) / Contact
  - 大幅 hero 影像 + 編輯式大標題
  - 作品集＝會員的「產品/案件」；服務清單＝會員的「服務」
- 不照抄：不沿用它的置中淺色編輯風，改注入電影語言。

## 導演 / 電影
- 導演：Damien Chazelle
- 電影：La La Land《樂來越愛你》(2016)
- 研究來源：Wikipedia（攝影 Linus Sandgren，奧斯卡最佳攝影）；已知攝影語言。
- 擷取的電影訊號（cinematic signals）：
  1. CinemaScope 2.55:1 寬銀幕單主體構圖
  2. 暗場中的聚光燈池（spotlight pool）— 主體被光選中
  3. 飽和強調色對比夜色/暮光（saturated accent vs dusk）
  4. magic-hour 暮光輝光、城市夜空
  5. 連續運鏡、橫向掃過的場景（長鏡頭舞台調度）
- 為何契合：高創坊北極星「不只讓人看見你，而是讓人選擇你」＝每位會員踏入自己的**聚光燈舞台**被看見、被選擇。深夜藏青＝劇場暗場，萊姆綠＝聚光燈束。

## 電影語言 → 網頁轉譯
| 電影訊號 | 網頁轉譯 |
|---|---|
| CinemaScope 寬銀幕 | hero 採寬幅單主體、左下角落字（offset），非置中 |
| 聚光燈池 | 深藏青舞台上的萊姆徑向輝光，主體影像被光圈選中 |
| 飽和色對比夜色 | 既有 navy #12141d × lime #d2ff28，加暮光紫藍漸層做氛圍底 |
| 橫向掃過場景 | 照片輪播＝「一卷膠卷 the reel」，橫向滑動 + 場景編號 |
| 舞台幕次 | 服務＝幕次(Acts)編號清單；產品＝舞台道具(set pieces)卡 |

## 色彩 token（沿用 + 暮光擴充）
- 舞台暗場 ink：`#12141d`（既有）
- 聚光燈 accent：`#d2ff28` 萊姆（既有）
- 暮光氛圍：deep violet `#2a1d4a` → navy 漸層（僅用於 hero/區塊氛圍底，克制）
- 字體：Poppins（既有，標題加大、加寬字距做寬銀幕感）

## Previous-work audit（同使用者前作）
前作 = khubs web-agency 改版，其 shell 特徵：
- sticky 毛玻璃置中 nav
- 置中深色 hero（標題置中 + 雙藥丸 CTA + 數據行）
- 白底「3 卡 features」
- 卡片網格名錄/產品

## Shell-ban list（本次會員品牌頁禁用，避免與前作雷同）
- 禁：置中 hero（標題置中）
- 禁：白底 3 卡 features 矩陣當主結構
- 禁：等寬卡片網格當主構圖
- 禁：與首頁相同的「置中標題 + 數據行」開場

## Primary composition family
- **Full-bleed stage（全幅聚光燈舞台）** — 與首頁的「置中 slab」明顯不同。
- 會員品牌頁採「舞台 + 橫向膠卷」：單主體偏移構圖、橫向輪播、幕次式服務清單。

## Grid fallback test
若把會員品牌頁退化成通用卡片網格，會失去：聚光燈主體、寬銀幕落字、膠卷橫滑、幕次編號的「舞台敘事」——失去的很多，故構圖成立。
