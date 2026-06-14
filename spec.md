# Software Specification — Gatik Tulsiani Portfolio Website

**Document type:** Product & Engineering Specification
**Owner:** Gatik Tulsiani
**Status:** Draft v1.0
**Last updated:** 2026-06-14

---

## 1. Executive Summary

This document specifies a premium, engineering-focused personal portfolio website for **Gatik Tulsiani**, a Computer Science student specializing in AI Engineering, Open Source Software (OSS), and production systems.

The site is positioned as a **personal brand asset** rather than a generic resume page. Its purpose is to let a visitor — within seconds — understand who Gatik is, what he builds, what he is currently working on, and the trajectory of his engineering journey. It doubles as a credibility instrument for internship applications, future Google Summer of Code (GSoC) applications, and OSS maintainer outreach.

The aesthetic direction is **Premium Engineering**: a black canvas, a Giro-inspired red accent system, elegant serif headings paired with monospace metadata, and restrained, high-quality motion. The reference site `https://www.ayush.works` informs *quality bar and craft* only — typography, hierarchy, animation feel, and information architecture — and must never be cloned, copied, or replicated component-for-component.

The deliverable described here is the specification itself. No code, task breakdown, or directory structure is produced as part of this document.

---

## 2. Goals

### 2.1 Primary Goals
- **G1 — Instant comprehension.** A first-time visitor understands Gatik's identity and value within 5 seconds of landing.
- **G2 — Engineering credibility.** Convey depth and seriousness as a systems-and-AI builder, not a tutorial-follower.
- **G3 — Living portfolio.** Surface real, current GitHub and OSS activity so the site feels alive, not static.
- **G4 — Narrative journey.** Tell a coherent story from "learning to program" to "future AI Engineer / GSoC contributor."
- **G5 — Application-ready.** Serve as a shareable link for internships, GSoC, and maintainer introductions.

### 2.2 Secondary Goals
- **G6 — Effortless extensibility.** New projects, experiences, writing entries, and timeline milestones can be added with minimal friction.
- **G7 — Performance & reach.** Fast, accessible, SEO-discoverable, and deployable on Vercel.
- **G8 — Distinctive identity.** A visual signature (the engineering + red-accent aesthetic) that is memorable and original.

### 2.3 Non-Goals
- Not a blog platform with comments, CMS dashboards, or multi-author support.
- Not an e-commerce or transactional product.
- Not a clone of the reference site.
- Not a generic "AI startup" or agency landing page.

---

## 3. User Personas

### Persona 1 — The Recruiter / Hiring Manager
- **Context:** Reviewing many candidates quickly, often on mobile.
- **Needs:** Fast signal on skills, real projects, current activity, and contactability.
- **Success:** Finds the hero, projects, and contact within seconds; leaves with a clear impression and a way to reach out.

### Persona 2 — The OSS Maintainer
- **Context:** Evaluating whether Gatik is a serious potential contributor.
- **Needs:** Evidence of real contributions, GitHub activity, and understanding of OSS workflow.
- **Success:** Sees the OSS section, contribution graph, and project depth; trusts the candidate enough to engage.

### Persona 3 — The Founder / Engineer Peer
- **Context:** Curious about the person behind a project or referral.
- **Needs:** Substance — architecture thinking, what was built and why, technical taste.
- **Success:** Reads project writeups and the journey timeline; respects the engineering craft.

### Persona 4 — The GSoC / Program Reviewer
- **Context:** Assessing fit for a structured open-source program.
- **Needs:** A demonstrated OSS trajectory and stated GSoC intent.
- **Success:** The journey timeline and OSS section make the GSoC ambition credible and well-supported.

### Persona 5 — Gatik (Content Owner)
- **Context:** Maintaining the site over time.
- **Needs:** Add projects, experiences, writing, and milestones without re-architecting anything.
- **Success:** Updates content quickly and the site stays cohesive.

---

## 4. Functional Requirements

Requirements use the convention **FR-[Section]-[n]**. Priority: **P0** (must-have for launch), **P1** (important), **P2** (future-proofing).

### 4.1 Hero
- **FR-HERO-1 (P0):** Display name "Gatik Tulsiani" prominently.
- **FR-HERO-2 (P0):** Display headline "I build AI systems. I learn by shipping them."
- **FR-HERO-3 (P0):** Display subheadline "Computer Science student focused on AI Engineering, Open Source Software, and Production Systems."
- **FR-HERO-4 (P0):** Provide clear primary calls-to-action (e.g., view projects, contact).
- **FR-HERO-5 (P1):** Include subtle, high-quality entrance animation that respects reduced-motion preferences.
- **FR-HERO-6 (P1):** Surface lightweight metadata (role, focus, location/availability) in a monospace treatment.

