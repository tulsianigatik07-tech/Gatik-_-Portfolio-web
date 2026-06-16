"use client";

import { useEffect } from "react";

export function JourneyReveal() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-journey-reveal]"),
    );

    if (!items.length) {
      return;
    }

    document.documentElement.classList.add("journey-reveal-ready");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.92) {
        item.classList.add("is-visible");
        return;
      }

      observer.observe(item);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("journey-reveal-ready");
    };
  }, []);

  return null;
}
