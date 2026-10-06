---
name: Mentoria Educacional Universitária
description: AMF's mentoring service, told as one evening of session hours from 18:00 gold to 22:00 night.
colors:
  ouro: "#F2B84B"
  ouro-hover: "#F6C562"
  damasco: "#E98A4A"
  rosa: "#AE4A5E"
  violeta: "#5B3C74"
  noite: "#101D33"
  noite-hover: "#1B2C4A"
  madrugada: "#0A1322"
  creme: "#FFF8EE"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 6.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline-lg:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Algarismos, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Algarismos, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Algarismos, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.5
  clock:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    fontFeature: "tnum"
rounded:
  slot: "6px"
  plate: "16px"
  panel: "1.75rem"
  pill: "9999px"
spacing:
  section-y: "80px"
  section-y-md: "112px"
  container-x-sm: "16px"
  container-x-md: "24px"
  container-x-lg: "32px"
  column-gap: "48px"
components:
  button-agendar-noite:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.creme}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "64px"
  button-agendar-noite-hover:
    backgroundColor: "{colors.noite-hover}"
  button-agendar-ouro:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "64px"
  button-agendar-ouro-hover:
    backgroundColor: "{colors.ouro-hover}"
  button-agendar-sm:
    rounded: "{rounded.pill}"
    padding: "0 14px 0 16px"
    height: "40px"
  clock-chip:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.creme}"
    typography: "{typography.clock}"
    rounded: "{rounded.pill}"
    padding: "8px 16px 8px 12px"
  night-panel:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.creme}"
    rounded: "{rounded.panel}"
    padding: "32px"
  pillar-badge:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    rounded: "{rounded.pill}"
    size: "48px"
  nav-bar:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.creme}"
    height: "64px"
---

# Design System: Mentoria Educacional Universitária

## Overview

**Creative North Star: "Entardecer, 18h às 22h"**

The page lives the hours the mentor is actually available. Every section is one hour of a single evening, and scrolling moves the sky from 18:00 gold through apricot, rose and violet into 22:00 night, ending in the deeper madrugada of the footer. Each section is a drenched, full-bleed field of one sky color; there are no white pages with colored accents, and no card grids floating on neutral gray. Color carries the narrative, so each field holds very little else: a big grotesque headline, a readable paragraph, and one piece of evidence (the portrait, the video, the week grid, the pillar list, the credentials).

Typography pairs a characterful, tightly tracked grotesque for headings with a typeface designed for legibility for everything read. Shapes are soft and few: pills, arches, and generously rounded panels. Depth is quiet: long, negative-spread shadows tinted with night, never hard edges.

The system rejects the generic campus-photo hero with cards and the coach-template look, and it must never read as childish: saturation lives in the fields, not in playful ornaments.

**Key Characteristics:**
- One full-bleed sky field per section, ordered by hour, joined by 5rem gradient seams.
- Bricolage Grotesque display (700, -0.025em) over Atkinson Hyperlegible Next body, with Bricolage digits everywhere.
- Night-ink and gold pills as the only button form; one action: Agendar.
- Arch-topped portraits, 1.75rem panels, round badges; no sharp corners at component scale.
- Soft night-tinted drop shadows; flat fields.
- The hour is a recurring data motif (hours line, week grid), never a decoration.

## Colors

A warm-to-cold sunset sequence used as whole-section fields, with night ink and cream as the two text voices.

