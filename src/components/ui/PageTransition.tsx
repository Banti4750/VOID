"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      delay: 0.6,
      ease: "power3.inOut",
    }).to(curtainRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black border-none"
    >
      <div 
        ref={textRef} 
        className="text-bone opacity-100 font-bebas text-7xl md:text-9xl tracking-[0.2em] transform translate-y-0"
      >
        MIKE
      </div>
    </div>
  );
}
