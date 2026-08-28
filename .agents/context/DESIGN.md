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

### Layout primitives
Ported from geoglows.org's `global.css`, and the only sanctioned way to set
width and vertical rhythm:
- **`shell`**: 1200px column with a 28px gutter, from `--page-max` / `--gutter`
- **`block-y`**: section rhythm, `clamp(44px, 5vw, 76px)`
- **`eyebrow`**: uppercase teal section label at 0.15em tracking
- **`section-title`**: `clamp(1.6rem, 2.6vw, 2.3rem)` at `-0.02em`, from
  `SectionHeader.astro`

Do not hand-roll `max-w-*` + `px-*` on a section, and do not invent one-off
`py-*` values. Both are how the two properties drift apart.

### Site nav
Ported from `SiteNav.astro`: sticky, `z-index: 60`, 88% page-surface with a 12px
backdrop blur and a hairline bottom border. Full GEOGLOWS wordmark left at 38px,
links right at weight 700 / 0.9rem going teal on hover, then the blue CTA. Below
880px the links collapse behind a 44px hamburger that toggles `data-open` on
`.site-nav`, with the CTA ordered ahead of it.

The portal has flat routes, so `SiteNav`'s dropdown submenu machinery
(`.group`, `.submenu`, `.group-toggle`) is deliberately not ported. Add it only
if the portal grows sub-sections.

### Site footer
Ported from `SiteFooter.astro`: an always-dark `--color-navy-deep` band in both
themes, `1.4fr 1fr 1fr 1fr` grid collapsing to two columns at 820px, white
wordmark at 34px, blurb capped at 34ch, uppercase column headings at 0.08em, and
a `--hairline-on-dark` divider above a copyright-left / legal-right row.

Its link columns are portal-specific and point at geoglows.org for everything
the portal does not host, including the legal pages, which the portal has none of.

### `water-mesh`
Ambient three-point radial wash retinted to GEO teal / blue / teal-green. Now
used only on the branded shell behind the disclaimer modal; the page itself sits
on the flat page surface, as geoglows.org does.

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

**There is no theme toggle.** Dark mode is pure CSS, driven by
`prefers-color-scheme` through the token layer, exactly as on geoglows.org.
Nothing stamps `data-theme` at runtime; `theme.js` and the inline stamping script
are gone. `[data-theme="light" | "dark"]` remains as an override hook in
`tokens.css` for anyone who later wants to force a theme.

Consequently **no markup needs a `dark:` variant.** Every colour in the app,
error states included, comes from a token that flips on its own, and the logo
swap uses the same `.logo-light` / `.logo-dark` CSS that `SiteNav.astro` uses.
The `dark:` variant is still *defined* — correctly, covering both
`prefers-color-scheme` and `[data-theme="dark"]` — but nothing uses it. If you
find yourself reaching for it, you want a token instead.

### Scroll reveal
`src/reveal.js` is a port of geoglows.org's `reveal.ts`: an IntersectionObserver
adds `.is-visible` to each `.reveal` once it enters the viewport, at
`rootMargin: 0px 0px -12% 0px`, and then unobserves it. Sections reveal once and
are never hidden again. Under `prefers-reduced-motion` or without
IntersectionObserver, everything is marked visible immediately.

The one portal-specific wrinkle: `#app.innerHTML` is replaced on every render, so
every `.reveal` node is new afterwards. `initReveal()` is therefore called from
`renderApp()` and disconnects the previous observer first, which would otherwise
hold detached nodes.

The retired anime.js engine did the opposite: four animation kinds, bidirectional
reversal on scroll-up, and a `createScope().revert()` dance after every render.
It is gone, along with the dependency.

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
- **Don't** hand-roll section width or padding; use `shell` and `block-y`
- **Don't** add a `dark:` variant; every colour already flips on its own
- **Don't** reintroduce a theme toggle without deciding what geoglows.org does first
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
- `renderLandingPage_old()` **has been deleted**, along with `APP_SHOWCASE`,
  `createAppShowcase()`, and the anime.js engine. It was dead code holding the
  ambient ticker, the satellite hero, the 3D perspective panels, and the
  alternating app showcases that earlier versions of this document described as
  live. Nothing called it. `landingPage.js` went from 399 lines to 97, and the
  ticker and `.perspective-panel` CSS went with it. The screenshots in
  `/showcase/` that only it referenced are still in `public/`.
