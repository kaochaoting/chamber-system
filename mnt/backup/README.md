# 商會系統 Chamber System

> 勞工大學創新創業專班的雙層商會系統：**對內封閉信任 × 對外開放索引**。
> 品牌北極星：**不只讓人看見你，而是讓人選擇你。**

開源、可被其他社群與屆別複用。以 SvelteKit 建構，部署於 Cloudflare 邊緣。

---

## 功能總覽

- **身分**：成員建立個人與創業檔案；公開／私密欄位分流。
- **對外展示**：可被搜尋的成員型錄與產品服務，含 Schema.org 結構化資料。
- **對內交流**：內部論壇、互通有無看板、完整名錄、勞大資訊。
- **互鏈背書**：商會 ↔ 成員 ↔ 成員的信任外溢與反向鏈結。
- **治理**：會員審核、角色權限、內容管理、操作軌跡。

## 技術棧

| 層 | 選型 |
|---|---|
| 框架 | SvelteKit |
| 部署 | Cloudflare Workers（`@sveltejs/adapter-cloudflare`） |
| 資料庫 | Cloudflare D1（SQLite） + Drizzle ORM |
| 驗證 | Better Auth（Email/密碼 + Google） |
| 儲存 | R2（圖片）、KV（快取，選用） |

決策理由見 [`docs/adr`](./docs/README.md#決策日誌adr-log)。

## 文件導覽

| 文件 | 內容 |
|---|---|
| [`docs/PRD.md`](./docs/PRD.md) | 產品需求：做什麼、為誰、成功指標 |
| [`docs/SSD.md`](./docs/SSD.md) | 系統設計：架構、資料、API、安全、部署 |
| [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) | 設計系統：色彩、字體、元件 |
| [`docs/BUILD_MANIFEST.md`](./docs/BUILD_MANIFEST.md) | CODEX 逐檔開工清單 |
| [`docs/README.md`](./docs/README.md) | 文件治理與 ADR 決策日誌 |

## 快速開始

> 先用官方 CLI scaffold（自動安裝相容的 adapter 與 wrangler），再覆蓋本 repo 的設定檔。

```bash
# 1) 建立 SvelteKit 專案（選 TypeScript、Svelte 5）
npx sv create chamber-system
cd chamber-system

# 2) 安裝 Cloudflare adapter 與本專案相依
npm i -D @sveltejs/adapter-cloudflare wrangler @cloudflare/workers-types drizzle-kit
npm i drizzle-orm better-auth

# 3) 用本 repo 提供的設定檔覆蓋：
#    wrangler.jsonc / svelte.config.js / drizzle.config.ts
#    src/app.html / src/app.d.ts / src/lib/styles/tokens.css

# 4) 建立 Cloudflare 資源並把 id 填回 wrangler.jsonc
npx wrangler d1 create chamber-db
npx wrangler r2 bucket create chamber-assets
npx wrangler kv namespace create KV

# 5) 本機機密：複製 .env.example，填入後存成 .dev.vars（勿入 git）
cp .env.example .dev.vars

# 6) 產生並套用資料庫遷移
npm run db:generate
npm run db:migrate:local

# 7) 開發
npm run dev
```

### 建議的 package.json scripts

```jsonc
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "wrangler dev",
    "deploy": "npm run build && wrangler deploy",
    "db:generate": "drizzle-kit generate",
    "db:migrate:local": "wrangler d1 migrations apply chamber-db --local",
    "db:migrate:remote": "wrangler d1 migrations apply chamber-db --remote",
    "db:studio": "drizzle-kit studio"
  }
}
```

## 專案結構

```
chamber-system/
├── docs/                  規劃文件（PRD/SSD/Design/Manifest/ADR）
├── migrations/            Drizzle 產生的 D1 遷移
├── src/
│   ├── app.html           HTML 殼（lang=zh-Hant）
│   ├── app.d.ts           App.Locals / App.Platform 型別
│   ├── hooks.server.ts    session 解析、守門、noindex（M2）
│   ├── lib/
│   │   ├── server/        db / auth / rbac / invites / r2 / seo
│   │   ├── components/    UI 元件
│   │   └── styles/        tokens.css
│   └── routes/            對外 / 驗證 / (app) / (admin)
├── wrangler.jsonc
├── svelte.config.js
└── drizzle.config.ts
```

## 授權

[MIT](./LICENSE)。歡迎複用與貢獻，詳見 [CONTRIBUTING](./CONTRIBUTING.md)。
