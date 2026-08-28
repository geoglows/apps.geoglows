---
name: GEOGLOWS Portal
description: Open-access water intelligence tools for researchers and decision-makers worldwide.
brand: GEO Brand Book, shared verbatim with geoglows.org
tokenSource: src/styles/tokens.css (copied byte-for-byte from geoglows.org)
colors:
  teal: "#71acb2"
  blue: "#0060a9"
  teal-green: "#008b7b"
  navy: "#243754"
  navy-deep: "#1d1d24"
  green: "#587246"
  amber: "#ffbf00"   # off-palette; focus ring only (af42750)
  orange: "#f47920"  # off-palette; do not use
  surface-page: "#fbfdfd"
  surface-muted: "#eef1f4"
  surface-alt: "#e6eaef"
  surface-wash: "#e7f0ed"
  surface-teal-wash: "#ccdbdc"
  text-strong: "#1d1d24"
  text-body: "#55555a"
  text-faint: "#5c5c61"
  border: "#d6dee1"
  accent: "{colors.teal-green}"
  accent-text: "#0a6157"
  accent-strong: "{colors.blue}"
  cta: "{colors.amber}"   # focus ring only
  cta-ink: "#3a2a06"
  action: "{colors.blue}" # every primary action
  ink-on-dark: "#eaf2f7"
  ink-on-dark-muted: "#a6bccb"
typography:
  display:
    fontFamily: "'Raleway', 'Open Sans', system-ui, sans-serif"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Open Sans', 'Segoe UI', system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  brand: "12px"
  brand-sm: "9px"
  full: "9999px"
spacing:
  block: "clamp(44px, 5vw, 76px)"
  page-max: "1200px"
  gutter: "28px"
components:
  btn-primary:
    background: "{colors.action}"
    textColor: "#ffffff"
    rounded: "9px"
    fontWeight: 800
    fontSize: "0.95rem"
    minHeight: "44px"
  btn-secondary:
    background: "{colors.surface-page}"
    border: "1px solid {colors.border}"
    textColor: "{colors.text-strong}"
    rounded: "8px"
  tool-card:
    background: "{colors.surface-page}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.brand}"
    shadow: "var(--shadow-sm)"
---

# Design System: GEOGLOWS Portal

## 1. Overview

**The portal wears the GEO brand, shared with geoglows.org.**

The portal is not a separate visual identity. `src/styles/tokens.css` and
`src/styles/fonts.css` are copied byte-for-byte from geoglows.org, so both
properties resolve to the same surfaces, text colours, accents, and typefaces.
When the brand changes, it changes in one place and is copied across; keep the
two files identical rather than editing them here.

Because the portal is a Tailwind v4 app and geoglows.org is Astro with plain
CSS, `src/style.css` bridges the two: it imports the token files as plain CSS,
then re-exposes them to Tailwind through `@theme inline` so utilities emit
`var(--surface-page)` rather than a build-time snapshot. That is what lets the
same tokens flip at runtime.

**Key characteristics:**
- One palette, two properties: GEO Brand Book colours via shared token files
- Raleway 800 headings, Open Sans body, per the GEO Brand Book
- Semantic tokens, not palette scales: `bg-page`, `text-ink`, `border-line`
- Dark mode lives in the token layer, not in `dark:` variants
- Restrained accents: the tool output and imagery carry the colour

## 2. Colours

### Semantic roles
Reach for the role, not the hue. Every one of these flips with the theme:

- **`bg-page`** (`--surface-page`): the page and card surface
- **`bg-muted` / `bg-alt`**: alternating section bands
- **`bg-wash` / `bg-teal-wash`**: icon plates, badges, quiet tints
- **`text-ink`** (`--text-strong`): headings and emphatic copy
- **`text-body`**: paragraphs and descriptions
- **`text-faint`**: labels, captions, metadata
- **`border-line`**: card edges and separators
- **`text-accent-text`** (`#0a6157`): the AA-safe teal for small text and links
- **`text-accent-strong`** (GEO blue): stronger links
- **`bg-action`** (GEO blue): primary buttons

### Fixed brand hues
`bg-geo-navy`, `bg-geo-navy-deep`, `bg-geo-teal` do **not** flip. Use them only
where a hue must hold in both themes: an avatar chip, an always-dark ribbon.
Text on them uses `text-on-dark` / `text-on-dark-muted`.

