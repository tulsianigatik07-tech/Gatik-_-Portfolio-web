# Content Models — Gatik Tulsiani Portfolio

**Document type:** Content Schema & Data Model Specification
**Author role:** Senior TypeScript Architect
**Source of truth:** `spec.md`, `architecture.md`, `visual-direction.md`, `design-system.md`
**Scope:** Typed content contracts for the data-driven content layer (`architecture §5`).

> This document defines data models, schemas, validation rules, and example data. The TypeScript interfaces here are **schema declarations** (the contract between content and UI), not implementation logic. There are no functions, components, or runtime code. All models satisfy `FR-GLOBAL-2`, `NFR-MAINT-1`, and `SM-8`: adding content is a data-only operation that never touches UI code.

---

## 0. Modeling Conventions

- **Stable identifiers.** Every content entity has a unique, immutable `id` (kebab-case slug). Slugs double as route params for detail pages and as cross-model references.
- **Ordering.** List sections derive order from an explicit `order: number` (ascending) or, where chronological, from dates. UI never hardcodes order.
- **Surfacing.** Home-page previews derive from flags (`featured`, `pinned`) and `order`, not from separate hardcoded lists (`architecture §2.3`).
- **Enums as unions.** Constrained vocabularies (themes, statuses, categories) are string-literal unions so they validate at compile time and at build time via the schema layer.
- **References by id.** Cross-model links store the referenced entity's `id` (e.g., `projectIds: string[]`), never embedded copies — preserving a single source of truth.
- **Forward-compatibility.** Optional fields default to "absent → omit from UI." New optional fields can be added without breaking existing entries or the UI.
- **Validation layer.** Each model has a corresponding build-time schema (e.g., Zod) mirroring the rules below; malformed content fails the build (`NFR-REL-2`).

### Shared primitive types
```ts
/** Kebab-case unique identifier, also usable as a route slug. */
type Slug = string;

/** ISO 8601 date string (YYYY-MM-DD). */
type ISODate = string;

/** Absolute URL (https). */
type URLString = string;

/** Controlled vocabulary for project/content themes. */
type Theme = "AI" | "OSS" | "Systems" | "Full Stack" | "Developer Tools";

/** Writing taxonomy (matches visual-direction tags). */
type WritingCategory =
  | "System Design"
  | "OSS"
  | "AI Engineering"
  | "Engineering Notes";

/** External link with a labeled intent. */
interface ExternalLink {
  label: string;            // e.g. "Live", "Repository", "Case study"
  href: URLString;
  kind?: "live" | "repo" | "article" | "external";
}
```

---

## 1. Project

**Purpose:** Represents a featured engineering project (Giro, Suryami Portal, Open Source Journey). Powers the Projects section, home preview, and optional project detail pages (`FR-PROJ-1..6`, `architecture §3`).

```ts
interface Project {
  id: Slug;                     // required — unique, route param for /projects/[slug]
  title: string;                // required — serif project title
  year: string;                 // required — display year or range, e.g. "2025"
  role: string;                 // required — e.g. "Builder", "Lead Engineer"
  summary: string;              // required — 1–2 lines: problem + significance
  themes: Theme[];              // required — tag vocabulary (≥1)
  order: number;                // required — ascending sort within the section
  featured: boolean;            // required — surfaces on the home preview

  // Optional / detail-page fields
  subtitle?: string;            // optional — short descriptor under the title
  problem?: string;             // optional — the problem framing (detail page)
  approach?: string;            // optional — engineering approach (detail page)
  outcome?: string;             // optional — impact/result (detail page)
  techStack?: string[];         // optional — technologies (monospace tags)
  links?: ExternalLink[];       // optional — live, repo, etc.
  bodyRef?: string;             // optional — id/path of MDX deep-dive content
  status?: "active" | "shipped" | "archived" | "in-progress"; // optional
  repository?: Slug;            // optional — ref to GitHubRepository.id (see §7)
  cover?: ImageAsset;           // optional — restrained hero image for detail page
}

interface ImageAsset {
  src: string;                  // required within asset
  alt: string;                  // required — accessibility (NFR-A11Y-1)
  width?: number;
  height?: number;
}
```

