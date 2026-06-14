import type { NavigationItem } from "@/types";

/**
 * Global navigation (spec FR-GLOBAL-1, FR-GLOBAL-3). Anchors match the IA
 * section order in spec.md §6.1. Targets are section ids on the single-page
 * experience; `/writing` is the one route-level destination.
 */
export const navigation: NavigationItem[] = [
  { id: "about", label: "About", target: "#about", order: 0, type: "anchor" },
  {
    id: "obsessions",
    label: "Obsessions",
    target: "#obsessions",
    order: 1,
    type: "anchor",
  },
  {
    id: "projects",
    label: "Work",
    target: "#projects",
    order: 2,
    type: "anchor",
  },
  {
    id: "experience",
    label: "Experience",
    target: "#experience",
    order: 3,
    type: "anchor",
  },
  {
    id: "journey",
    label: "Journey",
    target: "#journey",
    order: 4,
    type: "anchor",
  },
  { id: "oss", label: "Open Source", target: "#oss", order: 5, type: "anchor" },
  {
    id: "github",
    label: "GitHub",
    target: "#github",
    order: 6,
    type: "anchor",
  },
  {
    id: "writing",
    label: "Writing",
    target: "#writing",
    order: 7,
    type: "anchor",
  },
  {
    id: "contact",
    label: "Contact",
    target: "#contact",
    order: 8,
    type: "anchor",
  },
] satisfies NavigationItem[];
