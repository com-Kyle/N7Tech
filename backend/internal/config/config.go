package config

import (
	"fmt"
	"os"
	"strings"
)

// Config holds all runtime configuration, loaded once at boot from the
// environment. Mirrors the ContractorPod convention: required keys fail
// Load() loudly; optional keys fall back to documented defaults so the
// backend boots in a bare dev environment.
type Config struct {
	// Port the HTTP server listens on. Defaults to 8080.
	Port string
	// DatabaseURL is the Postgres DSN. Required.
	DatabaseURL string
	// FrontendOrigin is the single allowed CORS origin (the Next.js app).
	// Defaults to http://localhost:3000.
	FrontendOrigin string
	// PublicDomain is the apex domain, used for cookie scoping + absolute
	// URLs. Defaults to localhost:3000.
	PublicDomain string
	// SessionSecret signs session cookies. Required in non-dev; falls back
	// to a dev-only constant when AppEnv != "production".
	SessionSecret string
	// AppEnv is "development" (default) or "production".
	AppEnv string
	// TrustedProxies is the CIDR allow-list for X-Forwarded-For. Defaults to
	// loopback only. Set TRUSTED_PROXIES=cidr1,cidr2 to widen for prod LBs.
	TrustedProxies []string
	// ResendAPIKey enables lead-notification email via Resend. Optional — when
	// empty the lead handler persists the row and skips the email silently.
	ResendAPIKey string
}

const devSessionSecret = "dev-insecure-session-secret-change-me"

// Load reads the environment into a Config, applying defaults and validating
// required keys. Returns an error listing every missing required key.
func Load() (*Config, error) {
	cfg := &Config{
		Port:           envOr("PORT", "8080"),
		DatabaseURL:    os.Getenv("DATABASE_URL"),
		FrontendOrigin: envOr("FRONTEND_ORIGIN", "http://localhost:3000"),
		PublicDomain:   envOr("NEXT_PUBLIC_PUBLIC_DOMAIN", "localhost:3000"),
		SessionSecret:  os.Getenv("SESSION_SECRET"),
		AppEnv:         envOr("APP_ENV", "development"),
		TrustedProxies: splitCSV(envOr("TRUSTED_PROXIES", "127.0.0.1/32,::1/128")),
		ResendAPIKey:   os.Getenv("RESEND_API_KEY"),
	}

	var missing []string
	if cfg.DatabaseURL == "" {
		missing = append(missing, "DATABASE_URL")
	}

	// SESSION_SECRET is required in production; dev gets a loud fallback.
	if cfg.SessionSecret == "" {
		if cfg.AppEnv == "production" {
			missing = append(missing, "SESSION_SECRET")
		} else {
			cfg.SessionSecret = devSessionSecret
		}
	}

	if len(missing) > 0 {
		return nil, fmt.Errorf("config: missing required env: %s", strings.Join(missing, ", "))
	}
	return cfg, nil
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func splitCSV(s string) []string {
	var out []string
	for _, part := range strings.Split(s, ",") {
		if p := strings.TrimSpace(part); p != "" {
			out = append(out, p)
		}
	}
	return out
}
