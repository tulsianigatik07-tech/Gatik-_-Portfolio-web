# Design System — Gatik Tulsiani Portfolio

**Document type:** Design System (implementation-ready)
**Author role:** Senior Design Systems Engineer × Product Designer
**Source of truth:** `spec.md`, `architecture.md`, `visual-direction.md`
**Stack alignment:** Tailwind CSS · shadcn/ui · Framer Motion · Next.js App Router

> This document defines the design system and tokens only. It contains no implementation code. It does not introduce new sections, alter the information architecture, or redesign the product. All values below operationalize the existing visual direction.

---

## 1. Design Principles

### 1.1 Core visual principles
- **One idea per viewport.** Each section is composed around a single focal element with a full-screen rhythm. Density is a defect.
- **Editorial, not interface.** The page reads like set typography in space — serif headings lead, monospace labels mark structure, muted gray carries prose.
- **Dark luxury calm.** Near-black canvas, high-contrast white headings, generous stillness. The restraint is the premium signal.
- **Red is punctuation.** The accent marks exactly one thing per scene — a dot, a line, a glow, a single word — then disappears.

### 1.2 Editorial rules
- Headings and intro copy are centered; lists may left-align within the centered column.
- Body text never spreads edge to edge — it stays within a capped reading measure.
- Each section opens with a monospace label (e.g., `// 02 — ABOUT`).
- White is reserved for headings and focal words; long-form body stays muted gray.

### 1.3 Negative-space rules
- Every major section targets full-screen height with vertically centered content.
- If a section feels "full," remove an element or split it. Under-fill on purpose.
- Structure is created by space and hairline dividers — never by boxes, heavy borders, or shadows.

### 1.4 Red accent philosophy
- **Maximum one red moment per viewport.**
- Red is used for: a single highlighted word, a timeline node (current/future), a hover dot/line, link arrows on interaction, the GitHub contribution scale, and faint ambient glow.
- Red is **never** a large fill, never a button background covering wide area, never used decoratively in multiples, and **never replaced by green** in any state.

---

## 2. Color System

All values are exact HEX (with rgba where opacity is intrinsic). Dark-first; this is the only theme.

### 2.1 Background palette
| Token | HEX | Use |
|---|---|---|
| `bg-base` | `#0A0A0B` | Page canvas, the dominant black |
| `bg-deep` | `#060607` | Section vignette edges, footer base, deepest layer |
| `bg-raised` | `#101012` | Subtle elevation behind grouped content (used sparingly) |

### 2.2 Surface palette
| Token | HEX | Use |
|---|---|---|
| `surface-1` | `#121214` | Minimal card / row hover background (very subtle) |
| `surface-2` | `#17171A` | Mobile nav sheet, elevated overlay |
| `surface-contrast` | `#1C1C20` | GitHub graph empty-cell base, inset blocks |

### 2.3 Border palette
| Token | HEX / value | Use |
|---|---|---|
| `border-hairline` | `#1E1E22` | Default 1px dividers and hairlines |
| `border-subtle` | `rgba(255,255,255,0.06)` | Faint separators over varied backgrounds |
| `border-strong` | `#2A2A30` | Hover/active divider emphasis |

### 2.4 Typography palette (text colors)
| Token | HEX | Use |
|---|---|---|
| `text-primary` | `#F5F5F4` | Serif headings, focal words, hero statement |
| `text-body` | `#A1A1AA` | Paragraphs, descriptions (the calm default) |
| `text-muted` | `#71717A` | Metadata, secondary monospace labels, captions |
| `text-faint` | `#52525B` | Disabled, de-emphasized future states, footnotes |

### 2.5 Accent red palette
| Token | HEX | Use |
|---|---|---|
| `red-core` | `#E5484D` | Primary brand red — dots, lines, graph mid-steps, UI accents |
| `red-bright` | `#FF5C5C` | Red **text** and active hover (meets text contrast on black) |
| `red-dim` | `#B22A2E` | Future/aspirational states, low-intensity graph steps |
| `red-deep` | `#7A1D20` | Deepest graph step, pressed states |
| `red-glow` | `rgba(229,72,77,0.14)` | Ambient hero/footer glow (very low opacity) |
| `red-glow-soft` | `rgba(229,72,77,0.07)` | Particle tint, faint radial wash |

