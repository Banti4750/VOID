"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const geoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && textRef.current && geoRef.current) {
      // Background Parallax
      gsap.to(geoRef.current, {
        y: 250,
        rotate: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Stagger Reveal
      const lines = gsap.utils.toArray(textRef.current.children);
      
      gsap.fromTo(
        lines,
        { y: 100, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
             trigger: textRef.current,
             start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full h-[150vh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      
      {/* Abstract Parallax Geometry Background */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none opacity-20 mix-blend-screen">
         <div ref={geoRef} className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border border-red-accent/20 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl px-6 w-full" ref={textRef} style={{ perspective: "800px" }}>
         <h3 className="font-bebas text-6xl md:text-[8rem] text-bone uppercase leading-[0.85] tracking-tighter mix-blend-difference transform origin-bottom">
            Built for those
         </h3>
         <h3 className="font-bebas text-6xl md:text-[8rem] text-red-accent uppercase leading-[0.85] tracking-tighter mix-blend-screen italic transform origin-bottom md:ml-24">
             who move
         </h3>
         <h3 className="font-bebas text-6xl md:text-[8rem] text-bone uppercase leading-[0.85] tracking-tighter mix-blend-difference transform origin-bottom">
             in silence.
         </h3>
         
         <div className="mt-20 transform origin-bottom">
             <button data-hover-cursor="true" className="uppercase font-sans tracking-[0.3em] text-steel text-sm pb-2 border-b border-steel/50 hover:text-bone hover:border-bone hover:pl-4 transition-all duration-300">
               Read The Manifesto
             </button>
         </div>
      </div>

      {/* Decorative Frame */}
      <div className="absolute top-12 bottom-12 left-12 w-[1px] bg-white/5 pointer-events-none hidden md:block" />
      <div className="absolute top-12 bottom-12 right-12 w-[1px] bg-white/5 pointer-events-none hidden md:block" />
    </section>
  );
}
