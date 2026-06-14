# Content Models — Gatik Tulsiani Portfolio

**Document type:** Content Schema & Data Model Specification
**Author role:** Senior TypeScript Architect
**Binding source of truth:** `spec.md`, `architecture.md`, `visual-direction.md`, `design-system.md`
**Scope:** Typed content contracts for the data-driven content layer (`architecture §5`) and GitHub integration (`architecture §6`).

> This document defines schemas, validation rules, relationships, and example data only. TypeScript `interface`/`type` declarations and example data objects are the deliverable. There are no functions, React, MDX, or Zod code — validation is expressed as prose/table rules. Adding any content entry is a data-only operation and never requires UI, component, or route changes (`FR-GLOBAL-2`, `NFR-MAINT-1`, `SM-8`).

---

## 0. Conventions & Shared Types

### 0.1 Identity & key strategy (single, stated rule per model)
- **Detail-capable models** (`Project`, `WritingArticle`) use **`slug`** as their identity and route param.
- **All other models** use **`id`** (a `Slug`-typed value) as identity.
- **Cross-model references always point at the target's stated identity key** and are stored as that key's value — never as embedded copies.

### 0.2 Authoring vs. branding
*Branded types (`Slug`, `ISODateString`) are nominal at the type level. Authored content files contain plain strings; the content-access layer validates and brands them at load (`architecture §5.2`). Example objects below show authored values as plain strings for readability and are annotated `satisfies` the intended shape conceptually — the brand is applied at the validation boundary, not by content authors.*

### 0.3 Shared types (first-class, single source of truth — never inline-duplicated)
```ts
/** Branded kebab-case identifier, URL-safe; also usable as a route slug. */
export type Slug = string & { readonly __brand: "Slug" };

/** Branded ISO 8601 date string (YYYY-MM-DD). */
export type ISODateString = string & { readonly __brand: "ISODateString" };

/** Controlled project/theme vocabulary (spec FR-PROJ-6). Exhaustive. */
export type ProjectTheme = "AI" | "OSS" | "Systems" | "Full Stack";

/** Writing taxonomy (spec FR-WRITE-1/4). Exhaustive. */
export type WritingCategory =
  | "AI Engineering"
  | "OSS"
  | "System Design"
  | "Engineering";

/** Temporal status for the journey timeline (spec FR-JOUR-3, design-system §7.7). */
export type MilestoneStatus = "past" | "current" | "future";

/** Labeled external link with a typed intent. */
export interface ExternalLink {
  readonly label: string;                 // e.g. "Live", "Repository"
  readonly href: string;                  // https URL
  readonly kind?: "live" | "repo" | "article" | "external"; // default "external"
}

/** Restrained image asset (detail pages / OG). */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;                   // required for a11y (NFR-A11Y-1)
  readonly width?: number;
  readonly height?: number;
}
```

---

## 1. Project

- **Purpose** — A featured engineering project surfaced in the Projects section, home preview, and optional `/projects/[slug]` detail page. Satisfies `FR-PROJ-1`, `FR-PROJ-2`, `FR-PROJ-3`, `FR-PROJ-4`, `FR-PROJ-5`, `FR-PROJ-6`. Identity key: **`slug`**.

