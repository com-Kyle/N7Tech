ALTER TABLE users ADD COLUMN account_category TEXT
  CHECK (account_category IN ('client', 'homeowner', 'contractor'));

ALTER TABLE users ADD COLUMN admin_verified INTEGER NOT NULL DEFAULT 0
  CHECK (admin_verified IN (0, 1));

UPDATE users
SET account_category = CASE
  WHEN auth_provider IN ('google', 'github') THEN 'client'
  ELSE account_type
END
WHERE account_category IS NULL;

UPDATE users
SET admin_verified = 1
WHERE role = 'admin';

CREATE INDEX IF NOT EXISTS users_account_category_idx ON users(account_category);
CREATE INDEX IF NOT EXISTS users_admin_verified_idx ON users(admin_verified);
