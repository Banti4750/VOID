"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  { title: "SHOP", links: ["All Products", "New Arrivals", "Archive"] },
  { title: "INFO", links: ["About", "Sizing", "Sustainability"] },
  { title: "CONNECT", links: ["Instagram", "TikTok", "Discord"] },
  { title: "LEGAL", links: ["Privacy", "Terms", "Returns"] },
];

export function Footer() {
  const brandRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Subtle parallax on massive brand text */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        brandRef.current,
        { y: 60 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative w-full bg-[#050505] overflow-hidden pt-20 pb-0">
      {/* Dark atmospheric texture */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?w=1920&q=80&fit=crop")',
          filter: "brightness(0.3) saturate(0)",
        }}
      />

      {/* MASSIVE BRAND NAME — behind content */}
      <div
        ref={brandRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-bebas text-[clamp(8rem,22vw,30rem)] leading-none text-transparent"
          style={{ WebkitTextStroke: "1px rgba(240,237,232,0.06)" }}
        >
          VØID
        </span>
      </div>

      {/* Footer top row — 4 link columns */}
      <div className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <h4 className="font-sans text-[0.7rem] font-medium tracking-[0.15em] text-bone mb-1">
              {col.title}
            </h4>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-[0.7rem] font-light tracking-[0.15em] text-steel transition-colors duration-300 hover:text-bone"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative z-10 w-full h-px bg-[rgba(240,237,232,0.08)]" />

      {/* Footer bottom row */}
      <div className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — copyright */}
        <p className="font-sans text-[0.65rem] font-light text-steel tracking-wider text-center md:text-left">
          © 2026 VØID. ALL RIGHTS RESERVED. NO GODS, NO RULES.
        </p>

        {/* Center — LIVE indicator */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
          <span className="font-sans text-[0.6rem] font-light tracking-[0.15em] text-steel">
            LIVE
          </span>
        </div>

        {/* Right — social SVG line icons */}
        <div className="flex items-center gap-5">
          {/* Instagram */}
          <a href="#" className="text-steel hover:text-bone transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* TikTok */}
          <a href="#" className="text-steel hover:text-bone transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
          {/* Discord */}
          <a href="#" className="text-steel hover:text-bone transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 9a5 5 0 0 0-5-5 5 5 0 0 0-5 5c0 6 5 11 5 11s5-5 5-11z" />
              <circle cx="13" cy="9" r="1.5" />
              <path d="M6 15c2-2 4.5-3 7-3s5 1 7 3" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
