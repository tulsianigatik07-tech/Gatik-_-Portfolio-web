import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { JourneyReveal } from "@/components/journey/journey-reveal";

export const metadata: Metadata = {
  title: "Journey | Gatik Tulsiani",
  description: "The full story. Wins and losses.",
};

const timeline = [
  {
    date: "2023",
    entries: [
      "Passed 10th class.",
      "Started JEE preparation.",
      "Studied Physics, Chemistry and Mathematics for two years.",
    ],
  },
  {
    date: "2025 — JEE Phase",
    entries: [
      "Gave the JEE examination.",
      "Did not get into the dream college.",
      "Started exploring alternative paths.",
      "Found the University of Wollongong.",
    ],
  },
  {
    date: "19 September 2025",
    entries: ["Moved to Dubai."],
  },
  {
    date: "22 September 2025",
    entries: [
      "First day at University of Wollongong Dubai.",
      "Started Computer Science specializing in AI and Big Data.",
    ],
  },
  {
    date: "December 2025",
    entries: [
      "Started networking seriously.",
      "Met people from different backgrounds.",
      "Found a close friend.",
      "Began learning outside the classroom.",
    ],
  },
  {
    date: "January 2026",
    entries: [
      "Found the first Russian client.",
      "Sold an AI Voice Agent.",
      "Closed first major deal worth approximately $2000.",
      "Realized software could become a business.",
    ],
  },
  {
    date: "February 2026",
    entries: [
      "Participated in University of Birmingham Hackathon.",
      "Built Mentra AI.",
      "Did not win.",
      "Made the first Git commit the same day.",
      "Started taking software engineering seriously.",
    ],
  },
  {
    date: "April 2026",
    entries: [
      "Found a new client.",
      "Started building the Suryami Portal.",
      "Worked with real operational requirements.",
      "Participated in the Frontier Solana Hackathon.",
    ],
  },
  {
    date: "27 May 2026",
    entries: [
      "Discovered the idea for Giro.",
      "Began designing repository intelligence systems.",
      "Started building what became the most ambitious project so far.",
    ],
  },
  {
    date: "Present",
    entries: [
      "Building Giro.",
      "Preparing for GSoC.",
      "Learning in public.",
      "Studying AI engineering.",
      "Shipping continuously.",
    ],
  },
];

export default function JourneyPage() {
  return (
    <>
      <JourneyReveal />
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="nav-logo" href="/" aria-label="Gatik Tulsiani home">
          GT
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/#obsession">work</Link>
          </li>
          <li>
            <Link href="/#work">projects</Link>
          </li>
          <li>
            <Link href="/#experience">experience</Link>
          </li>
          <li>
            <Link aria-current="page" href="/journey">
              journey
            </Link>
          </li>
          <li>
            <Link href="/#oss">github</Link>
          </li>
          <li>
            <Link href="/#contact">contact</Link>
          </li>
        </ul>
      </nav>

      <main className="journey-page">
        <section className="journey-hero" aria-labelledby="journey-title">
          <p className="journey-kicker" data-journey-reveal>
            JOURNEY
          </p>
          <h1
            id="journey-title"
            className="journey-title"
            data-journey-reveal
          >
            The full story.
            <br />
            Wins and losses.
          </h1>
          <div className="journey-intro" data-journey-reveal>
            <p>Every step mattered.</p>
            <p>
              Some worked.
              <br />
              Some failed.
            </p>
            <p>All of them shaped how I build software today.</p>
          </div>
        </section>

        <section className="journey-timeline" aria-label="Journey timeline">
          {timeline.map((item, index) => (
            <article
              className="journey-timeline-item"
              data-journey-reveal
              key={item.date}
              style={
                {
                  "--journey-delay": `${Math.min(index * 45, 180)}ms`,
                } as CSSProperties
              }
            >
              <time className="journey-timeline-date">{item.date}</time>
              <div className="journey-timeline-copy">
                {item.entries.map((entry) => (
                  <p key={entry}>{entry}</p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
