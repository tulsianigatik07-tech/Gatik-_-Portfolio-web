import type { GitHubActivity } from "@/types";

/**
 * Committed fallback snapshot for the GitHub section (FR-GH-4, SM-9).
 *
 * This is the always-available baseline returned whenever live data cannot be
 * fetched. It contains only public, non-sensitive data — never tokens/secrets
 * (NFR-SEC-1). Values are representative placeholders until live wiring lands
 * in Phase 8 (OQ-2).
 */
export const githubSnapshot: GitHubActivity = {
  generatedAt: "2026-06-01",
  source: "snapshot",
  totalContributions: 0,
  calendar: [],
  recentRepositories: [
    {
      id: "giro",
      name: "giro",
      description: "Repository intelligence platform.",
      url: "https://github.com/gatik/giro",
      stars: 0,
      primaryLanguage: "TypeScript",
      updatedAt: "2026-06-01",
    },
  ],
  recentEvents: [],
};
