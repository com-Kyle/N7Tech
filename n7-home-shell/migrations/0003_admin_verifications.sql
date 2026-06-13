PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS admin_verifications (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS admin_verifications_user_id_idx ON admin_verifications(user_id);
CREATE INDEX IF NOT EXISTS admin_verifications_expires_at_idx ON admin_verifications(expires_at);

DELETE FROM admin_invites
WHERE email IN ('n7dpagan@gmail.com', 'n7kpierce@gmail.com') AND used_at IS NULL;
