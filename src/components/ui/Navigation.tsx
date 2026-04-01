"use client";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 flex justify-between items-center px-6 md:px-12 py-6 ${
        scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="font-bebas text-3xl md:text-4xl tracking-[0.15em] text-bone leading-none cursor-pointer mt-1" data-hover-cursor="true">MIKE</div>
      <div className="hidden md:flex gap-12 text-sm uppercase tracking-widest text-steel font-sans font-medium">
        <a href="#collections" className="hover:text-red-accent transition-colors" data-hover-cursor="true">Collections</a>
        <a href="#about" className="hover:text-red-accent transition-colors" data-hover-cursor="true">About</a>
        <a href="#contact" className="hover:text-red-accent transition-colors" data-hover-cursor="true">Waitlist</a>
      </div>
      <button className="md:hidden text-bone tracking-widest uppercase text-sm" data-hover-cursor="true">
        Menu
      </button>
    </nav>
  );
}
