# N7 Technologies — Design

Soft-dark, charcoal-slate marketing site. Aesthetic: a calm, premium dark tone —
charcoal-slate page (**not** pure black), elevated slate cards defined by border
+ subtle elevation, near-white text, generous whitespace, and **one** confident
accent: N7 red. The N7 brand (angular wordmark + red) is carried by type, a
metallic wordmark, and a single accent.

**Dark-only, not black.** There is no light mode and the page is a soft charcoal
(`#1b2130`), never `#000`. The `<html>` element carries no `dark` class — the
`body` rule in `app/globals.css` styles the dark theme unconditionally.

## Tokens (source of truth: `app/globals.css` `@theme`)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#222a3a` | Page background — soft charcoal (NOT black) |
| `--color-surface` | `#2b3447` | Elevated slate card |
| `--color-elevated` | `#333d52` | Higher-elevation panels |
| `--color-border` | `#3b4559` | Subtle border, lighter than surface |
| `--color-fg` | `#e8eaf0` | Near-white primary text |
| `--color-muted` | `#94a3b8` | Muted secondary text (slate-400) |
| `--color-brand` | `#e11d27` | N7 red — CTAs, accents, status |
| `--color-brand-strong` | `#ff2b35` | **Brighter** red for hover on dark |
| `--color-brand-deep` | `#9e1119` | Gradient shadow end |
| `--color-brand-fg` | `#ffffff` | Text on red buttons |

Red is an accent, not a flood — keep one red focal element per view (a CTA, a
status dot, the brand rule, the hero bloom).

Contrast: `#e8eaf0` on `#222a3a` is strong for primary text; reserve `#94a3b8`
(muted) for secondary copy only.

## Card language

On dark, soft drop-shadows barely register, so cards lean on **border +
elevation**, not shadow:

- Slate surface (`bg-[var(--color-surface)]`) + `border
  border-[var(--color-border)]` + `ring-1 ring-white/5` (a faint top-light
  edge). A `shadow-sm` is kept but the border carries the definition.
- **Interactive cards** (clickable `<a>`, e.g. the live product card, the
  contact rows) lift on hover: `hover:-translate-y-0.5
  hover:border-[var(--color-brand)]` (the border brightens toward red).
- **Content cards** (non-clickable — principle cards, the two-companies cards,
  the engine card, CTA panels, the contact "What to expect" card) stay **flat**:
  border + `ring-1 ring-white/5`, no hover transform.

Decorative per-accent glow blobs sit at `opacity-[0.12]` (hover `~0.22`) — they
read on slate without becoming neon.

## Type

- **Display** — Chakra Petch (`--font-display`, applied via `.font-display`).
  Geometric/chamfered, echoes the logo lettering. **Headline scale only** — H1s,
  H2s, H3s, the wordmark.
- **Eyebrow / kicker labels** — the small `text-xs uppercase
  tracking-[0.25em]` section labels use `font-sans` (Inter), **not**
  `font-display`. At ~12px the Chakra Petch chamfers fight legibility.
- **Body** — Inter (`--font-inter`).
- **Mono** — JetBrains Mono (`--font-jetbrains-mono`).

## Brand devices

- **Chrome text** (`.text-chrome`) — the "N7" wordmark. A bright metallic
  white→silver gradient (`#ffffff → #e6e8ec → #c8cbd1 → #ffffff`) that reads
  bright on the charcoal bg.
- **Brand rule** (`.brand-rule`) — red hairline with a tight center dot
  (`0 0 0 2px rgba(225,29,39,0.14)` ring). Reads well on charcoal.
- **Hero bloom** — a subtle red radial (`opacity-[0.14]`, `blur-[120px]`) at the
  top of each marketing page (home, about, products) for cross-page consistency.
  A tasteful bloom on dark — NOT the old 0.30 neon. Card CTA washes sit ~0.16.
- **Button hover** — primary red buttons shift to `--color-brand-strong`
  (`#ff2b35`, **brighter**) on hover — hover brightens on dark, never darkens.

## Logo

`public/brand/n7-technologies.png` (1254×1254, square) is a lockup on a
near-black plate. On the charcoal page it would otherwise blend in, so it's
wrapped in an intentional framed chip that's a hair lighter than the PNG plate,
with a gentle top-light edge so it reads as a deliberate framed mark:

```
rounded-2xl bg-[#11151f] p-3 sm:p-4 shadow-lg ring-1 ring-white/10
```

Used in the home + about heroes. The nav/footer wordmarks are CSS text
(`.text-chrome`), not the image — no chip.

**TODO:** export a transparent PNG (and a cropped square emblem) so the logo can
sit directly on the charcoal surface without the dark chip, and for a crisper
favicon / horizontal nav lockup.

## Page rhythm

The about page deliberately **alternates** centered and left-aligned sections
(hero + mission + product-family + CTA centered; "Two companies" and "Operating
principles" left-aligned) to avoid the all-centered "generic AI SaaS" tell.

## Service pages (shared template)

Agency-style service pages (Website / App) render through one component —
`components/service-page.tsx`, fed a `Service` from `lib/services.ts` (the
source of truth, mirroring `lib/products.ts`). Shape: red-bloom hero (eyebrow →
H1 service name → tagline → "Starting at <price>" → "Get a quote" `ContactButton`
with the service's `contactSubject`) → a 3-pillar grid (**Build / Improve /
Test**, flat content cards) → a closing CTA. Add a new service by adding a
`Service` object + a thin `page.tsx` wrapper — no new layout.

The `/deploypod` cross-marketing page is bespoke (not the template) and uses
DeployPod **blue** (`#3B82F6`, from `ENGINE.accent`) as its hero/CTA accent while
keeping the shared chrome — the one place a non-red accent is sanctioned, because
the about page already established DeployPod = blue.

## Nav — Services dropdown

`components/chrome/site-nav.tsx` has a pure-CSS hover dropdown (no client JS):
`group relative` trigger + a `group-hover:visible group-hover:opacity-100`
panel (charcoal `bg-[var(--color-surface)]` + border + `ring-1 ring-white/5` +
shadow). A `pt-3` on the panel keeps a hover bridge so it doesn't flicker shut in
the gap. Hidden below `sm` like the other text links (no mobile menu yet).

## Rules

- Dark-only, soft charcoal — never pure black, never a light surface.
- Cards lean on border + `ring-1 ring-white/5`, not drop-shadow.
- Red is an accent, not a flood — one red focal element per view.
- Wordmark is always `N7` (`.text-chrome`, metallic) + `TECHNOLOGIES` (wide
  tracking).
- Eyebrows in `font-sans`; reserve `font-display` (Chakra Petch) for headlines.