- **TypeScript Interface**
```ts
export interface Project {
  readonly slug: Slug;                    // identity + /projects/[slug] route param
  readonly title: string;                 // serif project title
  readonly summary: string;               // 1–2 lines: problem + significance
  readonly themes: readonly ProjectTheme[]; // tags (≥1) — filtering (FR-PROJ-6)
  readonly order: number;                 // ascending sort within section
  readonly featured: boolean;             // surfaces on home preview (data-driven)

  readonly subtitle?: string;             // short descriptor under title
  readonly year?: string;                 // display year/range, e.g. "2025"
  readonly role?: string;                 // e.g. "Builder", "Lead Engineer"
  readonly status?: "in-progress" | "shipped" | "active" | "archived"; // FE-8
  readonly problem?: string;              // detail page: problem framing
  readonly approach?: string;             // detail page: engineering approach
  readonly outcome?: string;              // detail page: impact/result
  readonly techStack?: readonly string[]; // monospace tags
  readonly links?: readonly ExternalLink[]; // live/repo/external (FR-PROJ-5)
  readonly caseStudySlug?: Slug;          // optional deep-dive → WritingArticle.slug (FE-2)
  readonly repositoryId?: Slug;           // optional → GitHubRepository.id
  readonly cover?: ImageAsset;            // optional detail-page hero
  readonly pinned?: boolean;              // optional ordering override for preview
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `slug` | `Slug` | kebab-case, globally unique among projects |
| `title` | `string` | 1–80 chars |
| `summary` | `string` | 1–160 chars, single editorial line(s) |
| `themes` | `readonly ProjectTheme[]` | length ≥ 1, each ∈ `ProjectTheme` |
| `order` | `number` | integer ≥ 0, unique within projects |
| `featured` | `boolean` | drives home preview inclusion |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `subtitle` | `string` | omitted from UI if absent |
| `year` | `string` | meta line omits year |
| `role` | `string` | meta line omits role |
| `status` | union | no status indicator shown |
| `problem`/`approach`/`outcome` | `string` | detail sections render only when present |
| `techStack` | `readonly string[]` | tech tags hidden if empty/absent |
| `links` | `readonly ExternalLink[]` | no link row rendered |
| `caseStudySlug` | `Slug` | no deep-dive link; card not clickable through to writing |
| `repositoryId` | `Slug` | no repo association |
| `cover` | `ImageAsset` | text-only detail header |
| `pinned` | `boolean` | falls back to `order` |

- **Validation rules**
  - `slug` matches `^[a-z0-9]+(?:-[a-z0-9]+)*$`; unique across all `Project` entries.
  - `summary` ≤ 160 chars; `title` ≤ 80 chars.
  - `themes` non-empty; values restricted to the exhaustive `ProjectTheme` union.
  - `order` integer ≥ 0 and unique within the collection.
  - `links[].href` and `cover.src` (if remote) are valid `https` URLs.
  - `caseStudySlug`, when present, must resolve to an existing `WritingArticle.slug` (referential integrity; broken ref degrades to "no deep-dive", never throws).
  - `repositoryId`, when present, must resolve to a `GitHubRepository.id` from the normalized GitHub payload or snapshot.
  - A minimal valid entry requires only the 6 required fields — nothing else may block adding a project.

- **Example object**
```ts
const giro = {
  slug: "giro",
  title: "Giro",
  subtitle: "Repository Intelligence Platform",
  summary:
    "Makes large codebases legible by indexing and retrieving repository context so engineers find the right code fast.",
  themes: ["AI", "Systems", "Full Stack"],
  order: 0,
  featured: true,
  year: "2025",
  role: "Builder",
  status: "in-progress",
  problem: "Large repositories are hard to navigate and reason about.",
  approach: "Index repository structure and semantics, then serve retrieval over that context.",
  techStack: ["TypeScript", "Next.js", "Vector Search"],
  links: [{ label: "Repository", href: "https://github.com/gatik/giro", kind: "repo" }],
  caseStudySlug: "designing-repository-intelligence",
  repositoryId: "giro",
}; // satisfies Project (slugs branded at the validation boundary)
```

---

## 2. Experience

- **Purpose** — A professional, research, independent, or education record for the Experience section. Satisfies `FR-EXP-1`, `FR-EXP-2`, `FR-EXP-3`. Identity key: **`id`**.

- **TypeScript Interface**
```ts
export interface Experience {
  readonly id: Slug;                      // identity
  readonly organization: string;          // e.g. "University of Wollongong Dubai"
  readonly role: string;                  // e.g. "AI Research Intern"
  readonly type: "work" | "research" | "education" | "independent";
  readonly startDate: ISODateString;      // ISO 8601
  readonly summary: string;               // contribution + impact (one line)
  readonly order: number;                 // sort (reverse-chronological by convention)

