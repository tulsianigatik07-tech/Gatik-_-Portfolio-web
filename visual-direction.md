# Visual Direction — Gatik Tulsiani Portfolio

**Document type:** Visual Direction / Art Direction
**Author role:** Senior Frontend Designer × Staff Frontend Engineer
**Source documents:** `spec.md`, `tasks.md`, `architecture.md`
**Reference rhythm:** Calm, editorial, one-focused-section-per-viewport (inspiration only — no cloning)

> Defines visual language and layout intent only. No implementation code.

---

## 1. Overall Design Philosophy

The portfolio is a **quiet, confident editorial experience** — closer to a well-set print essay than a web dashboard. The visitor scrolls through a sequence of calm, single-focus scenes. Each scene says one thing, says it large, and gives it room to breathe.

Three governing ideas:

- **One idea per viewport.** Every section is composed to occupy roughly a full screen with a single dominant focal point. Scrolling feels like turning pages, not scanning a feed.
- **Negative space is the primary material.** Emptiness is intentional and generous. Content sits in a narrow, centered editorial column surrounded by deep black. The restraint *is* the premium signal.
- **Red is punctuation, never paint.** The accent appears as a small dot, a thin line, a faint glow, or a single highlighted word. It draws the eye to one thing per scene and then disappears.

The mood: **dark luxury, systems-builder calm.** Refined serif headings establish authority; monospace labels add an engineering signature; thin dividers and muted gray body text keep everything composed and unhurried.

---

## 2. Section-by-Section Layout Rules (global)

These rules apply to every section unless a section below overrides them.

- **Viewport ownership:** Each major section targets ~100vh of vertical space (min-height full screen) with content vertically centered. Sections never crowd each other.
- **Editorial column:** Content lives in a centered column, roughly 60–72ch max width for text. The page never uses the full viewport width for reading content.
- **Centered alignment:** Headings and intro copy are centered. Lists (projects, journey, writing) may left-align within the centered column for scannability.
- **Section label:** Each section opens with a small monospace, uppercase, letter-spaced label in muted gray or red (e.g., `// 02 — ABOUT`). This is the engineering signature and the wayfinding device.
- **Heading:** One large white serif heading per section. It is the loudest element on screen.
- **Divider discipline:** A single thin hairline divider (1px, low-opacity gray) may separate a label from content or close a section. Never box content in. Never use heavy borders.
- **One accent per scene:** At most one red moment per viewport — a dot, an underline, a glow, or a highlighted word.
- **Breathing room above and below:** Large vertical padding top and bottom so the section feels isolated, not stacked.

### Type roles (recap for layout use)
- **Serif (white):** section headings, hero statement, project titles.
- **Monospace (muted gray / red):** labels, metadata, dates, tags, counts, coordinates.
- **Sans body (muted gray):** paragraphs and descriptions. Never pure white for long text — keep it calm.

---

## 3. Hero Layout

**Intent:** Identity in one breath. The first viewport must answer "who and what" before any scroll (`G1`, `FR-HERO-1..4`).

- **Composition:** Full-screen, vertically centered, centered text. Nothing else competes.
- **Background:** Near-black with a **subtle ambient particle field** drifting slowly — sparse, low-opacity dots, a few tinted faint red. Motion is barely perceptible; it suggests "system running," not decoration.
- **Stack (top to bottom), centered:**
  1. Small monospace availability/role line (e.g., `AI ENGINEERING · OPEN SOURCE · DUBAI`) in muted gray.
  2. Large serif headline: *"I build AI systems. I learn by shipping them."* — the single highlighted word (e.g., **systems** or **shipping**) may carry the red accent.
  3. One line of muted-gray subheadline (the CS-student positioning).
  4. Two restrained CTAs (e.g., *View Projects*, *Contact*) — text links or thin-outline buttons, not filled blocks. A small red dot or arrow may mark the primary.
- **Optional:** a faint red glow pooling behind the headline, very low opacity, to lift it off the black.
- **Scroll cue:** a small monospace `↓ scroll` or a thin animated line at the bottom — minimal.
- **Forbidden:** no stats row, no logos strip, no multiple columns, no imagery clutter. The hero holds nothing but identity.

---

## 4. About / Obsessions Layout

Two separate viewports. Do not merge them.

### About
- **Composition:** Centered editorial column, one screen. Section label `// ABOUT`.
- **Content:** One serif sub-statement (a short, human line) followed by 2–3 short muted-gray paragraphs — the "learn by shipping" narrative and the University of Wollongong Dubai context.
- **Accent:** a single highlighted word or a thin red underline beneath the sub-statement. Nothing more.
- **No cards.** About is pure prose in space.

