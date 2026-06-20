"use client";

import { useEffect, useRef } from "react";

const singles =
  "001101010111001010011010#$%&*+-/\\:;=><@!{}[]()^~|_`?.".split("");

const fragments = [
  "AI",
  "API",
  "RAG",
  "LLM",
  "GPU",
  "SQL",
  "redis",
  "queue",
  "worker",
  "vector",
  "embed",
  "chunk",
  "index",
  "search",
  "agent",
  "eval",
  "trace",
  "latency",
  "retry",
  "cache",
  "router",
  "schema",
  "backend",
  "service",
  "pipeline",
  "deploy",
  "build",
  "system",
  "repo",
  "main",
  "commit",
  "merge",
  "diff",
  "HEAD",
  "fn",
  "if",
  "let",
  "mut",
  "pub",
  "use",
  "mod",
  "impl",
  "struct",
  "async",
  "await",
  "npm",
  "tsx",
  "jsx",
  "ts",
  "py",
  "go",
  "SELECT",
  "FROM",
  "WHERE",
  "JOIN",
  "model.run",
  "db.write",
  "job.next",
  "ship()",
  "break()",
  "fix()",
];

function randomItem(items: string[]) {
  const item = items[Math.floor(Math.random() * items.length)];
  return item ?? "";
}

function columnDensity(x: number, totalWidth: number) {
  const nx = x / totalWidth;
  const distanceFromCenter = Math.abs(nx - 0.5) * 2;

  return 0.9 + 0.18 * Math.pow(distanceFromCenter, 0.62);
}

function redTone(columnIndex: number, totalColumns: number, opacity: number) {
  const t = columnIndex / totalColumns;

  if (t < 0.2) return `rgba(185,28,28,${opacity})`;
  if (t < 0.4) return `rgba(220,38,38,${opacity})`;
  if (t < 0.6) return `rgba(255,59,59,${opacity})`;
  if (t < 0.8) return `rgba(248,113,113,${opacity})`;
  return `rgba(220,38,38,${opacity})`;
}

function mobileRedTone(columnIndex: number, totalColumns: number, opacity: number) {
  const t = columnIndex / totalColumns;

  if (t < 0.24) return `rgba(255,45,45,${opacity})`;
  if (t < 0.5) return `rgba(255,58,58,${opacity})`;
  if (t < 0.76) return `rgba(255,70,70,${opacity})`;
  return `rgba(255,52,52,${opacity})`;
}

