# 高創坊 khubs.net — 專案現況（v1.0）

高雄勞工大學創新創業專班的雙層商會系統：對內封閉信任 × 對外開放索引。
北極星：不只讓人看見你，而是讓人選擇你。

## 技術棧
- SvelteKit（Svelte 5）+ `@sveltejs/adapter-cloudflare`
- Cloudflare Pages（專案 `khubs`，GitHub master 自動部署）
- D1（Drizzle ORM）｜R2（圖片）｜KV
- Better Auth（**統一 Google 登入**）

## 功能總覽
### 對外（可索引）
- 首頁、會員名錄 `/members`、會員品牌頁 `/members/[slug]`（電影感聚光燈版面）
- 產品與服務 `/directory`、最新消息 `/news`、`/news/[slug]`
- 隱私權政策 `/privacy`、`sitemap.xml`、`robots.txt`、JSON-LD

### 驗證與閘門
- 統一 Google 登入（已停用帳密）；新帳號預設 pending，後台審核
- Google 同 email 自動連結；`/join?ref=` 邀請連結（App 內建瀏覽器落地頁處理）
- RBAC 守門：`/app`、`/admin` 需登入／權限

### 對內（會員限定）
- 個人資料（頭像上傳、5 社群欄位、公開／私密分流）
- 創業與產品（品牌 Logo、產品／服務、品牌膠卷多圖、5 社群欄位）
- 內部論壇（討論串＋留言）、互通有無（供需看板）、完整名錄（含內部聯絡方式）
- 邀請與推薦（專屬連結＋推薦文範例＋推薦名單）

### 後台治理
- 會員審核／角色／**使用者分類（主辦單位／學員／會員）**／停權
- 內容管理（發佈／上下架／刪除）
- 操作軌跡 audit_logs

## 資料模型（D1 主要表）
user（含 role/status/category/cohort/referred_by）、account、session、profiles、
ventures（logo/gallery/socials）、products、posts、comments、board_items、
industries、categories、audit_logs、invites（保留未用）。

## 圖片
- 上傳 `POST /api/upload` → R2；顯示 `GET /img/[key]`；扁平金鑰。
- 建議尺寸見 `docs/IMAGE_GUIDE.md`。

## 資料安全
- 見 `docs/DATA_SAFETY.md`：D1 Time Travel（30 天）＋手動快照＋只做加法遷移。
- 已有真實使用者，禁止破壞性遷移。

## 管理員
- 高兆廷 kaochaoting.me@gmail.com（admin／active）。

## 部署
- push 到 GitHub master → Pages 自動建置部署。
- 或 `npm run deploy`（wrangler pages deploy）。
- 機密設於 Pages 專案設定：BETTER_AUTH_SECRET、BETTER_AUTH_URL、GOOGLE_CLIENT_ID/SECRET。
