/**
 * Content model contracts for the Gatik Tulsiani portfolio.
 *
 * Source of truth: `content-models.md`. These declarations are the contract
 * between the data-driven content layer and the UI. Adding a content entry
 * must never require changes to these types or to UI code (FR-GLOBAL-2,
 * NFR-MAINT-1, SM-8).
 *
 * `Slug` and `ISODateString` are documented as plain string aliases here;
 * nominal branding/validation is applied at the (future) validation boundary,
 * so authored content uses plain strings.
 */

// ---------------------------------------------------------------------------
// Shared primitive & vocabulary types (single source of truth)
// ---------------------------------------------------------------------------

/** Kebab-case identifier, URL-safe; also usable as a route slug. */
export type Slug = string;

/** ISO 8601 date string (YYYY-MM-DD). */
export type ISODateString = string;

/** Controlled project/theme vocabulary (spec FR-PROJ-6). Exhaustive. */
export type ProjectTheme = "AI" | "OSS" | "Systems" | "Full Stack";

/** Writing taxonomy (spec FR-WRITE-1/4). Exhaustive. */
export type WritingCategory =
  | "AI Engineering"
  | "OSS"
  | "System Design"
  | "Engineering";

/** Temporal status for the journey timeline (spec FR-JOUR-3). */
export type MilestoneStatus = "past" | "current" | "future";

/** Labeled external link with a typed intent. */
export interface ExternalLink {
  readonly label: string;
  readonly href: string;
  readonly kind?: "live" | "repo" | "article" | "external";
}

/** Restrained image asset (detail pages / OG). */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
}

// ---------------------------------------------------------------------------
// 1. Project — identity key: `slug`
// ---------------------------------------------------------------------------

export interface Project {
  readonly slug: Slug;
  readonly title: string;
  readonly summary: string;
  readonly themes: readonly ProjectTheme[];
  readonly order: number;
  readonly featured: boolean;

  readonly subtitle?: string;
  readonly year?: string;
  readonly role?: string;
  readonly status?: "in-progress" | "shipped" | "active" | "archived";
  readonly problem?: string;
  readonly approach?: string;
  readonly outcome?: string;
  readonly techStack?: readonly string[];
  readonly links?: readonly ExternalLink[];
  readonly caseStudySlug?: Slug;
  readonly repositoryId?: Slug;
  readonly cover?: ImageAsset;
  readonly pinned?: boolean;
}

// ---------------------------------------------------------------------------
// 2. Experience — identity key: `id`
// ---------------------------------------------------------------------------

export interface Experience {
  readonly id: Slug;
  readonly organization: string;
  readonly role: string;
  readonly type: "work" | "research" | "education" | "independent";
  readonly startDate: ISODateString;
  readonly summary: string;
  readonly order: number;

  readonly endDate?: ISODateString;
  readonly location?: string;
  readonly highlights?: readonly string[];
  readonly links?: readonly ExternalLink[];
  readonly relatedProjectSlugs?: readonly Slug[];
}

// ---------------------------------------------------------------------------
// 3. JourneyMilestone — identity key: `id`
// ---------------------------------------------------------------------------

export interface JourneyMilestone {
  readonly id: Slug;
  readonly phase: string;
  readonly title: string;
  readonly description: string;
  readonly status: MilestoneStatus;
  readonly order: number;

  readonly date?: ISODateString;
  readonly relatedProjectSlugs?: readonly Slug[];
  readonly relatedOssIds?: readonly Slug[];
}

// ---------------------------------------------------------------------------
// 4. Obsession — identity key: `id`
// ---------------------------------------------------------------------------

export interface Obsession {
  readonly id: Slug;
  readonly term: string;
  readonly why: string;
  readonly order: number;

  readonly relatedThemes?: readonly ProjectTheme[];
}

// ---------------------------------------------------------------------------
// 5. WritingArticle — identity key: `slug`
// ---------------------------------------------------------------------------

export interface WritingArticle {
  readonly slug: Slug;
  readonly title: string;
  readonly date: ISODateString;
  readonly summary: string;
  readonly category: WritingCategory;
  readonly published: boolean;

