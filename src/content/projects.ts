import type { Project } from "@/types";

/**
 * Featured projects (spec FR-PROJ-1..6). Data-driven: add an entry to surface a
 * new project — no UI changes required. Home preview derives from `featured`
 * and `order`. Detail pages activate when `caseStudySlug` / body content exist.
 */
export const projects: Project[] = [
  {
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
    techStack: ["TypeScript", "Next.js"],
    repositoryId: "giro",
  },
  {
    slug: "suryami-portal",
    title: "Suryami Portal",
    subtitle: "B2B Airport Transfer Platform",
    summary:
      "A production B2B platform coordinating airport transfers for business partners.",
    themes: ["Full Stack", "Systems"],
    order: 1,
    featured: true,
    role: "Builder",
    status: "shipped",
  },
  {
    slug: "open-source-journey",
    title: "Open Source Journey",
    subtitle: "GSoC-oriented OSS contribution journey",
    summary:
      "An ongoing path of open-source contributions building toward Google Summer of Code.",
    themes: ["OSS"],
    order: 2,
    featured: true,
    role: "Contributor",
    status: "active",
  },
] satisfies Project[];