### 2.6 GitHub contribution scale (red replaces green entirely)
| Step | Token | HEX |
|---|---|---|
| 0 (empty) | `gh-0` | `#1C1C20` |
| 1 | `gh-1` | `#3D1417` |
| 2 | `gh-2` | `#7A1D20` |
| 3 | `gh-3` | `#B22A2E` |
| 4 (max) | `gh-4` | `#E5484D` |

### 2.7 Interaction states
| State | Rule | Tokens |
|---|---|---|
| **Hover (link/title)** | Text lifts toward white; a red dot/line/arrow appears | `text-body → text-primary`, accent `red-core` |
| **Hover (project/list row)** | Background to `surface-1`, leading red line, title to `text-primary` | `surface-1`, `red-core` |
| **Active / pressed** | Slightly dim accent, no large fill | `red-deep` |
| **Focus (keyboard)** | Visible focus ring, never removed | `red-bright` ring (see §8) |
| **Selected (filter tag)** | Monospace tag text to `red-bright`, hairline to `red-core` | `red-bright`, `red-core` |
| **Disabled** | Reduce to `text-faint`, no accent | `text-faint` |

---

## 3. Typography System

### 3.1 Font selections & justification

**Serif headings — `Fraunces` (variable).**
Justification: an editorial, high-contrast serif with optical-size and soft/wonky axes that reads as refined and human at large display sizes — exactly the "elegant serif heading" called for in `visual-direction.md`. Variable axes let large hero text feel crafted without shipping multiple files. Fallback stack: `Fraunces, "Times New Roman", Georgia, serif`.

**Monospace — `JetBrains Mono`.**
Justification: a true engineering monospace with excellent legibility at small sizes and a credible "systems-builder" signature for labels, metadata, dates, and tags. Pairs cleanly with a contrast serif. Fallback stack: `"JetBrains Mono", "SFMono-Regular", Menlo, Consolas, monospace`.

**Body — `Inter` (variable).**
Justification: a neutral, highly legible sans that recedes behind the serif, ideal for muted-gray prose and UI text across breakpoints. Fallback stack: `Inter, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`.

All three are loadable via `next/font` for self-hosting and zero layout shift (`NFR-PERF-2`).

### 3.2 Type scale (role-based)

Sizes use `rem` (root = 16px). Desktop values; responsive clamping in §3.3.

| Role | Font | Size | Weight | Line height | Letter spacing | Case |
|---|---|---|---|---|---|---|
| Hero heading | Fraunces | `4.5rem` (72px) | 400–500 | 1.04 | `-0.02em` | Sentence |
| Section heading | Fraunces | `3rem` (48px) | 400 | 1.1 | `-0.015em` | Sentence |
| Project title | Fraunces | `1.75rem` (28px) | 500 | 1.15 | `-0.01em` | Sentence |
| Sub-statement (serif) | Fraunces | `1.5rem` (24px) | 400 | 1.3 | `-0.01em` | Sentence |
| Body | Inter | `1.0625rem` (17px) | 400 | 1.7 | `0` | Sentence |
| Body small | Inter | `0.9375rem` (15px) | 400 | 1.6 | `0` | Sentence |
| Label (section) | JetBrains Mono | `0.8125rem` (13px) | 500 | 1.4 | `0.18em` | UPPERCASE |
| Metadata | JetBrains Mono | `0.8125rem` (13px) | 400 | 1.5 | `0.04em` | As written |
| Tag | JetBrains Mono | `0.75rem` (12px) | 500 | 1.3 | `0.08em` | UPPERCASE |
| Navigation | JetBrains Mono | `0.8125rem` (13px) | 500 | 1 | `0.1em` | UPPERCASE |

### 3.3 Responsive heading behavior
- **Hero heading:** `clamp(2.5rem, 7vw, 4.5rem)`.
- **Section heading:** `clamp(2rem, 5vw, 3rem)`.
- **Project title:** `clamp(1.375rem, 3vw, 1.75rem)`.
- Body and monospace remain fixed; only display serif scales fluidly.
- Letter spacing on labels tightens slightly on mobile (`0.14em`) to avoid wrapping.

---

