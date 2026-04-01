"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const marqueeText = "NEW DROP — SS26 — WEAR THE VOID — NO NOISE — ";

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let direction = -1; // -1 for left, 1 for right
    
    // Core animation proxy
    const proxy = { skew: 0, speed: 1 };
    
    const xPercent1Wrapper = gsap.utils.wrap(-100, 0);
    const xPercent2Wrapper = gsap.utils.wrap(0, 100);
    
    let x1 = 0;
    let x2 = 0;

    const animateMarquee = () => {
      if(!row1Ref.current || !row2Ref.current) return;
      
      x1 += direction * proxy.speed * 0.1;
      x2 += -direction * proxy.speed * 0.1;

      x1 = xPercent1Wrapper(x1);
      x2 = xPercent1Wrapper(x2); // we can use the same wrapper if we do left/right correctly
      
      // Update DOM
      gsap.set(row1Ref.current, { xPercent: x1 });
      gsap.set(row2Ref.current, { xPercent: x2 });

      requestAnimationFrame(animateMarquee);
    };

    const rq = requestAnimationFrame(animateMarquee);

    // Change speed/direction based on scroll velocity
    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        // change direction based on scrolling up/down
        direction = self.direction;
        
        // speed burst based on scroll velocity
        const velocity = Math.abs(self.getVelocity());
        const speedMapping = gsap.utils.clamp(1, 10, 1 + velocity / 200);
        
        gsap.to(proxy, {
          speed: speedMapping,
          overwrite: true,
          duration: 0.1,
          onComplete: () => {
             // return to normal speed
             gsap.to(proxy, { speed: 1, duration: 0.5, ease: "power3.out" });
          }
        });
      }
    });

    return () => {
      cancelAnimationFrame(rq);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Use repeating elements
  const Row = ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => (
    <div className="flex w-max" ref={innerRef}>
      {[...Array(6)].map((_, i) => (
        <span key={i} className="px-4 font-bebas text-6xl md:text-9xl text-black leading-none whitespace-nowrap">
          {marqueeText}
        </span>
      ))}
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-2 bg-red border-y-[1px] border-red border-opacity-30 overflow-hidden cursor-pointer group transition-transform duration-500 hover:scale-105 z-20"
      data-hover-cursor="true"
    >
      <div className="flex flex-col gap-2 md:gap-4 py-8 pointer-events-none group-hover:[animation-play-state:paused] -rotate-2 scale-110">
        <Row innerRef={row1Ref} />
        <Row innerRef={row2Ref} />
      </div>
    </section>
  );
}
