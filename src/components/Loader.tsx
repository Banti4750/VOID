"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setMounted(false);
      },
    });

    // 1. Fade in logo
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    // 2. Red line grows from 0% to 100% width
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
      0.3
    );

    // 3. After line completes, slide entire overlay UP
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-8000 flex flex-col items-center justify-center bg-black"
    >
      {/* Logo */}
      <h1
        ref={logoRef}
        className="font-bebas text-[8vw] leading-none text-bone opacity-0"
      >
        VØID
      </h1>

      {/* Red progress line */}
      <div className="mt-6 w-[clamp(120px,20vw,260px)] h-0.5 bg-[rgba(240,237,232,0.1)]">
        <div
          ref={lineRef}
          className="h-full w-full origin-left bg-red"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
