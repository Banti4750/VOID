"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export function FeaturedDrop() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string>("M");

  /* Vanilla Tilt on product image */
  useEffect(() => {
    if (!tiltRef.current) return;
    VanillaTilt.init(tiltRef.current, {
      max: 12,
      perspective: 1000,
      glare: true,
      "max-glare": 0.2,
      speed: 400,
    });
    return () => {
      if (tiltRef.current) (tiltRef.current as any).vanillaTilt?.destroy();
    };
  }, []);

  /* GSAP ScrollTrigger animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant number rises
      gsap.fromTo(
        numberRef.current,
        { y: 80 },
        {
          y: 0,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      // Category wipe from left
      gsap.fromTo(
        categoryRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      // Product name stagger
      if (nameRef.current) {
        const words = nameRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
          }
        );
      }

      // Info block fade up
      gsap.fromTo(
        infoRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 45%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Magnetic CTA */
  const onBtnMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(btn, { x: dx * 0.25, y: dy * 0.25, duration: 0.3, ease: "power2.out" });
  }, []);
  const onBtnLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0f0f0f] overflow-hidden"
    >
      {/* Atmospheric smoke texture behind everything */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80&fit=crop")',
          filter: "brightness(0.5) saturate(0)",
        }}
      />

      {/* CSS Grid: [number] [image] [info] = 15% 45% 40% */}
      <div className="grid grid-cols-1 md:grid-cols-[15%_45%_40%] min-h-screen items-center">
        {/* LEFT — Giant number */}
        <div className="relative hidden md:flex items-center justify-center overflow-hidden">
          <div
            ref={numberRef}
            className="absolute font-bebas text-[clamp(12rem,22vw,28rem)] leading-none text-transparent select-none pointer-events-none"
            style={{
              WebkitTextStroke: "1px rgba(240,237,232,0.08)",
              left: "-10%",
            }}
          >
            001
          </div>
        </div>

        {/* CENTER — Product Image */}
        <div className="flex items-center justify-center py-16 md:py-0 px-6">
          <div
            ref={tiltRef}
            data-cursor="product"
            className="relative w-full max-w-[500px] min-h-100 md:min-h-150 aspect-3/4 overflow-hidden group cursor-pointer transition-shadow duration-600"
            style={{ boxShadow: "0 0 0 transparent" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 40px 80px rgba(255,26,26,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 transparent";
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=900&q=90&fit=crop"
              alt="VOID Oversized Shell"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover transition-[filter] duration-600"
              style={{
                filter: "brightness(0.8) contrast(1.1) saturate(0.85)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.filter =
                  "brightness(0.95) saturate(1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.filter =
                  "brightness(0.8) contrast(1.1) saturate(0.85)";
              }}
              loading="lazy"
            />

            {/* LIMITED badge */}
            <div className="absolute top-4 right-4 bg-red px-3 py-1.5 animate-[badgePulse_2s_ease-in-out_infinite]">
              <span className="font-sans text-[0.6rem] font-medium tracking-[0.15em] text-black">
                LIMITED — 47 LEFT
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Product Info */}
        <div className="flex flex-col justify-center px-8 md:px-12 pb-16 md:pb-0">
          {/* Category */}
          <span
            ref={categoryRef}
            className="font-sans text-[0.6rem] font-medium tracking-[0.3em] text-red uppercase mb-5"
          >
            OUTERWEAR — SS26
          </span>

          {/* Product name */}
          <h2
            ref={nameRef}
            className="font-bebas text-[clamp(3rem,5vw,5rem)] leading-[0.88] text-bone mb-6 overflow-hidden"
          >
            <span className="word inline-block">VOID&nbsp;</span>
            <span className="word inline-block">OVERSIZED&nbsp;</span>
            <span className="word inline-block">SHELL</span>
          </h2>

          <div ref={infoRef}>
            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-sans text-[0.9rem] text-steel line-through">
                ₹8,999
              </span>
              <span className="font-bebas text-[2.5rem] text-red leading-none">
                ₹5,999
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-[0.9rem] font-light leading-[1.8] text-steel max-w-sm mb-8">
              Engineered silence. Matte shell exterior. No logo. No noise.
              <br />
              Oversized silhouette with dropped shoulders and sealed seams.
              <br />
              100% recycled shell. Lining: void black satin.
            </p>

            {/* Size selector */}
            <div className="flex gap-2 mb-8">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className="w-10 h-10 flex items-center justify-center font-sans text-[0.7rem] tracking-wider border transition-all duration-300"
                  style={{
                    borderColor:
                      selectedSize === s ? "var(--red)" : "#333",
                    background:
                      selectedSize === s
                        ? "rgba(255,26,26,0.1)"
                        : "transparent",
                    color:
                      selectedSize === s ? "var(--bone)" : "var(--steel)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onMouseMove={onBtnMove}
              onMouseLeave={onBtnLeave}
              className="group relative w-full border border-bone py-[1.1rem] overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-red origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease)] group-hover:scale-x-100" />
              <span className="relative z-10 font-sans text-[0.7rem] font-medium tracking-[0.25em] text-bone transition-colors duration-500 group-hover:text-black">
                ADD TO DROP
              </span>
            </button>

            {/* Detail thumbnails — alternate angles */}
            <div className="flex gap-2 mt-6">
              <div className="relative w-16 h-16 overflow-hidden border border-[#222] group/thumb cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80&fit=crop"
                  alt="Detail — black tee"
                  fill
                  sizes="64px"
                  className="object-cover transition-all duration-500 group-hover/thumb:scale-110"
                  style={{ filter: "brightness(0.7) saturate(0.8)" }}
                  loading="lazy"
                />
              </div>
              <div className="relative w-16 h-16 overflow-hidden border border-[#222] group/thumb cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=200&q=80&fit=crop"
                  alt="Detail — dark jacket"
                  fill
                  sizes="64px"
                  className="object-cover transition-all duration-500 group-hover/thumb:scale-110"
                  style={{ filter: "brightness(0.7) saturate(0.8)" }}
                  loading="lazy"
                />
              </div>
              <div className="relative w-16 h-16 overflow-hidden border border-red">
                <Image
                  src="https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=200&q=80&fit=crop"
                  alt="Detail — main product"
                  fill
                  sizes="64px"
                  className="object-cover"
                  style={{ filter: "brightness(0.8) saturate(0.9)" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}} />
    </section>
  );
}
