import type { SiteMetadata } from "@/types";

/**
 * Global site metadata (spec FR-HERO-1..3, NFR-SEO-1..3). The headline and
 * subheadline are fixed to the exact spec values. `siteUrl` is a placeholder
 * pending OQ-6 (domain) and is overridden by NEXT_PUBLIC_SITE_URL at runtime.
 */
export const siteMetadata: SiteMetadata = {
  name: "Gatik Tulsiani",
  headline: "I build AI systems. I learn by shipping them.",
  subheadline:
    "Computer Science student focused on AI Engineering, Open Source Software, and Production Systems.",
  role: "AI ENGINEERING · OPEN SOURCE · DUBAI",
  description:
    "Engineering-focused portfolio of Gatik Tulsiani — AI systems, open source, and production engineering.",
  siteUrl: "https://gatik.example", // placeholder — OQ-6
  locale: "en",
  themeColor: "#0A0A0B",
  author: "Gatik Tulsiani",
} satisfies SiteMetadata;