**Required:** `id`, `title`, `year`, `role`, `summary`, `themes`, `order`, `featured`.
**Optional:** all detail-page and enrichment fields above.

**Validation rules**
- `id`: kebab-case, unique across projects, matches `^[a-z0-9]+(-[a-z0-9]+)*$`.
- `summary`: ≤ 160 chars (keeps the editorial one/two-line rule).
- `themes`: non-empty; each value ∈ `Theme`.
- `order`: integer ≥ 0; unique within projects.
- `links[].href`: valid https URL.
- `bodyRef` present ⇒ a corresponding MDX entry must exist (detail page renders).
- `repository` present ⇒ must resolve to an existing `GitHubRepository.id`.

**Example**
```json
{
  "id": "giro",
  "title": "Giro",
  "subtitle": "Repository Intelligence Platform",
  "year": "2025",
  "role": "Builder",
  "summary": "Makes large codebases understandable by indexing and retrieving repository context for engineers.",
  "themes": ["AI", "Systems", "Developer Tools"],
  "order": 0,
  "featured": true,
  "techStack": ["TypeScript", "Next.js", "Vector Search"],
  "links": [{ "label": "Repository", "href": "https://github.com/example/giro", "kind": "repo" }],
  "bodyRef": "giro",
  "status": "in-progress",
  "repository": "giro"
}
```

---

## 2. Experience

**Purpose:** A professional/engineering or education record for the Experience section (`FR-EXP-1..3`).

```ts
interface Experience {
  id: Slug;                     // required
  organization: string;         // required — e.g. "University of Wollongong Dubai"
  role: string;                 // required — e.g. "AI Research Intern"
  type: "work" | "research" | "education" | "independent"; // required
  startDate: ISODate;           // required
  summary: string;              // required — contribution + impact
  order: number;                // required — sort (typically reverse-chronological)

  endDate?: ISODate;            // optional — absent ⇒ "Present"
  location?: string;            // optional — e.g. "Dubai, UAE"
  highlights?: string[];        // optional — bullet impact points
  links?: ExternalLink[];       // optional
  relatedProjectIds?: Slug[];   // optional — refs to Project.id
}
```

**Required:** `id`, `organization`, `role`, `type`, `startDate`, `summary`, `order`.
**Optional:** `endDate`, `location`, `highlights`, `links`, `relatedProjectIds`.

**Validation rules**
- `startDate` ≤ `endDate` when both present.
- Absent `endDate` renders as "Present".
- `summary`: ≤ 200 chars (one calm impact line).
- `relatedProjectIds[]` must each resolve to an existing `Project.id`.
- `order`: integer ≥ 0; unique within experience.

**Example**
```json
{
  "id": "uowd-ai-research-intern",
  "organization": "University of Wollongong Dubai",
  "role": "AI Research Intern",
  "type": "research",
  "startDate": "2025-01-01",
  "summary": "Researched applied AI methods and contributed to experimental systems alongside coursework.",
  "location": "Dubai, UAE",
  "order": 0,
  "relatedProjectIds": ["giro"]
}
```

---

## 3. Journey Milestone

**Purpose:** A single point in the narrative timeline, from learning to program to future GSoC / AI Engineer goals (`FR-JOUR-1..4`). Distinguishes past vs. future (`visual-direction §6`).

```ts
interface JourneyMilestone {
  id: Slug;                     // required
  phase: string;                // required — monospace label, e.g. "2022", "Future"
  title: string;                // required — serif milestone title
  description: string;          // required — one tight sentence
  status: "past" | "current" | "future"; // required — drives dot color
  order: number;                // required — ascending = top→bottom on the spine

  date?: ISODate;               // optional — precise date if known
  relatedProjectIds?: Slug[];   // optional — refs to Project.id
  relatedOssIds?: Slug[];       // optional — refs to OSSContribution.id
}
```