  readonly endDate?: ISODateString;       // absent ⇒ "Present"
  readonly location?: string;             // e.g. "Dubai, UAE"
  readonly highlights?: readonly string[];// impact bullets (detail emphasis)
  readonly links?: readonly ExternalLink[];
  readonly relatedProjectSlugs?: readonly Slug[]; // → Project.slug
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `id` | `Slug` | kebab-case, unique within experience |
| `organization` | `string` | 1–80 chars |
| `role` | `string` | 1–80 chars |
| `type` | union | one of work/research/education/independent |
| `startDate` | `ISODateString` | valid ISO date |
| `summary` | `string` | 1–200 chars |
| `order` | `number` | integer ≥ 0, unique |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `endDate` | `ISODateString` | absent renders as "Present" |
| `location` | `string` | location omitted |
| `highlights` | `readonly string[]` | no bullet list rendered |
| `links` | `readonly ExternalLink[]` | no links rendered |
| `relatedProjectSlugs` | `readonly Slug[]` | no project cross-links |

- **Validation rules**
  - `id` kebab-case, unique within `Experience`.
  - `startDate` ≤ `endDate` when both present; dates valid `YYYY-MM-DD`.
  - `summary` ≤ 200 chars (single calm impact line, `spec §7.5`).
  - `relatedProjectSlugs[]` each resolve to an existing `Project.slug`; dangling refs are silently dropped from the UI.
  - `order` integer ≥ 0 and unique.

- **Example object**
```ts
const uowdResearch = {
  id: "uowd-ai-research-intern",
  organization: "University of Wollongong Dubai",
  role: "AI Research Intern",
  type: "research",
  startDate: "2025-01-01",
  summary:
    "Researched applied AI methods and contributed to experimental systems while completing the BCS (AI & Big Data).",
  location: "Dubai, UAE",
  order: 0,
  relatedProjectSlugs: ["giro"],
}; // satisfies Experience
```

---

## 3. JourneyMilestone

- **Purpose** — A single point in the narrative timeline (learning to program → university → first projects → production systems → OSS → future GSoC → future AI Engineer). Satisfies `FR-JOUR-1`, `FR-JOUR-2`, `FR-JOUR-3`, `FR-JOUR-4`. Identity key: **`id`**.

- **TypeScript Interface**
```ts
export interface JourneyMilestone {
  readonly id: Slug;                      // identity
  readonly phase: string;                 // monospace label, e.g. "2022", "Future"
  readonly title: string;                 // serif milestone title
  readonly description: string;           // one tight sentence
  readonly status: MilestoneStatus;       // past | current | future (dot color)
  readonly order: number;                 // ascending = top→bottom on the spine

  readonly date?: ISODateString;          // precise date if known
  readonly relatedProjectSlugs?: readonly Slug[]; // → Project.slug
  readonly relatedOssIds?: readonly Slug[];        // → OSSContribution.id
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `id` | `Slug` | unique within journey |
| `phase` | `string` | 1–24 chars (monospace label) |
| `title` | `string` | 1–80 chars |
| `description` | `string` | 1–140 chars (single sentence) |
| `status` | `MilestoneStatus` | past/current/future |
| `order` | `number` | integer, unique, strictly increasing along spine |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `date` | `ISODateString` | timeline uses `phase` label only |
| `relatedProjectSlugs` | `readonly Slug[]` | no project anchors |
| `relatedOssIds` | `readonly Slug[]` | no OSS anchors |

- **Validation rules**
  - `status` maps to color per `design-system §7.7`: `past` → gray dot; `current` → `red-core`; `future` → `red-dim` + dimmed text.
  - `description` ≤ 140 chars (one-sentence rule).
  - `order` integer, unique, and used as the authoritative top-to-bottom sequence.
  - References in `relatedProjectSlugs`/`relatedOssIds` must resolve; broken refs are omitted, never thrown.
  - *Architecture-consistent rule: the collection should contain ≥1 `future` entry to express forward trajectory; absence is a build warning, not an error.*

- **Example object**
```ts
const gsocGoal = {
  id: "gsoc-goal",
  phase: "Future",
  title: "Google Summer of Code",
  description: "Contribute to a major open-source project through a structured GSoC program.",
  status: "future",
  order: 90,
  relatedOssIds: ["open-source-journey"],
}; // satisfies JourneyMilestone
```

---

## 4. Obsession

- **Purpose** — A focus area in the Obsessions section with a short "why it matters". Satisfies `FR-OBS-1`, `FR-OBS-2`, `FR-OBS-3`. Identity key: **`id`**.

- **TypeScript Interface**
```ts
export interface Obsession {
  readonly id: Slug;                      // identity
  readonly term: string;                  // e.g. "Repository Intelligence"
  readonly why: string;                   // one line: why it matters
  readonly order: number;                 // list order