### Primary
- **Noite (Night Ink)** (#101D33): the ink of the system. Text on every light field (ouro, damasco), the primary pill button, the navbar (at 92% with backdrop blur), the hours line under the hero, the week-grid panel, the 22:00 field, selection background, scrollbar thumb and `theme-color`. Hover on night pills lifts to Noite Hover (#1B2C4A).

### Secondary
- **Ouro (18h Gold)** (#F2B84B): the 18:00 field (hero, page background) and the highlight voice on dark fields: the gold pill button, pillar badges, credential list headings and bullets, footer icons, the nav wordmark subline, link underlines on hover, the clock icon. Hover on gold pills lifts to Ouro Hover (#F6C562).

### Tertiary
- **Damasco (19h Apricot)** (#E98A4A): the 19:00 video field; also the lower end of the hero gradient. Takes night text.
- **Rosa (20h Dusk Rose)** (#AE4A5E): the 20:00 availability field. Darkened from the planned #C4566A so cream text clears WCAG AA; the darker value is normative.
- **Violeta (21h Violet)** (#5B3C74): the 21:00 pillars field. Takes cream text.

### Neutral
- **Creme (Warm Paper)** (#FFF8EE): the only light text color on dark and saturated fields, used at full strength for headings and at 90/85/75/70/60% for body, secondary and fine print. Hairline dividers are creme at 10-20%. Also the plate behind the logo in the footer. Never pure white.
- **Madrugada (Small-Hours Navy)** (#0A1322): the footer and the bottom of the closing CTA gradient; the night after the last session.

### Named Rules
**The One Hour Per Field Rule.** Each full-width section is drenched in exactly one sky color, ordered 18:00 gold → 19:00 apricot → 20:00 rose → 21:00 violet → 22:00 night → madrugada. A new section takes its place in this sequence; it never introduces a color outside it or breaks the order.

**The Two Inks Rule.** Text is either Noite on ouro/damasco or Creme on rosa/violeta/noite/madrugada. Nothing else is a body text color; gold is allowed only for short highlights (headings in lists, emphasis, icons) on dark fields.

**The Evening Ramp Rule.** When the hours themselves are visualized (the week grid's eight 30-minute slots), color follows the evening ramp from gold to violet, interpolated between the field tokens; the slot hue is the time.

## Typography

**Display Font:** Bricolage Grotesque (with system-ui, sans-serif), weights 500-800 loaded, 700 used.
**Body Font:** Atkinson Hyperlegible Next (with system-ui, sans-serif), 400, 700 and 400 italic.
**Digits:** "Algarismos", a unicode-range face that swaps digits 0-9 to Bricolage Grotesque inside the body stack, because Atkinson's slashed zero fights the times (18:00, 22:00) that are the page's motif.

**Character:** A warm, slightly quirky grotesque with optical sizing gives the headings personality without playfulness; Atkinson, built for low-vision legibility, makes the accessibility pillar visible in the type itself.

### Hierarchy
- **Display** (700, clamp(2.9rem, 6.4vw, 6rem), 0.95): the hero title only, set as a large three-line block.
- **Headline** (700, 2.25rem rising to 3.75rem at md, 1.02): every section h2. The closing CTA pushes to 4.5rem at md.
- **Title** (700, 1.25rem rising to 1.5rem, ~1.25): pillar names, credential list headings (in ouro), footer column heads (1.125rem). A gold display subline at 1.5-1.875rem carries the mentor's "15+ anos" line.
- **Lede** (400, 1.125rem rising to 1.25rem, 1.625): the paragraph under each headline, capped at 40-56ch.
- **Body** (400, 1rem, 1.625): pillar descriptions and credentials, max-width 65ch (`max-w-prose`).
- **Label** (700, 0.95rem): buttons, nav links, small notes. Fine print drops to 0.875rem and 0.75rem in creme at 60-75%.

All headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.

### Named Rules
**The Grotesque Speaks, Atkinson Reads Rule.** Bricolage is for headings, the clock and big numbers; anything a student has to read for meaning is Atkinson. Never set paragraphs in Bricolage or headings in Atkinson.

**The Tabular Hours Rule.** Times are always set with tabular figures (`tabular-nums`) and Bricolage digits, so 18:00 → 22:00 never jitters as it changes.

## Layout

A single scrolling column of full-bleed fields. Content sits in a container of 100% width with 16px side padding (24px from 640px, 32px from 1024px, where it caps at 1280px). Section content is further capped at 72rem (`max-w-6xl`), 64rem for the video.

Sections breathe on an 80px vertical rhythm, 112px from md; the closing CTA uses 96px / 144px to land as a finale. Desktop compositions are asymmetric two-column grids: a 5:7 split of text column to evidence (availability, pillars), 1.15:0.85 in the hero (title left, arch portrait right, bottom-aligned), and a 5:7 split in the 22:00 mentor section (name and experience left, bio and credentials right, no photo). Column gaps run 48px on mobile, 56-80px on desktop. Everything stacks to one column below 1024px, text first, evidence second; the hero portrait centers at max 26rem.

The first viewport always carries the hours line beneath the hero buttons: a clock icon and "Segunda, quarta e quinta · 18:30 às 22:00 · sessões de 30 minutos" in noite. There is no separate night band (user decision, 2026-10-06): the gold hero flows straight into the apricot video field.

Seams between fields are 5rem linear gradients from the previous hour's color into the next, so the sky blends continuously instead of cutting.

Fixed chrome: sticky 64px navbar at top; scroll-to-top pinned bottom-right. No other floating elements (the clock chip was removed by user decision, 2026-10-06: it read as the real time). `scroll-padding-top: 5rem` clears the navbar for anchor jumps.

## Elevation & Depth

Fields are flat; depth is reserved for the few objects that sit on them (portraits, the video, the week-grid panel, pills). Shadows are long, soft and negative-spread, so they read as a glow of night beneath the object rather than a drop edge, and they are tinted with noite or black, never gray.

### Shadow Vocabulary
- **Panel float** (`box-shadow: 0 30px 70px -30px rgb(16 29 51 / 0.75)`; on dark fields `rgb(10 19 34 / 0.8)` or `rgb(0 0 0 / 0.8)`): video frame, week-grid panel, mentor portrait.
- **Pill lift** (`box-shadow: 0 10px 24px -12px rgb(16 29 51 / 0.7)`, gold pills `rgb(0 0 0 / 0.6)`): Agendar buttons.
- **Chip float** (`box-shadow: 0 8px 24px -10px rgb(0 16 29 / 0.7)`): the scroll-to-top button.
- **Arch glow** (`box-shadow: 0 -20px 60px -30px rgb(16 29 51 / 0.45)`): upward shadow on the hero arch portrait.

### Named Rules
**The Night Glow Rule.** A shadow is always large-blur with a negative spread equal to or greater than half its blur, tinted noite or black. No hard offsets, no tight gray `shadow-md` edges.

## Shapes

Round, soft and few. Interactive things are full pills (9999px); portraits are arches (rounded top-full, square bottom, 4:5); large objects on a field are panels at 1.75rem; the week-grid slots are 6px tiles; the footer logo sits on a 16px cream plate; pillar icons sit in 48px gold circles; list bullets are 6px gold dots. There are no outlined boxes: separation inside a field is done with creme hairlines (border-top at 10-20%), not containers.

## Components

### Buttons
Confident night-ink and gold pills with a small lift; one verb, Agendar.
- **Shape:** full pill (9999px).
- **Primary (noite):** night background, cream text, bold label, followed by an up-right arrow. Large: 56px high (64px at md), 28-32px left padding, 1.125-1.25rem text. Used on light fields.
- **Gold (ouro):** gold background, night text; same sizes. Used on dark fields (navbar, closing CTA).
- **Small:** 40px high, 0.95rem, label shortened to "Agendar"; navbar only.
- **Hover / Focus:** background lightens one step (Noite Hover / Ouro Hover), the pill rises 2px and the arrow nudges up-right 2px, 200ms ease-out; active returns to rest. Focus is the global 3px currentColor outline at 3px offset.
- **Text link (secondary action):** bold, underlined 2px at 6px offset in noite/40, underline solidifies on hover ("Ver horários").

### Chips
- **Clock chip:** removed (user decision, 2026-10-06). Do not reintroduce a floating hour indicator; visitors read it as the current time.

### Cards / Containers
- **Corner Style:** 1.75rem panels.
- **Background:** noite (88% over the rose field for the week grid; solid for the video frame).
- **Shadow Strategy:** Panel float (see Elevation).
- **Border:** none; internal dividers are creme hairlines at 15%.
- **Internal Padding:** 20px, 32px from md.
There are no card grids; lists of items are open rows on the field.

### Navigation
Sticky 64px bar in noite at 92% with medium backdrop blur. Left: a two-line wordmark, "Mentoria Educacional" in Bricolage 1.125rem bold over "Universitária · AMF" in small bold uppercase gold (part of the logo lockup, not a reusable label style). Right: three anchor links in bold 0.95rem creme at 80%, gaining a 2px gold underline at 7px offset on hover; then the small gold Agendar pill. Below md the links hide and only the wordmark and the pill remain.

### Hours Strip
Removed (2026-10-06): the hours now sit as an inline line under the hero buttons, noite text at 85% with a 16px clock icon, 15px.

### Week Grid
The availability panel: one row per weekday (bold day name in a 8.5rem column), eight 6px-rounded slots per row (28px tall, 32px at md, 4px gaps) colored along the Evening Ramp, an hour axis above in 12px tabular creme at 60%, and a hairline footer row with "Sessões de 30 minutos" in gold.

### Pillar Row
Open list on the violet field: each row has a creme 20% top hairline, 28-32px vertical padding, a 48px gold circle holding a 24px line icon (stroke 1.75) in noite, then a title and an 85% creme description.

### Logo
Two official assets. The **symbol** (`logo-simbolo-noite.webp`, the two-figure mark recolored to one color, noite #101D33, transparent) sits above the hero title: centered on mobile, left-aligned with the title from lg (user decision, 2026-10-06), 64px tall on mobile and 80px from lg, directly on the ouro field with no plate: the original gold figure would vanish on gold. The full-color symbol (`logo-simbolo.webp`) is kept for light or cream grounds. In the footer the symbol appears in one color on noite, 32px tall, inline before the "Mentoria Educacional" column title so the three footer columns share one title row (32px) and one content row (`logo-simbolo-ouro.webp`; a cream version `logo-simbolo-creme.webp` exists as the alternative). The full logo with text (`logo-mentoria.webp`) is kept as an asset but not placed on the page. Never place the full-color logo directly on a sky field, and never in the 64px navbar, where "Universitária" becomes illegible.

### Arch Portrait
The mentor appears once, in the hero: a 4:5 image with a fully rounded top and square bottom, object-position 50% 18%, with Arch glow. Source: `mentora-patricia-perfil.webp`. One photo per page: the 22:00 mentor section is text-only (user decision, 2026-10-06: two portraits read as odd).

### Video Frame
A 1.75rem panel at 16:9 on the apricot field. Before playing: poster with a noite 20% veil (5% on hover), centered 72-88px noite circle with a gold filled play icon and an 8px cream 30% ring; the poster scales 1.02 on hover over 700ms. The video loads only on click.

## Do's and Don'ts

### Do:
- **Do** give every new full-width section one sky field from the 18:00 → madrugada sequence, in order.
- **Do** join consecutive fields with a 5rem gradient seam from the previous hour into the next.
- **Do** use noite text on ouro/damasco and creme text on rosa/violeta/noite/madrugada; keep rosa at #AE4A5E so creme text holds WCAG AA.
- **Do** use the Agendar pill (noite on light fields, ouro on dark) as the only button, one tap away in the navbar and at the end of key sections.
- **Do** set every time and number with Bricolage digits and tabular figures.
- **Do** frame people in arches and objects in 1.75rem panels with the soft night-tinted shadows.
- **Do** keep the global 3px currentColor focus outline and respect `prefers-reduced-motion` (all animation and smooth scrolling collapse).

### Don't:
- **Don't** put giant background hour numerals (or any oversized decorative digits) in a section; the hour lives only in the hours line and the week grid (user decision, 2026-10-06).
- **Don't** use a white or gray page background, or campus-photo heroes with card grids; the fields are the canvas.
- **Don't** use pure white (#FFFFFF) text; light text is always creme #FFF8EE.
- **Don't** introduce sharp-cornered boxes, outlined cards or hard offset shadows; separation inside a field is a creme hairline.
- **Don't** set body copy in Bricolage Grotesque or headings in Atkinson.
- **Don't** add small uppercase tracked labels above headings; headlines stand alone on the field.
