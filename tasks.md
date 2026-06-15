# Implementation Tasks — Gatik Tulsiani Portfolio Website

**Source spec:** `spec.md`  
**Scope:** Execution roadmap to build the portfolio incrementally.  
**Current status:** Updated after Phase 1–9 implementation + visual rebuild sprint.  
**Convention:** Mark `[x]` when complete and `[ ]` when still open.

---

## PHASE 1 — Project Foundation ✅ COMPLETE

- [x] Initialize the Next.js application
- [x] Enable and configure TypeScript with strict type checking
- [x] Install and configure Tailwind CSS
- [x] Install and configure shadcn/ui
- [x] Install and configure Framer Motion
- [x] Configure ESLint and Prettier with agreed code style
- [x] Set up the project structure and module boundaries
- [x] Define the content architecture
- [x] Define the data model for projects
- [x] Define the data model for experience entries
- [x] Define the data model for journey milestones
- [x] Define the data model for writing entries
- [x] Define the data model for obsessions
- [x] Define the data model for OSS contributions
- [x] Set up environment variable handling for secrets
- [x] Verify the base application builds and runs locally

## PHASE 2 — Design System ✅ COMPLETE

- [x] Define color tokens for the black base and layered dark surfaces
- [x] Define the Giro-inspired red accent token scale
- [x] Verify red-on-black contrast meets accessibility thresholds
- [x] Select and load the serif heading typeface
- [x] Select and load the monospace metadata typeface
- [x] Select and load the body typeface
- [x] Define the typographic scale and heading hierarchy
- [x] Define the spacing scale
- [x] Define the layout grid and container widths
- [x] Define border, radius, and divider tokens
- [x] Define motion tokens
- [x] Implement the dark theme as the default theme
- [x] Document accessibility standards for the design system
- [x] Build a design tokens reference page
- [x] Verify all tokens are centralized and reusable

## PHASE 3 — Navigation & Layout ✅ COMPLETE

- [x] Implement the root layout shell
- [x] Implement global metadata defaults in the layout
- [x] Build the global navigation component
- [x] Implement anchored navigation to core sections
- [x] Build the footer with attribution and key links
- [x] Build the mobile navigation experience
- [x] Verify navigation is keyboard accessible with visible focus states
- [x] Define the route structure
- [x] Implement page and route transitions
- [x] Verify navigation and layout render correctly across breakpoints

## PHASE 4 — Home Experience ✅ COMPLETE / VISUAL POLISH ACTIVE

- [x] Build the hero section with name, headline, and subheadline
- [x] Add primary calls-to-action to the hero
- [x] Add monospace metadata to the hero
- [x] Build the about section narrative
- [x] Surface the "learn by shipping" philosophy
- [x] Reference primary interests
- [x] Build the obsessions section
- [x] Add framing for each obsession
- [x] Build the featured projects preview
- [x] Build the experience preview
- [x] Build the journey preview
- [x] Build the OSS preview
- [x] Build the contact CTA
- [x] Verify the home page communicates identity within the first viewport
- [ ] Finalize Ayush-style red cinematic hero background

## PHASE 5 — Projects System ✅ COMPLETE

- [x] Implement project data loading from the content layer
- [x] Build the project card / project plate system
- [x] Build the featured project layout
- [x] Populate the Giro Repository Intelligence Platform project entry
- [x] Populate the Suryami Portal B2B Airport Transfer Platform project entry
- [x] Populate the Open Source Journey project entry
- [x] Ensure each project communicates problem, build, and significance
- [x] Build the technology tag component
- [x] Build the project detail page layout
- [x] Add external links where available
- [x] Implement project filtering / theme support
- [x] Verify a new project can be added as a data entry only
- [x] Verify the projects system renders correctly across breakpoints

## PHASE 6 — Experience System ✅ COMPLETE

- [x] Implement experience data loading from the content layer
- [x] Build the experience card / ledger component
- [x] Build the experience timeline / ledger layout
- [x] Add role metadata
- [x] Populate the University of Wollongong Dubai entry
- [x] Populate the AI Research Intern entry
- [x] Populate the RS Jewellers entry
- [x] Populate the Independent Builder entry
- [x] Build the education section
- [x] Build the resume-style / compact experience view
- [x] Verify a new experience entry can be added as data only

