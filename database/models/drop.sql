BEGIN;

-- DROP ALL TABLES

DROP TRIGGER IF EXISTS update_users_modtime ON users;
DROP TRIGGER IF EXISTS update_products_modtime ON products;

-- Drop trigger function
DROP FUNCTION IF EXISTS update_timestamp();

-- Drop tables (in reverse order of dependency)
DROP TABLE IF EXISTS transaction_items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS product_comments CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

COMMIT;