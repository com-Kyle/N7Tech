// Package db owns the GORM connection and schema lifecycle. Boot order in
// cmd/server/main.go is: Open -> AutoMigrate -> Seed.
package db

import (
	"fmt"

	"github.com/dpagan117/n7technologies/backend/internal/db/models"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"gorm.io/gorm/logger"
)

// Open dials Postgres and verifies the connection with a ping.
func Open(dsn string) (*gorm.DB, error) {
	g, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		return nil, fmt.Errorf("gorm open: %w", err)
	}
	sqlDB, err := g.DB()
	if err != nil {
		return nil, err
	}
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("ping: %w", err)
	}
	return g, nil
}

// AutoMigrate creates/updates tables for every registered model. Add new
// models to this list when you create them.
func AutoMigrate(g *gorm.DB) error {
	return g.AutoMigrate(
		&models.Product{},
		&models.Setting{},
		&models.Lead{},
	)
}

// Seed inserts idempotent starter data: the default platform settings and a
// couple of demo products so the public site and admin dashboard render
// something on a fresh database. Safe to re-run — existing rows are left alone.
func Seed(g *gorm.DB) error {
	defaults := map[string]string{
		"signups_open":          "true",
		"maintenance_banner":    "",
		"company_tagline":       "Building the next generation of software.",
	}
	for k, v := range defaults {
		s := models.Setting{Key: k, Value: v}
		// DoNothing on the primary key — never clobber an admin-edited value.
		if err := g.Clauses(clause.OnConflict{DoNothing: true}).Create(&s).Error; err != nil {
			return fmt.Errorf("seed setting %q: %w", k, err)
		}
	}

	demo := []models.Product{
		{
			Slug:        "n7-core",
			Name:        "N7 Core",
			Tagline:     "The platform everything else runs on.",
			Description: "The shared foundation behind every N7 product — authentication, billing, data, and operations built once and run everywhere. New products start on a system that already works instead of from scratch.",
			Status:      "live",
			Published:   true,
		},
		{
			Slug:        "n7-admin",
			Name:        "N7 Admin",
			Tagline:     "One dashboard for every product.",
			Description: "A single control surface for the whole portfolio: manage products, users, and platform settings from one place, with the same operational view across every product N7 ships.",
			Status:      "live",
			Published:   true,
		},
	}
	for _, p := range demo {
		p.ID = uuid.New()
		// Upsert the descriptive columns on the unique slug so refreshed copy
		// propagates on the next boot, but never touch admin-managed status flags.
		if err := g.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "slug"}},
			DoUpdates: clause.AssignmentColumns([]string{"name", "tagline", "description"}),
		}).Create(&p).Error; err != nil {
			return fmt.Errorf("seed product %q: %w", p.Slug, err)
		}
	}
	return nil
}
