# 圖片編輯與放置指南（高創坊）

本文件說明高創坊各頁面「如何放圖、放在哪、建議尺寸」。

## 圖片怎麼進到系統

圖片不直接存資料庫，而是存到 Cloudflare R2 物件儲存，資料庫只存「金鑰(key)」。

```
上傳 → POST /api/upload (multipart, 欄位名 file) → 回傳 { key, url }
顯示 → GET /img/{key}
```

- 限制：JPEG / PNG / WebP / GIF，單檔 ≤ 5MB（見 src/routes/api/upload/+server.ts）。
- 需登入才能上傳。
- 取得的 `key` 會寫進對應欄位（見下表），頁面再用 `/img/{key}` 顯示。

## 各欄位對應與建議尺寸

| 位置 | 資料欄位 | 用途 | 建議尺寸 | 比例 | 備註 |
|---|---|---|---|---|---|
| 會員頭像 / 品牌頁主體 | `profiles.avatar_key` | 名錄頭像、品牌頁封面聚光主體 | 800 × 1000 px | 4:5（直） | 主體置中，背景單純效果最好 |
| 創業 Logo | `ventures.logo_key` | 創業標誌（保留欄位） | 512 × 512 px | 1:1 | 透明底 PNG 佳 |
| 產品 / 作品圖 | `products.image_keys[]` | 品牌頁「產品交錯」大圖、產品服務頁海報 | 1200 × 900 px | 4:3 | 陣列，可多張；第一張為主圖 |
| 品牌膠卷輪播 | `products.image_keys[]` 彙整 | 品牌頁底部橫向輪播 | 1280 × 800 px | 16:10 | 所有產品的圖會合併成膠卷 |
| 最新消息封面（未來） | `posts` 內文 | 文章配圖 | 1200 × 630 px | 1.91:1 | 同 OG 分享圖比例 |

### 共通建議
- 一律壓到 ≤ 5MB；建議先轉 **WebP**，畫質好又小。
- 重要主體請置中，因為各區塊會以 `object-fit: cover` 裁切。
- 沒有圖時系統會自動以「暮光漸層佔位場景」呈現，版面不會破。

## 哪些頁面會用到圖片

- `/members`（會員名錄）：頭像
- `/members/[slug]`（會員品牌頁）：封面主體、產品交錯圖、膠卷輪播
- `/directory`（產品與服務）：創業海報（目前用佔位漸層，放了圖會自動替換）
- `/news/[slug]`（消息單篇）：未來文章配圖

## 目前狀態與待辦
- ✅ 上傳 API（/api/upload）與取圖 API（/img/[key]）已就緒、接真實 R2。
- ✅ 頁面已支援「有圖顯示圖、無圖顯示佔位」。
- ⏳ 個人資料表單尚未加「上傳頭像／產品圖」的 UI 欄位。下一步可在
  `src/routes/(app)/app/profile/+page.svelte` 加上 `<input type="file">` 串接 `/api/upload`，
  並把回傳 key 寫入 `profiles.avatar_key`。
- ⏳ 產品 / 創業的新增編輯介面（/app/ventures）屬 V1，尚未建置。

## 開發者：在頁面放一張圖

```svelte
<!-- key 來自資料庫欄位；無 key 時給佔位 -->
{#if avatarKey}
  <img src={`/img/${encodeURIComponent(avatarKey)}`} alt="..." />
{:else}
  <div class="placeholder">...</div>
{/if}
```
