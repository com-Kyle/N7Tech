// Package handlers holds the Gin HTTP handlers. One struct per resource,
// constructed with its dependencies (the *gorm.DB) and registered in
// internal/router.
package handlers

import (
	"net/http"

	"github.com/dpagan117/n7technologies/backend/internal/db/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ProductHandler serves the public product catalogue + admin product reads.
type ProductHandler struct {
	db *gorm.DB
}

func NewProductHandler(db *gorm.DB) *ProductHandler {
	return &ProductHandler{db: db}
}

// ListPublished returns every published product, newest first.
// GET /api/products
func (h *ProductHandler) ListPublished(c *gin.Context) {
	var products []models.Product
	if err := h.db.Where("published = ?", true).Order("created_at desc").Find(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load products"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"products": products})
}

// SettingHandler serves public platform settings (read-only here; writes
// belong to an authenticated admin route added later).
type SettingHandler struct {
	db *gorm.DB
}

func NewSettingHandler(db *gorm.DB) *SettingHandler {
	return &SettingHandler{db: db}
}

// Public returns the platform settings as a flat key/value map.
// GET /api/settings
func (h *SettingHandler) Public(c *gin.Context) {
	var rows []models.Setting
	if err := h.db.Find(&rows).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load settings"})
		return
	}
	out := make(map[string]string, len(rows))
	for _, s := range rows {
		out[s.Key] = s.Value
	}
	c.JSON(http.StatusOK, gin.H{"settings": out})
}
