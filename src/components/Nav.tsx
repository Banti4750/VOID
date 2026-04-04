"use client";

import { useEffect, useRef, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(8, 8, 8, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.2)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(240, 237, 232, 0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between px-[5vw] py-5">
        {/* Logo */}
        <a href="/" className="font-bebas text-[1.4rem] tracking-[0.15em] text-bone leading-none">
          VØID
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {["COLLECTION", "LOOKBOOK", "ABOUT", "DROP"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative font-sans text-[0.65rem] font-[400] tracking-[0.25em] text-steel transition-colors duration-300 hover:text-bone group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Cart / action */}
        <div className="flex items-center gap-6">
          <span className="font-sans text-[0.65rem] font-[400] tracking-[0.25em] text-steel">
            BAG (0)
          </span>
          {/* Mobile menu toggle */}
          <button className="md:hidden flex flex-col gap-[5px]" aria-label="Menu">
            <span className="block w-5 h-px bg-bone" />
            <span className="block w-3.5 h-px bg-bone ml-auto" />
          </button>
        </div>
      </div>
    </nav>
  );
}
