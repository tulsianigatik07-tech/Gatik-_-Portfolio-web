"use client";

import { useEffect, useRef } from "react";

const singles = "01#$%&*+-/\\:;=><@!{}[]()^~|_`?01010101110001010011".split(
  "",
);

const fragments = [
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
  "git",
  "push",
  "pull",
  "HEAD",
  "main",
  "merge",
  "diff",
  "npm",
  "tsx",
  "jsx",
  "ts",
  "py",
  "go",
  "AI",
  "ML",
  "LLM",
  "RAG",
  "API",
  "CLI",
  "SELECT",
  "FROM",
  "WHERE",
  "JOIN",
  "embed(",
  "chunk(",
  "index(",
  "search(",
];

function randomItem(items: string[]) {
  const item = items[Math.floor(Math.random() * items.length)];
  return item ?? "";
}

function columnDensity(x: number, totalWidth: number) {
  const nx = x / totalWidth;

  if (nx < 0.26) {
    return 0.82 + 0.18 * (1 - nx / 0.26);
  }

  if (nx > 0.74) {
    return 0.82 + 0.18 * ((nx - 0.74) / 0.26);
  }

  const cx = (nx - 0.26) / 0.48;
  return 0.08 + 0.18 * Math.pow(Math.sin(cx * Math.PI), 0.6);
}

function redTone(columnIndex: number, totalColumns: number, opacity: number) {
  const t = columnIndex / totalColumns;

  if (t < 0.2) return `rgba(185,28,28,${opacity})`;
  if (t < 0.4) return `rgba(220,38,38,${opacity})`;
  if (t < 0.6) return `rgba(255,59,59,${opacity})`;
  if (t < 0.8) return `rgba(248,113,113,${opacity})`;
  return `rgba(220,38,38,${opacity})`;
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

      const width = window.innerWidth;
      const height = window.innerHeight;
      const charWidth = 9;
      const charHeight = 15;
      const rows = Math.ceil(height / charHeight) + 4;
      const totalColumns = Math.ceil(width / charWidth) + 1;

      for (let columnIndex = 0; columnIndex < totalColumns; columnIndex += 1) {
        const x = columnIndex * charWidth;
        const density = columnDensity(x, width);

        if (Math.random() > density + 0.05) continue;

        const column = document.createElement("div");
        column.className = "code-col";
        column.style.left = `${x}px`;

        const duration = 55 + Math.random() * 90;
        column.style.animationDuration = `${duration.toFixed(1)}s`;
        column.style.animationDelay = `${(-Math.random() * duration).toFixed(1)}s`;

        const fragment = document.createDocumentFragment();

        for (let rowIndex = 0; rowIndex < rows * 2; rowIndex += 1) {
          const span = document.createElement("span");
          span.className = "code-char";

          if (Math.random() <= density) {
            const useFragment = Math.random() < 0.13;
            span.textContent = useFragment
              ? randomItem(fragments)
              : randomItem(singles);

            const baseOpacity = 0.06 + Math.random() * 0.44;
            span.style.color = redTone(
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

    let frame = 0;
    let animationId = 0;
    const pulse = () => {
      frame += 0.004;
      field.style.opacity = (0.85 + 0.15 * Math.sin(frame)).toFixed(3);
      animationId = window.requestAnimationFrame(pulse);
    };

    pulse();

    window.addEventListener("resize", render);

    return () => {
      window.removeEventListener("resize", render);
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

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(150, Math.max(70, Math.floor((width * height) / 9000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        radius: 0.5 + Math.random() * 1.5,
        alpha: 0.12 + Math.random() * 0.38,
        phase: Math.random() * Math.PI * 2,
        pulse: 0.004 + Math.random() * 0.012,
      }));
    };

    const loop = () => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        if (!a) continue;

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          if (!b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 110) {
            const opacity = (1 - distance / 110) * 0.08;
            context.strokeStyle = `rgba(255,59,59,${opacity})`;
            context.lineWidth = 0.45;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
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

      animationId = window.requestAnimationFrame(loop);
    };

    resize();
    loop();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
}
