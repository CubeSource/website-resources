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

type ShootingStar = {
  x: number;
  y: number;
  len: number;
  speed: number;
  active: boolean;
  baseOpacity: number;
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
      const speed = (12 + rand() * 28 + (2.4 - size) * 3) * 0.64;
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

  const numShootingStars = 2;
  const initialShootingStars: ShootingStar[] = useMemo(
    () =>
      Array.from({ length: numShootingStars }, () => ({
        x: 0,
        y: 0,
        len: 0,
        speed: 0,
        active: false,
        baseOpacity: 0,
      })),
    [],
  );
  const shootingStarsRef = useRef<ShootingStar[]>(initialShootingStars);
  const shootingStarElRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
    shootingStarElRefs.current = shootingStarElRefs.current.slice(
      0,
      shootingStarsRef.current.length,
    );

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
          s.speed = (12 + rand() * 28 + (2.4 - s.size) * 3) * 0.8;
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

      shootingStarsRef.current.forEach((ss, i) => {
        const el = shootingStarElRefs.current[i];
        if (!el) return;

        if (ss.active) {
          ss.x -= ss.speed;
          ss.y += ss.speed * 0.2; // Slight downward angle

          el.style.transform = `translate3d(${ss.x}px, ${ss.y}px, 0) rotate(10deg)`;

          // Deactivate star after a short travel distance.
          // 'ss.len' is repurposed to store travel distance.
          if (ss.x < ss.y - ss.len) {
            ss.active = false;
            el.style.opacity = "0";
          }
        } else if (rand() < 0.001) {
          // More frequent shooting stars
          ss.active = true;
          ss.speed = rand() * 15 + 15; // Speed: 15-30
          const tailLength = rand() * 70 + 80; // Visual tail length: 80-150px
          ss.len = rand() * 150 + 200; // Travel distance: 200-350px (repurposing ss.len)
          ss.baseOpacity = rand() * 0.3 + 0.4;
          ss.x = rand() * viewport.width;
          ss.y = ss.x; // Store startX in ss.y

          el.style.width = `${tailLength}px`;
          el.style.opacity = String(ss.baseOpacity);
          el.style.transform = `translate3d(${ss.x}px, ${
            rand() * viewport.height * 0.8
          }px, 0) rotate(10deg)`;
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [viewport, rand]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden bg-[#040404]"
      style={{ zIndex: 0 }}
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
        {shootingStarsRef.current.map((_, i) => (
          <span
            key={`ss-${i}`}
            ref={(el) => {
              if (el) shootingStarElRefs.current[i] = el;
            }}
            className="absolute block bg-gradient-to-r from-white/80 to-transparent"
            style={{
              willChange: "transform, opacity",
              height: "1px",
              opacity: 0,
              transformOrigin: "0 50%",
            }}
          />
        ))}
      </div>
    </div>
  );
}

