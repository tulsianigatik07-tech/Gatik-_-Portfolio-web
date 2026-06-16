import Image from "next/image";
import { HeroCodeField, ParticleCanvas } from "@/components/portfolio/ambient-systems";
import { ContributionGraph } from "@/components/portfolio/contribution-graph";
import { Divider } from "@/components/portfolio/divider";

const projects = [
  {
    title: "Giro",
    status: "Active",
    subtitle: "Repository Intelligence Platform",
    description:
      "AI-powered repository intelligence platform that indexes codebases, builds semantic repository memory, retrieves engineering context, and enables grounded repository-aware conversations.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Hono",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Redis",
      "BullMQ",
      "Claude",
      "OpenAI",
      "GitHub OAuth",
      "Sentry",
    ],
    href: "https://github.com/tulsianigatik07-tech",
    image: "/giro-architecture.png",
  },
  {
    title: "Suryami Portal",
    status: "Live",
    subtitle: "B2B Airport Transfer Platform",
    description:
      "Wallet-based booking platform for travel agencies with pricing engines, booking lifecycle management, admin workflows, and operational tooling.",
    tech: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Tailwind",
      "shadcn/ui",
      "WebSockets",
      "Sentry",
    ],
    href: "#work",
    cover: "suryami",
  },
  {
    title: "Open Source Journey",
    status: "Ongoing",
    subtitle: "GSoC Preparation",
    description:
      "Contribution-focused engineering path aimed at Google Summer of Code, repository understanding, open source participation, and learning in public.",
    tech: ["Git", "GitHub", "Open Source", "Documentation", "Code Review"],
    href: "https://github.com/tulsianigatik07-tech",
    image: "/open-source-journey-cover-final.jpg",
  },
];

const experience = [
  {
    role: "AI Automation Engineer",
    company: "Freelance Work",
    description:
      "Designing AI agents, workflow automation, and practical systems for teams that need software to keep working after the demo is over.",
  },
  {
    role: "AI Systems Building",
    company: "Independent Builder",
    description:
      "Building repository intelligence, retrieval workflows, developer tools, and production-facing AI interfaces from first principles.",
  },
  {
    role: "Production Projects",
    company: "Suryami Portal · Giro",
    description:
      "Shipping booking infrastructure, admin workflows, semantic repository memory, queues, observability, and database-backed product surfaces.",
  },
];

const journey = [
  {
    label: "Student",
    text: "I started as a Computer Science student trying to understand why software behaves differently in assignments, demos, and real production environments.",
  },
  {
    label: "Builder",
    text: "That curiosity turned into building: booking systems, automation flows, AI interfaces, and tools where architecture, data, and product behavior all had to line up.",
  },
  {
    label: "Open Source",
    text: "Open source became the next forcing function: reading unfamiliar repositories, learning in public, preparing for GSoC, and treating contribution as an engineering discipline.",
  },
  {
    label: "AI Engineering",
    text: "Now the work is converging on AI engineering: repository-aware systems, grounded context retrieval, production reliability, and tools that help engineers move with more clarity.",
  },
];

const activity = [
  ["push", "tulsianigatik07-tech / Giro", "1d ago"],
  ["commit", "Giro repository intelligence layer", "2d ago"],
  ["push", "Suryami Portal booking flow", "4d ago"],
  ["docs", "Open Source Journey notes", "6d ago"],
  ["build", "Portfolio visual system", "8d ago"],
];

