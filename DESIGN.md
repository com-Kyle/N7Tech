# N7 Technologies — Design

Brand derived from the N7 logo: chrome **N7** + vivid red, circuit traces, on
black. Aesthetic: angular, futuristic, premium-tech.

## Tokens (source of truth: `app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#000000` | Page background — pure black, matches the logo plate |
| `--color-surface` | `#0c0c10` | Cards / panels |
| `--color-elevated` | `#15151b` | Hover / raised surfaces |
| `--color-border` | `#26262f` | Hairlines, card borders |
| `--color-fg` | `#ededf1` | Primary text |
| `--color-muted` | `#8c8c99` | Secondary text |
| `--color-brand` | `#e11d27` | N7 red — CTAs, accents, status |
| `--color-brand-strong` | `#ff2b35` | Glows / highlights |
| `--color-brand-deep` | `#9e1119` | Gradient shadow end |

## Type

- **Display** — Chakra Petch (`--font-display`) for headings + the wordmark.
  Geometric/chamfered, echoes the logo lettering. Apply via `.font-display`.
- **Body** — Inter (`--font-inter`).
- **Mono** — JetBrains Mono (`--font-jetbrains-mono`).

## Brand devices

- **Chrome text** (`.text-chrome`) — metallic gradient for the "N7" lettering.
- **Brand rule** (`.brand-rule`) — red hairline with a glowing center dot,
  mirroring the underline beneath the logo lockup.
- **Red glow** — radial `rgba(225,29,39,.5)` blur behind hero focal points;
  red box-shadow bloom on primary buttons on hover.

## Logo

`public/brand/n7-technologies.jpg` (1320×1245, black plate). Featured in the
hero and as the favicon (`app/icon.jpg`). TODO: export a transparent PNG + a
cropped square emblem for a crisper favicon / horizontal nav lockup.

## Rules

- Dark-only. Black backgrounds; never light surfaces.
- Red is an accent, not a flood — one red focal element per view.
- Wordmark is always `N7` (chrome) + `TECHNOLOGIES` (wide tracking).