There is deliberately no `bg-geo-amber`, `bg-geo-orange`, or `bg-geo-green`
utility. Amber and orange are off-palette (see below) and the olive
`--color-green` was demoted from geoglows.org's header in the same decision, so
exposing them would only invite drift. Add one back if a real need appears.

### Named rules

**The Role-Not-Hue Rule.** Markup names roles (`bg-page`, `text-ink`), never
palette scales. There are no `slate-*` or `blue-*` utilities left in the portal,
and reintroducing one silently opts that element out of theming.

**The Action-Is-Blue Rule.** The primary action is GEO blue (`--action`).

This is a recorded decision, not an inference. geoglows.org commit `af42750`,
"Realign to the GEO brand: blue-led palette, retire amber", states it directly:
*"The GEO brand palette is three cool colors (teal #71acb2, blue #0060a9,
emerald #008b7b); amber/orange are not in it."* That commit moved `CtaButton`'s
default from `amber` to a new `blue` style, switched every content CTA, moved the
header button off olive green to GEO blue, and kept amber only on the Impact map
pins as an intentional highlight.

**Amber and orange are off-palette.** The one surviving use is the focus ring,
because geoglows.org's `global.css` still draws `:focus-visible` with
`var(--cta)`. Do not reach for amber or orange for warnings, badges, or
attention states. When a state needs to stand out from body copy, use the
teal-wash treatment that `af42750` itself adopted when it demoted the
`FeatureSection` tag: `--accent-text` on `--surface-teal-wash`. The completion
and save banners follow exactly that.

Two blue button treatments exist, and they are not interchangeable:
- **Content CTAs** (`btn-primary`): `CtaButton` base plus `.blue` — 9px radius,
  weight 800, 0.95rem, 13px/26px padding
- **The header CTA**: `SiteNav.astro`'s `.cta` — 8px radius, weight 700, 0.9rem.
  In the portal this is the auth library's sign-in button, retinted in the
  override block at the end of `src/style.css`

**The Focus-Is-Amber Rule.** `:focus-visible` is a 2px amber outline at 3px
offset, copied from geoglows.org's `global.css`. Do not add
`focus-visible:outline-none` without supplying an equally visible amber ring.

**Red is the one exception.** Error banners keep Tailwind's `red-*`. The GEO
palette has no error hue and geoglows.org has no error state to copy, so this is
deliberate: error is a system state, not brand chrome. It is the *only* sanctioned
off-palette colour.

## 3. Typography

**Display:** Raleway 800, `-0.015em`, self-hosted from `/fonts/raleway.woff2`
**Body:** Open Sans, self-hosted from `/fonts/opensans.woff2`

Both are preloaded in `index.html`. They are not fetched from Google Fonts;
self-hosting is what keeps them identical to geoglows.org.

A base rule sets `h1`–`h4` to Raleway 800 with the GEO letter-spacing, so
headings are correct without a utility. `font-display` and `font-sans` exist for
non-heading elements that need the face explicitly.

### Named rules

**The Two-Voice Rule.** Raleway carries headings; Open Sans carries everything
else. Monospace appears only in the ambient ticker.

**Do not weaken a heading.** Raleway at 800 is the brand voice. Adding
`font-normal` to a heading (a holdover from the retired Playfair system)
silently drops it to 400.

**The token namespace is `--font-*`.** Tailwind v4 reads `--font-sans` and
`--font-display`. The retired system declared `--font-family-sans` /
`--font-family-display`, which generated no utilities at all, so `font-display`
was inert for months and Open Sans never applied to the body. Verify a font
token by checking the built CSS, not the markup.

## 4. Elevation

Flat by default, borders before shadows. `--shadow-sm` and `--shadow-md` come
from the token file, so the portal's `shadow-sm` and `shadow-md` are GEO's
shadows, not Tailwind's defaults.

Cards rest with a hairline border plus `--shadow-sm`, and on hover lift 3px,
deepen to `--shadow-md`, and take an `--accent-text` border. That is
geoglows.org's `ToolCard` treatment.

## 5. Components

### Buttons
- **`btn-primary`**: GEO blue, white text, 8px radius, weight 700, 44px min
  height, mirroring `SiteNav.astro`'s `.cta`
- **`btn-secondary`**: page surface, hairline border, teal border on hover

