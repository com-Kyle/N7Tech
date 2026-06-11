// Command server is the n7technologies API entrypoint. Boot order mirrors
// ContractorPod: load config -> open db -> migrate -> seed -> serve.
package main

import (
	"log"

	"github.com/dpagan117/n7technologies/backend/internal/config"
	"github.com/dpagan117/n7technologies/backend/internal/db"
	"github.com/dpagan117/n7technologies/backend/internal/router"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}

	gormDB, err := db.Open(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("db open: %v", err)
	}

	if err := db.AutoMigrate(gormDB); err != nil {
		log.Fatalf("automigrate: %v", err)
	}

	if err := db.Seed(gormDB); err != nil {
		log.Fatalf("seed: %v", err)
	}

	r := router.New(gormDB, cfg)

	log.Printf("n7technologies api listening on :%s (env=%s, frontend=%s)", cfg.Port, cfg.AppEnv, cfg.FrontendOrigin)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("server: %v", err)
	}
}