### Obsessions
- **Composition:** Its own viewport. Section label `// OBSESSIONS`.
- **Layout:** A clean vertical or lightly gridded list of focus areas (AI Engineering, Open Source, Developer Tools, Systems Design, Repository Intelligence, Retrieval Systems). Prefer a **single calm column** of rows over a dense grid.
- **Each obsession row:** a monospace index (`01`, `02`…), a serif or strong-weight term, and one muted-gray line of *why it matters*. A thin divider separates rows.
- **Accent:** the active/hovered row reveals a small red dot or a red leading line. One at a time.
- **Forbidden:** no colorful tag clouds, no icon grids, no boxed tiles.

---

## 5. Projects Layout

**Intent:** Minimal, confident project cards that read as engineering artifacts (`FR-PROJ-1..2`).

- **Composition:** Its own section, generous spacing. Section label `// SELECTED WORK` or `// PROJECTS`.
- **Card style:** **Minimal and borderless or hairline-bordered.** Each project is a horizontal editorial block, not a glossy tile:
  - Monospace metadata line: index + year + role + theme tags (`2025 · BUILDER · AI / SYSTEMS`).
  - Large white serif project title (Giro, Suryami Portal, Open Source Journey).
  - One or two lines of muted-gray description leading with the problem and the engineering significance.
  - Thin monospace links (`live ↗`, `repo ↗`) in muted gray; arrow or dot turns red on hover.
- **Rhythm:** Stack projects vertically with a thin hairline divider between each, and substantial vertical gap. One project dominates the eye at a time as you scroll.
- **Hover:** subtle — title brightens to full white, a red dot or red leading line appears, slight lift. No heavy shadows, no image zoom spectacle.
- **Forbidden:** no 3-up card grid crammed into one screen, no drop-shadow boxes, no gradient cards, no screenshot-heavy tiles competing for attention.

---

## 6. Journey Timeline Layout

**Intent:** A vertical narrative the eye follows downward — the story from learning to program to future GSoC / AI Engineer goals (`FR-JOUR-1..3`).