### 4.2 About
- **FR-ABOUT-1 (P0):** Concise narrative of who Gatik is (CS student, AI Engineering focus, University of Wollongong Dubai — Bachelor of Computer Science, AI & Big Data).
- **FR-ABOUT-2 (P0):** Communicate the "learn by shipping" philosophy.
- **FR-ABOUT-3 (P1):** Reference primary interests: AI Engineering, Open Source, Developer Tools, Systems Design, Full Stack Engineering, Repository Intelligence, Retrieval Systems.

### 4.3 Obsessions
- **FR-OBS-1 (P0):** Present the themes/areas Gatik is deeply focused on (the "obsessions") as a distinct, scannable section.
- **FR-OBS-2 (P1):** Each obsession includes a short framing of *why* it matters to him.
- **FR-OBS-3 (P2):** Obsessions are content-driven so they can be reordered or extended easily.

### 4.4 Projects
- **FR-PROJ-1 (P0):** Showcase featured projects with title, summary, role, tech context, and links.
  - Giro — Repository Intelligence Platform
  - Suryami Portal — B2B Airport Transfer Platform
  - Open Source Journey — GSoC-oriented OSS contribution journey
- **FR-PROJ-2 (P0):** Each project clearly communicates the problem, what was built, and the engineering significance.
- **FR-PROJ-3 (P0):** New projects must be addable as data entries without structural redesign.
- **FR-PROJ-4 (P1):** Support an optional detailed view or expanded writeup per project.
- **FR-PROJ-5 (P1):** Provide external links (live, repository) where available.
- **FR-PROJ-6 (P2):** Support tagging/filtering by theme (AI, OSS, Systems, Full Stack).

### 4.5 Experience
- **FR-EXP-1 (P0):** List professional/engineering experience with organization, role, and timeframe:
  - University of Wollongong Dubai
  - AI Research Intern
  - RS Jewellers
  - Independent Builder
- **FR-EXP-2 (P0):** Each entry summarizes contribution and impact.
- **FR-EXP-3 (P1):** Entries are data-driven and easily extendable.

### 4.6 Journey Timeline
- **FR-JOUR-1 (P0):** Present a chronological narrative covering: learning programming → university → first projects → production systems → OSS contributions → future GSoC goal → future AI Engineer goal.
- **FR-JOUR-2 (P0):** The timeline must read as a *story* of progression, not a flat list.
- **FR-JOUR-3 (P1):** Visually distinguish past milestones from future/aspirational ones.
- **FR-JOUR-4 (P2):** New milestones are addable as ordered data entries.

### 4.7 OSS Section
- **FR-OSS-1 (P0):** Highlight open-source contributions and OSS journey.
- **FR-OSS-2 (P0):** Connect the OSS narrative to the GSoC ambition.
- **FR-OSS-3 (P1):** Link to contributions, PRs, or repositories where available.

### 4.8 GitHub Activity
- **FR-GH-1 (P0):** Display a GitHub contribution graph.
- **FR-GH-2 (P0):** Show recent repositories.
- **FR-GH-3 (P1):** Surface recent OSS activity and recent engineering work.
- **FR-GH-4 (P1):** Define a graceful fallback/empty state if live data is unavailable (e.g., cached snapshot or static placeholder) so the section never appears broken.
- **FR-GH-5 (P2):** Define an explicit data-refresh strategy (live fetch, scheduled cache, or build-time snapshot).

### 4.9 Writing
- **FR-WRITE-1 (P0):** Provide a writing section structured for engineering articles, OSS learnings, AI engineering notes, and system design writeups.
- **FR-WRITE-2 (P0):** The section must be future-proof — it can exist gracefully with zero entries at launch and scale as content is added.
- **FR-WRITE-3 (P1):** Each entry supports title, date, summary, and link/route.
- **FR-WRITE-4 (P2):** Support categorization by writing type.

### 4.10 Contact
- **FR-CON-1 (P0):** Provide clear ways to reach Gatik (email and/or primary professional channels).
- **FR-CON-2 (P0):** Link to key profiles (GitHub and other relevant platforms).
- **FR-CON-3 (P1):** Present contact in an inviting, low-friction way aligned to the engineering aesthetic.

### 4.11 Global / Cross-Cutting
- **FR-GLOBAL-1 (P0):** Consistent navigation across all core sections (Hero, About, Obsessions, Projects, Experience, Journey, OSS, GitHub, Writing, Contact).
- **FR-GLOBAL-2 (P0):** Content (projects, experience, timeline, writing, obsessions) is data-driven to satisfy extensibility goals.
- **FR-GLOBAL-3 (P1):** Smooth in-page navigation and section anchoring.
- **FR-GLOBAL-4 (P1):** Consistent metadata/footer with attribution and links.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **NFR-PERF-1:** Fast first load; target strong Core Web Vitals (good LCP, low CLS, responsive INP).
- **NFR-PERF-2:** Optimized assets (images, fonts) with appropriate loading strategies.
- **NFR-PERF-3:** Animations must not degrade scroll or interaction performance.

