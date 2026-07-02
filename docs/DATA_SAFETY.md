# 資料安全與備份政策（高創坊）

> 已有真實使用者註冊使用。**後續任何優化／修改，都不得遺失或刪除使用者資料。**

## 一、資料存在哪
- 使用者與業務資料：**Cloudflare D1** 資料庫 `chamber-db`（id `c9b301c3-332f-4b28-b869-c87009fbe1f6`）。
- 圖片：**Cloudflare R2** `chamber-assets`（資料庫只存 key）。
- 部署程式碼與資料**完全分離**：改程式、重新部署 **不會** 動到 D1／R2 的資料。

## 二、三道防線
1. **D1 Time Travel（自動）**：Cloudflare D1 自動保留最近 **30 天**的變更，可還原到任一時間點。這是最重要的保命符，誤刪也能救回。
2. **手動快照（定期）**：見下方「如何備份」。含個資，存本機／私有空間，**不進公開 GitHub**。
3. **程式版本紀錄**：所有程式碼在 GitHub `kaochaoting/chamber-system`，每次改動都有 commit，可回溯。

## 三、遷移鐵則（避免弄丟資料）
- ✅ **只做「加法」遷移**：`ALTER TABLE ... ADD COLUMN`（新欄位給預設值或允許 NULL）。
- ❌ **禁止** `DROP TABLE`、`DROP COLUMN`、`DELETE FROM`（無 WHERE）、重建資料表。
- ❌ **禁止** 在正式庫跑 `drizzle-kit push`（可能重建表）。要改結構就手寫 `ALTER TABLE`。
- 改結構前，先跑一次手動備份（下方）。
- 清理資料（如刪示範帳號）務必：先備份 → 用精確 WHERE → 先在查詢確認筆數再刪。

## 四、如何備份（手動快照）
方式 A：Cloudflare 儀表板（最簡單）
- Dashboard → Workers & Pages → D1 → `chamber-db` → 匯出（Export）→ 下載 SQL。

方式 B：wrangler CLI（需具 D1 權限的 API Token）
```bash
wrangler d1 export chamber-db --remote --output backups/khubs-$(date +%Y%m%d).sql
```
> 備份檔一律放 `backups/`（已在 .gitignore，不會上傳）。

## 五、如何還原
- **誤刪／誤改（30 天內）**：用 D1 Time Travel 還原到事故前的時間點（Dashboard 或 `wrangler d1 time-travel`）。
- **從 SQL 快照還原**：`wrangler d1 execute chamber-db --remote --file=backups/檔名.sql`。

## 六、隱私
- GitHub repo 為 **公開**。使用者資料（email、電話等個資）**絕不可** commit。
- `.dev.vars`、`.env`、`backups/` 皆已在 `.gitignore`。
- 機密（BETTER_AUTH_SECRET、GOOGLE_CLIENT_ID/SECRET）只存在 Cloudflare Pages 專案設定，不在程式碼裡。