## 4. Layout System

### 4.1 Widths
| Token | Value | Use |
|---|---|---|
| `measure-text` | `65ch` (~720px) | Editorial reading column for prose |
| `col-narrow` | `640px` | Hero stack, contact, centered statements |
| `col-content` | `880px` | Project/journey/writing lists |
| `page-max` | `1200px` | Outer max width; margins grow beyond this |
| `graph-max` | `760px` | GitHub contribution graph container |

Content is always centered; on screens wider than `page-max`, horizontal margins increase rather than content stretching (`visual-direction §11`).

### 4.2 Breakpoints (Tailwind-aligned)
| Name | Min width | Target |
|---|---|---|
| base | `0` | Mobile |
| `sm` | `640px` | Large mobile |
| `md` | `768px` | Tablet |
| `lg` | `1024px` | Desktop |
| `xl` | `1280px` | Large desktop |
| `2xl` | `1536px` | Extra-large desktop |

### 4.3 Responsive behavior
- **Mobile (base–sm):** single column; horizontal padding `1.5rem`; hero/section headings use the lower clamp bound; section min-height relaxes from `100vh` to `auto` with large vertical padding so content never clips; nav collapses to mobile sheet.
- **Tablet (md):** horizontal padding `2.5rem`; lists remain single column; spacing scale steps up one level.
- **Desktop (lg–xl):** full editorial rhythm; sections target `min-height: 100vh`, content vertically centered; persistent top nav.
- **Large desktop (2xl):** content stays at `page-max`; margins widen; type and spacing hold (no further upscaling) to preserve the calm measure.

---

## 5. Spacing System

### 5.1 Scale (4px base unit)
| Token | px | rem |
|---|---|---|
| `space-0` | 0 | 0 |
| `space-1` | 4 | 0.25 |
| `space-2` | 8 | 0.5 |
| `space-3` | 12 | 0.75 |
| `space-4` | 16 | 1 |
| `space-6` | 24 | 1.5 |
| `space-8` | 32 | 2 |
| `space-12` | 48 | 3 |
| `space-16` | 64 | 4 |
| `space-24` | 96 | 6 |
| `space-32` | 128 | 8 |
| `space-40` | 160 | 10 |
| `space-48` | 192 | 12 |

### 5.2 Section spacing
- **Section vertical padding:** desktop `space-40` to `space-48` top/bottom; tablet `space-32`; mobile `space-24`.
- **Section min-height:** `100vh` on `lg+`; `auto` below with the padding above.
- **Label → heading gap:** `space-6`.
- **Heading → body gap:** `space-8`.
- **Body → action/CTA gap:** `space-12`.

### 5.3 Component spacing
- **List item gap (projects/writing):** `space-16` desktop, `space-12` mobile, with a hairline divider centered in the gap.
- **Journey node gap:** `space-16` desktop, `space-12` mobile.
- **Inline metadata gap:** `space-3`.
- **Tag gap:** `space-2`.

### 5.4 Container padding
- Mobile `1.5rem`, tablet `2.5rem`, desktop `4rem` horizontal (margins grow beyond `page-max`).

### 5.5 Vertical rhythm
- Within a section, follow label → heading → body → action using the gaps in §5.2 consistently so every section shares the same internal cadence.

### 5.6 Grid spacing
- The system is column-list-first, not grid-first. Where a light grid is used (e.g., obsessions on `lg+`), use a 2-column layout with `space-12` gutter and `space-16` row gap. Never exceed 2 columns for content blocks.

---

## 6. Motion System

### 6.1 Duration scale
| Token | ms | Use |
|---|---|---|
| `dur-instant` | 0 | Reduced-motion end-state |
| `dur-fast` | 150 | Hover, link, dot/line reveal |
| `dur-base` | 280 | Section reveals, fades |
| `dur-slow` | 450 | Staggered list entrances, timeline node |
| `dur-slower` | 700 | Timeline spine draw, hero entrance |
| `dur-ambient` | 16000+ | Particle drift loop (very slow) |

