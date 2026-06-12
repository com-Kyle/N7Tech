package models

// Lead is one inbound contact/early-access submission from the public site.
type Lead struct {
	Base
	Name    string `gorm:"not null;default:''" json:"name"`
	Email   string `gorm:"not null" json:"email"`
	Company string `gorm:"not null;default:''" json:"company"`
	Message string `gorm:"not null;default:''" json:"message"`
	Source  string `gorm:"not null;default:''" json:"source"`     // which page/offer: "contact" | "website-services" | "early-access:mealpod" ...
	Handled bool   `gorm:"not null;default:false" json:"handled"` // admin can mark worked
}
