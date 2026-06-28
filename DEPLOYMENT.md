# 高創坊 (khubs.net) 部署指南

## 概述
高創坊系統已準備就緒，可部署至Cloudflare Pages (khubs.net)。

## 部署方式

### 方式 1：Cloudflare Pages GitHub集成（推薦）

此方式最簡單且支持自動部署：

1. **在Cloudflare儀表板中：**
   - 訪問 https://dash.cloudflare.com
   - 選擇 "Pages" 部分
   - 點擊 "連接到Git" → "GitHub"
   - 授權Cloudflare訪問GitHub
   - 選擇 `kaochaoting/chamber-system` 倉庫
   - 配置構建設置：
     - 框架預設：Vite
     - 構建命令：`npm run build`
     - 構建輸出目錄：`.svelte-kit/cloudflare`
     - Node.js版本：20.x
   - 點擊 "部署站點"

2. **關聯自定義域：**
   - 在Pages項目中選擇 "自定義域"
   - 輸入 `khubs.net`
   - Cloudflare自動配置DNS

**優勢：**
- ✅ 每次push到master自動部署
- ✅ 無需在本地運行部署命令
- ✅ 自動HTTPS
- ✅ 支持環境變量配置

### 方式 2：使用wrangler CLI手動部署

適合本地開發或CI/CD管道：

1. **設置認證：**
   ```bash
   npx wrangler login
   ```
   或設置環境變量：
   ```bash
   $env:CLOUDFLARE_API_TOKEN = "your-api-token"
   ```

2. **構建並部署：**
   ```bash
   npm run build
   npx wrangler pages deploy .svelte-kit/cloudflare
   ```

3. **配置域名（如果首次部署）：**
   ```bash
   # Cloudflare Pages會提示配置自定義域
   ```

### 方式 3：使用GitHub Actions CI/CD（企業級）

創建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: khubs
          directory: .svelte-kit/cloudflare
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

然後在GitHub Secrets中添加：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 環境變量配置

在Cloudflare Pages儀表板中配置以下環境變量（如需要）：

```
# Production
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=https://khubs.net
```

## 部署後驗證

部署完成後，驗證以下功能：

1. **主頁訪問**
   ```
   https://khubs.net/
   ```

2. **登入功能**
   - 訪問 https://khubs.net/login
   - 使用 demo@khubs.net / demo1234

3. **會員名錄**
   - 訪問 https://khubs.net/members

4. **後台管理**
   - 登入後訪問 https://khubs.net/admin
   - 查看會員管理、內容管理、邀請碼管理

## 故障排除

### 構建失敗

如果部署失敗，檢查以下項目：

1. **Node.js版本**
   - 確保使用Node.js 18+
   ```bash
   node --version
   ```

2. **依賴項**
   ```bash
   npm ci
   npm audit fix
   ```

3. **構建輸出**
   ```bash
   npm run build
   ls -la .svelte-kit/cloudflare/
   ```

### 域名配置

如果khubs.net無法訪問：

1. 檢查Cloudflare DNS設置
2. 確保Pages項目已綁定域名
3. 清除瀏覽器快取 (Ctrl+Shift+Delete)

### 功能問題

如果功能無法工作：

1. 檢查瀏覽器控制台（F12 → 控制台）
2. 查看網路請求（F12 → 網路）
3. 檢查Cloudflare Pages日誌

## 回滾

如果部署出現問題，可以快速回滾：

1. 在Cloudflare Pages儀表板中
2. 選擇先前的部署
3. 點擊 "回滾到此版本"

## 性能優化

### Cloudflare Worker優化

在wrangler.toml中添加：

```toml
[build]
cwd = "."
command = "npm run build"
watch_paths = ["src/**/*.{js,ts,svelte}"]

[env.production]
routes = [
  { pattern = "khubs.net/*", zone_name = "khubs.net" }
]
```

### 快取策略

在Cloudflare儀表板配置：

1. 設置頁面規則以快取靜態資源
2. 設置瀏覽器快取TTL為30天
3. 啟用自動最小化和壓縮

## 監控和日誌

### 啟用詳細日誌

```bash
npx wrangler pages deploy .svelte-kit/cloudflare --verbose
```

### 查看部署日誌

在Cloudflare Pages儀表板中：
- 選擇項目 → "部署" 選項卡
- 點擊任何部署以查看詳細日誌

## 支援

如有問題，請參考：

- Cloudflare Pages文檔：https://developers.cloudflare.com/pages/
- SvelteKit適配器：https://kit.svelte.dev/docs/adapter-cloudflare
- wrangler命令：https://developers.cloudflare.com/workers/wrangler/commands/

---

**當前狀態：** ✅ 已構建，準備部署

**最後更新：** 2026-06-29
