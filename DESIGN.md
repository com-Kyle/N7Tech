# N7 Technologies — Design

Light, professional-SaaS marketing site. Aesthetic: Stripe / Linear / Vercel
light mode — light-grey page, crisp white cards, soft shadows, generous
whitespace, slate text, and **one** confident accent: N7 red. The N7 brand
(angular wordmark + red) is carried by type and a single accent, not by a dark
plate.

**Light-only.** There is no dark mode. The `<html>` element carries no `dark`
class and `body` is styled unconditionally in `app/globals.css`.

## Tokens (source of truth: `app/globals.css` `@theme`)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#f5f6f8` | Page background — light grey |
| `--color-surface` | `#ffffff` | White cards |
| `--color-elevated` | `#ffffff` | Elevated panels — lean on shadow, not fill |
| `--color-border` | `#e4e7ec` | Hairline (slate-200) card borders |
| `--color-fg` | `#0f172a` | Primary text (slate-900) |
| `--color-muted` | `#64748b` | Secondary text (slate-500) |
| `--color-brand` | `#e11d27` | N7 red — CTAs, accents, status |
| `--color-brand-strong` | `#c5141d` | Deeper red for hover on light |
| `--color-brand-deep` | `#9e1119` | Gradient shadow end |
| `--color-brand-fg` | `#ffffff` | Text on red buttons |

Red is an accent, not a flood — keep one red focal element per view (a CTA, a
status dot, the brand rule).

## Card language

The core SaaS look is a **white card over the grey background**:

- White surface (`bg-[var(--color-surface)]`) + `shadow-sm` + a hairline
  (`border border-[var(--color-border)]`) on `#f5f6f8`.
- **Interactive cards** (clickable `<a>`, e.g. the live product card) lift on
  hover: `hover:-translate-y-0.5 hover:border-[var(--color-brand)]
  hover:shadow-md`.
- **Content cards** (non-clickable — principle cards, the two-companies cards,
  the engine card, CTA panels, the contact "What to expect" card) stay **flat**:
  `shadow-sm` only, no hover transform.

Decorative per-accent glow blobs are kept whisper-subtle on white
(`opacity-[0.06]`–`[0.08]`) so they tint rather than muddy.

## Type

- **Display** — Chakra Petch (`--font-display`, applied via `.font-display`).
  Geometric/chamfered, echoes the logo lettering. **Headline scale only** — H1s,
  H2s, H3s, the wordmark.
- **Eyebrow / kicker labels** — the small `text-xs uppercase
  tracking-[0.25em]` section labels use `font-sans` (Inter), **not**
  `font-display`. At ~12px the Chakra Petch chamfers fight legibility and read
  "techy-template"; Inter is cleaner.
- **Body** — Inter (`--font-inter`).
- **Mono** — JetBrains Mono (`--font-jetbrains-mono`).

## Brand devices

- **Chrome text** (`.text-chrome`) — the "N7" wordmark. A solid, confident dark
  slate gradient (`#0f172a → #334155`) that reads clearly on white/light-grey.
  (The old metallic white→grey gradient was for the black theme and is gone.)
- **Brand rule** (`.brand-rule`) — red hairline with a tight center dot. On
  light the dot uses a subtle `0 0 0 2px rgba(225,29,39,0.14)` ring, not a
  dark-mode neon bloom.
- **Hero wash** — a very subtle red radial (`opacity-[0.06]`, `blur-[120px]`) at
  the top of each marketing page (home, about, products) for cross-page
  consistency. Subtle tint, never a glow.
- **Button hover** — primary red buttons shift to `--color-brand-strong`
  (`#c5141d`) + `shadow-sm` on hover. No neon box-shadow bloom.

## Logo

`public/brand/n7-technologies.jpg` (1320×1245) is a lockup on a **black** plate.
On the light site it is wrapped in an intentional dark chip so it reads as a
deliberate brand element rather than a stray black box:

```
rounded-2xl bg-[#0b0b0f] p-3 sm:p-4 shadow-lg ring-1 ring-black/5
```

Used in the home + about heroes. Padding is kept tight so the JPG's own black
plate fills close to the chip edge (one surface, not "a box in a box"). The
nav/footer wordmarks are CSS text (`.text-chrome`), not the image — no chip.

**TODO:** export a transparent PNG (and a cropped square emblem) so the logo can
sit directly on the light surface without the dark chip, and for a crisper
favicon / horizontal nav lockup.

## Page rhythm

The about page deliberately **alternates** centered and left-aligned sections
(hero + mission + product-family + CTA centered; "Two companies" and "Operating
principles" left-aligned) to avoid the all-centered "generic AI SaaS" tell.

## Rules

- Light-only. White/grey surfaces; never a dark page background (the logo chip
  is the one intentional dark surface).
- Red is an accent, not a flood — one red focal element per view.
- Wordmark is always `N7` (`.text-chrome`) + `TECHNOLOGIES` (wide tracking).
- Eyebrows in `font-sans`; reserve `font-display` (Chakra Petch) for headlines.
