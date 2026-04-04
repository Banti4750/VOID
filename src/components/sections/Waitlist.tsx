"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useCountdown(targetMs: number) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetMs - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return time;
}

// 30 days from now (stable across renders via module-level const)
const TARGET = Date.now() + 30 * 86400000;

export function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const time = useCountdown(TARGET);

  /* Headline word-by-word stagger */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll(".hw");
      if (words) {
        gsap.fromTo(
          words,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  /* Magnetic arrow button */
  const onArrowMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(btn, { x: dx * 0.4, y: dy * 0.4, duration: 0.3, ease: "power2.out" });
  }, []);
  const onArrowLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
  }, []);

  const segments: { value: number; label: string }[] = [
    { value: time.d, label: "DAYS" },
    { value: time.h, label: "HOURS" },
    { value: time.m, label: "MINUTES" },
    { value: time.s, label: "SECONDS" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-dark2 text-bone flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
    >
      {/* TEXTURE_BG at stronger opacity for depth */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&fit=crop")',
          filter: "brightness(0.4) saturate(0)",
        }}
      />

      {/* Headline */}
      <div ref={headlineRef} className="relative z-10 text-center mb-6">
        <div className="overflow-hidden">
          <span className="hw inline-block font-bebas text-[8vw] leading-[0.88] text-bone">THE&nbsp;</span>
          <span className="hw inline-block font-bebas text-[8vw] leading-[0.88] text-bone">NEXT&nbsp;</span>
          <span className="hw inline-block font-bebas text-[8vw] leading-[0.88] text-bone">DROP</span>
        </div>
        <div className="overflow-hidden">
          <span className="hw inline-block font-bebas text-[8vw] leading-[0.88] text-bone">DROPS&nbsp;</span>
          <span className="hw inline-block font-bebas text-[8vw] leading-[0.88] text-bone">WHEN</span>
        </div>
        <div className="overflow-hidden">
          <span className="hw inline-block font-bebas text-[8vw] leading-[0.88] text-bone">IT&nbsp;</span>
          <span className="hw inline-block font-bebas text-[8vw] leading-[0.88] text-red">DROPS.</span>
        </div>
      </div>

      {/* Subtext */}
      <p className="relative z-10 font-sans text-[1rem] font-light text-steel mb-16 text-center">
        Get access before the world knows it exists.
      </p>

      {/* Countdown */}
      <div className="relative z-10 flex items-start gap-3 md:gap-5 mb-20">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-start">
            {/* Colon separator */}
            {i > 0 && (
              <span className="font-bebas text-[4rem] text-red leading-none mx-2 md:mx-4 -mt-1">
                :
              </span>
            )}
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden h-20 flex items-center justify-center">
                <span
                  key={seg.value}
                  className="font-bebas text-[6rem] leading-none text-bone inline-block animate-[flipIn_0.3s_ease-out]"
                >
                  {String(seg.value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-sans text-[0.55rem] font-light tracking-[0.25em] text-steel mt-2">
                {seg.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Email form */}
      <div className="relative z-10 w-full max-w-md">
        {!submitted ? (
          <form onSubmit={onSubmit} className="flex items-end gap-4">
            <div className="flex-1 group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                required
                className="w-full bg-transparent border-b border-[rgba(240,237,232,0.3)] pb-3 font-sans text-[1rem] font-normal text-bone outline-none placeholder:text-steel placeholder:font-light placeholder:tracking-[0.15em] transition-colors duration-300 focus:border-red"
              />
            </div>
            <button
              type="submit"
              onMouseMove={onArrowMove}
              onMouseLeave={onArrowLeave}
              className="font-sans text-[1.4rem] text-bone pb-3 transition-transform duration-300 hover:text-red hover:-rotate-45"
            >
              →
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="font-bebas text-[2rem] text-red tracking-wider animate-[fadeUp_0.6s_ease-out]">
              YOU&apos;RE IN THE VOID.
            </h3>
            <div className="w-full h-0.5 bg-red mt-4 origin-left animate-[drawLine_0.8s_ease-out_0.3s_both]" />
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flipIn {
          0% { transform: rotateX(90deg); opacity: 0; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawLine {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}} />
    </section>
  );
}