### 6.2 Easing scale
| Token | Curve | Use |
|---|---|---|
| `ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveals and entrances (primary) |
| `ease-in-out-calm` | `cubic-bezier(0.45, 0, 0.55, 1)` | Transitions, hovers |
| `ease-linear` | `linear` | Ambient particle motion |

### 6.3 Reveal animations
- **Section reveal:** opacity `0 → 1`, translateY `16px → 0`, `dur-base`, `ease-out-soft`, triggered once when ~20% in view.
- **List stagger:** children offset by `60–80ms`, each `dur-slow`, `ease-out-soft`.
- **Timeline:** spine draws top→bottom over `dur-slower`; nodes fade/slide in sequence as they enter view.

### 6.4 Hover animations
- Title brightness shift and red dot/line/arrow appearance over `dur-fast`, `ease-in-out-calm`.
- Project/list row: background to `surface-1` + leading red line, slight `translateY(-2px)`. No shadow spectacle.

### 6.5 Scroll animations
- Gentle, transform/opacity only. No scroll-jacking, no aggressive parallax. Optional very subtle parallax (≤ 8px) on the hero glow only.

### 6.6 Page transitions
- Route changes (project/writing detail) use a quick cross-fade, `dur-base`, non-blocking.

### 6.7 prefers-reduced-motion behavior
- All entrances, staggers, the spine draw, and particle motion are disabled and replaced by static end-states (full opacity, final position).
- Particles render as a static sparse field or are removed entirely.
- Hover color/brightness changes are retained (they are not motion); positional lifts are removed.
- No information is ever conveyed by motion alone (`NFR-A11Y-2`).

---

## 7. Component Styling Rules

These operationalize `visual-direction.md` §3–9. No new components; styling rules only.

### 7.1 Navbar
- Fixed top, transparent over `bg-base`; gains `border-hairline` bottom + faint `surface-2` backdrop blur after scroll.
- Links: navigation monospace style (§3.2), `text-muted` → `text-primary` on hover, active section marked by a small `red-core` dot.
- Height ~`space-16`; horizontal padding matches container.

### 7.2 Hero
- Full-screen, vertically centered, `col-narrow`, centered text.
- Ambient particle field + faint `red-glow` radial behind the heading.
- Stack: monospace role line (`text-muted`) → hero heading (one focal word in `red-bright`) → subheadline (`text-body`) → two restrained CTAs (text/outline, primary marked by `red-core` dot/arrow).
- Bottom scroll cue in monospace `text-faint`.

### 7.3 About
- Own viewport, `measure-text`, centered. Label `// ABOUT`.
- Serif sub-statement (one focal word or thin `red-core` underline) + 2–3 `text-body` paragraphs. No cards.

### 7.4 Obsessions
- Own viewport. Single calm column (2-col only on `lg+`). Label `// OBSESSIONS`.
- Row: monospace index (`text-muted`) + serif term (`text-primary`) + one `text-body` line; hairline divider between rows; hovered row reveals `red-core` dot/leading line.

### 7.5 Projects
- Own section. Label `// SELECTED WORK`. Vertical editorial blocks, hairline dividers, `space-16` gaps.
- Block: monospace meta line (year · role · theme tags) → project title (Fraunces) → 1–2 `text-body` lines → monospace links (`live ↗`, `repo ↗`) with red arrow on hover.
- Hover: `surface-1` background, leading `red-core` line, title → `text-primary`, ≤2px lift. No drop shadows, no 3-up grid.

### 7.6 Experience
- Own section. Label `// EXPERIENCE`. Vertical list mirroring projects' restraint.
- Entry: monospace org + timeframe (`text-muted`) → role (serif or strong body, `text-primary`) → one `text-body` impact line; hairline dividers. Education entry shares the same row pattern.

### 7.7 Journey
- Own section. Label `// JOURNEY`. Single vertical spine (`border-hairline`), nodes attached.
- Node dot: `text-muted`/gray for past, `red-core` for current, `red-dim` for future/aspirational; future text dimmed to `text-faint`.
- Node: monospace date/phase + serif milestone title + one `text-body` line. Spine draws on scroll; nodes stagger in.

### 7.8 OSS
- Own section. Label `// OPEN SOURCE`. Editorial prose + short contribution list tying to GSoC intent.
- Contribution rows: monospace repo/PR ref + `text-body` impact line + link with red hover arrow; hairline dividers.

