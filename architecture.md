# Architecture — Gatik Tulsiani Portfolio Website

**Document type:** Technical Architecture
**Author role:** Staff Frontend Engineer
**Source documents:** `spec.md` (Draft v1.0), `tasks.md`
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Vercel

> This document defines architecture and intent only. It contains no implementation code.

---

## 0. Architectural Principles

These principles drive every decision below and map directly to the spec's goals and NFRs.

- **Content is data, presentation is code.** Every list-based section (projects, experience, journey, writing, obsessions, OSS) is sourced from a typed content layer. Adding content never requires touching components. (Satisfies `FR-GLOBAL-2`, `NFR-MAINT-1`, `SM-8`.)
- **Server-first rendering.** The site is a content site, so it leans on React Server Components (RSC) and static generation. Client components are the exception, introduced only for interactivity and motion. (Satisfies `NFR-PERF-1`.)
- **Liveness is isolated and degradable.** The only dynamic dependency is GitHub. It is fully isolated behind a data-access boundary with a mandatory fallback so it can never break the page. (Satisfies `FR-GH-4`, `NFR-REL-1`, `SM-9`.)
- **Motion is a layer, not a dependency.** Animation is delivered through a thin set of reusable motion primitives that respect `prefers-reduced-motion`. Removing motion must never break layout or content. (Satisfies `FR-HERO-5`, `NFR-A11Y-2`, `NFR-PERF-3`.)
- **Design tokens are the single source of visual truth.** Color, type, spacing, radius, and motion timing live in centralized tokens consumed through Tailwind theme extension. (Satisfies `NFR-MAINT-2`, `Design System §8`.)

---

## 1. Application Architecture

### 1.1 Rendering model

A **statically generated single-page primary experience** with **optional dynamic detail routes**, built on the Next.js App Router.

| Concern | Strategy | Rationale |
|---|---|---|
| Home page (all core sections) | Static Generation (SSG) at build time | Content is known at build; maximizes LCP and CWV (`NFR-PERF-1`) |
| Project detail routes | Static Generation with dynamic params (`generateStaticParams`) | Content-driven, finite, prerenderable |
| Writing detail routes | Static Generation with dynamic params | Same as projects; future-proofed for growth (`FR-WRITE-2`) |
| GitHub activity data | Server-side fetch with **Incremental Static Regeneration (ISR)** or cached route handler | Keeps the section "live" without coupling page render to a flaky API (`FR-GH-5`) |

### 1.2 Layered architecture

The application is organized into five logical layers, top to bottom:

1. **Presentation layer** — React components (server and client) rendering UI.
2. **Section/composition layer** — Section-level components that assemble the home page and detail pages from primitives + content.
3. **Domain/content layer** — Typed content models, content access functions, and validation. The contract between data and UI.
4. **Integration layer** — External data adapters (GitHub), each with caching and fallback.
5. **Foundation layer** — Design tokens, theme, motion primitives, utilities, and shared UI (shadcn/ui).

Dependencies flow strictly downward. Presentation never reaches into the integration layer directly; it always goes through the domain/content layer's typed accessors.

### 1.3 Server vs. client boundary

- **Server Components (default):** layout shells, section containers, all content-rendering sections (about, projects, experience, journey, OSS, writing), GitHub data fetching.
- **Client Components (opt-in, `"use client"`):** navigation (scroll state, mobile menu), motion wrappers, the particle/ambient background, project filtering, theme/interactive widgets, and any component using browser APIs.

The boundary is kept as low in the tree as possible. Sections render on the server and wrap only their interactive leaves in client components, minimizing the client JS bundle.

---

## 2. Component Hierarchy

### 2.1 Conceptual tree (home page)