**Required:** `id`, `phase`, `title`, `description`, `status`, `order`.
**Optional:** `date`, `relatedProjectIds`, `relatedOssIds`.

**Validation rules**
- `status`: `past` ⇒ gray dot; `current` ⇒ `red-core`; `future` ⇒ `red-dim` + dimmed text (`design-system §7.7`).
- `description`: ≤ 140 chars (single-sentence rule).
- `order`: integer; unique; strictly increasing along the timeline.
- `relatedProjectIds` / `relatedOssIds` must resolve to existing entities.
- At least the final entries should be `future` to express forward trajectory (soft rule, warning).

**Example**
```json
{
  "id": "gsoc-goal",
  "phase": "Future",
  "title": "Google Summer of Code",
  "description": "Contribute to a major open-source project through a structured GSoC program.",
  "status": "future",
  "order": 90,
  "relatedOssIds": ["open-source-journey"]
}
```

---

## 4. Obsession

**Purpose:** A focus area in the Obsessions section, each with a short "why it matters" (`FR-OBS-1..3`).

```ts
interface Obsession {
  id: Slug;                     // required
  term: string;                 // required — e.g. "Repository Intelligence"
  why: string;                  // required — one line on why it matters
  order: number;                // required — list order

  relatedThemes?: Theme[];      // optional — connects to project themes
}
```

**Required:** `id`, `term`, `why`, `order`.
**Optional:** `relatedThemes`.

**Validation rules**
- `why`: ≤ 120 chars (one calm line).
- `order`: integer ≥ 0; unique within obsessions.
- `term`: unique.

**Example**
```json
{
  "id": "retrieval-systems",
  "term": "Retrieval Systems",
  "why": "Getting the right context to the right place is the core problem behind useful AI.",
  "order": 5,
  "relatedThemes": ["AI", "Systems"]
}
```

---

## 5. Writing Article

**Purpose:** An article/note for the Writing section and `/writing/[slug]` detail pages; future-proofed to render gracefully at zero entries (`FR-WRITE-1..4`, `architecture §3`).

```ts
interface WritingArticle {
  id: Slug;                     // required — route param for /writing/[slug]
  title: string;                // required — serif title
  date: ISODate;                // required — publication date
  summary: string;              // required — crisp one-line summary
  category: WritingCategory;    // required — taxonomy tag
  published: boolean;           // required — false ⇒ excluded from listing
  bodyRef: string;              // required — id/path of MDX article body

  updatedDate?: ISODate;        // optional
  readingMinutes?: number;      // optional — derived or authored
  tags?: string[];              // optional — secondary monospace tags
  relatedProjectIds?: Slug[];   // optional — refs to Project.id
  relatedArticleIds?: Slug[];   // optional — refs to WritingArticle.id
  cover?: ImageAsset;           // optional
}
```

**Required:** `id`, `title`, `date`, `summary`, `category`, `published`, `bodyRef`.
**Optional:** `updatedDate`, `readingMinutes`, `tags`, `relatedProjectIds`, `relatedArticleIds`, `cover`.

**Validation rules**
- `category` ∈ `WritingCategory`.
- `published: false` entries are hidden from the listing but may exist (drafts).
- `summary`: ≤ 160 chars.
- `bodyRef` must resolve to existing MDX content.
- `relatedArticleIds` must not include self; must resolve to existing articles.
- Empty published set ⇒ listing renders the composed empty state (`design-system §7.10`).

**Example**
```json
{
  "id": "designing-repository-intelligence",
  "title": "Designing Repository Intelligence",
  "date": "2025-09-12",
  "summary": "Notes on indexing, retrieval, and making large codebases legible to engineers.",
  "category": "System Design",
  "published": true,
  "bodyRef": "designing-repository-intelligence",
  "readingMinutes": 8,
  "relatedProjectIds": ["giro"]
}
```

