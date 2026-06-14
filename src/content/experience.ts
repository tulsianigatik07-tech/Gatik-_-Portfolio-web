import type { Experience } from "@/types";

/**
 * Experience records (spec FR-EXP-1..3). Some fields (exact roles, dates) are
 * placeholders where the source documents do not specify them — flagged inline.
 */
export const experience: Experience[] = [
  {
    id: "uowd-bcs",
    organization: "University of Wollongong Dubai",
    role: "Bachelor of Computer Science (AI & Big Data)",
    type: "education",
    startDate: "2023-09-01", // placeholder: start date not specified in docs
    summary:
      "Studying Computer Science with a focus on AI and Big Data while building production systems and contributing to open source.",
    location: "Dubai, UAE",
    order: 0,
  },
  {
    id: "ai-research-intern",
    organization: "University of Wollongong Dubai", // placeholder: host org inferred
    role: "AI Research Intern",
    type: "research",
    startDate: "2025-01-01", // placeholder: dates not specified in docs
    summary:
      "Researched applied AI methods and contributed to experimental systems.",
    location: "Dubai, UAE",
    order: 1,
    relatedProjectSlugs: ["giro"],
  },
  {
    id: "rs-jewellers",
    organization: "RS Jewellers",
    role: "Software Engineer", // placeholder: exact title not specified in docs
    type: "work",
    startDate: "2024-01-01", // placeholder: dates not specified in docs
    summary: "Built and shipped software supporting the business's operations.",
    order: 2,
  },
  {
    id: "independent-builder",
    organization: "Independent",
    role: "Independent Builder",
    type: "independent",
    startDate: "2022-01-01", // placeholder: start date not specified in docs
    summary:
      "Designing and shipping AI systems and production tools as an independent engineer.",
    order: 3,
    relatedProjectSlugs: ["giro", "suryami-portal"],
  },
] satisfies Experience[];