```
RootLayout (server)
├── ThemeProvider (client, dark-first)
├── MotionConfigProvider (client, reduced-motion aware)
├── SiteHeader / GlobalNav (client)
│   ├── NavLinks (anchored, smooth-scroll)
│   └── MobileNav (client, toggleable)
├── Main
│   └── HomePage (server)
│       ├── HeroSection (server)
│       │   ├── HeroHeadline
│       │   ├── HeroMetadata (monospace)
│       │   ├── HeroCTAs
│       │   └── AmbientBackground (client, motion)
│       ├── AboutSection (server)
│       ├── ObsessionsSection (server)
│       │   └── ObsessionCard[]
│       ├── ProjectsPreviewSection (server)
│       │   └── ProjectCard[] (featured subset)
│       ├── ExperiencePreviewSection (server)
│       │   └── ExperienceCard[]
│       ├── JourneyPreviewSection (server)
│       │   └── TimelineMilestone[]
│       ├── OSSPreviewSection (server)
│       ├── GitHubActivitySection (server, async)
│       │   ├── ContributionGraph (client)
│       │   ├── RepoCard[]
│       │   └── ActivityFeed
│       ├── WritingPreviewSection (server)
│       │   └── ArticleCard[]
│       └── ContactSection (server)
└── SiteFooter (server)
```

### 2.2 Component categories

- **Primitives (foundation):** Button, Badge/Tag, Card, Separator, Link — largely from shadcn/ui, restyled to the design tokens.
- **Motion primitives:** `Reveal`, `Stagger`, `FadeIn`, `Parallax`, `TransitionLink` — thin Framer Motion wrappers consumed by sections (see §9).
- **Domain components:** ProjectCard, ExperienceCard, TimelineMilestone, RepoCard, ArticleCard, ObsessionCard — each typed to a content model.
- **Section components:** One per IA section; compose domain components + content + motion.
- **Layout components:** SiteHeader, GlobalNav, MobileNav, SiteFooter, page shells.

### 2.3 Reuse rule

A section preview on the home page (e.g., `ProjectsPreviewSection`) and the full listing reuse the **same domain card components**. The difference is the dataset (featured subset vs. all) and surrounding layout, never duplicated card markup. This keeps visual consistency and supports `SM-8`.

---

## 3. Route Structure

Single-page primary flow with optional detail routes, all under the App Router.

| Route | Type | Purpose | Spec ref |
|---|---|---|---|
| `/` | Static (SSG) | Single-page experience: all core sections in IA order | `§6.1` |
| `/projects/[slug]` | Static w/ dynamic params | Optional per-project deep dive | `FR-PROJ-4`, `OQ-3` |
| `/writing` | Static | Article listing | `FR-WRITE-1` |
| `/writing/[slug]` | Static w/ dynamic params | Article detail / reading view | `FR-WRITE-3` |
| `/api/github` (route handler) | Cached server endpoint | Optional client-refresh surface for GitHub data | `FR-GH-5` |
| `sitemap` / `robots` | Generated | SEO discoverability | `NFR-SEO-3` |
| `opengraph-image` | Generated | Social share previews | `NFR-SEO-2` |
| `not-found` / `error` | Special files | Graceful 404 and error boundaries | `NFR-REL-2` |

**Navigation model:** the home page uses in-page anchored sections with smooth scrolling (`FR-GLOBAL-3`). Detail routes are standalone pages that share the global layout, header, and footer, and use animated route transitions (§9). Detail pages are **launch-optional** per `OQ-3`; the architecture supports them without requiring them for launch.

---

## 4. Data Flow

### 4.1 Static content flow (build time)

```
Content source files (typed)
        │  (import + validate)
        ▼
Content access layer  ──►  Section components (RSC)  ──►  Prerendered HTML
        │
        └─ Type contracts shared with components (compile-time safety)
```

Static content (projects, experience, journey, obsessions, writing metadata, contact, OSS narrative) is read at build time by server components through the content access layer. No client fetching is involved; content ships as prerendered HTML.

### 4.2 Dynamic GitHub flow (request/revalidate time)

```
GitHubActivitySection (async RSC)
        │  await getGitHubActivity()
        ▼
GitHub integration adapter
        │  fetch w/ cache + revalidate tag
        ├── success ──► normalized GitHubActivity model ──► render
        └── failure/timeout ──► fallback snapshot ──► render (never empty)
```