---

## 6. OSS Contribution

**Purpose:** An open-source contribution for the OSS section, tied to the GSoC narrative and linkable to repositories/PRs (`FR-OSS-1..3`).

```ts
interface OSSContribution {
  id: Slug;                     // required
  project: string;              // required — upstream project name
  contribution: string;         // required — what was done + impact framing
  order: number;                // required — list order
  kind: "pr" | "issue" | "review" | "feature" | "docs" | "maintenance"; // required

  date?: ISODate;               // optional
  status?: "merged" | "open" | "draft" | "closed"; // optional
  links?: ExternalLink[];       // optional — PR/issue/repo links
  repositoryId?: Slug;          // optional — ref to GitHubRepository.id (see §7)
  gsocRelevant?: boolean;       // optional — flags GSoC-trajectory items
}
```

**Required:** `id`, `project`, `contribution`, `order`, `kind`.
**Optional:** `date`, `status`, `links`, `repositoryId`, `gsocRelevant`.

**Validation rules**
- `contribution`: framed by impact/learning, ≤ 200 chars (`spec §7.5`).
- `repositoryId` present ⇒ must resolve to an existing `GitHubRepository.id`.
- `links[].href`: valid https URL.
- `order`: integer ≥ 0; unique within OSS contributions.

**Example**
```json
{
  "id": "open-source-journey",
  "project": "Example OSS Library",
  "contribution": "Improved retrieval accuracy and added tests, building toward GSoC-level contributions.",
  "order": 0,
  "kind": "pr",
  "status": "merged",
  "gsocRelevant": true,
  "links": [{ "label": "Pull Request", "href": "https://github.com/example/lib/pull/123", "kind": "external" }],
  "repositoryId": "example-lib"
}
```

---

## 7. GitHub Repository

**Purpose:** A normalized repository model for the GitHub section's recent-repos list, decoupled from the upstream API shape (`FR-GH-2`, `architecture §6.5`). Also the reference target for `Project.repository` and `OSSContribution.repositoryId`.

```ts
interface GitHubRepository {
  id: Slug;                     // required — normalized id (repo name slug)
  name: string;                 // required — display name
  description: string | null;   // required — may be null (rendered gracefully)
  url: URLString;               // required — canonical repo URL
  stars: number;                // required — stargazer count (≥ 0)
  primaryLanguage: string | null; // required — may be null
  updatedAt: ISODate;           // required — last push/update timestamp

  isFork?: boolean;             // optional
  isArchived?: boolean;         // optional
  topics?: string[];            // optional — monospace tags
  ownerLogin?: string;          // optional — for OSS vs. personal distinction
}
```

**Required:** `id`, `name`, `description`, `url`, `stars`, `primaryLanguage`, `updatedAt`.
**Optional:** `isFork`, `isArchived`, `topics`, `ownerLogin`.

**Validation rules**
- `stars`: integer ≥ 0.
- `description`/`primaryLanguage`: explicitly nullable; UI renders a calm fallback when null.
- `url`: valid https GitHub URL.
- Produced only by the GitHub integration adapter (normalized), never authored by hand except in the fallback snapshot.

**Example**
```json
{
  "id": "giro",
  "name": "giro",
  "description": "Repository intelligence platform.",
  "url": "https://github.com/example/giro",
  "stars": 42,
  "primaryLanguage": "TypeScript",
  "updatedAt": "2026-05-30",
  "topics": ["ai", "retrieval", "developer-tools"],
  "ownerLogin": "gatik"
}
```

---

## 8. GitHub Activity Event

**Purpose:** A normalized recent-activity item plus the aggregate activity payload the section consumes. Supports the contribution graph, recent activity feed, and the mandatory fallback (`FR-GH-1..5`, `architecture §6`).

