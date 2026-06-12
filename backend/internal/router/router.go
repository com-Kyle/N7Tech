// Package router wires the HTTP routes. New() takes the already-constructed
// dependencies (db, config) and returns a *gin.Engine ready to Run.
package router

import (
	"log"
	"net/http"

	"github.com/dpagan117/n7technologies/backend/internal/config"
	"github.com/dpagan117/n7technologies/backend/internal/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// New builds the Gin engine: trusted-proxy lockdown, CORS scoped to the
// frontend origin, a liveness probe, and the /api group.
func New(db *gorm.DB, cfg *config.Config) *gin.Engine {
	r := gin.Default()

	// gin.Default() trusts ALL proxies by default, which makes c.ClientIP()
	// attacker-controllable. Lock the trust list to the configured CIDRs
	// (loopback only unless TRUSTED_PROXIES widens it for a prod LB).
	if err := r.SetTrustedProxies(cfg.TrustedProxies); err != nil {
		log.Fatalf("router: SetTrustedProxies(%v): %v", cfg.TrustedProxies, err)
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.FrontendOrigin},
		AllowMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	// Liveness probe — matches the ContractorPod /healthz convention so the
	// same uptime checks work across pods.
	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	api := r.Group("/api")

	products := handlers.NewProductHandler(db)
	api.GET("/products", products.ListPublished)

	settings := handlers.NewSettingHandler(db)
	api.GET("/settings", settings.Public)

	leads := handlers.NewLeadHandler(db, cfg.ResendAPIKey)
	api.POST("/leads", leads.Create)

	return r
}
