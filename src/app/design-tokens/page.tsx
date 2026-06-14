"use client";

/**
 * Internal design-tokens reference page (PHASE 2, task 14).
 *
 * Renders every design token so it can be visually verified. Color values are
 * read at runtime from the single-source CSS variables via getComputedStyle —
 * proving tokens are centralized (no hardcoded hexes here). Type/spacing/radius
 * are rendered through token-backed utilities; motion is imported from the
 * canonical motion module. Not part of the public site (PHASE 3+).
 */

import { useEffect, useState } from "react";
import { duration, easingCss, stagger, reveal } from "@/lib/design/motion";

type TokenRef = { readonly label: string; readonly cssVar: string };

const COLOR_GROUPS: ReadonlyArray<{
  readonly title: string;
  readonly tokens: ReadonlyArray<TokenRef>;
}> = [
  {
    title: "Backgrounds",
    tokens: [
      { label: "bg-base", cssVar: "--bg-base" },
      { label: "bg-deep", cssVar: "--bg-deep" },
      { label: "bg-raised", cssVar: "--bg-raised" },
    ],
  },
  {
    title: "Surfaces",
    tokens: [
      { label: "surface-1", cssVar: "--surface-1" },
      { label: "surface-2", cssVar: "--surface-2" },
      { label: "surface-contrast", cssVar: "--surface-contrast" },
    ],
  },
  {
    title: "Borders",
    tokens: [
      { label: "border-hairline", cssVar: "--border-hairline" },
      { label: "border-subtle", cssVar: "--border-subtle" },
      { label: "border-strong", cssVar: "--border-strong" },
    ],
  },
  {
    title: "Text inks",
    tokens: [
      { label: "ink-primary", cssVar: "--ink-primary" },
      { label: "ink-body", cssVar: "--ink-body" },
      { label: "ink-muted", cssVar: "--ink-muted" },
      { label: "ink-faint", cssVar: "--ink-faint" },
    ],
  },
  {
    title: "Accent red",
    tokens: [
      { label: "red-core", cssVar: "--red-core" },
      { label: "red-bright", cssVar: "--red-bright" },
      { label: "red-dim", cssVar: "--red-dim" },
      { label: "red-deep", cssVar: "--red-deep" },
      { label: "red-glow", cssVar: "--red-glow" },
      { label: "red-glow-soft", cssVar: "--red-glow-soft" },
    ],
  },
  {
    title: "GitHub contribution scale (red, never green)",
    tokens: [
      { label: "gh-0", cssVar: "--gh-0" },
      { label: "gh-1", cssVar: "--gh-1" },
      { label: "gh-2", cssVar: "--gh-2" },
      { label: "gh-3", cssVar: "--gh-3" },
      { label: "gh-4", cssVar: "--gh-4" },
    ],
  },
];

const TYPE_SAMPLES: ReadonlyArray<{
  readonly label: string;
  readonly className: string;
  readonly serif?: boolean;
  readonly mono?: boolean;
}> = [
  { label: "text-hero", className: "text-hero", serif: true },
  { label: "text-section", className: "text-section", serif: true },
  { label: "text-project", className: "text-project", serif: true },
  { label: "text-substatement", className: "text-substatement", serif: true },
  { label: "text-body", className: "text-body" },
  { label: "text-body-sm", className: "text-body-sm" },
  { label: "text-label", className: "text-label uppercase", mono: true },
  { label: "text-meta", className: "text-meta", mono: true },
  { label: "text-nav", className: "text-nav uppercase", mono: true },
  { label: "text-tag", className: "text-tag uppercase", mono: true },
];

const SPACING: ReadonlyArray<{ readonly label: string; readonly w: string }> = [
  { label: "space-1 (4px)", w: "w-1" },
  { label: "space-2 (8px)", w: "w-2" },
  { label: "space-3 (12px)", w: "w-3" },
  { label: "space-4 (16px)", w: "w-4" },
  { label: "space-6 (24px)", w: "w-6" },
  { label: "space-8 (32px)", w: "w-8" },
  { label: "space-12 (48px)", w: "w-12" },
  { label: "space-16 (64px)", w: "w-16" },
  { label: "space-24 (96px)", w: "w-24" },
  { label: "space-32 (128px)", w: "w-32" },
  { label: "space-40 (160px)", w: "w-40" },
  { label: "space-48 (192px)", w: "w-48" },
];

const RADII: ReadonlyArray<{ readonly label: string; readonly cls: string }> = [
  { label: "radius-none", cls: "rounded-none" },
  { label: "radius-xs", cls: "rounded-xs" },
  { label: "radius-sm", cls: "rounded-sm" },
  { label: "radius-md", cls: "rounded-md" },
  { label: "radius-pill", cls: "rounded-pill" },
];