### `tool-card`
Page surface, hairline border, 12px radius, `--shadow-sm`. Hover lifts and tints
the border teal. Ported from geoglows.org's `ToolCard.astro`. Replaces the
retired `glass-card`; there is no glassmorphism in this system.

### `tool-badge`
Teal-wash pill with `--accent-text` text, for "Coming soon" and similar states.
Matches `ToolCard`'s `.badge`.

### `water-mesh`
Ambient three-point radial wash on the branded shell, retinted to GEO teal /
blue / teal-green. Used by `main.js`.

### Auth surfaces (not ours)
The sign-in button, sign-in modal, and account menu are rendered by
`@geoglows/geoglows-auth`, which ships a minified stylesheet with **no custom
properties** — hardcoded `#2563eb` and Playfair Display. `src/style.css` ends
with a scoped override block that retints its accent and display font onto GEO
tokens. Those selectors are `:root`-prefixed because the library's CSS is
bundled after ours and would otherwise win on source order.

The library's neutral surfaces are left alone: it already scopes dark rules as
`:is([data-theme=dark], .dark)`, so it themes correctly, and its neutrals sit
close to GEO's. **The durable fix is to expose tokens in `geoglows-auth`
itself** and delete the override block. Until then, the block must track the
library's class names across upgrades.

## 6. Theming mechanics

`theme.js` stamps `data-theme="light" | "dark"` on `<html>`, and an inline script
in `index.html` does the same before first paint so there is no flash. With no
attribute set, `tokens.css` falls back to `prefers-color-scheme`, which is how
geoglows.org behaves.

The `dark:` variant is repointed to `[data-theme="dark"]` and survives only for
what a token cannot express, such as swapping the colour logo for the white one.
Do not reach for it to pair two colours: that is what the tokens are for.

`@source not "../docs"` and `@source not "../.agents"` keep Tailwind from
scanning prose. Design docs quote class names, and without the exclusions the
retired `slate-*` and `blue-*` utilities are emitted into the production build
purely because this file mentions them.

## 7. Do's and Don'ts

### Do:
- **Do** name a role: `bg-page`, `text-ink`, `border-line`, `text-faint`
- **Do** keep `src/styles/tokens.css` and `fonts.css` byte-identical to geoglows.org
- **Do** let the token layer handle dark mode
- **Do** use `text-on-dark` / `text-on-dark-muted` on fixed-hue dark surfaces
- **Do** use `btn-primary` / `btn-secondary` instead of respelling a button
- **Do** verify a new token by grepping the built CSS in `dist/assets/`
- **Do** respect `prefers-reduced-motion` on every transition and animation
- **Do** keep the amber focus ring visible on every interactive element
- **Do** run `escapeHtml()` on every user-controlled interpolation

### Don't:
- **Don't** introduce `slate-*`, `blue-*`, `cyan-*`, `indigo-*`, or `sky-*` utilities
- **Don't** pair `bg-x dark:bg-y` where a token already flips
- **Don't** add `font-normal` to a heading
- **Don't** edit the token files to make one page look right; fix the usage
- **Don't** use Playfair Display, `glass-card`, or gradient text; all retired
- **Don't** use amber or orange for anything but the focus ring; they are
  off-palette per geoglows.org `af42750`
- **Don't** use gradient text (`background-clip: text`)
- **Don't** use glassmorphism decoratively; backdrop blur is purposeful or absent
- **Don't** use big-number hero-metric templates. GEOGLOWS is a public good
- **Don't** hijack the scrollbar
- **Don't** animate layout properties; use `transform` and `opacity`
- **Don't** use em dashes

## 8. Retired, and what remains of it

The previous system ("The Field Station": Playfair Display, `#2563eb`, slate
neutrals) is gone. Two notes for anyone reading older docs:

- `docs/designs/*.md` still describe the retired palette. They are excluded from
  the Tailwind scan but were not rewritten.
- `renderLandingPage_old()` in `src/ui/landingPage.js` is **dead code**. It holds
  the ambient ticker, the satellite hero, the 3D perspective panels, and the
  alternating app showcases that earlier versions of this document described as
  live. Nothing calls it; the live `renderLandingPage()` renders the Explore grid
  and the manifesto. `.perspective-panel` has no remaining usage at all. Its CSS
  was carried across for a faithful port, not because it renders.