function getMotionSettings() {
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const isVerySmall = window.matchMedia("(max-width: 430px)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return { isMobile, isVerySmall, prefersReducedMotion };
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  pulse: number;
};

export function HeroCodeField() {
  const fieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const render = () => {
      field.textContent = "";

      const { isMobile, isVerySmall, prefersReducedMotion } =
        getMotionSettings();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const charWidth = isVerySmall ? 13 : isMobile ? 11 : 8;
      const charHeight = isMobile ? 18 : 13;
      const densityScale = prefersReducedMotion ? 0.72 : isMobile ? 0.74 : 1.18;
      const rows = Math.ceil(height / charHeight) + (isMobile ? 4 : 8);
      const totalColumns = Math.ceil(width / charWidth) + 1;

      for (let columnIndex = 0; columnIndex < totalColumns; columnIndex += 1) {
        const x = columnIndex * charWidth;
        const density = columnDensity(x, width) * densityScale;

        if (Math.random() > density + (isMobile ? 0.12 : 0.22)) continue;

        const column = document.createElement("div");
        column.className = "code-col";
        column.style.left = `${x}px`;

        const duration = isMobile
          ? 112 + Math.random() * 92
          : 78 + Math.random() * 120;
        column.style.animationDuration = `${duration.toFixed(1)}s`;
        column.style.animationDelay = `${(-Math.random() * duration).toFixed(1)}s`;

        const fragment = document.createDocumentFragment();
        const rowMultiplier = isMobile ? 1.7 : 2.55;

        for (let rowIndex = 0; rowIndex < rows * rowMultiplier; rowIndex += 1) {
          const span = document.createElement("span");
          span.className = "code-char";

          if (Math.random() <= density + (isMobile ? 0.12 : 0.18)) {
            const useFragment = Math.random() < (isMobile ? 0.11 : 0.2);
            span.textContent = useFragment
              ? randomItem(fragments)
              : randomItem(singles);

            const baseOpacity = isMobile
              ? 0.28 + Math.random() * 0.14
              : 0.12 + Math.random() * 0.58;
            span.style.color = isMobile
              ? mobileRedTone(
                  columnIndex,
                  totalColumns,
                  Number(baseOpacity.toFixed(3)),
                )
              : redTone(
                  columnIndex,
                  totalColumns,
                  Number((baseOpacity * density).toFixed(3)),
                );
          } else {
            span.textContent = " ";
          }

          fragment.appendChild(span);
        }

        column.appendChild(fragment);
        field.appendChild(column);
      }
    };

    render();

    let resizeId = 0;
    let frame = 0;
    let animationId = 0;
    const { prefersReducedMotion } = getMotionSettings();
    const pulse = () => {
      frame += 0.004;
      field.style.opacity = (0.85 + 0.15 * Math.sin(frame)).toFixed(3);
      animationId = window.requestAnimationFrame(pulse);
    };

    const scheduleRender = () => {
      window.clearTimeout(resizeId);
      resizeId = window.setTimeout(render, 140);
    };

    const observer = new IntersectionObserver(([entry]) => {
      field.classList.toggle("is-paused", !entry?.isIntersecting);
    });

    observer.observe(field);

    if (prefersReducedMotion) {
      field.classList.add("is-reduced-motion");
    } else {
      pulse();
    }

    window.addEventListener("resize", scheduleRender);

    return () => {
      window.removeEventListener("resize", scheduleRender);
      window.clearTimeout(resizeId);
      observer.disconnect();
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <div ref={fieldRef} id="code-field" aria-hidden="true" />;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    let particles: Particle[] = [];
    let animationId = 0;
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let resizeId = 0;
    let isPaused = false;
    let settings = getMotionSettings();

    const resize = () => {
      settings = getMotionSettings();
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;

      if (nextWidth === width && nextHeight === height && particles.length) {
        return;
      }

      const ratio = settings.isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : window.devicePixelRatio || 1;
      width = nextWidth;
      height = nextHeight;

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      if (settings.prefersReducedMotion) {
        particles = [];
        context.clearRect(0, 0, width, height);
        return;
      }

      const count = settings.isMobile
        ? Math.min(settings.isVerySmall ? 28 : 42, Math.max(22, Math.floor((width * height) / 16000)))
        : Math.min(150, Math.max(70, Math.floor((width * height) / 9000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (settings.isMobile ? 0.1 : 0.16),
        vy: (Math.random() - 0.5) * (settings.isMobile ? 0.1 : 0.16),
        radius: 0.5 + Math.random() * (settings.isMobile ? 1.1 : 1.5),
        alpha: settings.isMobile
          ? 0.1 + Math.random() * 0.24
          : 0.12 + Math.random() * 0.38,
        phase: Math.random() * Math.PI * 2,
        pulse: settings.isMobile
          ? 0.003 + Math.random() * 0.006
          : 0.004 + Math.random() * 0.012,
      }));
    };

    const loop = (timestamp = 0) => {
      animationId = window.requestAnimationFrame(loop);

      if (isPaused || settings.prefersReducedMotion) return;
      if (settings.isMobile && timestamp - lastFrame < 33) return;
      lastFrame = timestamp;

      context.clearRect(0, 0, width, height);

      if (!settings.isVerySmall) {
        const connectionLimit = settings.isMobile ? 78 : 110;
        const maxConnectionChecks = settings.isMobile
          ? particles.length * 8
          : Infinity;
        let checks = 0;

        for (let i = 0; i < particles.length; i += 1) {
          const a = particles[i];
          if (!a) continue;

          for (let j = i + 1; j < particles.length; j += 1) {
            const b = particles[j];
            if (!b) continue;

            checks += 1;
            if (checks > maxConnectionChecks) break;

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.hypot(dx, dy);

            if (distance < connectionLimit) {
              const opacity =
                (1 - distance / connectionLimit) * (settings.isMobile ? 0.045 : 0.08);
              context.strokeStyle = `rgba(255,59,59,${opacity})`;
              context.lineWidth = 0.45;
              context.beginPath();
              context.moveTo(a.x, a.y);
              context.lineTo(b.x, b.y);
              context.stroke();
            }
          }
        }
      }

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += particle.pulse;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        const opacity = particle.alpha + Math.sin(particle.phase) * 0.08;
        context.fillStyle = `rgba(255,59,59,${opacity})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeId);
      resizeId = window.setTimeout(resize, 140);
    };

    const handleVisibility = () => {
      isPaused = document.hidden;
    };

    resize();
    loop();

    window.addEventListener("resize", scheduleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", scheduleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.clearTimeout(resizeId);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
}