The GitHub section is the only async data path. It is resolved on the server, cached via ISR, and always returns a renderable result (live or fallback). See §6.

### 4.3 Direction of flow

- **Unidirectional, top-down.** Content and props flow parent → child. There is no global mutable store for content.
- **Interactivity is local.** Client state (menu open, active section, active filter) lives at the lowest component that needs it and flows down via props (see §8).

---

## 5. Content Layer Architecture

### 5.1 Goals

Satisfy `FR-GLOBAL-2`, `NFR-MAINT-1`, and `SM-8`: content is typed, validated, decoupled from presentation, and extendable by adding a data entry only.

### 5.2 Structure

- **Models:** A TypeScript type per content domain — `Project`, `Experience`, `JourneyMilestone`, `Obsession`, `WritingEntry`, `OSSContribution`, `ContactChannel`. These are the contracts between content and components.
- **Sources:** Content stored as typed data modules (and/or MDX for long-form writing and project deep-dives). MDX is the recommended path for `/writing/[slug]` and optional project writeups because it pairs prose with metadata frontmatter cleanly.
- **Access layer:** Pure functions — `getProjects()`, `getFeaturedProjects()`, `getProjectBySlug()`, `getExperience()`, `getJourney()`, `getObsessions()`, `getWriting()`, `getWritingBySlug()`. Components depend on these accessors, not on raw files.
- **Validation:** A schema layer (e.g., Zod) validates content shape at build time so malformed entries fail fast rather than rendering broken UI (`NFR-REL-2`).

### 5.3 Content model relationships

```
Project ──tags──► Theme (AI | OSS | Systems | Full Stack)   [FR-PROJ-6]
Project ──optional──► WritingEntry (deep-dive)              [FR-PROJ-4]
JourneyMilestone ──flag──► temporal status (past | future)  [FR-JOUR-3]
OSSContribution ──links──► repo / PR URLs                    [FR-OSS-3]
WritingEntry ──category──► WritingType                       [FR-WRITE-4]
```

### 5.4 Extensibility contract

Adding a project, experience, milestone, or article = appending one validated entry to its source. No component or route changes. The featured/preview surfaces derive from flags/order in the data, not hardcoded markup.

### 5.5 Empty-state guarantee

Each list section renders an intentional empty/sparse state. Writing in particular must look deliberate with zero entries at launch (`FR-WRITE-2`).

---

## 6. GitHub Integration Architecture

### 6.1 Boundary

GitHub is encapsulated in a single integration adapter. Nothing else in the app calls GitHub directly. The adapter exposes one typed function returning a normalized `GitHubActivity` model: contribution calendar, recent repositories, and recent activity.

### 6.2 Data approach (resolves `OQ-2`)

**Recommended:** server-side fetch with **ISR revalidation** (scheduled cache) as the primary strategy.

| Option | Verdict | Notes |
|---|---|---|
| Server fetch + ISR (revalidate on interval) | **Primary** | Live-enough, fast, hides API latency/limits behind cache (`FR-GH-5`, `NFR-SEC-2`) |
| Build-time snapshot | **Fallback baseline** | Always-available cached snapshot committed/generated at build (`FR-GH-4`) |
| Client-side third-party embed | Rejected | Hurts CWV, weakens control over aesthetic and failure handling |

### 6.3 Caching & refresh

- Fetch executes on the server with a revalidate window (scheduled cache), keeping the section current without per-request API calls.
- A cache tag enables targeted revalidation via the optional `/api/github` route handler if on-demand refresh is ever desired.
- Tokens are read from environment variables only; never shipped to the client (`NFR-SEC-1`, `NFR-DEPLOY-2`).

### 6.4 Failure handling (mandatory)

```
try   → fetch live → normalize → render live data
catch → load fallback snapshot → render fallback (visually identical shell)
```

