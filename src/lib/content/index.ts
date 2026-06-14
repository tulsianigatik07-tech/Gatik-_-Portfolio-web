import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { journey } from "@/content/journey";
import { obsessions } from "@/content/obsessions";
import { ossContributions } from "@/content/oss";
import { writingArticles } from "@/content/writing";
import { contactInformation } from "@/content/contact";
import { socialLinks } from "@/content/social";
import { siteMetadata } from "@/config/site";
import { navigation } from "@/config/navigation";
import type {
  ContactInformation,
  Experience,
  JourneyMilestone,
  NavigationItem,
  Obsession,
  OSSContribution,
  Project,
  SiteMetadata,
  SocialLink,
  WritingArticle,
} from "@/types";

/**
 * Content access layer (architecture §5.2). The UI depends only on these
 * typed accessors, never on raw content modules. Ordering and filtering live
 * here in data, not in components (FR-GLOBAL-2, NFR-MAINT-1).
 */

const byOrder = <T extends { order: number }>(a: T, b: T): number =>
  a.order - b.order;

// --- Projects --------------------------------------------------------------

export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// --- Experience ------------------------------------------------------------

export function getExperience(): Experience[] {
  return [...experience].sort(byOrder);
}

// --- Journey ---------------------------------------------------------------

export function getJourney(): JourneyMilestone[] {
  return [...journey].sort(byOrder);
}

// --- Obsessions ------------------------------------------------------------

export function getObsessions(): Obsession[] {
  return [...obsessions].sort(byOrder);
}

// --- OSS -------------------------------------------------------------------

export function getOSSContributions(): OSSContribution[] {
  return [...ossContributions].sort(byOrder);
}

// --- Writing ---------------------------------------------------------------

/** Published articles, newest first. May be empty (FR-WRITE-2). */
export function getPublishedWriting(): WritingArticle[] {
  return [...writingArticles]
    .filter((a) => a.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getWritingBySlug(slug: string): WritingArticle | undefined {
  return writingArticles.find((a) => a.slug === slug && a.published);
}

// --- Singletons & navigation ----------------------------------------------

export function getNavigation(): NavigationItem[] {
  return [...navigation].sort(byOrder);
}

export function getSocialLinks(): SocialLink[] {
  return [...socialLinks].sort(byOrder);
}

export function getContact(): ContactInformation {
  return contactInformation;
}

export function getSiteMetadata(): SiteMetadata {
  return siteMetadata;
}