```ts
type GitHubEventType =
  | "commit" | "pull_request" | "issue" | "review" | "release" | "create";

interface GitHubActivityEvent {
  id: string;                   // required — unique event id
  type: GitHubEventType;        // required
  repoName: string;             // required — display repo name
  repoUrl: URLString;           // required
  title: string;                // required — human-readable summary line
  createdAt: ISODate;           // required — event timestamp
  url?: URLString;              // optional — deep link to the event
}

/** One calendar cell of the contribution graph. */
interface ContributionDay {
  date: ISODate;                // required
  count: number;                // required — contributions that day (≥ 0)
  level: 0 | 1 | 2 | 3 | 4;     // required — maps to gh-0..gh-4 red scale
}

/** Aggregate payload returned by the GitHub adapter (live or fallback). */
interface GitHubActivity {
  generatedAt: ISODate;         // required — when this payload was produced
  source: "live" | "snapshot";  // required — drives the fallback indicator
  totalContributions: number;   // required — for the understated stats line
  calendar: ContributionDay[];  // required — contribution graph data
  recentRepositories: GitHubRepository[]; // required — see §7
  recentEvents: GitHubActivityEvent[];    // required — activity feed
}
```

**Required (event):** `id`, `type`, `repoName`, `repoUrl`, `title`, `createdAt`.
**Required (activity):** `generatedAt`, `source`, `totalContributions`, `calendar`, `recentRepositories`, `recentEvents`.
**Optional:** event `url`.

**Validation rules**
- `level` ∈ {0,1,2,3,4}; maps exactly to `gh-0..gh-4` (red scale, never green — `design-system §2.6`).
- `count`, `totalContributions`: integers ≥ 0.
- `source: "snapshot"` signals the graceful fallback path; the UI still renders the full calm layout (`FR-GH-4`, `SM-9`).
- Arrays may be empty; the UI degrades to placeholder copy rather than an error.
- This payload is always produced by the adapter; on upstream failure it resolves to the committed snapshot.

**Example (truncated)**
```json
{
  "generatedAt": "2026-06-14",
  "source": "live",
  "totalContributions": 1284,
  "calendar": [
    { "date": "2026-06-13", "count": 6, "level": 3 },
    { "date": "2026-06-14", "count": 12, "level": 4 }
  ],
  "recentRepositories": [{ "id": "giro", "name": "giro", "description": "Repository intelligence platform.", "url": "https://github.com/example/giro", "stars": 42, "primaryLanguage": "TypeScript", "updatedAt": "2026-05-30" }],
  "recentEvents": [
    { "id": "e1", "type": "pull_request", "repoName": "example/lib", "repoUrl": "https://github.com/example/lib", "title": "Improved retrieval accuracy", "createdAt": "2026-06-10", "url": "https://github.com/example/lib/pull/123" }
  ]
}
```

---

## 9. Navigation Item

**Purpose:** Drives the global navbar and anchored in-page navigation across the IA sections (`FR-GLOBAL-1`, `FR-GLOBAL-3`, `spec §6.1`).

```ts
interface NavigationItem {
  id: Slug;                     // required — matches section anchor id
  label: string;                // required — monospace nav label
  target: string;               // required — anchor (e.g. "#projects") or route
  order: number;                // required — left→right order
  type: "anchor" | "route";     // required — in-page scroll vs. page nav

  external?: boolean;           // optional — opens in new tab if true
  showInMobile?: boolean;       // optional — default true
}
```

**Required:** `id`, `label`, `target`, `order`, `type`.
**Optional:** `external`, `showInMobile`.

**Validation rules**
- `type: "anchor"` ⇒ `target` starts with `#` and must match an existing section id from the IA.
- `type: "route"` ⇒ `target` is a valid internal path (e.g., `/writing`).
- `order`: integer ≥ 0; unique.
- Nav set must cover the core sections in IA order (`spec §6.1`).

**Example**
```json
{ "id": "projects", "label": "Work", "target": "#projects", "order": 3, "type": "anchor" }
```

---

## 10. Social Link

**Purpose:** Profile links used in Contact and Footer (`FR-CON-2`, `design-system §7.11/§7.12`).

