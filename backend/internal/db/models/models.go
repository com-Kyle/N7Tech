// Package models holds the GORM model structs. Every model registered here
// must be added to db.AutoMigrate's list (backend/internal/db/db.go).
package models

import (
	"time"

	"github.com/google/uuid"
)

// Base carries the fields every table shares: a UUID primary key and
// created/updated timestamps managed by GORM.
type Base struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// Product is one product in the n7technologies portfolio. The admin dashboard
// manages these; the public /products page lists the published ones.
type Product struct {
	Base
	Slug        string `gorm:"uniqueIndex;not null" json:"slug"`
	Name        string `gorm:"not null" json:"name"`
	Tagline     string `gorm:"not null;default:''" json:"tagline"`
	Description string `gorm:"not null;default:''" json:"description"`
	Status      string `gorm:"not null;default:'draft'" json:"status"` // draft | live | retired
	Published   bool   `gorm:"not null;default:false" json:"published"`
}

// Setting is a single platform-level key/value flag (e.g. signups_open).
// Mirrors ContractorPod's platform.Setting pattern.
type Setting struct {
	Key       string    `gorm:"primaryKey" json:"key"`
	Value     string    `gorm:"not null;default:''" json:"value"`
	UpdatedAt time.Time `json:"updatedAt"`
}
