import type { OSSContribution } from "@/types";

/**
 * Open-source contributions (spec FR-OSS-1..3), framed by impact and tied to
 * the GSoC narrative via `gsocRelevant`.
 */
export const ossContributions: OSSContribution[] = [
  {
    id: "open-source-journey",
    project: "Open Source Journey",
    contribution:
      "Ongoing GSoC-oriented contributions — improving features and tests while learning maintainer workflows.",
    order: 0,
    kind: "feature",
    status: "open",
    gsocRelevant: true,
  },
] satisfies OSSContribution[];
