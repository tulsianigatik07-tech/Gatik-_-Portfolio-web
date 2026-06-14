import type { JourneyMilestone } from "@/types";

/**
 * Journey timeline (spec FR-JOUR-1..4). Ordered top-to-bottom by `order`.
 * `status` drives node color: past (gray), current (red), future (red, dimmed).
 * Phases/dates are illustrative where docs do not specify exact values.
 */
export const journey: JourneyMilestone[] = [
  {
    id: "learning-to-program",
    phase: "Beginnings",
    title: "Started learning to program",
    description: "Began writing code and discovered a love for building.",
    status: "past",
    order: 0,
  },
  {
    id: "university",
    phase: "University",
    title: "Bachelor of Computer Science, AI & Big Data",
    description:
      "Joined University of Wollongong Dubai to study AI and Big Data.",
    status: "past",
    order: 1,
  },
  {
    id: "first-projects",
    phase: "First Projects",
    title: "Built first real projects",
    description: "Moved from exercises to shipping things people could use.",
    status: "past",
    order: 2,
  },
  {
    id: "production-systems",
    phase: "Production",
    title: "Shipped production systems",
    description: "Built and operated production platforms like Suryami Portal.",
    status: "past",
    order: 3,
    relatedProjectSlugs: ["suryami-portal"],
  },
  {
    id: "oss-contributions",
    phase: "Open Source",
    title: "Started contributing to open source",
    description:
      "Began contributing upstream and learning maintainer workflows.",
    status: "current",
    order: 4,
    relatedOssIds: ["open-source-journey"],
  },
  {
    id: "gsoc-goal",
    phase: "Future",
    title: "Google Summer of Code",
    description:
      "Contribute to a major open-source project through a structured GSoC program.",
    status: "future",
    order: 5,
    relatedOssIds: ["open-source-journey"],
  },
  {
    id: "ai-engineer-goal",
    phase: "Future",
    title: "AI Engineer",
    description: "Grow into an AI Engineer building production AI systems.",
    status: "future",
    order: 6,
  },
] satisfies JourneyMilestone[];
