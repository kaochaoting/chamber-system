-- 種子資料（產業、分類、邀請碼）
-- 套用：wrangler d1 execute chamber-db --local --file=./scripts/seed.sql
--       （正式環境改 --remote）

INSERT OR IGNORE INTO industries (name, slug) VALUES
  ('餐飲食品', 'food-beverage'),
  ('文創設計', 'creative-design'),
  ('數位服務', 'digital-services'),
  ('教育顧問', 'education-consulting'),
  ('零售電商', 'retail-ecommerce'),
  ('生活服務', 'lifestyle-services');

INSERT OR IGNORE INTO categories (name, slug) VALUES
  ('課程公告', 'announcements'),
  ('學員故事', 'member-stories'),
  ('產業觀察', 'industry-insights');

-- 開通用邀請碼（115 期，無到期）。實務上請於後台動態產生。
INSERT OR IGNORE INTO invites (code, cohort, expires_at) VALUES
  ('KLU-115-WELCOME', '115', NULL);

-- ── 建立管理員 ─────────────────────────────────────────────
-- 密碼需經 Better Auth 雜湊，無法用純 SQL 建立。流程：
-- 1) 先到 /register 用你的信箱註冊（會是 pending）
-- 2) 執行下列語句把該帳號升級為 admin + active：
--    （把 you@example.com 換成你的信箱）
-- UPDATE user SET role = 'admin', status = 'active', cohort = '115'
-- WHERE email = 'you@example.com';
