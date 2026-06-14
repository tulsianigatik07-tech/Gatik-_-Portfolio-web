# Implementation Tasks — Gatik Tulsiani Portfolio Website

**Source spec:** `spec.md` (Draft v1.0)
**Scope:** Execution roadmap to build the portfolio incrementally.
**Convention:** Each task is small, measurable, and verifiable. Mark `[ ]` when open and `[x]` when complete. Complete phases in order; within a phase, complete tasks top to bottom.

---

## PHASE 1 — Project Foundation

- [ ] Initialize the Next.js application
- [ ] Enable and configure TypeScript with strict type checking
- [ ] Install and configure Tailwind CSS
- [ ] Install and configure shadcn/ui
- [ ] Install and configure Framer Motion
- [ ] Configure ESLint and Prettier with agreed code style
- [ ] Set up the project structure and module boundaries
- [ ] Define the content architecture (separation of content from presentation)
- [ ] Define the data model for projects
- [ ] Define the data model for experience entries
- [ ] Define the data model for journey milestones
- [ ] Define the data model for writing entries
- [ ] Define the data model for obsessions
- [ ] Define the data model for OSS contributions
- [ ] Set up environment variable handling for secrets
- [ ] Verify the base application builds and runs locally

## PHASE 2 — Design System

- [ ] Define color tokens for the black base and layered dark surfaces
- [ ] Define the Giro-inspired red accent token scale
- [ ] Verify red-on-black contrast meets accessibility thresholds
- [ ] Select and load the serif heading typeface
- [ ] Select and load the monospace metadata typeface
- [ ] Select and load the body typeface
- [ ] Define the typographic scale and heading hierarchy
- [ ] Define the spacing scale
- [ ] Define the layout grid and container widths
- [ ] Define border, radius, and divider tokens
- [ ] Define motion tokens (durations, easings, delays)
- [ ] Implement the dark theme as the default theme
- [ ] Document accessibility standards for the design system
- [ ] Build a design tokens reference page for internal verification
- [ ] Verify all tokens are centralized and reusable

## PHASE 3 — Navigation & Layout

- [ ] Implement the root layout shell
- [ ] Implement global metadata defaults in the layout
- [ ] Build the global navigation component
- [ ] Implement anchored navigation to core sections
- [ ] Build the footer with attribution and key links
- [ ] Build the mobile navigation experience
- [ ] Verify navigation is keyboard accessible with visible focus states
- [ ] Define the route structure (single-page flow plus optional detail routes)
- [ ] Implement page and route transitions
- [ ] Verify navigation and layout render correctly across breakpoints

## PHASE 4 — Home Experience

- [ ] Build the hero section with name, headline, and subheadline
- [ ] Add primary calls-to-action to the hero
- [ ] Add monospace metadata (role, focus, availability) to the hero
- [ ] Build the about section narrative
- [ ] Surface the "learn by shipping" philosophy in the about section
- [ ] Reference primary interests within the about section
- [ ] Build the obsessions section as a scannable layout
- [ ] Add a short framing of why each obsession matters
- [ ] Build the featured projects preview on the home page
- [ ] Build the experience preview on the home page
- [ ] Build the journey preview on the home page
- [ ] Build the OSS preview on the home page
- [ ] Build the contact CTA on the home page
- [ ] Verify the home page communicates identity within the first viewport

## PHASE 5 — Projects System

- [ ] Implement project data loading from the content layer
- [ ] Build the project card component
- [ ] Build the featured project layout
- [ ] Populate the Giro Repository Intelligence Platform project entry
- [ ] Populate the Suryami Portal B2B Airport Transfer Platform project entry
- [ ] Populate the Open Source Journey project entry
- [ ] Ensure each project communicates problem, build, and significance
- [ ] Build the technology tag component
- [ ] Build the project detail page layout
- [ ] Add external links (live and repository) to projects
- [ ] Implement project filtering by theme
- [ ] Verify a new project can be added as a data entry only
- [ ] Verify the projects system renders correctly across breakpoints

## PHASE 6 — Experience System