### 5.2 Responsiveness
- **NFR-RESP-1:** Fully mobile responsive across common breakpoints (mobile, tablet, desktop, large desktop).
- **NFR-RESP-2:** Touch-friendly interactions; no hover-only critical actions.

### 5.3 Accessibility
- **NFR-A11Y-1:** Target WCAG 2.1 AA as a guiding standard (semantic structure, color contrast, keyboard navigability, focus states, alt text). *(Full conformance requires manual testing with assistive technologies.)*
- **NFR-A11Y-2:** Honor `prefers-reduced-motion`; provide non-animated equivalents.
- **NFR-A11Y-3:** Ensure the red-on-black accent system meets contrast requirements for text and interactive elements.

### 5.4 SEO & Discoverability
- **NFR-SEO-1:** Semantic HTML, descriptive titles, and meta descriptions.
- **NFR-SEO-2:** Open Graph / social share metadata for rich link previews.
- **NFR-SEO-3:** Sitemap and crawler-friendly structure.

### 5.5 Reliability & Production Readiness
- **NFR-REL-1:** Graceful handling of failed external data (notably GitHub) with fallbacks.
- **NFR-REL-2:** No broken sections or dead links in the launched build.

### 5.6 Deployability
- **NFR-DEPLOY-1:** Vercel-deployable with straightforward configuration.
- **NFR-DEPLOY-2:** Any secrets (e.g., API tokens for GitHub data) handled via environment configuration, never committed.

### 5.7 Maintainability
- **NFR-MAINT-1:** Content separated from presentation so non-structural updates are low-effort.
- **NFR-MAINT-2:** Cohesive design tokens so visual consistency is preserved as content grows.

### 5.8 Security & Privacy
- **NFR-SEC-1:** No exposure of private credentials in client code.
- **NFR-SEC-2:** Respect rate limits and terms of any third-party data source (GitHub).

---

## 6. Information Architecture

### 6.1 Section Order (single-page primary flow)
1. **Hero** — identity, headline, primary CTAs.
2. **About** — narrative and philosophy.
3. **Obsessions** — focus themes.
4. **Projects** — featured engineering work.
5. **Experience** — roles and contributions.
6. **Journey Timeline** — progression story.
7. **OSS Section** — open-source contributions and GSoC narrative.
8. **GitHub Activity** — contribution graph, recent repos, recent work.
9. **Writing** — articles and notes (future-proofed).
10. **Contact** — reach-out and profile links.

### 6.2 Navigation Model
- Persistent top-level navigation referencing the core sections.
- Smooth anchored scrolling within the primary page.
- Optional dedicated detail routes for individual projects and writing entries (P1/P2), kept consistent with the global aesthetic.

### 6.3 Content Hierarchy Principles
- **Identity first:** Hero communicates the essentials before any scroll.
- **Proof in the middle:** Projects, Experience, and Journey carry the credibility weight.
- **Liveness as evidence:** OSS and GitHub sections demonstrate ongoing activity.
- **Forward-looking close:** Writing and Contact invite continued engagement.

---

## 7. Content Strategy

### 7.1 Voice & Tone
- Confident, precise, and engineering-grounded. Show, don't oversell.
- Avoid hype language and buzzword density. Favor concrete artifacts (what was built, why it matters).

### 7.2 Core Messaging
- **Identity line:** "I build AI systems. I learn by shipping them."
- **Positioning:** A serious student-builder operating at the intersection of AI Engineering, OSS, and production systems.

### 7.3 Content Types
- **Static narrative:** Hero, About, Obsessions.
- **Structured records:** Projects, Experience, Journey milestones (data-driven entries).
- **Dynamic/external:** GitHub activity (live or cached).
- **Growth content:** Writing entries (additive over time).

### 7.4 Content Lifecycle
- Launch with current real content; design every list-based section to start small and scale.
- Each project/experience/milestone/writing item is an independent content unit, addable without touching unrelated content.

### 7.5 Editorial Guidance per Section
- **Projects:** Lead with the problem and the engineering decision, not the tech stack alone.
- **Journey:** Each milestone is one tight sentence of progression; the sequence carries the story.
- **OSS:** Frame contributions in terms of impact and learning, tying directly to GSoC intent.
- **Writing:** Keep summaries crisp; the section should look intentional even when sparse.

