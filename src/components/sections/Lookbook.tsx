"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const panels = [
  { id: 1, title: "L.01", name: "VOID FLIGHT SUIT" },
  { id: 2, title: "L.02", name: "ZERO-G VEST" },
  { id: 3, title: "L.03", name: "NYLON CARGO" },
  { id: 4, title: "L.04", name: "SYSTEM TRENCH" }
];

export function Lookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && trackRef.current) {
      const panelsArray = gsap.utils.toArray(trackRef.current.children) as HTMLElement[];
      const totalWidth = trackRef.current.scrollWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(panelsArray, {
        xPercent: -100 * (panelsArray.length - 1),
        ease: "none",
      });

      // inner parallax and text reveal per panel
      panelsArray.forEach((panel, i) => {
        if (i === 0) return;
        
        // simple parallax on inner image
        const img = panel.querySelector(".inner-img");
        if (img) {
          gsap.fromTo(img,
            { scale: 1.2, xPercent: 20 },
            { 
              scale: 1, xPercent: 0, 
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: "left center",
                end: "center center",
                scrub: true,
              }
            }
          );
        }

        const text = panel.querySelector(".panel-name");
        if (text) {
          gsap.fromTo(text,
            { y: 50, opacity: 0 },
            { 
              y: 0, opacity: 1, 
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: "left 70%",
                end: "center center",
                scrub: 1,
              }
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center">
      
      <div 
        ref={trackRef} 
        className="flex h-full w-[400vw] relative"
        style={{ width: `${panels.length * 100}vw` }}
      >
        {panels.map((panel, idx) => (
          <div key={panel.id} className="relative w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden border-r-[1px] border-dark-2">
            
            <div className="inner-img absolute inset-0 w-full h-full bg-dark-3 z-0 overflow-hidden">
               {/* Stand-in for dark fashion imagery */}
               <div className="w-full h-full bg-gradient-to-tr from-black to-zinc-900 border-x border-white/5 opacity-80" />
            </div>

            {/* Red diagonal slash */}
            <div className={`absolute -top-10 -left-10 w-[200px] h-[2px] bg-red origin-left rotate-45 z-10 ${idx === 0 ? "scale-x-100" : "scale-x-100"}`} />

            {/* Labels */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 z-10">
              <h2 className="font-bebas text-5xl md:text-8xl text-bone tracking-widest">{panel.title}</h2>
            </div>
            
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 z-10 overflow-hidden">
              <h3 className="panel-name font-sans text-xs md:text-sm text-steel tracking-[0.4em] uppercase">
                {panel.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