## PHASE 7 — Journey Timeline ✅ COMPLETE

- [x] Implement the milestone data model loading
- [x] Build the timeline visualization component
- [x] Populate milestones from learning programming through future goals
- [x] Visually distinguish past milestones from future/aspirational ones
- [x] Implement the animated timeline reveal
- [x] Build the storytelling layout so the sequence reads as a narrative
- [x] Verify the timeline communicates progression clearly
- [x] Verify a new milestone can be added as an ordered data entry

## PHASE 8 — OSS & GitHub ⚠️ STRUCTURE COMPLETE / LIVE DATA OPEN

- [x] Decide temporary GitHub data approach
- [x] Implement the GitHub integration architecture
- [x] Build the contribution graph display
- [x] Build the recent repositories display
- [x] Build the OSS activity feed / contribution callout
- [x] Build the repository card / row component
- [x] Build the OSS contributions section
- [x] Connect the OSS narrative to the GSoC ambition
- [x] Add links to contributions, PRs, or repositories where available
- [x] Implement graceful fallback/empty state
- [ ] Implement live GitHub data-refresh strategy
- [ ] Verify GitHub secrets are handled via environment configuration only
- [ ] Verify the section respects third-party rate limits

## PHASE 9 — Writing System ✅ COMPLETE / CONTENT EMPTY

- [x] Implement the writing data model loading
- [x] Build the article listing page
- [x] Build the article detail page
- [x] Implement the reading experience layout
- [x] Add metadata support
- [x] Implement writing categorization by type
- [x] Verify the writing section renders gracefully with zero entries
- [x] Verify a new writing entry can be added as data only
- [ ] Add first real writing entry

## PHASE 10 — Motion & Visual Effects ⚠️ PARTIAL / POLISH ACTIVE

- [x] Replace generic particle background with engineering backdrop system
- [x] Implement scroll-triggered animations
- [x] Implement hover and pointer micro-interactions
- [x] Implement section reveal animations
- [x] Build loading and skeleton states where needed
- [x] Implement the hero entrance animation
- [x] Honor `prefers-reduced-motion`
- [x] Verify animations do not degrade scroll or interaction performance
- [ ] Finalize dense red ASCII/code hero background to match reference quality
- [ ] Final animation pass on mobile

## PHASE 11 — Performance & SEO ✅ MOSTLY COMPLETE

- [x] Implement per-page titles and meta descriptions
- [x] Implement Open Graph and social share metadata
- [x] Add structured data markup
- [x] Generate the sitemap
- [x] Add robots configuration
- [x] Optimize images / visual assets where used
- [x] Optimize font loading
- [x] Verify build passes
- [ ] Audit and improve Lighthouse scores
- [ ] Verify Core Web Vitals targets on mobile and desktop
- [ ] Verify there are no broken links across the site

## PHASE 12 — Launch ⏳ NOT STARTED

- [ ] Perform responsive testing across all breakpoints
- [ ] Conduct an accessibility audit
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

## VISUAL REBUILD SPRINT — ACTIVE

- [x] Identify monotony issue: repeated list-row layouts
- [x] Rebuild Projects as the visual centerpiece
- [x] Make Giro the featured project
- [x] Add repository-intelligence schematic visual
- [x] Give sections distinct silhouettes
- [x] Replace generic particles with engineering backdrop system
- [ ] Bring Hero background closer to Ayush reference
- [ ] Increase red ASCII/code density on left and right sides
- [ ] Improve circuit overlays and node depth
- [ ] Strengthen cinematic vignette and center readability
- [ ] Final visual QA against reference screenshots

---

## Current Completion Criteria

- [x] P0 functional requirements are mostly satisfied
- [x] Design system guardrails are implemented
- [x] Content sections are data-driven
- [x] Core site builds successfully
- [x] Projects are visually elevated
- [ ] Hero reaches target Ayush-style red cinematic quality
- [ ] Real contact links are finalized
- [ ] Live GitHub data or richer snapshot is finalized
- [ ] Lighthouse / mobile / accessibility QA completed
- [ ] Site deployed to Vercel