```ts
interface SocialLink {
  id: Slug;                     // required — e.g. "github"
  platform: string;             // required — display label, e.g. "GitHub"
  href: URLString;              // required
  handle: string;               // required — monospace handle, e.g. "@gatik"
  order: number;                // required — display order

  primary?: boolean;            // optional — emphasized (e.g. GitHub)
  iconKey?: string;             // optional — references an icon mapping, not an asset
}
```

**Required:** `id`, `platform`, `href`, `handle`, `order`.
**Optional:** `primary`, `iconKey`.

**Validation rules**
- `href`: valid https URL.
- `order`: integer ≥ 0; unique.
- At least one entry should be GitHub (soft rule, aligns with the OSS positioning).

**Example**
```json
{ "id": "github", "platform": "GitHub", "href": "https://github.com/gatik", "handle": "@gatik", "order": 0, "primary": true }
```

---

## 11. Contact Information

**Purpose:** Single source for the Contact section's invitation, email, and profile row (`FR-CON-1..3`). Resolves `OQ-1` at the config/data level.

```ts
interface ContactInformation {
  invitation: string;           // required — serif invitation line
  email: string;                // required — primary contact email
  socialLinks: SocialLink[];    // required — profile row (refs §10 shape)

  availability?: string;        // optional — monospace status, e.g. "Open to internships"
  location?: string;            // optional — e.g. "Dubai, UAE"
  responseNote?: string;        // optional — small reassurance line
}
```

**Required:** `invitation`, `email`, `socialLinks`.
**Optional:** `availability`, `location`, `responseNote`.

**Validation rules**
- `email`: valid email format.
- `socialLinks`: non-empty; each conforms to `SocialLink` rules.
- `invitation`: ≤ 80 chars (single calm serif line).

**Example**
```json
{
  "invitation": "Let's build something.",
  "email": "gatik@example.com",
  "availability": "Open to internships & OSS collaboration",
  "location": "Dubai, UAE",
  "socialLinks": [
    { "id": "github", "platform": "GitHub", "href": "https://github.com/gatik", "handle": "@gatik", "order": 0, "primary": true }
  ]
}
```

---

## 12. Site Metadata

**Purpose:** Global identity, SEO, and Open Graph configuration consumed by the root layout and metadata generation (`NFR-SEO-1..3`, `architecture §3`).

```ts
interface SiteMetadata {
  name: string;                 // required — "Gatik Tulsiani"
  headline: string;             // required — hero headline
  subheadline: string;          // required — hero subheadline
  description: string;          // required — meta description
  siteUrl: URLString;           // required — canonical base URL
  locale: string;               // required — e.g. "en"

  role?: string;                // optional — monospace hero role line
  keywords?: string[];          // optional — SEO keywords
  ogImage?: ImageAsset;         // optional — default social share image
  twitterHandle?: string;       // optional
  themeColor?: string;          // optional — defaults to bg-base (#0A0A0B)
  author?: string;              // optional — defaults to name
}
```

**Required:** `name`, `headline`, `subheadline`, `description`, `siteUrl`, `locale`.
**Optional:** `role`, `keywords`, `ogImage`, `twitterHandle`, `themeColor`, `author`.

**Validation rules**
- `headline` must equal the spec value: "I build AI systems. I learn by shipping them." (`FR-HERO-2`).
- `subheadline` must equal the spec value (`FR-HERO-3`).
- `siteUrl`: valid https URL, no trailing slash.
- `description`: ≤ 160 chars (SEO best practice).
- `themeColor` defaults to `#0A0A0B` (`design-system §2.1`).

**Example**
```json
{
  "name": "Gatik Tulsiani",
  "headline": "I build AI systems. I learn by shipping them.",
  "subheadline": "Computer Science student focused on AI Engineering, Open Source Software, and Production Systems.",
  "role": "AI ENGINEERING · OPEN SOURCE · DUBAI",
  "description": "Engineering-focused portfolio of Gatik Tulsiani — AI systems, open source, and production engineering.",
  "siteUrl": "https://gatik.example",
  "locale": "en",
  "themeColor": "#0A0A0B"
}
```

