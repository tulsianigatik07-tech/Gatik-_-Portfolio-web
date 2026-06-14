import "server-only";

import type { GitHubActivity } from "@/types";
import { hasGitHubCredentials } from "@/lib/env";
import { githubSnapshot } from "./snapshot";

/**
 * GitHub integration boundary (architecture §6). Nothing outside this module
 * talks to GitHub. The adapter ALWAYS returns a renderable, normalized
 * `GitHubActivity` payload — live when credentials and a successful fetch are
 * available, otherwise the committed snapshot (FR-GH-4, NFR-REL-1, SM-9).
 *
 * Live fetching/normalization (ISR + caching, OQ-2) is implemented in Phase 8.
 * For now this returns the snapshot so the section is fully functional and can
 * never break the page.
 */
export async function getGitHubActivity(): Promise<GitHubActivity> {
  if (!hasGitHubCredentials()) {
    return githubSnapshot;
  }

  try {
    // Phase 8: fetch from GitHub, normalize to GitHubActivity, cache via ISR.
    // Until then, fall back to the snapshot to keep behavior deterministic.
    return githubSnapshot;
  } catch {
    return githubSnapshot;
  }
}
