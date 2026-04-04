"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EditorialStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax — image moves slower than scroll
      gsap.fromTo(
        imgRef.current,
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, stripRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stripRef}
      className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden"
    >
      <div ref={imgRef} className="absolute inset-0 -top-10 -bottom-10">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=85&fit=crop"
          alt="Editorial — streetwear"
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            filter: "brightness(0.55) contrast(1.15) saturate(0.8)",
          }}
          loading="lazy"
        />
      </div>

      {/* Dark vignette edges */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 0%, transparent 20%, transparent 80%, rgba(8,8,8,1) 100%)",
        }}
      />

      {/* Center text */}
      <div className="absolute inset-0 z-2 flex items-center justify-center">
        <span className="font-bebas text-[clamp(2rem,5vw,4rem)] text-bone tracking-[0.5em] opacity-80">
          SS26
        </span>
      </div>
    </section>
  );
}
