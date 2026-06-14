import type { WritingArticle } from "@/types";

/**
 * Writing articles (spec FR-WRITE-1..4). Intentionally empty at launch — the
 * Writing section must render a composed empty state with zero entries
 * (FR-WRITE-2). Add an entry here to surface it; no UI changes required.
 */
export const writingArticles: WritingArticle[] = [] satisfies WritingArticle[];