The section **never** renders empty or broken. Timeouts are bounded; on any error or rate-limit, it degrades to the last good snapshot or a static placeholder (`FR-GH-4`, `NFR-REL-1`, `SM-9`).

### 6.5 Normalization

Raw GitHub responses are mapped into the app's own `GitHubActivity` model so UI components are decoupled from the upstream API shape. If the data source ever changes, only the adapter changes.

---

## 7. Folder Structure

Conceptual organization (App Router conventions). Names are illustrative of responsibility, not prescriptive file contents.

```
/
├── app/
│   ├── layout                 # root layout: providers, header, footer
│   ├── page                   # home (single-page experience)
│   ├── projects/[slug]/       # optional project detail route
│   ├── writing/               # writing listing
│   ├── writing/[slug]/        # writing detail (MDX)
│   ├── api/github/            # cached GitHub route handler (optional refresh)
│   ├── sitemap / robots       # SEO generation
│   ├── opengraph-image        # social preview generation
│   └── not-found / error      # graceful failure surfaces
│
├── components/
│   ├── ui/                    # shadcn/ui primitives (token-restyled)
│   ├── motion/                # Framer Motion primitives (Reveal, Stagger, ...)
│   ├── layout/                # header, nav, mobile-nav, footer
│   ├── sections/              # one component per IA section
│   └── domain/                # ProjectCard, ExperienceCard, TimelineMilestone, ...
│
├── content/                   # typed content sources + MDX
│   ├── projects
│   ├── experience
│   ├── journey
│   ├── obsessions
│   ├── writing                # MDX articles
│   └── oss
│
├── lib/
│   ├── content/               # access layer + schema validation
│   ├── github/                # integration adapter + fallback snapshot
│   └── utils/                 # shared helpers
│
├── types/                     # content + domain model types
├── styles/                    # global styles, font wiring
├── config/                    # design tokens, site config, nav config
└── public/                    # static assets, fallback data, OG assets
```

**Boundaries enforced by convention:** `components/sections` may import `domain`, `motion`, `ui`, and `lib/content`. `components/domain` may import `ui` and `motion`. Only `lib/github` talks to GitHub. UI primitives import nothing above the foundation layer.

---

## 8. State Management Strategy

### 8.1 Philosophy

This is a content site, not an app with complex shared mutable state. **No global state library is warranted.** Introducing Redux/Zustand here would be over-engineering and would bloat the client bundle.

### 8.2 State tiers

| State | Where it lives | Mechanism |
|---|---|---|
| Content (projects, experience, etc.) | Server, build time | Content access layer → props (no runtime state) |
| GitHub activity | Server, ISR cache | Async RSC + cache (no client store) |
| Theme (dark-first) | Client, app root | Theme provider + context; persisted preference |
| Mobile menu open/close | Client, nav component | Local component state |
| Active section (scroll spy) | Client, nav component | Local state via intersection observation |
| Project filter selection | Client, projects section | Local state, optionally synced to URL query for shareability |
| Reduced-motion preference | Client, motion provider | Media query → context consumed by motion primitives |

### 8.3 URL as state

Filterable/shareable views (project theme filter) may encode state in the URL query string rather than memory, so a filtered view is linkable and SEO-neutral. This is the only "shared" state and it lives in the URL, not a store.

---

## 9. Animation Architecture

### 9.1 Layered motion system

Motion is delivered as a **reusable primitive layer** built on Framer Motion, so sections request animation declaratively without embedding motion logic.

- **`MotionConfigProvider`** at the root reads `prefers-reduced-motion` and centrally disables/limits motion. A single switch governs the whole site (`NFR-A11Y-2`).
- **Motion tokens** (durations, easings, stagger intervals, offsets) live in the design token config alongside color and type, so timing is consistent and tunable in one place (`§8.6`).
- **Primitives:** `Reveal` (on-scroll entrance), `Stagger` (sequenced children), `FadeIn`, `Parallax`, and `TransitionLink`/page-transition wrappers. Sections compose these instead of hand-rolling animations.