### 7.9 GitHub
- Own standalone section. Label `// GITHUB`. Centered, `graph-max`.
- Short serif framing line → contribution graph using the `gh-0…gh-4` red scale (never green) → understated monospace stats line → short recent-repos list (monospace name, `text-body` description, monospace language tag), hairline dividers.
- Fallback: identical calm layout renders cached snapshot or a quiet `text-muted` placeholder line — never an error/empty box.

### 7.10 Writing
- Own section. Label `// WRITING`. Vertical list within `col-content`.
- Entry: monospace date → serif title → `text-body` summary → optional monospace category tag; hairline dividers; hovered title → `text-primary` + red dot.
- Empty state: one serif line ("Notes are on the way.") + `text-muted` sub-line. Must look composed.

### 7.11 Contact
- Final full section, centered, `col-narrow`. Label `// CONTACT`.
- Large serif invitation → primary email link (`text-body` → `text-primary`, `red-core` underline/dot) → monospace profile row separated by middots/hairlines.

### 7.12 Footer
- Minimal over `bg-deep`. Small monospace attribution (`text-faint`) + copyright/coordinates line. Optional faint `red-glow` bookending the hero. No link columns, no social icon grid.

---

## 8. Accessibility Rules

### 8.1 Contrast requirements
- Body and UI text meet **WCAG AA**: `text-body #A1A1AA` on `bg-base #0A0A0B` ≈ 8:1; `text-primary #F5F5F4` ≈ 18:1.
- **Red text uses `red-bright #FF5C5C`** (≈ 7:1 on `bg-base`) to satisfy AA; `red-core #E5484D` is reserved for non-text accents (dots, lines, graph, glow) and large-only emphasis.
- `text-faint #52525B` is used only for non-essential, decorative, or large secondary text (≈ 4.6:1) and never for primary content.
- GitHub graph cells encode data by step + are accompanied by monospace counts so meaning never relies on color alone.

### 8.2 Focus styles
- Visible focus ring on all interactive elements: 2px `red-bright` outline with 2px offset against `bg-base`. Focus styles are **never** removed; `:focus-visible` is used to avoid noise on pointer interactions.

### 8.3 Keyboard navigation
- All nav links, CTAs, project/writing/repo links, and filter tags are reachable and operable by keyboard in logical DOM order.
- Mobile nav sheet is focus-trapped while open and dismissible via `Esc`.
- A skip-to-content link precedes the navbar.
- Anchored section navigation moves focus to the target section heading.

### 8.4 Motion accessibility
- `prefers-reduced-motion: reduce` disables entrances, staggers, spine draw, and particle motion (§6.7).
- No flashing/strobing; ambient motion is slow and low-contrast.
- Color/brightness hover feedback is retained under reduced motion so affordances remain.

---

## 9. Design Tokens

Centralized token set (the single source of visual truth, consumed via Tailwind theme extension per `architecture §0` and `§9.1`). Names are canonical; values defined above.

### 9.1 Color tokens
```
color.bg.base            #0A0A0B
color.bg.deep            #060607
color.bg.raised          #101012
color.surface.1          #121214
color.surface.2          #17171A
color.surface.contrast   #1C1C20
color.border.hairline    #1E1E22
color.border.subtle      rgba(255,255,255,0.06)
color.border.strong      #2A2A30
color.text.primary       #F5F5F4
color.text.body          #A1A1AA
color.text.muted         #71717A
color.text.faint         #52525B
color.red.core           #E5484D
color.red.bright         #FF5C5C
color.red.dim            #B22A2E
color.red.deep           #7A1D20
color.red.glow           rgba(229,72,77,0.14)
color.red.glowSoft       rgba(229,72,77,0.07)
color.gh.0               #1C1C20
color.gh.1               #3D1417
color.gh.2               #7A1D20
color.gh.3               #B22A2E
color.gh.4               #E5484D
```

