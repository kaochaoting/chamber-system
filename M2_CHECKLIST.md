# M2 認證與邀請流程 — 完成清單

## ✅ 已實作

### 1. 使用者註冊流程（首頁 `/`）
- [x] 表單收集：姓名、信箱、密碼、邀請碼（可選）
- [x] 驗證邏輯
  - [x] 密碼長度最少 8 碼
  - [x] 邀請碼驗證（有效、未使用、未過期）
- [x] Better Auth 整合
  - [x] `auth.api.signUpEmail()` 建立帳號
- [x] 狀態轉換
  - [x] **邀請碼路徑**：`status = 'active'`，設定 `cohort`，消費邀請碼 → 重導 `/app`
  - [x] **無碼路徑**：`status = 'pending'` → 重導 `/pending`

### 2. 登入頁面（`/login`）
- [x] 表單：信箱 + 密碼
- [x] 呼叫 `/api/auth/sign-in/email` API
- [x] 成功後自動重導
  - [x] `status = 'active'` → `/app`
  - [x] `status = 'pending'` → `/pending`

### 3. 登出功能
- [x] `/app` 和 `/pending` 頁面的登出按鈕
- [x] 呼叫 `/api/auth/sign-out` POST
- [x] 成功後重導到 `/`

### 4. 守門邏輯（`src/lib/server/rbac.ts`）
- [x] `requireActive()` — 檢查登入且 `status = 'active'`，否則導向 `/login` 或 `/pending`
- [x] `requireRole()` — 檢查特定角色（member/mentor/assistant/admin）
- [x] `isStaff()` — 判斷是否為工作人員（assistant/admin）

### 5. Session 管理（`src/hooks.server.ts`）
- [x] 每次請求解析 session
- [x] 從 Better Auth 的 `getSession()` 取得 user 和 session
- [x] 存入 `event.locals` 供路由使用

### 6. 邀請碼管理（`src/lib/server/invites.ts`）
- [x] `validateInvite()` — 檢查有效、未使用、未過期
- [x] `consumeInvite()` — 標記已使用

### 7. 資料庫模式
- [x] `user` 表：id、email、name、role、**status**、**cohort**、createdAt、updatedAt
- [x] `session` 表：id、userId、token、expiresAt、ipAddress、userAgent
- [x] `account` 表：id、userId、accountId、providerId、accessToken、refreshToken
- [x] `verification` 表：id、identifier、value、expiresAt
- [x] `invites` 表：code、cohort、createdBy、**usedBy**、expiresAt
- [x] Seed 資料：KLU-115-WELCOME（115 期，無到期）

### 8. 頁面路由
| 路由 | 狀態要求 | 用途 |
|------|---------|------|
| `/` | 無 | 首頁 + 註冊表單 |
| `/login` | 無 | 登入表單 |
| `/app` | `active` | 會員區域 |
| `/pending` | 任何已登入 | 待核准頁面 |
| `/api/auth/[...rest]` | — | Better Auth API 代理 |

---

## 🔄 登錄流程圖

```
未登入者
├─ 訪問 / （首頁）
│  ├─ 帶邀請碼 KLU-115-WELCOME 註冊
│  │  ├─ Better Auth 建立帳號
│  │  ├─ status = active, cohort = 115
│  │  ├─ 消費邀請碼
│  │  └─ 重導 /app ✅
│  └─ 不帶邀請碼註冊
│     ├─ Better Auth 建立帳號
│     ├─ status = pending（預設）
│     └─ 重導 /pending ⏳
│
├─ 訪問 /login（登入頁）
│  ├─ 輸入信箱 + 密碼
│  ├─ 呼叫 /api/auth/sign-in/email
│  └─ 根據 status 重導 /app 或 /pending
│
└─ 訪問受保護路由（/app）
   └─ hooks.server.ts 驗證 session
      ├─ 無 session → 重導 /login
      └─ status ≠ active → 重導 /pending

已登入者
├─ /app（status = active）
│  └─ 點擊登出 → /api/auth/sign-out → / ✅
└─ /pending（status = pending）
   └─ 點擊登出 → /api/auth/sign-out → / ⏳
```

---

## 📋 環境與依賴

- **Better Auth**：v1.6.22（Email/密碼 + Google OAuth 可選）
- **Drizzle ORM**：v0.45.2（D1 SQLite 適配）
- **SvelteKit**：v2.68.0 + Cloudflare Adapter
- **本機 D1**：`.wrangler/state/v3/d1`（已建立）

---

## 🧪 測試清單

待 404 問題修復後，以下流程應該可驗證：

- [ ] **場景 1**：帶邀請碼 `KLU-115-WELCOME` 註冊
  - [ ] 表單提交成功
  - [ ] 自動進入 `/app`
  - [ ] 頁面顯示 `status = active`
  - [ ] 邀請碼已消費（DB 中 `usedBy` 不為 null）

- [ ] **場景 2**：不帶邀請碼註冊
  - [ ] 表單提交成功
  - [ ] 重導到 `/pending`
  - [ ] 頁面顯示等待核准狀態

- [ ] **場景 3**：登入已註冊帳號
  - [ ] `/login` 頁面可訪問
  - [ ] 輸入信箱 + 密碼成功
  - [ ] 根據 status 重導正確頁面

- [ ] **場景 4**：登出
  - [ ] `/app` 和 `/pending` 的登出按鈕正常
  - [ ] 登出後重導到 `/`
  - [ ] Session 被清除

---

## 📝 改動清單

| 檔案 | 改動 | 理由 |
|------|------|------|
| `src/routes/login/+page.svelte` | 新建 | Better Auth 登入頁面 |
| `src/lib/server/invites.ts` | 修復型別 | 移除無效的 DB 型別引入 |
| `src/routes/app/+page.svelte` | 改進登出 | 改為 fetch 而非表單提交 |
| `src/routes/pending/+page.svelte` | 改進登出 | 改為 fetch 而非表單提交 |

---

## ⚠️ 已知限制

1. **404 問題**（M1 遺留）
   - 首頁在 wrangler dev/Vite dev 中返回 404
   - 原因：SvelteKit 路由系統或 Cloudflare adapter 初始化
   - 影響：無法在本機測試上述流程
   - 後續：可在 M3 或整合測試時修復

2. **Google OAuth**（選用）
   - 已預留 schema + auth 配置
   - 需要在 .dev.vars 中設定 `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
   - 本輪未實作前端整合

---

## 📌 M3 預計工作

- [ ] 修復 404 問題，驗證上述流程
- [ ] 後台核准邏輯（admin 升級 pending → active）
- [ ] Google OAuth 前端整合
- [ ] 密碼重設流程
- [ ] 二次驗證（可選）
