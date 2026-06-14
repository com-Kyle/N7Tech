CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT NOT NULL,
  project_details TEXT NOT NULL,
  scheduled_start TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes IN (30, 60)),
  notification_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (notification_status IN ('pending', 'sent', 'failed')),
  requested_ip_hash TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx
  ON quote_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS quote_requests_schedule_idx
  ON quote_requests(scheduled_start);

CREATE INDEX IF NOT EXISTS quote_requests_ip_idx
  ON quote_requests(requested_ip_hash, created_at DESC);
