import "server-only";

/**
 * Server-only environment access.
 *
 * The `server-only` import guarantees this module can never be imported into a
 * client bundle, so secrets (e.g. the GitHub token) are never shipped to the
 * browser (NFR-SEC-1, NFR-DEPLOY-2). Read configuration exclusively through
 * `serverEnv`; never reference `process.env` for secrets elsewhere.
 *
 * All GitHub fields are optional: when absent, the GitHub integration falls
 * back to the committed snapshot so the section never breaks (FR-GH-4, SM-9).
 */

export interface ServerEnv {
  /** GitHub Personal Access Token (read-only scope). Optional. */
  readonly githubToken: string | undefined;
  /** GitHub username whose activity is surfaced. Optional. */
  readonly githubUsername: string | undefined;
  /** Canonical site URL for metadata/SEO. Optional (sensible fallback). */
  readonly siteUrl: string;
}

function readEnv(): ServerEnv {
  return {
    githubToken: process.env.GITHUB_TOKEN,
    githubUsername: process.env.GITHUB_USERNAME,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };
}

export const serverEnv: ServerEnv = readEnv();

/** True when live GitHub data can be fetched; otherwise use the snapshot. */
export function hasGitHubCredentials(): boolean {
  return Boolean(serverEnv.githubToken && serverEnv.githubUsername);
}
