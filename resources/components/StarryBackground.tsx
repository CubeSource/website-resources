"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Star = {
  x: number;
  y: number;
  speed: number;
  size: number;
  baseOpacity: number;
  amp: number;
  twinkleDuration: number;
  twinkleDelay: number;
};

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export default function StarryBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const starRefs = useRef<HTMLSpanElement[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const seed = useMemo(() => (Date.now() ^ (Math.random() * 1e9)) >>> 0, []);
  const rand = useMemo(() => mulberry32(seed), [seed]);

  const numStars = 140;
  const initialStars: Star[] = useMemo(() => {
    const stars: Star[] = [];
    for (let i = 0; i < numStars; i += 1) {
      const size = 0.8 + rand() * 1.6;
      const baseOpacity = 0.35 + rand() * 0.5;
      const amp = 0.05 + rand() * 0.2;
      const speed = 12 + rand() * 28 + (2.4 - size) * 3;
      stars.push({
        x: rand(),
        y: rand(),
        speed,
        size,
        baseOpacity,
        amp,
        twinkleDuration: 2 + rand() * 4,
        twinkleDelay: rand() * 6,
      });
    }
    return stars;
  }, [rand]);

  const starsRef = useRef<Star[]>(initialStars);

  useEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!containerRef.current || viewport.width === 0) return;

    starRefs.current = starRefs.current.slice(0, starsRef.current.length);

    const margin = 10;
    let lastTs = performance.now();
    let rafId = 0;

    for (let i = 0; i < starsRef.current.length; i += 1) {
      const el = starRefs.current[i];
      const s = starsRef.current[i];
      if (!el) continue;
      el.style.width = `${s.size}px`;
      el.style.height = `${s.size}px`;
      el.style.opacity = String(s.baseOpacity);
      el.style.setProperty("--twinkle-base", String(s.baseOpacity));
      el.style.setProperty("--twinkle-amp", String(s.amp));
      el.style.animationDuration = `${s.twinkleDuration}s`;
      el.style.animationDelay = `${s.twinkleDelay}s`;
      const xPx = Math.round(s.x * viewport.width);
      const yPx = Math.round(s.y * viewport.height);
      el.style.transform = `translate3d(${xPx}px, ${yPx}px, 0)`;
    }

    const tick = (ts: number) => {
      const dt = Math.min(100, ts - lastTs) / 1000;
      lastTs = ts;

      for (let i = 0; i < starsRef.current.length; i += 1) {
        const s = starsRef.current[i];
        const el = starRefs.current[i];
        if (!el) continue;

        const dx = (s.speed * dt) / viewport.width;
        s.x -= dx;

        if (s.x * viewport.width < -margin) {
          s.x = 1 + margin / viewport.width;
          s.y = rand();
          s.size = 0.8 + rand() * 1.6;
          s.baseOpacity = 0.35 + rand() * 0.5;
          s.amp = 0.05 + rand() * 0.2;
          s.speed = 12 + rand() * 28 + (2.4 - s.size) * 3;
          s.twinkleDuration = 2 + rand() * 4;
          s.twinkleDelay = rand() * 6;

          el.style.width = `${s.size}px`;
          el.style.height = `${s.size}px`;
          el.style.setProperty("--twinkle-base", String(s.baseOpacity));
          el.style.setProperty("--twinkle-amp", String(s.amp));
          el.style.animationDuration = `${s.twinkleDuration}s`;
          el.style.animationDelay = `${s.twinkleDelay}s`;
        }

        const xPx = Math.round(s.x * viewport.width);
        const yPx = Math.round(s.y * viewport.height);
        el.style.transform = `translate3d(${xPx}px, ${yPx}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [viewport, rand]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden bg-[#040404]"
    >
      <div className="absolute inset-0">
        {starsRef.current.map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) starRefs.current[i] = el;
            }}
            className="absolute block rounded-full bg-white twinkle"
            style={{
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
}