  readonly relatedThemes?: readonly ProjectTheme[]; // connects to project themes
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `id` | `Slug` | unique within obsessions |
| `term` | `string` | 1–48 chars, unique |
| `why` | `string` | 1–120 chars |
| `order` | `number` | integer ≥ 0, unique |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `relatedThemes` | `readonly ProjectTheme[]` | no theme association shown |

- **Validation rules**
  - `why` ≤ 120 chars (one calm line, `visual-direction §4`).
  - `term` unique across obsessions.
  - `order` integer ≥ 0, unique.
  - `relatedThemes` values ∈ `ProjectTheme`.

- **Example object**
```ts
const retrieval = {
  id: "retrieval-systems",
  term: "Retrieval Systems",
  why: "Getting the right context to the right place is the core problem behind useful AI.",
  order: 5,
  relatedThemes: ["AI", "Systems"],
}; // satisfies Obsession
```

---

## 5. WritingArticle

- **Purpose** — An article/note for the Writing section and `/writing/[slug]` detail pages; must render gracefully with zero entries. Satisfies `FR-WRITE-1`, `FR-WRITE-2`, `FR-WRITE-3`, `FR-WRITE-4`. Identity key: **`slug`**.

- **TypeScript Interface**
```ts
export interface WritingArticle {
  readonly slug: Slug;                    // identity + /writing/[slug] route param
  readonly title: string;                 // serif title
  readonly date: ISODateString;           // publication date
  readonly summary: string;               // crisp one-line summary
  readonly category: WritingCategory;     // single primary category
  readonly published: boolean;            // false ⇒ excluded from listing

  readonly updatedDate?: ISODateString;
  readonly readingMinutes?: number;       // authored or derived (FE-5 friendly)
  readonly tags?: readonly string[];      // secondary monospace tags
  readonly relatedProjectSlugs?: readonly Slug[]; // → Project.slug
  readonly relatedArticleSlugs?: readonly Slug[]; // → WritingArticle.slug
  readonly cover?: ImageAsset;
}
```
*Architecture-consistent note: the long-form body lives in MDX keyed by `slug` (`architecture §5.2`); no `bodyRef` field is needed since `slug` is the join key.*

- **Required fields**

| field | type | constraint |
|---|---|---|
| `slug` | `Slug` | kebab-case, globally unique among articles |
| `title` | `string` | 1–100 chars |
| `date` | `ISODateString` | valid ISO date |
| `summary` | `string` | 1–160 chars |
| `category` | `WritingCategory` | one of the exhaustive union |
| `published` | `boolean` | gates listing visibility |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `updatedDate` | `ISODateString` | no "updated" label |
| `readingMinutes` | `number` | reading-time hidden |
| `tags` | `readonly string[]` | no secondary tags |
| `relatedProjectSlugs` | `readonly Slug[]` | no project cross-links |
| `relatedArticleSlugs` | `readonly Slug[]` | no related-reading block |
| `cover` | `ImageAsset` | text-only header |

- **Validation rules**
  - `slug` kebab-case, unique among articles; MDX body keyed by `slug` must exist when `published` is `true`.
  - `category` ∈ exhaustive `WritingCategory`.
  - `summary` ≤ 160 chars; `title` ≤ 100 chars.
  - `published: false` entries are valid (drafts) but excluded from the listing and from `/writing/[slug]` in production.
  - `relatedArticleSlugs` must not include self and must resolve to existing articles; broken refs dropped silently.
  - **Empty-state rule:** when the set of `published` articles is empty, the section renders the composed empty state (`design-system §7.10`) — represented in data simply by an empty collection, never a special placeholder entry.

- **Example object**
```ts
const article = {
  slug: "designing-repository-intelligence",
  title: "Designing Repository Intelligence",
  date: "2025-09-12",
  summary: "Notes on indexing, retrieval, and making large codebases legible to engineers.",
  category: "System Design",
  published: true,
  readingMinutes: 8,
  relatedProjectSlugs: ["giro"],
}; // satisfies WritingArticle
```

---

## 6. OSSContribution

- **Purpose** — An open-source contribution for the OSS section, tied to the GSoC narrative and linkable to a repository. Satisfies `FR-OSS-1`, `FR-OSS-2`, `FR-OSS-3`. Identity key: **`id`**.

- **TypeScript Interface**
```ts
export interface OSSContribution {
  readonly id: Slug;                      // identity
  readonly project: string;               // upstream project name
  readonly contribution: string;          // what was done + impact framing
  readonly order: number;                 // list order
  readonly kind: "pr" | "issue" | "review" | "feature" | "docs" | "maintenance";

  readonly date?: ISODateString;
  readonly status?: "merged" | "open" | "draft" | "closed";
  readonly links?: readonly ExternalLink[]; // PR/issue/repo links (FR-OSS-3)
  readonly repositoryId?: Slug;           // → GitHubRepository.id
  readonly gsocRelevant?: boolean;        // flags GSoC-trajectory items (FR-OSS-2)
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `id` | `Slug` | unique within OSS contributions |
| `project` | `string` | 1–80 chars |
| `contribution` | `string` | 1–200 chars (impact-framed) |
| `order` | `number` | integer ≥ 0, unique |
| `kind` | union | one of pr/issue/review/feature/docs/maintenance |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `date` | `ISODateString` | date omitted |
| `status` | union | no status chip |
| `links` | `readonly ExternalLink[]` | no link row |
| `repositoryId` | `Slug` | no repo association |
| `gsocRelevant` | `boolean` | treated as `false` |

- **Validation rules**
  - `contribution` ≤ 200 chars, framed by impact/learning (`spec §7.5`).
  - `repositoryId`, when present, must resolve to a `GitHubRepository.id`; broken ref degrades to a plain text row, never throws.
  - `links[].href` valid `https` URLs.
  - `order` integer ≥ 0, unique.

- **Example object**
```ts
const ossJourney = {
  id: "open-source-journey",
  project: "Open Source Journey",
  contribution:
    "Ongoing GSoC-oriented contributions — improving features and tests while learning maintainer workflows.",
  order: 0,
  kind: "feature",
  status: "open",
  gsocRelevant: true,
  links: [{ label: "Contributions", href: "https://github.com/gatik", kind: "external" }],
}; // satisfies OSSContribution
```

---

## 7. GitHubRepository

- **Purpose** — A **normalized internal** repository model (decoupled from the raw GitHub API, `architecture §6.5`) for the recent-repos list and as the reference target for `Project.repositoryId` / `OSSContribution.repositoryId`. Satisfies `FR-GH-2`. Identity key: **`id`** (repo-name slug). **Contains no tokens/secrets.**

- **TypeScript Interface**
```ts
export interface GitHubRepository {
  readonly id: Slug;                      // normalized identity (repo-name slug)
  readonly name: string;                  // display name
  readonly description: string | null;    // nullable; rendered gracefully
  readonly url: string;                   // canonical https repo URL
  readonly stars: number;                 // ≥ 0
  readonly primaryLanguage: string | null;// nullable
  readonly updatedAt: ISODateString;      // last push/update

