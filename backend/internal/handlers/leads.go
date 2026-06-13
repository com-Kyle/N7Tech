package handlers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
	"unicode/utf8"

	"github.com/dpagan117/n7technologies/backend/internal/db/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// maxFieldLen caps each inbound text field to keep abusive payloads bounded.
const maxFieldLen = 5000

// notifyTo is the inbox that receives a lead-notification email when Resend is
// configured.
const notifyTo = "n7dpagan@gmail.com"

// rate-limit window: 5 submissions per IP per 10 minutes.
const (
	rateLimitMax    = 5
	rateLimitWindow = 10 * time.Minute
)

// LeadHandler persists inbound contact/early-access submissions and, when
// Resend is configured, fires a best-effort notification email.
type LeadHandler struct {
	db           *gorm.DB
	resendAPIKey string

	mu   sync.Mutex
	hits map[string][]time.Time // clientIP -> recent submission timestamps
}

func NewLeadHandler(db *gorm.DB, resendAPIKey string) *LeadHandler {
	return &LeadHandler{
		db:           db,
		resendAPIKey: resendAPIKey,
		hits:         make(map[string][]time.Time),
	}
}

// leadInput is the public submission shape. Website is the honeypot field —
// real users never see it, so any non-empty value marks a bot.
type leadInput struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Company string `json:"company"`
	Message string `json:"message"`
	Source  string `json:"source"`
	Website string `json:"website"` // honeypot
}

// Create handles POST /api/leads.
func (h *LeadHandler) Create(c *gin.Context) {
	var in leadInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	// Honeypot: a filled `website` field means a bot. Return success so the bot
	// gets no signal, but never persist.
	if strings.TrimSpace(in.Website) != "" {
		c.JSON(http.StatusCreated, gin.H{"ok": true})
		return
	}

	// Light per-IP rate limit before any DB work.
	if !h.allow(c.ClientIP()) {
		c.JSON(http.StatusTooManyRequests, gin.H{"error": "too many submissions, please try again later"})
		return
	}

	name := capLen(strings.TrimSpace(in.Name))
	email := capLen(strings.TrimSpace(in.Email))
	company := capLen(strings.TrimSpace(in.Company))
	message := capLen(strings.TrimSpace(in.Message))
	source := capLen(strings.TrimSpace(in.Source))

	if email == "" || !strings.Contains(email, "@") {
		c.JSON(http.StatusBadRequest, gin.H{"error": "a valid email is required"})
		return
	}
	if message == "" && source == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "a message or source is required"})
		return
	}

	lead := models.Lead{
		Name:    name,
		Email:   email,
		Company: company,
		Message: message,
		Source:  source,
	}
	lead.ID = uuid.New()

	if err := h.db.Create(&lead).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save submission"})
		return
	}

	// Fire-and-forget notification — never blocks or fails the 201.
	h.notify(lead)

	c.JSON(http.StatusCreated, gin.H{"ok": true})
}

// allow reports whether the given client IP is under the rate limit, recording
// this hit when it is. Old timestamps outside the window are pruned per call.
func (h *LeadHandler) allow(ip string) bool {
	now := time.Now()
	cutoff := now.Add(-rateLimitWindow)

	h.mu.Lock()
	defer h.mu.Unlock()

	var recent []time.Time
	for _, t := range h.hits[ip] {
		if t.After(cutoff) {
			recent = append(recent, t)
		}
	}
	if len(recent) == 0 {
		// Every prior hit for this IP aged out — drop the key so distinct bot
		// IPs don't accumulate in the map forever.
		delete(h.hits, ip)
	}
	if len(recent) >= rateLimitMax {
		h.hits[ip] = recent
		return false
	}
	h.hits[ip] = append(recent, now)
	return true
}

// notify sends a plain lead-notification email via Resend in a goroutine. It is
// a no-op when no API key is configured, and any failure is logged but never
// surfaced to the caller.
func (h *LeadHandler) notify(lead models.Lead) {
	if h.resendAPIKey == "" {
		return
	}
	go func() {
		body := map[string]any{
			"from":    "N7 Leads <onboarding@resend.dev>",
			"to":      []string{notifyTo},
			"subject": "New lead: " + fallback(lead.Name, lead.Email),
			"text": "New submission from the n7technologies site.\n\n" +
				"Name:    " + lead.Name + "\n" +
				"Email:   " + lead.Email + "\n" +
				"Company: " + lead.Company + "\n" +
				"Source:  " + lead.Source + "\n\n" +
				"Message:\n" + lead.Message + "\n",
		}
		payload, err := json.Marshal(body)
		if err != nil {
			log.Printf("leads: marshal notification: %v", err)
			return
		}

		req, err := http.NewRequest(http.MethodPost, "https://api.resend.com/emails", bytes.NewReader(payload))
		if err != nil {
			log.Printf("leads: build notification request: %v", err)
			return
		}
		req.Header.Set("Authorization", "Bearer "+h.resendAPIKey)
		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("leads: send notification: %v", err)
			return
		}
		defer resp.Body.Close()
		if resp.StatusCode >= 300 {
			log.Printf("leads: notification returned status %d", resp.StatusCode)
		}
	}()
}

// capLen caps s at maxFieldLen runes (not bytes), so truncation never splits a
// multi-byte UTF-8 codepoint and produces invalid UTF-8 that Postgres rejects.
func capLen(s string) string {
	if utf8.RuneCountInString(s) > maxFieldLen {
		return string([]rune(s)[:maxFieldLen])
	}
	return s
}

func fallback(primary, alt string) string {
	if primary != "" {
		return primary
	}
	return alt
}
