import type { Obsession } from "@/types";

/**
 * Obsessions / focus areas (spec FR-OBS-1..3), derived from the primary
 * interests in spec.md. Each carries a short "why it matters" line.
 */
export const obsessions: Obsession[] = [
  {
    id: "ai-engineering",
    term: "AI Engineering",
    why: "Turning models into dependable systems is where the real work is.",
    order: 0,
    relatedThemes: ["AI"],
  },
  {
    id: "open-source",
    term: "Open Source",
    why: "Building in the open compounds learning and impact.",
    order: 1,
    relatedThemes: ["OSS"],
  },
  {
    id: "developer-tools",
    term: "Developer Tools",
    why: "Good tools quietly multiply what every engineer can do.",
    order: 2,
    relatedThemes: ["Full Stack"],
  },
  {
    id: "systems-design",
    term: "Systems Design",
    why: "How the pieces fit decides whether software lasts.",
    order: 3,
    relatedThemes: ["Systems"],
  },
  {
    id: "full-stack-engineering",
    term: "Full Stack Engineering",
    why: "Owning the whole path from idea to shipped product.",
    order: 4,
    relatedThemes: ["Full Stack"],
  },
  {
    id: "repository-intelligence",
    term: "Repository Intelligence",
    why: "Making large codebases understandable is a hard, useful problem.",
    order: 5,
    relatedThemes: ["AI", "Systems"],
  },
  {
    id: "retrieval-systems",
    term: "Retrieval Systems",
    why: "Getting the right context to the right place is the core of useful AI.",
    order: 6,
    relatedThemes: ["AI", "Systems"],
  },
] satisfies Obsession[];
