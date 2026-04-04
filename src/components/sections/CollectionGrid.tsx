"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=90&fit=crop",
    title: "THE SILENT SERIES",
    info: "12 PIECES — ₹3,999",
    area: "card1",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=90&fit=crop",
    title: "CARBON JACKET",
    info: "1 PIECE — ₹7,499",
    area: "card2",
  },
  {
    src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=90&fit=crop",
    title: "BONE CARGO",
    info: "1 PIECE — ₹4,999",
    area: "card3",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=90&fit=crop",
    title: "VOID TEE",
    info: "1 PIECE — ₹2,499",
    area: "card4",
  },
  {
    src: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=900&q=90&fit=crop",
    title: "SS26 FULL LOOK",
    info: "4 PIECES — ₹14,999",
    area: "card5",
  },
];

export function CollectionGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".grid-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-black py-1">
      <div
        ref={gridRef}
        className="grid gap-0.75"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gridTemplateAreas: `
            "card1 card2 card3"
            "card1 card4 card5"
          `,
        }}
      >
        {CARDS.map((card) => (
          <div
            key={card.area}
            data-cursor="product"
            className="grid-card relative overflow-hidden group cursor-pointer"
            style={{
              gridArea: card.area,
              minHeight: card.area === "card1" ? "75vh" : "37vh",
            }}
          >
            {/* Image */}
            <Image
              src={card.src}
              alt={card.title}
              fill
              sizes={
                card.area === "card1"
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 50vw, 25vw"
              }
              className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
              style={{
                filter: "brightness(0.7) saturate(0.8)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.filter =
                  "brightness(0.85) saturate(1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.filter =
                  "brightness(0.7) saturate(0.8)";
              }}
              loading="lazy"
            />

            {/* Red top border — draws across on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-red origin-left scale-x-0 transition-transform duration-500 ease-(--ease) group-hover:scale-x-100 z-10" />

            {/* Text overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 z-5 px-6 pb-5 pt-16 translate-y-7.5 transition-transform duration-500 ease-(--ease) group-hover:translate-y-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(8,8,8,0.95) 0%, transparent 100%)",
              }}
            >
              <h3 className="font-bebas text-[1.4rem] text-bone leading-none mb-1">
                {card.title}
              </h3>
              <p className="font-sans text-[0.75rem] font-light text-steel tracking-wider">
                {card.info}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile fallback: stack vertically */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          [style*="gridTemplateColumns"] {
            grid-template-columns: 1fr 1fr !important;
            grid-template-areas:
              "card1 card1"
              "card2 card3"
              "card4 card5" !important;
          }
        }
      `}} />
    </section>
  );
}