  readonly isFork?: boolean;
  readonly isArchived?: boolean;
  readonly topics?: readonly string[];    // monospace tags
  readonly ownerLogin?: string;           // distinguishes OSS vs. personal
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `id` | `Slug` | unique within the normalized repo set |
| `name` | `string` | 1–100 chars |
| `description` | `string \| null` | explicit null allowed |
| `url` | `string` | valid https GitHub URL |
| `stars` | `number` | integer ≥ 0 |
| `primaryLanguage` | `string \| null` | explicit null allowed |
| `updatedAt` | `ISODateString` | valid ISO date |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `isFork` | `boolean` | treated as `false` |
| `isArchived` | `boolean` | treated as `false` |
| `topics` | `readonly string[]` | no topic tags |
| `ownerLogin` | `string` | owner not displayed |

- **Validation rules**
  - `id` kebab-case, unique within the payload.
  - `stars` integer ≥ 0; `url` valid `https`.
  - `description`/`primaryLanguage` are intentionally nullable — UI renders a calm fallback when `null` (never "undefined").
  - Produced only by the GitHub adapter (live) or the committed snapshot (fallback); hand-authored only inside the snapshot.
  - **No secret/token fields permitted in this model under any circumstance** (`NFR-SEC-1`).

- **Example object**
```ts
const giroRepo = {
  id: "giro",
  name: "giro",
  description: "Repository intelligence platform.",
  url: "https://github.com/gatik/giro",
  stars: 42,
  primaryLanguage: "TypeScript",
  updatedAt: "2026-05-30",
  topics: ["ai", "retrieval", "developer-tools"],
  ownerLogin: "gatik",
}; // satisfies GitHubRepository
```

---

## 8. GitHubActivityEvent

- **Purpose** — A normalized recent-activity item for the activity feed, plus (composed below) the `GitHubActivity` aggregate that powers the contribution graph, recent repos, and the **mandatory fallback/empty-state path**. Satisfies `FR-GH-1`, `FR-GH-3`, `FR-GH-4`, `FR-GH-5`, `SM-9`. Identity key: **`id`**. **Contains no tokens/secrets.**

- **TypeScript Interface**
```ts
export type GitHubEventType =
  | "commit" | "pull_request" | "issue" | "review" | "release" | "create";

export interface GitHubActivityEvent {
  readonly id: string;                    // unique event id (provider-derived)
  readonly type: GitHubEventType;
  readonly repoName: string;              // display repo name
  readonly repoUrl: string;               // https
  readonly title: string;                 // human-readable summary line
  readonly createdAt: ISODateString;      // event timestamp

  readonly url?: string;                  // deep link to the event
}

/** One calendar cell of the contribution graph (red scale, never green). */
export interface ContributionDay {
  readonly date: ISODateString;
  readonly count: number;                 // ≥ 0
  readonly level: 0 | 1 | 2 | 3 | 4;      // maps to gh-0..gh-4 (design-system §2.6)
}

/** Aggregate payload returned by the GitHub adapter — live OR snapshot. */
export interface GitHubActivity {
  readonly generatedAt: ISODateString;    // when produced
  readonly source: "live" | "snapshot";   // drives the fallback indicator
  readonly totalContributions: number;    // ≥ 0 (understated stats line)
  readonly calendar: readonly ContributionDay[];        // graph
  readonly recentRepositories: readonly GitHubRepository[]; // §7
  readonly recentEvents: readonly GitHubActivityEvent[];    // feed
}
```

- **Required fields** (`GitHubActivityEvent`)

| field | type | constraint |
|---|---|---|
| `id` | `string` | unique within the payload |
| `type` | `GitHubEventType` | one of the exhaustive union |
| `repoName` | `string` | 1–120 chars |
| `repoUrl` | `string` | valid https |
| `title` | `string` | 1–160 chars |
| `createdAt` | `ISODateString` | valid ISO date |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `url` | `string` | event row is non-clickable if absent |

- **Validation rules**
  - `level` ∈ {0,1,2,3,4}, mapping exactly to `gh-0..gh-4` red steps (never green, `design-system §2.6`).
  - `count`, `totalContributions` integers ≥ 0.
  - `source: "snapshot"` indicates the graceful fallback; the section still renders its full calm layout (`FR-GH-4`, `SM-9`).
  - All arrays may be empty; an empty payload degrades to placeholder copy, never an error or broken section.
  - The aggregate is always produced (live or snapshot); the render path must never depend on a live fetch succeeding.
  - **No secret/token/credential fields anywhere in these models** (`NFR-SEC-1`, `NFR-SEC-2`).

- **Example object**
```ts
const activity = {
  generatedAt: "2026-06-14",
  source: "live",
  totalContributions: 1284,
  calendar: [
    { date: "2026-06-13", count: 6, level: 3 },
    { date: "2026-06-14", count: 12, level: 4 },
  ],
  recentRepositories: [
    {
      id: "giro", name: "giro", description: "Repository intelligence platform.",
      url: "https://github.com/gatik/giro", stars: 42,
      primaryLanguage: "TypeScript", updatedAt: "2026-05-30",
    },
  ],
  recentEvents: [
    {
      id: "evt_1", type: "pull_request", repoName: "gatik/giro",
      repoUrl: "https://github.com/gatik/giro",
      title: "Add semantic retrieval over repository index",
      createdAt: "2026-06-10", url: "https://github.com/gatik/giro/pull/12",
    },
  ],
}; // satisfies GitHubActivity
```

---

## 9. NavigationItem

- **Purpose** — Drives the global navbar and anchored in-page navigation across the IA sections in `spec §6.1`. Satisfies `FR-GLOBAL-1`, `FR-GLOBAL-3`. Identity key: **`id`** (matches the section anchor).

- **TypeScript Interface**
```ts
export interface NavigationItem {
  readonly id: Slug;                      // matches section anchor id
  readonly label: string;                 // monospace nav label
  readonly target: string;                // "#projects" (anchor) or "/writing" (route)
  readonly order: number;                 // left→right order
  readonly type: "anchor" | "route";

  readonly external?: boolean;            // opens new tab if true
  readonly showInMobile?: boolean;        // default true
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `id` | `Slug` | unique; for anchors, equals target section id |
| `label` | `string` | 1–24 chars |
| `target` | `string` | `#anchor` or internal path |
| `order` | `number` | integer ≥ 0, unique |
| `type` | union | anchor or route |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `external` | `boolean` | `false` (same-tab) |
| `showInMobile` | `boolean` | `true` (shown in mobile sheet) |

- **Validation rules**
  - `type: "anchor"` ⇒ `target` starts with `#` and matches an existing IA section id (`spec §6.1`).
  - `type: "route"` ⇒ `target` is a valid internal path (e.g., `/writing`).
  - `order` integer ≥ 0, unique.
  - The nav collection should cover the core sections in IA order; missing core anchors is a build warning.

- **Example object**
```ts
const navProjects = {
  id: "projects",
  label: "Work",
  target: "#projects",
  order: 3,
  type: "anchor",
}; // satisfies NavigationItem
```

---

## 10. SocialLink

- **Purpose** — Profile links used in Contact and Footer. Satisfies `FR-CON-2`. Identity key: **`id`**.

- **TypeScript Interface**
```ts
export interface SocialLink {
  readonly id: Slug;                      // e.g. "github"
  readonly platform: string;              // display label, e.g. "GitHub"
  readonly href: string;                  // https
  readonly handle: string;                // monospace handle, e.g. "@gatik"
  readonly order: number;                 // display order

  readonly primary?: boolean;             // emphasized (e.g. GitHub)
  readonly iconKey?: string;              // references an icon mapping key, not an asset
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `id` | `Slug` | unique within social links |
| `platform` | `string` | 1–40 chars |
| `href` | `string` | valid https URL |
| `handle` | `string` | 1–40 chars |
| `order` | `number` | integer ≥ 0, unique |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `primary` | `boolean` | `false` |
| `iconKey` | `string` | falls back to text-only label |

- **Validation rules**
  - `href` valid `https`.
  - `order` integer ≥ 0, unique.
  - `iconKey` references a key in an icon registry, never a file path/asset, to keep content/UI decoupled.
  - *Architecture-consistent rule: at least one entry should be GitHub, given the OSS positioning; warning only.*

- **Example object**
```ts
const github = {
  id: "github",
  platform: "GitHub",
  href: "https://github.com/gatik",
  handle: "@gatik",
  order: 0,
  primary: true,
  iconKey: "github",
}; // satisfies SocialLink
```

---

## 11. ContactInformation

- **Purpose** — Single (singleton) source for the Contact section's invitation, email, and profile row. Satisfies `FR-CON-1`, `FR-CON-2`, `FR-CON-3`; resolves `OQ-1` at the data level. Singleton — no identity key.

- **TypeScript Interface**
```ts
export interface ContactInformation {
  readonly invitation: string;            // serif invitation line
  readonly email: string;                 // primary contact email
  readonly socialLinks: readonly SocialLink[]; // profile row (§10)

