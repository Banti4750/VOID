"use client";

import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FeaturedDrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vanilla Tilt
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
      });
    }

    // Scroll Reveal Horizontal Wipe
    if (containerRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        containerRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ease: "power3.inOut",
          duration: 1.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col md:flex-row items-center py-20 md:py-0"
    >
      {/* 60% Left Section (Background Number + Image) */}
      <div className="relative w-full md:w-[60%] h-full flex items-center justify-center pt-20 pb-10 md:py-0">
        
        {/* Giant Number Behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-bebas text-[30vw] leading-none text-transparent opacity-40 select-none pointer-events-none mix-blend-difference"
             style={{ WebkitTextStroke: "2px var(--steel)" }}>
          001
        </div>

        {/* 3D Product Image Container */}
        <div 
          ref={tiltRef}
          className="relative z-10 w-[80%] max-w-[500px] aspect-[4/5] bg-dark-2 cursor-pointer group rounded-sm shadow-[0_0_0_transparent] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,26,26,0.15)]"
        >
          {/* Faux image since no external images are given - use a highly stylized div */}
          <div className="w-full h-full border border-white/5 overflow-hidden flex flex-col items-center justify-center relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] grayscale-[0.8] contrast-125 group-hover:grayscale-0 transition-all duration-700">
            {/* Abstract clothing shape mockup */}
            <div className="w-[60%] h-[70%] bg-black rotate-12 drop-shadow-2xl"></div>
            
            <div className="absolute top-4 right-4 bg-red px-3 py-1 animate-pulse">
              <span className="font-bebas text-black text-sm tracking-widest leading-none">LIMITED — 47 LEFT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 40% Right Section (Product Info) */}
      <div className="relative w-full md:w-[40%] h-full flex flex-col justify-center px-8 md:px-16 z-20">
        <span className="text-red font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase mb-4">
          Outerwear // Tech Layer
        </span>
        
        <h2 className="font-bebas text-6xl md:text-[5rem] text-bone leading-[0.9] mb-4">
          VOID<br/>SHELL JACKET
        </h2>

        <div className="font-sans italic font-medium flex gap-4 text-xl mb-8 items-center">
          <span className="text-steel line-through text-sm">$450</span>
          <span className="text-red">$320</span>
        </div>

        <p className="font-sans text-steel font-light text-sm md:text-base leading-relaxed tracking-wide max-w-sm mb-12 border-l border-white/10 pl-6">
          Constructed from ultra-lightweight memory fabric. 
          Reacts to ambient temperature. 
          Built for zero visibility environments.
        </p>

        <button 
          data-hover-cursor="true"
          className="group relative px-10 py-4 border-[1px] border-bone bg-transparent overflow-hidden w-max"
        >
          <div className="absolute inset-0 w-full h-full bg-red origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
          <span className="relative z-10 font-bebas text-xl tracking-[0.15em] text-bone group-hover:text-black transition-colors duration-200 delay-100 flex items-center justify-center">
            ADD TO DROP <span className="ml-4 opacity-50 block mt-1">→</span>
          </span>
        </button>
      </div>
    </section>
  );
}
