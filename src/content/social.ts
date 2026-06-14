import type { SocialLink } from "@/types";

/**
 * Social / profile links (spec FR-CON-2). Handles and URLs are placeholders
 * pending OQ-1 (preferred contact channels and exact handles).
 */
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    platform: "GitHub",
    href: "https://github.com/gatik", // placeholder — OQ-1
    handle: "@gatik",
    order: 0,
    primary: true,
    iconKey: "github",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    href: "https://www.linkedin.com/in/gatik-tulsiani", // placeholder — OQ-1
    handle: "Gatik Tulsiani",
    order: 1,
    iconKey: "linkedin",
  },
] satisfies SocialLink[];