- [ ] Implement experience data loading from the content layer
- [ ] Build the experience card component
- [ ] Build the experience timeline layout
- [ ] Add role metadata (organization, role, timeframe) to entries
- [ ] Populate the University of Wollongong Dubai entry
- [ ] Populate the AI Research Intern entry
- [ ] Populate the RS Jewellers entry
- [ ] Populate the Independent Builder entry
- [ ] Build the education section
- [ ] Build the resume-style layout view
- [ ] Verify a new experience entry can be added as data only

## PHASE 7 — Journey Timeline

- [ ] Implement the milestone data model loading
- [ ] Build the timeline visualization component
- [ ] Populate milestones from learning programming through future goals
- [ ] Visually distinguish past milestones from future/aspirational ones
- [ ] Implement the animated timeline reveal
- [ ] Build the storytelling layout so the sequence reads as a narrative
- [ ] Verify the timeline communicates progression clearly
- [ ] Verify a new milestone can be added as an ordered data entry

## PHASE 8 — OSS & GitHub

- [ ] Decide the GitHub data approach (live, cached, or build-time snapshot)
- [ ] Implement the GitHub integration architecture
- [ ] Build the contribution graph display
- [ ] Build the recent repositories display
- [ ] Build the OSS activity feed
- [ ] Build the repository card component
- [ ] Build the OSS contributions section
- [ ] Connect the OSS narrative to the GSoC ambition
- [ ] Add links to contributions, PRs, or repositories
- [ ] Implement the graceful fallback/empty state for unavailable GitHub data
- [ ] Implement the data-refresh strategy and caching behavior
- [ ] Verify GitHub secrets are handled via environment configuration only
- [ ] Verify the section respects third-party rate limits

## PHASE 9 — Writing System

- [ ] Implement the writing data model loading
- [ ] Build the article listing page
- [ ] Build the article detail page
- [ ] Implement the reading experience layout
- [ ] Add metadata support (title, date, summary, route)
- [ ] Implement writing categorization by type
- [ ] Verify the writing section renders gracefully with zero entries
- [ ] Verify a new writing entry can be added as data only

## PHASE 10 — Motion & Visual Effects

- [ ] Build the particle/ambient background effect
- [ ] Implement scroll-triggered animations
- [ ] Implement hover and pointer micro-interactions
- [ ] Implement section reveal animations
- [ ] Build loading and skeleton states
- [ ] Implement the hero entrance animation
- [ ] Honor `prefers-reduced-motion` across all animations
- [ ] Verify animations do not degrade scroll or interaction performance

## PHASE 11 — Performance & SEO

- [ ] Implement per-page titles and meta descriptions
- [ ] Implement Open Graph and social share metadata
- [ ] Add structured data markup
- [ ] Generate the sitemap
- [ ] Add robots configuration for crawlers
- [ ] Optimize images with appropriate loading strategies
- [ ] Optimize font loading
- [ ] Audit and improve Lighthouse scores
- [ ] Verify Core Web Vitals targets on mobile and desktop
- [ ] Verify there are no broken links across the site

## PHASE 12 — Launch

- [ ] Perform responsive testing across all breakpoints
- [ ] Conduct an accessibility audit (automated and manual checks)
- [ ] Verify keyboard navigation and focus order site-wide
- [ ] Review all content for accuracy and tone
- [ ] Configure the Vercel project and environment variables
- [ ] Deploy a preview build and verify behavior
- [ ] Configure the production domain
- [ ] Deploy to production
- [ ] Perform final QA on the production deployment
- [ ] Confirm the live site loads with no console or runtime errors
- [ ] Confirm the GitHub section functions or falls back gracefully in production

---

## Completion Criteria

- [ ] All P0 functional requirements from `spec.md` are satisfied
- [ ] Design system guardrails are upheld (no startup/agency/generic-AI styling, restrained color)
- [ ] The site is original and does not replicate the reference site's layout or components
- [ ] Content sections are data-driven and extendable without structural changes
- [ ] The site is deployed, accessible, performant, and SEO-discoverable
