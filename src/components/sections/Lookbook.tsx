"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    code: "L.01",
    name: "CONCRETE GHOST",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90&fit=crop",
  },
  {
    code: "L.02",
    name: "AFTER DARK",
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90&fit=crop",
  },
  {
    code: "L.03",
    name: "SIGNAL LOST",
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=90&fit=crop",
  },
  {
    code: "L.04",
    name: "VOID WALKER",
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=90&fit=crop",
  },
];

export function Lookbook() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const panels = gsap.utils.toArray<HTMLElement>(
      trackRef.current.querySelectorAll(".lb-panel")
    );

    // Main horizontal scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(trackRef.current, {
      x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
      ease: "none",
    });

    // Per-panel animations
    panels.forEach((panel, i) => {
      // Image parallax — image moves slower than panel
      const img = panel.querySelector(".lb-img");
      if (img) {
        gsap.fromTo(
          img,
          { x: -80 },
          {
            x: 80,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }

      // Look name slides up
      const name = panel.querySelector(".lb-name");
      if (name && i > 0) {
        gsap.fromTo(
          name,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left 60%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div ref={trackRef} className="flex h-full" style={{ width: `${PANELS.length * 100}vw` }}>
        {PANELS.map((panel) => (
          <div
            key={panel.code}
            className="lb-panel relative w-screen h-full shrink-0 overflow-hidden"
          >
            {/* Full-bleed background image */}
            <div className="lb-img absolute inset-0 w-[120%] h-full -left-[10%]">
              <Image
                src={panel.src}
                alt={panel.name}
                fill
                sizes="120vw"
                className="object-cover"
                style={{
                  filter: "brightness(0.75) contrast(1.1) saturate(0.85)",
                }}
                loading="lazy"
              />
            </div>

            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0 z-1"
              style={{ background: "rgba(8,8,8,0.5)" }}
            />

            {/* Red diagonal line — SVG */}
            <svg
              className="absolute inset-0 w-full h-full z-2 pointer-events-none"
              preserveAspectRatio="none"
            >
              <line
                x1="100%"
                y1="0"
                x2="40%"
                y2="50%"
                stroke="var(--red)"
                strokeWidth="1"
              />
            </svg>

            {/* Look number — top-left */}
            <span className="absolute top-8 left-8 md:top-12 md:left-12 z-10 font-bebas text-[1rem] text-red tracking-[0.3em]">
              {panel.code}
            </span>

            {/* Look name — bottom-right */}
            <h3 className="lb-name absolute bottom-12 right-8 md:bottom-16 md:right-12 z-10 font-bebas text-[3rem] text-bone leading-none">
              {panel.name}
            </h3>

            {/* Shop look link — bottom-left */}
            <a
              href="#"
              className="absolute bottom-12 left-8 md:bottom-16 md:left-12 z-10 font-sans text-[0.7rem] font-light text-bone tracking-[0.15em] group"
            >
              <span className="relative">
                SHOP LOOK →
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
