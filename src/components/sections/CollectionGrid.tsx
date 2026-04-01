"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";

const cards = [
  { id: 1, title: "CORE ESSENTIALS", items: "12 PIECES", colSpan: "col-span-12 md:col-span-8", rowSpan: "row-span-2", height: "h-[60vh] md:h-[80vh]" },
  { id: 2, title: "VOID ACCESSORIES", items: "04 PIECES", colSpan: "col-span-12 md:col-span-4", rowSpan: "row-span-1", height: "h-[30vh] md:h-auto" },
  { id: 3, title: "LIMITED HEADWEAR", items: "02 PIECES", colSpan: "col-span-12 md:col-span-4", rowSpan: "row-span-1", height: "h-[30vh] md:h-auto" },
  { id: 4, title: "TACTICAL LOWER", items: "06 PIECES", colSpan: "col-span-12 md:col-span-5", rowSpan: "row-span-2", height: "h-[40vh] md:h-[60vh]" },
  { id: 5, title: "WINTER CAPSULE", items: "08 PIECES", colSpan: "col-span-12 md:col-span-7", rowSpan: "row-span-2", height: "h-[50vh] md:h-[60vh]" }
];

export function CollectionGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tiltNodes = containerRef.current?.querySelectorAll(".tilt-card");
    if (tiltNodes) {
      VanillaTilt.init(Array.from(tiltNodes) as HTMLElement[], {
        max: 8,
        speed: 400,
        glare: false,
        scale: 1, // Keep scale 1 so only image scales
      });

      // Scroll staggered entrance
      gsap.fromTo(tiltNodes,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-black py-20 px-[3px] md:px-safe">
      <div className="grid grid-cols-12 gap-[3px] w-full max-w-[1800px] mx-auto auto-rows-fr">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`tilt-card relative overflow-hidden bg-dark-2 group border-t border-t-transparent hover:border-t-red transition-colors duration-300 w-full cursor-pointer ${card.colSpan} ${card.rowSpan} ${card.height}`}
            data-hover-cursor="true"
          >
            {/* Grain Overlay */}
            <div className="absolute inset-0 z-[2] opacity-20 pointer-events-none mix-blend-overlay"
                 style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')" }} />
                 
            {/* Image Pseudo-Element / Placeholder */}
            <div className="absolute inset-0 z-[1] w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent scale-100 group-hover:scale-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
               <div className="w-full h-full bg-[#111]" /> {/* Replace with next/image later */}
            </div>

            {/* Content Reveal block */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-[3] translate-y-[20%] opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end h-full">
              <h3 className="font-bebas text-4xl md:text-5xl text-bone mb-2">
                {card.title}
              </h3>
              <p className="font-sans text-xs text-steel tracking-[0.2em] uppercase">
                {card.items}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