### 9.2 Categories of motion (from spec §8.4)

| Category | Implementation surface | Constraint |
|---|---|---|
| Hero entrance | Client motion wrapper on hero | Subtle, runs once, reduced-motion safe (`FR-HERO-5`) |
| Section reveals | `Reveal` + viewport detection | Transform/opacity only |
| Scroll animations | Framer Motion scroll utilities | GPU-friendly, throttled |
| Hover/micro-interactions | Primitive + token-driven transitions | Non-critical; not the only affordance (`NFR-RESP-2`) |
| Ambient/particle background | Isolated client component | Capped cost; pausable; disabled under reduced motion |
| Page/route transitions | App Router transition wrapper | Fast, non-blocking |

### 9.3 Performance & accessibility guardrails

- Animate only `transform` and `opacity` to stay off the main layout/paint path (`NFR-PERF-3`).
- Defer/lazy-mount expensive effects (particle background) and ensure they never block LCP.
- Every animated element has a defined static end-state, so reduced-motion users and JS-failure scenarios still see complete, correct content (`NFR-A11Y-2`, `NFR-REL-2`).
- Motion is decorative-by-default: no information is conveyed by animation alone.

---

## 10. Deployment Architecture

### 10.1 Platform

**Vercel**, using the native Next.js App Router build pipeline (`NFR-DEPLOY-1`).

### 10.2 Build & render strategy

- Home and detail pages are statically generated at build time.
- The GitHub section uses ISR so it refreshes on a schedule without full redeploys.
- Static assets and OG images are served from Vercel's edge/CDN for fast global delivery (`NFR-PERF-1`).

### 10.3 Environments

| Environment | Trigger | Purpose |
|---|---|---|
| Production | Merge to main branch | Live site on the production domain |
| Preview | Pull request / branch push | Per-change preview deploys for QA (`tasks.md` Phase 12) |
| Local | Dev server | Development and verification |

### 10.4 Configuration & secrets

- GitHub token and any data-source config are stored as Vercel environment variables, scoped per environment, never committed (`NFR-DEPLOY-2`, `NFR-SEC-1`).
- Site-level config (nav, contact channels, social links) lives in versioned config, resolving `OQ-1` at config level.

### 10.5 Observability & quality gates

- CI checks: type-check, lint, and build must pass before deploy.
- Lighthouse / Core Web Vitals verification against preview deploys (`SM-2`, `tasks.md` Phase 11).
- Optional privacy-respecting analytics (`FE-9`) can attach at the layout level without architectural change.

### 10.6 Reliability posture

- Error and not-found boundaries guarantee no dead-ends (`NFR-REL-2`).
- The GitHub fallback path ensures the only external dependency cannot take down a page (`SM-9`).

---

## 11. Requirement → Architecture Traceability (summary)

| Requirement area | Addressed by |
|---|---|
| Extensible, data-driven content (`FR-GLOBAL-2`, `SM-8`) | §5 Content Layer, §2.3 reuse rule |
| Live GitHub w/ graceful fallback (`FR-GH-*`, `SM-9`) | §6 Integration, §4.2 dynamic flow |
| Performance / CWV (`NFR-PERF-*`) | §1 server-first SSG, §9.3 motion guardrails, §10.2 ISR/CDN |
| Accessibility & reduced motion (`NFR-A11Y-*`) | §9.1 MotionConfigProvider, §2 semantic sections |
| SEO (`NFR-SEO-*`) | §3 sitemap/robots/OG routes, §1 prerendering |
| Maintainability & tokens (`NFR-MAINT-*`) | §0 principles, §5 content layer, §9.1 motion tokens |
| Security (`NFR-SEC-*`, `NFR-DEPLOY-2`) | §6.3 server-only tokens, §10.4 env config |
| Originality (`§8.8`) | Original component/section design; reference used for craft only |

---

*End of architecture document. Defines structure and intent only; contains no implementation code.*
