"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "NEW DROP",
  "SS26",
  "WEAR THE VOID",
  "NO NOISE",
  "FORM OVER FUNCTION",
];

function RowContent() {
  return (
    <>
      {[0, 1, 2].map((rep) => (
        <span key={rep} className="flex items-center">
          {WORDS.map((w, i) => (
            <span key={`${rep}-${i}`} className="flex items-center whitespace-nowrap">
              <span className="font-bebas text-[1.2rem] tracking-widest text-black leading-none">
                {w}
              </span>
              <span className="mx-4 text-[0.5rem] text-black opacity-60">●</span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!row1.current || !row2.current) return;

    // Row 1 scrolls LEFT
    const tween1 = gsap.to(row1.current, {
      xPercent: -33.333,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    // Row 2 scrolls RIGHT (start offset, go back to 0)
    gsap.set(row2.current, { xPercent: -33.333 });
    const tween2 = gsap.to(row2.current, {
      xPercent: 0,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    // Speed / reverse on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const dir = self.direction; // 1 = down, -1 = up
        const vel = Math.abs(self.getVelocity());
        const boost = gsap.utils.clamp(1, 3, 1 + vel / 600);

        tween1.timeScale(dir === 1 ? boost : -boost);
        tween2.timeScale(dir === 1 ? boost : -boost);
      },
    });

    // Pause on hover
    const section = sectionRef.current!;
    const pause = () => { tween1.pause(); tween2.pause(); };
    const resume = () => { tween1.resume(); tween2.resume(); };
    section.addEventListener("mouseenter", pause);
    section.addEventListener("mouseleave", resume);

    return () => {
      tween1.kill();
      tween2.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      section.removeEventListener("mouseenter", pause);
      section.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-red border-y border-black overflow-hidden z-20 py-3.5 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
    >
      {/* Row 1 — scrolls left */}
      <div ref={row1} className="flex w-max">
        <RowContent />
      </div>

      {/* Row 2 — scrolls right */}
      <div ref={row2} className="flex w-max mt-2">
        <RowContent />
      </div>
    </section>
  );
}