---

## 8. Design System Requirements

### 8.1 Theme
- **Mode:** Dark-first. Black background as the foundational canvas.
- **Mood:** Premium Engineering — dark luxury, systems-builder vibe, high-end craft.

### 8.2 Color
- **Base:** Black / near-black surfaces with layered dark tones for depth.
- **Accent:** A **Giro-inspired red** accent system used deliberately for emphasis, interactive states, and signature moments — never as broad fills.
- **Text:** High-contrast neutrals for body and headings, with the red reserved for highlights.
- **Constraint:** Avoid excessive gradients and an overly colorful palette; restraint is the aesthetic.

### 8.3 Typography
- **Headings:** Elegant **serif** for a refined, editorial engineering feel.
- **Metadata / labels / code-like info:** **Monospace** for an engineering signature.
- **Body:** A clean, legible typeface that pairs with the serif headings.
- **Hierarchy:** Strong, deliberate type scale establishing clear visual hierarchy.

### 8.4 Motion & Interaction
- High-quality, subtle animation (entrances, transitions, micro-interactions) that reads as craft, not decoration.
- Performance-safe and `prefers-reduced-motion`-aware.
- Interactions should feel precise and intentional, mirroring the engineering theme.

### 8.5 Layout & Spacing
- Generous, confident spacing; clear section delineation.
- Consistent grid and alignment discipline across sections.

### 8.6 Design Tokens
- Centralized tokens for color, typography scale, spacing, radii, and motion timing to ensure consistency and easy theming.

### 8.7 Explicit Aesthetic Guardrails (Avoid)
- Startup landing-page style.
- Generic AI-portfolio style.
- Agency-portfolio style.
- Excessive gradients.
- Overly colorful design.

### 8.8 Originality Constraint
- `https://www.ayush.works` is **inspiration only** — for typography quality, hierarchy, animation feel, information architecture, and interaction craft. **No layout cloning, no component copying, no verbatim section replication.** The final design must be wholly original.

---

## 9. Future Expansion Opportunities

- **FE-1:** Lightweight CMS or content-file workflow for Writing and Projects.
- **FE-2:** Per-project deep-dive pages with architecture diagrams and decision logs.
- **FE-3:** Theme/topic filtering across Projects and Writing.
- **FE-4:** Live GitHub analytics dashboard (languages, streaks, contribution trends).
- **FE-5:** RSS feed for the Writing section.
- **FE-6:** Internationalization or multiple locales (if audience expands).
- **FE-7:** Dedicated GSoC tracker subsection as the OSS journey matures.
- **FE-8:** Resume/CV download and a structured "now" status indicator.
- **FE-9:** Optional analytics for understanding recruiter engagement (privacy-respecting).
- **FE-10:** Talks/achievements section as the profile grows.

---

## 10. Success Metrics

### 10.1 Experience & Quality
- **SM-1:** First-time visitors can state who Gatik is and what he builds within ~5 seconds (qualitative testing).
- **SM-2:** Strong Core Web Vitals on mobile and desktop.
- **SM-3:** Accessibility checks pass automated audits; key flows verified manually.

### 10.2 Engagement
- **SM-4:** Healthy scroll-depth into Projects, Journey, and OSS sections.
- **SM-5:** Meaningful click-through to GitHub, project links, and contact.

### 10.3 Outcomes
- **SM-6:** Site is actively used as the canonical link in internship and GSoC applications.
- **SM-7:** Inbound interest (recruiter/maintainer/founder outreach) attributable to the site.

### 10.4 Maintainability
- **SM-8:** A new project, experience, timeline milestone, or writing entry can be added purely as a content update without structural changes.
- **SM-9:** GitHub section remains functional (live or graceful fallback) at all times.

---

## 11. Assumptions & Open Questions

### 11.1 Assumptions
- GitHub is the primary source of live engineering activity.
- Launch content reflects current, real projects and experience; some sections (e.g., Writing) may start empty by design.
- Single-page primary experience with optional detail routes is acceptable.

### 11.2 Open Questions (to resolve before/while building)
- **OQ-1:** Preferred contact channels and exact handles (email, GitHub, LinkedIn, X, etc.).
- **OQ-2:** GitHub data approach — live API, build-time snapshot, or third-party embed — and acceptable refresh cadence.
- **OQ-3:** Whether project detail pages are in scope for launch or deferred.
- **OQ-4:** Exact red hue and supporting neutral palette values for the "Giro-inspired" system.
- **OQ-5:** Specific serif and monospace typeface selections.
- **OQ-6:** Domain and hosting specifics on Vercel.

---

*End of specification. This document defines requirements and intent only; it intentionally contains no code, task breakdown, or directory structure.*
