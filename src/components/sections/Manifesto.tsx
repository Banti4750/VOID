"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "WE DON'T FOLLOW.",
  "WE DON'T EXPLAIN.",
  "WE BUILD FOR THOSE",
  "WHO MOVE IN SILENCE.",
];

const STATS: { value: string; numeric: number; label: string }[] = [
  { value: "04", numeric: 4, label: "DROPS THIS YEAR" },
  { value: "12K", numeric: 12, label: "PIECES SOLD" },
  { value: "0", numeric: 0, label: "ADS EVER" },
  { value: "∞", numeric: -1, label: "QUALITY STANDARD" },
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  /* Manifesto text animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each line's words
      const lines = linesRef.current?.querySelectorAll(".mline");
      if (lines) {
        lines.forEach((line, i) => {
          const words = line.querySelectorAll(".mword");
          gsap.fromTo(
            words,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
              },
              delay: i * 0.3,
            }
          );
        });
      }

      // Stats count-up
      const statEls = statsRef.current?.querySelectorAll(".stat-num");
      if (statEls) {
        statEls.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const suffix = el.getAttribute("data-suffix") || "";
          const isInfinity = el.getAttribute("data-infinity") === "true";

          if (isInfinity) {
            // Just fade in ∞
            gsap.fromTo(
              el,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: { trigger: statsRef.current, start: "top 75%" },
              }
            );
          } else {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: { trigger: statsRef.current, start: "top 75%" },
              onUpdate: () => {
                (el as HTMLElement).textContent =
                  String(Math.round(obj.val)).padStart(target > 9 ? 1 : 2, "0") +
                  suffix;
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-bone flex flex-col items-center justify-center py-32 px-4 overflow-hidden"
    >
      {/* Concrete texture background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&fit=crop")',
        }}
      />

      {/* Decorative quotation mark */}
      <div
        className="absolute top-0 left-0 font-bebas text-[35vw] leading-none select-none pointer-events-none"
        style={{ color: "rgba(8,8,8,0.06)" }}
      >
        &ldquo;
      </div>

      {/* Manifesto text */}
      <div ref={linesRef} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {LINES.map((line, i) => (
          <div key={i} className="mline overflow-hidden flex flex-wrap justify-center">
            {line.split(" ").map((word, j) => (
              <span
                key={j}
                className="mword inline-block font-bebas text-[clamp(4rem,8vw,9rem)] leading-[0.88] text-black mr-[0.3em]"
              >
                {word}
              </span>
            ))}
          </div>
        ))}

        {/* Pulsing red dot */}
        <div className="mt-10 w-2 h-2 rounded-full bg-red animate-pulse" />
      </div>

      {/* Stats row */}
      <div
        ref={statsRef}
        className="relative z-10 mt-24 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between py-10 border-t"
        style={{
          background: "rgba(8,8,8,0.05)",
          borderColor: "rgba(0,0,0,0.15)",
        }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            {/* Vertical divider (before each stat except the first) */}
            {i > 0 && (
              <>
                <div className="hidden md:block w-px h-16 mx-10" style={{ background: "rgba(0,0,0,0.15)" }} />
                <div className="md:hidden w-16 h-px my-6" style={{ background: "rgba(0,0,0,0.15)" }} />
              </>
            )}
            <div className="flex flex-col items-center min-w-25">
              <span
                className="stat-num font-bebas text-[4rem] leading-none text-black"
                data-target={stat.numeric >= 0 ? stat.numeric : 0}
                data-suffix={stat.value.includes("K") ? "K" : ""}
                data-infinity={stat.numeric < 0 ? "true" : "false"}
              >
                {stat.numeric < 0 ? "∞" : "0"}
              </span>
              <span className="font-sans text-[0.65rem] font-light tracking-[0.2em] uppercase text-black/60 mt-1">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
