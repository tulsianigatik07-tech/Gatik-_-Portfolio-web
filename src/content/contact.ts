import type { ContactInformation } from "@/types";
import { socialLinks } from "./social";

/**
 * Contact information (spec FR-CON-1..3). Email is a placeholder pending OQ-1.
 */
export const contactInformation: ContactInformation = {
  invitation: "Let's build something.",
  email: "hello@example.com", // placeholder — OQ-1
  availability: "Open to internships & OSS collaboration",
  location: "Dubai, UAE",
  socialLinks,
} satisfies ContactInformation;