- **Composition:** Dedicated full section. Section label `// JOURNEY`.
- **Structure:** A **single vertical spine** — one thin vertical line running down the center or left of the editorial column.
- **Milestones:** Nodes attached to the spine, revealed one by one on scroll. Each node:
  - A small dot on the line (muted gray for past, **red for the current/active and for future/aspirational goals** to mark direction).
  - Monospace date/phase label.
  - Serif milestone title + one tight muted-gray line (the spec's "one sentence per milestone" guidance).
- **Past vs. future distinction:** past milestones use solid gray dots and full-opacity text; future/aspirational milestones (GSoC, AI Engineer) use a red dot and slightly dimmed or outlined treatment to read as "ahead, not yet reached."
- **Motion:** the spine "draws" downward and nodes fade/slide in as they enter view (see §10).
- **Forbidden:** no horizontal scrolling timeline, no two-sided zigzag that fights the calm rhythm unless spacing stays generous; prefer a single clean vertical read.

---

## 7. GitHub Activity Layout

**Intent:** Proof of liveness, presented as its **own calm section** — not a data dashboard (`FR-GH-1..4`).

- **Composition:** Standalone full section. Section label `// GITHUB` or `// ACTIVITY`. Never combined with hero, projects, or obsessions in one screen.
- **Stack (centered column):**
  1. A short serif line framing the section ("Where I build in the open").
  2. **Contribution graph** rendered in a restrained monochrome-plus-red scale: empty cells near-black, active cells stepping up through muted reds (red replaces the conventional green entirely). Generous margins; the graph is a quiet artifact, not a wall.
  3. A small monospace stats line (contributions, streak) — understated.
  4. **Recent repositories** as a short vertical list of minimal rows: monospace repo name, one muted-gray description line, small language/tag in monospace. Hairline dividers between rows.
- **Fallback state:** if live data is unavailable, the same calm layout renders a cached snapshot or a quiet placeholder line — never an error or empty box (`FR-GH-4`, `SM-9`).
- **Forbidden:** no green heatmap, no dense multi-widget dashboard, no charts cluttering the viewport. One graph, a few repos, lots of space.

---

## 8. Writing Layout

**Intent:** A future-proofed, intentional section that looks deliberate even when sparse or empty (`FR-WRITE-1..2`).

- **Composition:** Its own section. Section label `// WRITING` or `// NOTES`.
- **Layout:** A simple vertical list of entries in the centered column:
  - Monospace date on the left or above.
  - Serif entry title.
  - One muted-gray summary line.
  - Optional monospace category tag (`SYSTEM DESIGN`, `OSS`, `AI ENG`).
  - Thin divider between entries.
- **Empty/sparse state:** if there are no entries, show one calm serif line such as *"Notes are on the way."* plus a muted-gray sub-line. The section must look composed, not broken.
- **Accent:** hovered title brightens; a small red dot or arrow appears. One accent at a time.
- **Forbidden:** no blog-card grid, no thumbnails, no excerpt walls.

---

## 9. Contact Layout

**Intent:** A quiet, inviting close — low friction, aligned to the aesthetic (`FR-CON-1..3`).

- **Composition:** Final full section, vertically centered, centered text. Section label `// CONTACT`.
- **Stack:**
  1. One large serif line — a direct invitation ("Let's build something." / "Reach out.").
  2. A primary email link in muted-gray-to-white, with a subtle red underline or red dot accent.
  3. A short monospace row of profile links (GitHub, etc.) separated by thin dividers or middots.
- **Footer:** minimal — small monospace attribution and a copyright/coordinates line. Optional faint red glow at the very bottom to bookend the hero glow.
- **Forbidden:** no contact form wall, no social icon grid, no busy footer with link columns.

---

## 10. Motion Rules

Motion reads as **craft and calm**, never spectacle (`FR-HERO-5`, `NFR-A11Y-2`, `NFR-PERF-3`).

- **Ambient particles:** slow, sparse, low-opacity drift in the hero (and optionally faintly site-wide). A few particles tinted red. Pausable and disabled under reduced motion.
- **Section reveals:** content fades up gently (opacity + small translateY) as it enters the viewport. Subtle stagger for list items (projects, journey nodes, writing entries).
- **Timeline:** the vertical spine draws downward; nodes appear in sequence as the user scrolls.
- **Hover micro-interactions:** title brightening, a red dot/line appearing, slight lift on links and project rows. Fast, soft easing.
- **Scroll feel:** smooth, unhurried. No aggressive parallax, no scroll-jacking, no elements flying across the screen.
- **Transitions:** route/page transitions (project and writing detail) are quick fades — never blocking.
- **Reduced motion:** all of the above degrade to instant, static end-states. No information depends on animation.
- **Performance:** animate only `transform` and `opacity`; expensive effects (particles) are lazy and capped.

---

## 11. Spacing Rules

Spacing is the core of the premium feel.

- **Section padding:** very large vertical padding (top and bottom) so each section stands alone — think generous, not cramped. Sections target full-screen height with content centered.
- **Reading column:** text capped around 60–72ch; the page never spreads body copy edge to edge.
- **Vertical rhythm:** consistent large gaps between label → heading → body → action within a section. Let the heading float with space above it.
- **List spacing:** projects, journey nodes, and writing entries get substantial gaps between items plus a hairline divider — one item dominates at a time.
- **Dividers:** 1px, low-opacity, short or full-width hairlines only. Used sparingly as breathing punctuation, not as containers.
- **Edges:** comfortable, consistent horizontal page margins that widen on large screens (content stays centered, margins grow).
- **Density target:** if a section feels "full," remove something or split it. Under-fill on purpose.

---

## 12. What to Avoid

- **No green accents** anywhere — the contribution graph and every active state use red, never green.
- **No dense dashboard layouts** — this is an editorial scroll, not an admin panel.
- **No combining sections** — hero, obsessions, projects, and GitHub each own their own viewport; never stack them into one screen.
- **No overfilling** — generous negative space is mandatory; resist adding rows, stats, or widgets.
- **No card-grid walls** — projects and writing are vertical editorial lists, not 3-up tile grids.
- **No green heatmap** for GitHub — monochrome + red scale only.
- **No excessive gradients, glows, or color** — red is punctuation; one accent per viewport.
- **No heavy boxes, drop shadows, or borders** — hairline dividers and space do the structuring.
- **No startup / agency / generic-AI styling** — no big filled CTA banners, no logo clouds, no feature-grid marketing tropes.
- **No scroll-jacking or aggressive parallax** — keep scrolling calm and natural.
- **No cloning the reference** — match the *rhythm and restraint*, not the layout or components (`spec §8.8`).
- **No pure-white body text walls** — long copy stays muted gray to preserve calm; white is reserved for headings and focal words.

---

*End of visual direction. Defines visual language and layout intent only; contains no implementation code.*