  readonly availability?: string;         // monospace status (FE-8)
  readonly location?: string;             // e.g. "Dubai, UAE"
  readonly responseNote?: string;         // small reassurance line
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `invitation` | `string` | 1–80 chars |
| `email` | `string` | valid email format |
| `socialLinks` | `readonly SocialLink[]` | length ≥ 1 |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `availability` | `string` | no status line |
| `location` | `string` | no location |
| `responseNote` | `string` | no reassurance line |

- **Validation rules**
  - `email` matches a standard email format.
  - `socialLinks` non-empty; each conforms to `SocialLink` rules and ordering.
  - `invitation` ≤ 80 chars (single calm serif line, `design-system §7.11`).

- **Example object**
```ts
const contact = {
  invitation: "Let's build something.",
  email: "gatik@example.com", // placeholder — OQ-1 not resolved in docs
  availability: "Open to internships & OSS collaboration",
  location: "Dubai, UAE",
  socialLinks: [
    { id: "github", platform: "GitHub", href: "https://github.com/gatik", handle: "@gatik", order: 0, primary: true },
  ],
}; // satisfies ContactInformation
```

---

## 12. SiteMetadata

- **Purpose** — Global identity, SEO, and Open Graph configuration consumed by the root layout and metadata generation. Satisfies `FR-HERO-1`, `FR-HERO-2`, `FR-HERO-3`, `NFR-SEO-1`, `NFR-SEO-2`, `NFR-SEO-3`. Singleton — no identity key.

- **TypeScript Interface**
```ts
export interface SiteMetadata {
  readonly name: string;                  // "Gatik Tulsiani"
  readonly headline: string;              // exact hero headline
  readonly subheadline: string;           // exact hero subheadline
  readonly description: string;           // meta description
  readonly siteUrl: string;               // canonical base URL (no trailing slash)
  readonly locale: string;                // e.g. "en"

  readonly role?: string;                 // monospace hero role line (FR-HERO-6)
  readonly keywords?: readonly string[];  // SEO keywords
  readonly ogImage?: ImageAsset;          // default social image (NFR-SEO-2)
  readonly twitterHandle?: string;
  readonly themeColor?: string;           // defaults to #0A0A0B
  readonly author?: string;               // defaults to `name`
}
```

- **Required fields**

| field | type | constraint |
|---|---|---|
| `name` | `string` | non-empty |
| `headline` | `string` | must equal the spec headline (below) |
| `subheadline` | `string` | must equal the spec subheadline (below) |
| `description` | `string` | ≤ 160 chars |
| `siteUrl` | `string` | valid https, no trailing slash |
| `locale` | `string` | BCP-47 language tag |

- **Optional fields**

| field | type | default / absence behavior |
|---|---|---|
| `role` | `string` | hero role line omitted |
| `keywords` | `readonly string[]` | none emitted |
| `ogImage` | `ImageAsset` | generated/default OG used |
| `twitterHandle` | `string` | Twitter card omits creator |
| `themeColor` | `string` | defaults to `#0A0A0B` (`design-system §2.1`) |
| `author` | `string` | defaults to `name` |

- **Validation rules**
  - `headline` must equal `"I build AI systems. I learn by shipping them."` (`FR-HERO-2`).
  - `subheadline` must equal `"Computer Science student focused on AI Engineering, Open Source Software, and Production Systems."` (`FR-HERO-3`).
  - `siteUrl` valid `https`, no trailing slash; `description` ≤ 160 chars.
  - `themeColor`, if present, should match a `design-system` background token.

- **Example object**
```ts
const siteMetadata = {
  name: "Gatik Tulsiani",
  headline: "I build AI systems. I learn by shipping them.",
  subheadline:
    "Computer Science student focused on AI Engineering, Open Source Software, and Production Systems.",
  role: "AI ENGINEERING · OPEN SOURCE · DUBAI",
  description:
    "Engineering-focused portfolio of Gatik Tulsiani — AI systems, open source, and production engineering.",
  siteUrl: "https://gatik.example", // placeholder — OQ-6 not resolved in docs
  locale: "en",
  themeColor: "#0A0A0B",
}; // satisfies SiteMetadata
```

---

## 13. Relationships

### 13.1 Textual reference map (key strategy in parentheses)
```
ProjectTheme  ◄── Project.themes (value union)
ProjectTheme  ◄── Obsession.relatedThemes (value union)

Project (slug)
   ├── caseStudySlug ───────────► WritingArticle (slug)        [optional, 0..1]
   ├── repositoryId ────────────► GitHubRepository (id)        [optional, 0..1]
   ◄── Experience.relatedProjectSlugs (slug)                   [optional, 0..*]
   ◄── JourneyMilestone.relatedProjectSlugs (slug)             [optional, 0..*]
   ◄── WritingArticle.relatedProjectSlugs (slug)               [optional, 0..*]

OSSContribution (id)
   ├── repositoryId ────────────► GitHubRepository (id)        [optional, 0..1]
   ◄── JourneyMilestone.relatedOssIds (id)                     [optional, 0..*]

WritingArticle (slug)
   ├── category ────────────────► WritingCategory (value union)[required, 1]
   └── relatedArticleSlugs ─────► WritingArticle (slug)        [optional, 0..*]

GitHubActivity (singleton payload)
   ├── recentRepositories ──────► GitHubRepository[] (composition)
   ├── recentEvents ────────────► GitHubActivityEvent[] (composition)
   └── calendar ────────────────► ContributionDay[] (composition)

NavigationItem.target ──────────► IA section id / route (spec §6.1)
ContactInformation.socialLinks ─► SocialLink[] (composition)
SiteMetadata ───────────────────► global layout / SEO / OG
```

### 13.2 Relationship table

| Relationship | Cardinality | Referencing key | Required? | Broken-reference rule (must never throw at render) |
|---|---|---|---|---|
| Project → ProjectTheme[] (tags) | 1 → 1..* | inline value union | required | N/A (closed union; invalid value fails build validation) |
| Project → WritingArticle (deep-dive) | 1 → 0..1 | `Project.caseStudySlug` → `WritingArticle.slug` | optional | drop the deep-dive link; project still renders |
| Project → GitHubRepository | 1 → 0..1 | `Project.repositoryId` → `GitHubRepository.id` | optional | omit repo metadata; project still renders |
| JourneyMilestone → Project | 1 → 0..* | `relatedProjectSlugs` → `Project.slug` | optional | drop unresolved entries from anchors |
| JourneyMilestone → OSSContribution | 1 → 0..* | `relatedOssIds` → `OSSContribution.id` | optional | drop unresolved entries |
| Experience → Project | 1 → 0..* | `relatedProjectSlugs` → `Project.slug` | optional | drop unresolved entries |
| OSSContribution → GitHubRepository | 1 → 0..1 | `repositoryId` → `GitHubRepository.id` | optional | render plain text row without repo link |
| WritingArticle → WritingCategory | 1 → 1 | inline value union | required | N/A (closed union; invalid value fails build validation) |
| WritingArticle → WritingArticle (related) | 1 → 0..* | `relatedArticleSlugs` → `WritingArticle.slug` | optional | drop unresolved / self refs |
| GitHubActivity → GitHubRepository[] | 1 → 0..* | composition (embedded normalized) | required (may be empty) | empty ⇒ placeholder copy |
| GitHubActivity → GitHubActivityEvent[] | 1 → 0..* | composition (embedded normalized) | required (may be empty) | empty ⇒ placeholder copy |
| ContactInformation → SocialLink[] | 1 → 1..* | composition | required | must have ≥1; validation enforces |

**Global broken-reference policy:** dangling cross-references are caught at build-time validation and surfaced as warnings; at render time they degrade gracefully (link/section omitted) and never throw (`NFR-REL-1`, `NFR-REL-2`, `SM-9`).

---

## 14. Extensibility & Scalability Notes

- **Add content = add one validated entry, zero UI change.** Every list model (`Project`, `Experience`, `JourneyMilestone`, `Obsession`, `WritingArticle`, `OSSContribution`, `SocialLink`, `NavigationItem`) is consumed generically by its section; a new entry appended to its collection appears automatically once it passes validation (`FR-GLOBAL-2`, `NFR-MAINT-1`, `SM-8`).
- **Preview/featured surfaces derive from data, not markup.** Home previews use `featured` + `order` (`Project`), `order`-bounded slices (Experience/Journey/Writing), and `pinned` overrides — never hardcoded entry lists. Reordering or re-featuring is a data edit.
- **Empty/sparse states are data-represented.** An empty `published` writing set yields the composed empty state; an empty `GitHubActivity` (or `source: "snapshot"`) yields the fallback layout. No placeholder "fake entries" are ever required.
- **Additive optional fields for FE-1..FE-10.** Filtering (`themes`, `tags`), deep-dives (`caseStudySlug`, `cover`, `problem`/`approach`/`outcome`), RSS (`date`, `updatedDate`, `readingMinutes`), and a status indicator (`status`, `availability`) are all optional — none block a minimal valid entry, and new optional fields can be added without breaking existing content.
- **GitHub decoupling.** UI depends only on the normalized §7/§8 shapes; if the upstream API changes, only the adapter changes (`architecture §6.5`). Secrets never appear in any model.
- **Stable taxonomies as unions.** Extending `ProjectTheme` or `WritingCategory` is a single-union edit; validation flags any value lacking a UI mapping before ship.

---

## 15. Traceability

| Model | Satisfied spec.md requirement IDs |
|---|---|
| Project | FR-PROJ-1, FR-PROJ-2, FR-PROJ-3, FR-PROJ-4, FR-PROJ-5, FR-PROJ-6, FR-GLOBAL-2 |
| Experience | FR-EXP-1, FR-EXP-2, FR-EXP-3, FR-GLOBAL-2 |
| JourneyMilestone | FR-JOUR-1, FR-JOUR-2, FR-JOUR-3, FR-JOUR-4 |
| Obsession | FR-OBS-1, FR-OBS-2, FR-OBS-3 |
| WritingArticle | FR-WRITE-1, FR-WRITE-2, FR-WRITE-3, FR-WRITE-4 |
| OSSContribution | FR-OSS-1, FR-OSS-2, FR-OSS-3 |
| GitHubRepository | FR-GH-2, FR-GH-3, NFR-SEC-1 |
| GitHubActivityEvent / GitHubActivity | FR-GH-1, FR-GH-3, FR-GH-4, FR-GH-5, NFR-REL-1, SM-9, NFR-SEC-1, NFR-SEC-2 |
| NavigationItem | FR-GLOBAL-1, FR-GLOBAL-3 |
| SocialLink | FR-CON-2 |
| ContactInformation | FR-CON-1, FR-CON-2, FR-CON-3 |
| SiteMetadata | FR-HERO-1, FR-HERO-2, FR-HERO-3, FR-HERO-6, NFR-SEO-1, NFR-SEO-2, NFR-SEO-3 |

---

*End of content models. Schemas, validation rules, relationships, and example data only — no implementation logic. Consistent with `spec.md`, `architecture.md`, `visual-direction.md`, and `design-system.md`; information architecture unchanged.*
