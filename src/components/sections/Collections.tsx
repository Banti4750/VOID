"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  { id: 1, title: "VOID RUNNER", price: "$450" },
  { id: 2, title: "STEALTH PARKA", price: "$850" },
  { id: 3, title: "SILICON HOODIE", price: "$280" },
  { id: 4, title: "CARBON PANT", price: "$320" },
];

export function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headingRef.current && gridRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      const chars = Array.from(headingRef.current.children);

      tl.fromTo(
        chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power4.out" }
      ).fromTo(
        gridRef.current.children,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );
    }
  }, []);

  return (
    <section id="collections" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 bg-black w-full min-h-screen relative z-10">
      <div className="max-w-[1600px] mx-auto">
        <h2 ref={headingRef} className="font-bebas text-6xl md:text-9xl text-bone mb-20 overflow-hidden flex gap-[0.02em]">
          {"COLLECTIONS".split("").map((char, i) => (
            <span key={i} className="inline-block tracking-tighter mix-blend-difference">{char}</span>
          ))}
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((p) => (
             <ProductCard key={p.id} title={p.title} price={p.price} />
          ))}
        </div>
      </div>
      
      {/* Decorative vertical divider line */}
      <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-white/5" />
    </section>
  );
}
