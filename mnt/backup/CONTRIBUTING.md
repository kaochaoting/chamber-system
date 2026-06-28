# 貢獻指南 Contributing

感謝你願意參與商會系統。本專案以「文件先於程式、決策留下記錄」為原則，讓系統能逐步完善而不遺失脈絡。

## 開始之前

1. 閱讀 [`docs/README.md`](./docs/README.md) 了解文件治理與 ADR 機制。
2. 對應你要做的事，先讀 [`docs/PRD.md`](./docs/PRD.md)、[`docs/SSD.md`](./docs/SSD.md) 或 [`docs/BUILD_MANIFEST.md`](./docs/BUILD_MANIFEST.md)。
3. 開發環境設定見 [README 快速開始](./README.md#快速開始)。

## 工作流程

1. **開 issue**：先描述問題或提案，取得共識再動工。
2. **開分支**：`feat/簡述`、`fix/簡述`、`docs/簡述`。
3. **小步提交**：一個 PR 聚焦一件事，對應 BUILD_MANIFEST 的一個項目為佳。
4. **發 PR**：說明動機與做法；通過 CI（lint + build）後由維護者審閱。

## 提交訊息（Conventional Commits）

```
feat: 新增成員公開頁 Schema 輸出
fix: 修正未登入可進入 /app 的守門漏洞
docs: 更新 SSD 註冊閘門流程
chore: 升級 wrangler
```

## 決策要留記錄

任何**有取捨**的技術或產品決策（選型、資料結構、權限規則變更），請在 `docs/adr/` 新增一筆 ADR（背景→決策→後果→替代方案）。推翻舊決策時，新增 ADR 並把舊的標為 `Superseded by ADR-NNNN`，**不刪改既有 ADR**。

## 程式規範

- TypeScript；遵循專案 lint/format 設定。
- 設計上的色彩與字體一律引用 [`tokens.css`](./src/lib/styles/tokens.css) 變數，不硬編。
- 安全底線：輸入伺服器端驗證；機密走 secrets/`.dev.vars`，**永不入 git**；內容可見性於查詢階段過濾。
- 完成定義（DoD）以 BUILD_MANIFEST 對應項目為準。

## 安全問題回報

涉及帳號、權限或資料外洩的弱點，請**私下**聯繫維護者，勿直接開公開 issue。

## 行為準則

以善意、尊重、就事論事為原則。這是一個服務同學與社群的專案，協作品質本身就是產品的一部分。