---

## 13. Model Relationships

### 13.1 Relationship map
```
Theme  ◄──many── Project.themes
Theme  ◄──many── Obsession.relatedThemes

Project ──1:0..1──► GitHubRepository      (Project.repository → GitHubRepository.id)
Project ──1:0..1──► MDX body              (Project.bodyRef → /projects/[slug] content)
Project ◄──many── Experience.relatedProjectIds
Project ◄──many── JourneyMilestone.relatedProjectIds
Project ◄──many── WritingArticle.relatedProjectIds
Project ◄──many── OSSContribution (via shared repository, indirect)

OSSContribution ──1:0..1──► GitHubRepository  (OSSContribution.repositoryId → id)
OSSContribution ◄──many── JourneyMilestone.relatedOssIds

WritingArticle ──1:1──► MDX body          (WritingArticle.bodyRef → /writing/[slug])
WritingArticle ──many──► WritingCategory  (taxonomy)
WritingArticle ──self──► relatedArticleIds

GitHubActivity ──contains──► ContributionDay[]      (graph)
GitHubActivity ──contains──► GitHubRepository[]      (recent repos, §7)
GitHubActivity ──contains──► GitHubActivityEvent[]   (activity feed)

NavigationItem ──anchor──► IA section ids (spec §6.1)
ContactInformation ──contains──► SocialLink[]
SiteMetadata ──global──► layout / SEO / OG
```

### 13.2 Requested relationships (explicit)
- **Projects → Tags:** `Project.themes: Theme[]` using the controlled `Theme` union; enables filtering (`FR-PROJ-6`).
- **OSS Contributions → GitHub Repositories:** `OSSContribution.repositoryId → GitHubRepository.id` (nullable; resolved or omitted).
- **Journey Milestones → Projects:** `JourneyMilestone.relatedProjectIds → Project.id[]` to anchor narrative moments to concrete work; also `relatedOssIds` for OSS milestones.
- **Writing Articles → Categories:** `WritingArticle.category: WritingCategory` (single primary category) plus optional free-form `tags`.

### 13.3 Referential integrity (build-time)
- All `*Id` / `*Ids` references must resolve to existing entities or the build fails (`NFR-REL-2`).
- Deleting a referenced entity surfaces a validation error pointing at the referrer, preventing dead links (`SM-9`, `NFR-REL-2`).
- `bodyRef` for projects/writing must have matching MDX content when present/required.

---

## 14. Scalability & Maintainability Notes

- **Add-only growth.** New projects, experiences, milestones, obsessions, articles, OSS items, social links, and nav items are added as single validated entries — no UI changes (`SM-8`).
- **Detail pages on demand.** `Project.bodyRef` and `WritingArticle.bodyRef` opt entries into `/projects/[slug]` and `/writing/[slug]` without schema changes; absence simply means no detail page (`OQ-3` friendly).
- **GitHub decoupling.** UI depends only on the normalized §7/§8 models; if the upstream API changes, only the adapter changes (`architecture §6.5`).
- **Vocabulary evolution.** Extending `Theme` or `WritingCategory` is a single-union edit; the validation layer flags any unhandled UI mapping.
- **Future expansion alignment.** Models leave room for `FE-1..FE-10` (CMS workflow, deep-dive pages, filtering, RSS, GSoC tracker) without restructuring existing entries.
- **No UI coupling.** All ordering, surfacing, and taxonomy live in data (`order`, `featured`, `status`, `category`), upholding `NFR-MAINT-1` and `FR-GLOBAL-2`.

---

*End of content models. Defines schemas, validation rules, relationships, and example data only; contains no implementation logic. Fully consistent with `spec.md`, `architecture.md`, `visual-direction.md`, and `design-system.md`; information architecture unchanged.*
