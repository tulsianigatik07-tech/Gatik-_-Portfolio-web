/**
 * Motion tokens — canonical source for JS / Framer Motion consumers
 * (design-system.md §9.6). The two easings are mirrored as CSS utilities in
 * globals.css (`--ease-out-soft`, `--ease-in-out-calm`); every other motion
 * value lives here once and is imported, never inlined as a magic number.
 *
 * Phase 2 defines tokens ONLY. The reduced-motion-aware MotionConfig and
 * motion primitives are built in a later phase.
 */

/** Durations in milliseconds. */
export const duration = {
  instant: 0,
  fast: 150,
  base: 280,
  slow: 450,
  slower: 700,
  ambient: 16000,
} as const;

/** Durations in seconds (Framer Motion expects seconds). */
export const durationSeconds = {
  instant: duration.instant / 1000,
  fast: duration.fast / 1000,
  base: duration.base / 1000,
  slow: duration.slow / 1000,
  slower: duration.slower / 1000,
  ambient: duration.ambient / 1000,
} as const;

/** Easing curves as cubic-bezier control points [x1, y1, x2, y2]. */
export const easing = {
  outSoft: [0.22, 1, 0.36, 1],
  inOutCalm: [0.45, 0, 0.55, 1],
  linear: [0, 0, 1, 1],
} as const;

/** Easings as CSS strings (mirror of globals.css utilities). */
export const easingCss = {
  outSoft: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOutCalm: "cubic-bezier(0.45, 0, 0.55, 1)",
  linear: "linear",
} as const;

/** Stagger interval between list children, in milliseconds. */
export const stagger = {
  list: 70,
} as const;

/** Reveal entrance offset, in pixels. */
export const reveal = {
  offsetY: 16,
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