const CONTRAST: ReadonlyArray<{
  readonly token: string;
  readonly ratio: string;
  readonly note: string;
}> = [
  { token: "ink-primary on bg-base", ratio: "18.14:1", note: "AAA" },
  { token: "ink-body on bg-base", ratio: "7.72:1", note: "AA (normal)" },
  {
    token: "red-bright on bg-base",
    ratio: "6.54:1",
    note: "AA (normal) — red TEXT",
  },
  {
    token: "red-core on bg-base",
    ratio: "5.06:1",
    note: "non-text accents only",
  },
  {
    token: "ink-muted on bg-base",
    ratio: "4.09:1",
    note: "AA large / secondary only",
  },
  {
    token: "ink-faint on bg-base",
    ratio: "2.56:1",
    note: "decorative / non-essential only",
  },
];

function useCssVar(cssVar: string): string {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVar)
      .trim();
    setValue(v);
  }, [cssVar]);
  return value;
}

function Swatch({ token }: { token: TokenRef }) {
  const value = useCssVar(token.cssVar);
  return (
    <div className="flex items-center gap-3">
      <div
        className="border-hairline-strong size-12 shrink-0 rounded-xs border"
        style={{ background: `var(${token.cssVar})` }}
      />
      <div className="min-w-0">
        <p className="text-meta text-ink font-mono">{token.label}</p>
        <p className="text-meta text-ink-muted font-mono">{value || "…"}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-hairline border-t py-16">
      <h2 className="text-label text-ink-muted mb-8 font-mono uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignTokensPage() {
  return (
    <main className="max-w-page mx-auto px-6 py-16 md:px-10">
      <header className="pb-8">
        <p className="text-label text-red-core font-mono uppercase">
          Internal · Design System
        </p>
        <h1 className="text-section text-ink mt-4 font-serif">
          Design Tokens Reference
        </h1>
        <p className="text-body max-w-measure text-ink-body mt-4">
          Every token rendered for visual verification. Colors are read live
          from the single-source CSS variables.
        </p>
      </header>

      <Section title="Color">
        <div className="space-y-12">
          {COLOR_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-meta text-ink-body mb-4 font-mono">
                {group.title}
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                {group.tokens.map((t) => (
                  <Swatch key={t.cssVar} token={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-8">
          {TYPE_SAMPLES.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-meta text-ink-muted font-mono">
                {s.label}
              </span>
              <span
                className={`${s.className} ${
                  s.serif ? "font-serif" : s.mono ? "font-mono" : "font-sans"
                } text-ink`}
              >
                I build AI systems. I learn by shipping them.
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing (4px scale)">
        <div className="space-y-3">
          {SPACING.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="text-meta text-ink-muted w-32 shrink-0 font-mono">
                {s.label}
              </span>
              <div className={`${s.w} bg-red-core h-3 rounded-xs`} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="flex flex-wrap gap-8">
          {RADII.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div
                className={`${r.cls} border-hairline-strong bg-surface-2 size-16 border`}
              />
              <span className="text-meta text-ink-muted font-mono">
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Motion">
        <div className="space-y-6">
          <div>
            <h3 className="text-meta text-ink-body mb-3 font-mono">
              Durations (ms)
            </h3>
            <ul className="text-meta text-ink-muted space-y-1 font-mono">
              {Object.entries(duration).map(([k, v]) => (
                <li key={k}>
                  dur.{k}: {v}ms
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-meta text-ink-body mb-3 font-mono">Easings</h3>
            <ul className="text-meta text-ink-muted space-y-1 font-mono">
              {Object.entries(easingCss).map(([k, v]) => (
                <li key={k}>
                  ease.{k}: {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-meta text-ink-body mb-3 font-mono">
              Stagger &amp; reveal
            </h3>
            <ul className="text-meta text-ink-muted space-y-1 font-mono">
              <li>stagger.list: {stagger.list}ms</li>
              <li>reveal.offsetY: {reveal.offsetY}px</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Accessibility standards (design-system.md §8)">
        <div className="space-y-8">
          <div>
            <h3 className="text-meta text-ink-body mb-3 font-mono">
              Measured contrast on bg-base (WCAG)
            </h3>
            <ul className="text-body-sm text-ink-body space-y-1">
              {CONTRAST.map((c) => (
                <li key={c.token}>
                  <span className="text-ink font-mono">{c.token}</span> —{" "}
                  {c.ratio} <span className="text-ink-muted">({c.note})</span>
                </li>
              ))}
            </ul>
            <p className="text-body-sm max-w-measure text-ink-muted mt-4">
              Red text uses red-bright; red-core is reserved for non-text
              accents. ink-muted/ink-faint are limited to large or non-essential
              text per their ratios.
            </p>
          </div>
          <div>
            <h3 className="text-meta text-ink-body mb-3 font-mono">
              Focus ring (keyboard) — tab to the control
            </h3>
            <button
              type="button"
              className="text-meta border-hairline-strong bg-surface-1 text-ink rounded-xs border px-4 py-2 font-mono"
            >
              Focusable control
            </button>
            <p className="text-body-sm max-w-measure text-ink-muted mt-4">
              2px red-bright outline at 2px offset via :focus-visible; never
              removed.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