  readonly updatedDate?: ISODateString;
  readonly readingMinutes?: number;
  readonly tags?: readonly string[];
  readonly relatedProjectSlugs?: readonly Slug[];
  readonly relatedArticleSlugs?: readonly Slug[];
  readonly cover?: ImageAsset;
}

// ---------------------------------------------------------------------------
// 6. OSSContribution — identity key: `id`
// ---------------------------------------------------------------------------

export interface OSSContribution {
  readonly id: Slug;
  readonly project: string;
  readonly contribution: string;
  readonly order: number;
  readonly kind: "pr" | "issue" | "review" | "feature" | "docs" | "maintenance";

  readonly date?: ISODateString;
  readonly status?: "merged" | "open" | "draft" | "closed";
  readonly links?: readonly ExternalLink[];
  readonly repositoryId?: Slug;
  readonly gsocRelevant?: boolean;
}

// ---------------------------------------------------------------------------
// 7. GitHubRepository — identity key: `id`. Normalized; no secrets.
// ---------------------------------------------------------------------------

export interface GitHubRepository {
  readonly id: Slug;
  readonly name: string;
  readonly description: string | null;
  readonly url: string;
  readonly stars: number;
  readonly primaryLanguage: string | null;
  readonly updatedAt: ISODateString;

  readonly isFork?: boolean;
  readonly isArchived?: boolean;
  readonly topics?: readonly string[];
  readonly ownerLogin?: string;
}

// ---------------------------------------------------------------------------
// 8. GitHubActivityEvent + GitHubActivity aggregate — normalized; no secrets.
// ---------------------------------------------------------------------------

export type GitHubEventType =
  | "commit"
  | "pull_request"
  | "issue"
  | "review"
  | "release"
  | "create";

export interface GitHubActivityEvent {
  readonly id: string;
  readonly type: GitHubEventType;
  readonly repoName: string;
  readonly repoUrl: string;
  readonly title: string;
  readonly createdAt: ISODateString;

  readonly url?: string;
}

/** One calendar cell of the contribution graph (red scale, never green). */
export interface ContributionDay {
  readonly date: ISODateString;
  readonly count: number;
  readonly level: 0 | 1 | 2 | 3 | 4;
}

/** Aggregate payload returned by the GitHub adapter — live OR snapshot. */
export interface GitHubActivity {
  readonly generatedAt: ISODateString;
  readonly source: "live" | "snapshot";
  readonly totalContributions: number;
  readonly calendar: readonly ContributionDay[];
  readonly recentRepositories: readonly GitHubRepository[];
  readonly recentEvents: readonly GitHubActivityEvent[];
}

// ---------------------------------------------------------------------------
// 9. NavigationItem — identity key: `id`
// ---------------------------------------------------------------------------

export interface NavigationItem {
  readonly id: Slug;
  readonly label: string;
  readonly target: string;
  readonly order: number;
  readonly type: "anchor" | "route";

  readonly external?: boolean;
  readonly showInMobile?: boolean;
}

// ---------------------------------------------------------------------------
// 10. SocialLink — identity key: `id`
// ---------------------------------------------------------------------------

export interface SocialLink {
  readonly id: Slug;
  readonly platform: string;
  readonly href: string;
  readonly handle: string;
  readonly order: number;

  readonly primary?: boolean;
  readonly iconKey?: string;
}

// ---------------------------------------------------------------------------
// 11. ContactInformation — singleton
// ---------------------------------------------------------------------------

export interface ContactInformation {
  readonly invitation: string;
  readonly email: string;
  readonly socialLinks: readonly SocialLink[];

  readonly availability?: string;
  readonly location?: string;
  readonly responseNote?: string;
}

// ---------------------------------------------------------------------------
// 12. SiteMetadata — singleton
// ---------------------------------------------------------------------------

export interface SiteMetadata {
  readonly name: string;
  readonly headline: string;
  readonly subheadline: string;
  readonly description: string;
  readonly siteUrl: string;
  readonly locale: string;

  readonly role?: string;
  readonly keywords?: readonly string[];
  readonly ogImage?: ImageAsset;
  readonly twitterHandle?: string;
  readonly themeColor?: string;
  readonly author?: string;
}
