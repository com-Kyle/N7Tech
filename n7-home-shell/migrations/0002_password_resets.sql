PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS password_resets (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  requested_ip_hash TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS password_resets_user_id_idx ON password_resets(user_id);
CREATE INDEX IF NOT EXISTS password_resets_expires_at_idx ON password_resets(expires_at);