function ProjectCover({
  image,
  cover,
  title,
}: {
  image?: string;
  cover?: string;
  title: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={`${title} architecture diagram`}
        fill
        sizes="(max-width: 900px) 100vw, 33vw"
        priority={title === "Giro"}
      />
    );
  }

  if (cover === "suryami") {
    return (
      <div className="project-cover-art" aria-hidden="true">
        <div className="suryami-cover-map">
          <span className="map-node" />
          <span className="map-node" />
          <span className="map-node" />
        </div>
      </div>
    );
  }

  return (
    <div className="project-cover-art" aria-hidden="true">
      <div className="oss-cover-grid">
        {Array.from({ length: 84 }, (_, index) => (
          <span
            className={`oss-dot ${
              index % 17 === 0 ? "hot" : index % 7 === 0 ? "mid" : ""
            }`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header id="hero" className="hero-section">
        <HeroCodeField />
        <div className="centre-veil" aria-hidden="true" />

        <nav className="site-nav" aria-label="Primary navigation">
          <a className="nav-logo" href="#hero" aria-label="Gatik Tulsiani home">
            GT
          </a>
          <ul className="nav-links">
            <li>
              <a href="#obsession">work</a>
            </li>
            <li>
              <a href="#work">projects</a>
            </li>
            <li>
              <a href="#experience">experience</a>
            </li>
            <li>
              <a href="/journey">journey</a>
            </li>
            <li>
              <a href="#oss">github</a>
            </li>
            <li>
              <a href="#contact">contact</a>
            </li>
          </ul>
        </nav>

        <div className="hero-page">
          <div className="hero-inner">
            <p className="meta">AI Engineering · Open Source · Dubai</p>
            <h1 className="headline">
              I build AI systems.
              <br />I learn by <em>shipping</em> them.
            </h1>
            <p className="subheadline">
              Computer Science student focused on AI Engineering,
              <br />
              Open Source Software, and Production Systems.
            </p>
            <div className="actions">
              <a className="btn-primary" href="mailto:tulsianigatik07@gmail.com">
                Let&apos;s talk →
              </a>
              <a className="btn-secondary" href="#obsession">
                See the full experience
              </a>
            </div>
            <a className="resume-card" href="/Gatik_Tulsiani_Resume.pdf" download>
              <span className="resume-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>
                <span className="resume-label">Download Resume</span>
                <span className="resume-filename">Gatik_Tulsiani_Resume.pdf</span>
              </span>
              <span className="resume-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </header>

      <ParticleCanvas />

      <main className="page-below">
        <Divider variant="signal" />
        <section id="obsession" className="portfolio-section">
          <div className="split-layout">
            <div className="split-left reveal">
              <span className="eyebrow">Obsession</span>
              <h2 className="section-heading">
                What I
                <br />
                <span className="red-underline">think about</span>
              </h2>
            </div>
            <div className="obsession-essay reveal">
              <p>
                <span>I think about systems.</span>
                Why some products survive while others collapse after launch. Why
                software behaves perfectly during a demo and breaks the moment real
                users arrive. I care about building things that continue working
                under pressure, not just things that look impressive in controlled
                environments.
              </p>
              <p>
                Right now I&apos;m especially interested in AI engineering,
                repository intelligence, developer tooling, open source ecosystems,
                and production systems. I&apos;m fascinated by how great software
                scales, how engineering teams operate, and how small technical
                decisions compound into massive outcomes over time.
              </p>
            </div>
          </div>
        </section>

        <Divider variant="convergence" />
        <section id="work" className="portfolio-section">
          <span className="eyebrow reveal">Selected Work</span>
          <h2 className="section-heading reveal">
            Things I&apos;ve <em>shipped</em>
          </h2>
          <p className="body-text reveal work-intro">
            A few systems I am building seriously: repository intelligence,
            operational software, and open-source preparation.
          </p>

          <div className="project-gallery">
            {projects.map((project) => (
              <a
                className="editorial-project-card reveal"
                href={project.href}
                key={project.title}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={`View ${project.title} project`}
              >
                <div className="project-cover">
                  <ProjectCover
                    image={project.image}
                    cover={project.cover}
                    title={project.title}
                  />
                </div>
                <div className="editorial-project-body">
                  <div className="editorial-project-topline">
                    <h3 className="editorial-project-title">{project.title}</h3>
                    <span className="editorial-project-status">
                      {project.status}
                    </span>
                  </div>
                  <p className="editorial-project-subtitle">{project.subtitle}</p>
                  <p className="editorial-project-desc">{project.description}</p>
                  <div
                    className="tech-tags"
                    aria-label={`${project.title} tech stack`}
                  >
                    {project.tech.map((tech) => (
                      <span className="tech-tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="view-project">View Project →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <Divider variant="signal" />
        <section id="experience" className="portfolio-section">
          <div className="split-layout">
            <div className="split-left reveal">
              <span className="eyebrow">Experience</span>
              <h2 className="section-heading">
                Experience
                <br />
                <em>under pressure</em>
              </h2>
            </div>
            <div className="experience-list">
              {experience.map((item) => (
                <article className="experience-item reveal" key={item.role}>
                  <p className="exp-role">{item.role}</p>
                  <p className="exp-company">{item.company}</p>
                  <p className="exp-desc">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Divider variant="convergence" />
        <section id="journey" className="portfolio-section">
          <span className="eyebrow reveal">Journey</span>
          <h2 className="section-heading reveal">
            Student to <em>AI engineer</em>
          </h2>
          <div className="journey-list">
            {journey.map((item) => (
              <article className="journey-item reveal" key={item.label}>
                <p className="journey-year">{item.label}</p>
                <div className="journey-right">
                  <p className="journey-text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Divider variant="signal" />
        <section id="oss" className="portfolio-section">
          <span className="eyebrow reveal">Open Source</span>
          <h2 className="section-heading reveal">
            <em>Build</em> in public
          </h2>
          <p className="body-text reveal oss-intro">
            I believe the fastest way to become a better engineer is to build in
            public, contribute in public, and learn from real systems.
          </p>
          <div className="oss-stat-row reveal">
            <div className="oss-stat">
              <span className="oss-stat-num">3+</span>
              <span className="oss-stat-label">Projects shipped</span>
            </div>
            <div className="oss-stat">
              <span className="oss-stat-num">2027</span>
              <span className="oss-stat-label">GSoC target</span>
            </div>
            <div className="oss-stat">
              <span className="oss-stat-num">∞</span>
              <span className="oss-stat-label">Commits ahead</span>
            </div>
          </div>

          <div className="github-panel reveal">
            <div className="github-panel-head">
              <p className="github-panel-title">Contribution activity</p>
              <a
                className="github-panel-link"
                href="https://github.com/tulsianigatik07-tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/tulsianigatik07-tech ↗
              </a>
            </div>
            <ContributionGraph />
            <p className="github-contrib-caption">
              Building consistency through public work
            </p>
            <div className="github-activity">
              <p className="github-activity-title">Recent activity</p>
              <div className="github-activity-list">
                {activity.map(([type, repo, time]) => (
                  <div className="github-activity-row" key={`${type}-${repo}`}>
                    <span>{type}</span>
                    <span className="github-activity-repo">{repo}</span>
                    <span className="github-activity-time">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider variant="convergence" />
        <section id="contact" className="portfolio-section">
          <span className="eyebrow contact-eyebrow">Next</span>
          <h2 className="contact-heading reveal">
            Let&apos;s build
            <br />
            something.
          </h2>
          <a
            className="contact-email reveal"
            href="mailto:tulsianigatik07@gmail.com"
          >
            tulsianigatik07@gmail.com
          </a>
          <div className="contact-links reveal">
            <a
              className="contact-link"
              href="https://github.com/tulsianigatik07-tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="contact-link"
              href="https://www.linkedin.com/in/gatik-tulsiani-377262389"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="contact-link"
              href="https://x.com/GatikTulsiani"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p className="footer-copy">© 2026 Gatik Tulsiani</p>
        <nav className="footer-links" aria-label="Footer links">
          <a
            className="footer-link"
            href="https://github.com/tulsianigatik07-tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/gatik-tulsiani-377262389"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="footer-link"
            href="https://x.com/GatikTulsiani"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
        </nav>
      </footer>
    </>
  );
}