### 9.2 Typography tokens
```
font.serif               Fraunces, "Times New Roman", Georgia, serif
font.mono                "JetBrains Mono", Menlo, Consolas, monospace
font.sans                Inter, -apple-system, "Segoe UI", Arial, sans-serif

size.hero                clamp(2.5rem, 7vw, 4.5rem)
size.section             clamp(2rem, 5vw, 3rem)
size.projectTitle        clamp(1.375rem, 3vw, 1.75rem)
size.subStatement        1.5rem
size.body                1.0625rem
size.bodySm              0.9375rem
size.label               0.8125rem
size.meta                0.8125rem
size.tag                 0.75rem

weight.regular           400
weight.medium            500

leading.tight            1.04
leading.heading          1.1
leading.snug             1.3
leading.body             1.7

tracking.heading         -0.02em
tracking.label           0.18em
tracking.nav             0.1em
tracking.tag             0.08em
```

### 9.3 Spacing tokens
```
space.0 0 · space.1 4 · space.2 8 · space.3 12 · space.4 16
space.6 24 · space.8 32 · space.12 48 · space.16 64 · space.24 96
space.32 128 · space.40 160 · space.48 192   (px)
```

### 9.4 Radius tokens
```
radius.none   0px      (default for editorial blocks/dividers)
radius.xs     2px      (tags, small accents)
radius.sm     4px      (minimal hover surfaces)
radius.md     8px      (mobile nav sheet, rare elevated overlay)
radius.pill   9999px   (small dots, scroll cue)
```
Sharp/near-sharp by default; rounding is the exception, never on content blocks.

### 9.5 Border tokens
```
border.width.hairline   1px
border.color.hairline   color.border.hairline
border.color.subtle     color.border.subtle
border.color.strong     color.border.strong
```
Borders are hairline dividers only — no box outlines around content.

### 9.6 Motion tokens
```
dur.instant 0 · dur.fast 150 · dur.base 280 · dur.slow 450 · dur.slower 700 · dur.ambient 16000   (ms)
ease.outSoft     cubic-bezier(0.22, 1, 0.36, 1)
ease.inOutCalm   cubic-bezier(0.45, 0, 0.55, 1)
ease.linear      linear
stagger.list     70ms
reveal.offsetY   16px
```

---

## 10. Implementation Notes

> Constraints only — no code.

### 10.1 Tailwind CSS
- Extend the Tailwind theme with the §9 tokens (colors, fontFamily, fontSize with paired line-height/tracking, spacing, borderRadius, transitionTimingFunction, transitionDuration). Do not use arbitrary values in components for anything a token covers — components reference token-backed utilities only.
- Map breakpoints to §4.2. Keep the default `2xl` cap and avoid upscaling content beyond `page-max`.
- Define semantic utility intent (e.g., section label, editorial measure, hairline divider) via theme extension + a small set of component classes; avoid one-off magic numbers.
- Dark-first: the dark palette is the base theme, not a `dark:` variant. No light theme is defined.
- Enforce the reading measure with a max-width utility tied to `measure-text`/`col-*`; never let prose containers stretch to full width.

### 10.2 shadcn/ui
- Use shadcn primitives as **unstyled/low-styled structural bases** (button, separator, navigation/sheet for mobile nav, card shell) and restyle them entirely through the tokens — strip default radii/shadows to match the editorial, near-sharp, shadow-free aesthetic.
- Override the shadcn CSS variable layer so its `background`, `foreground`, `border`, `muted`, `accent`, and `ring` map to the §9 tokens (accent/ring → red family, border → hairline).
- Do not adopt shadcn default component density or rounded card styling; align every primitive to §7 component rules.
- Buttons are text/outline-led; no large filled accent buttons (red stays punctuation).

### 10.3 Framer Motion
- Centralize a `MotionConfig` (reduced-motion aware) at the root; all motion primitives read durations/easings from §9.6 tokens, never hardcoded values.
- Provide a thin reusable primitive layer (`Reveal`, `Stagger`, `Parallax`, timeline spine/nodes, page-transition wrapper) per `architecture §9`; sections compose these rather than embedding motion logic.
- Animate only `transform` and `opacity`. Defer/lazy-mount the particle background and cap its cost; ensure it never blocks LCP.
- Every animated element declares a static end-state so reduced-motion and no-JS scenarios render complete content.
- Respect `prefers-reduced-motion` globally via the root config (single switch), matching §6.7.

---

*End of design system. Defines tokens and styling rules only; contains no implementation code. Fully consistent with `spec.md`, `architecture.md`, and `visual-direction.md`; no sections added, IA unchanged.*
