"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const textLines = [
  "WE DON'T FOLLOW.",
  "WE DON'T EXPLAIN.",
  "WE BUILD FOR THOSE",
  "WHO MOVE IN SILENCE."
];

function AnimatedCounter({ end, prefix = "", suffix = "", label }: { end: number, prefix?: string, suffix?: string, label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView && ref.current) {
      let startTimestamp: number | null = null;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);
        ref.current!.textContent = `${prefix}${currentCount.toString().padStart(end > 9 ? 2 : 1, '0')}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, prefix, suffix]);

  return (
    <div className="flex flex-col items-center">
      <span ref={ref} className="font-bebas text-5xl md:text-7xl text-black mb-2">00</span>
      <span className="font-sans text-xs tracking-[0.2em] text-steel font-medium">{label}</span>
    </div>
  );
}

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const wordAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } }
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-bone flex flex-col items-center justify-center py-32 px-4 overflow-hidden">
      
      {/* Giant Background Quote */}
      <div className="absolute top-[10%] left-[10%] md:left-[20%] text-red font-bebas text-[30vw] md:text-[20vw] opacity-10 leading-none select-none pointer-events-none">
        "
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col text-center">
        {textLines.map((line, i) => (
           <div key={i} className="overflow-hidden flex flex-wrap justify-center font-bebas text-[7vw] md:text-[6vw] leading-[0.85] text-black">
              {line.split(" ").map((word, w_idx) => (
                <motion.span
                  key={w_idx}
                  variants={wordAnimation}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.1 * i + 0.05 * w_idx }}
                  className="mr-4 inline-block origin-bottom pb-2"
                >
                  {word}
                </motion.span>
              ))}
           </div>
        ))}
      </div>

      <div className="mt-32 w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10 gap-16 md:gap-0">
        
        <AnimatedCounter end={4} prefix="0" label="DROPS THIS YEAR" />
        
        <div className="hidden md:block w-[1px] h-20 bg-steel opacity-30" />
        <div className="md:hidden w-20 h-[1px] bg-steel opacity-30" />

        <div className="flex flex-col items-center relative group">
          <div className="absolute -top-4 -right-6 w-2 h-2 bg-red rounded-full"></div>
          <AnimatedCounter end={12} suffix="K" label="PIECES SOLD" />
        </div>
        
        <div className="hidden md:block w-[1px] h-20 bg-steel opacity-30" />
        <div className="md:hidden w-20 h-[1px] bg-steel opacity-30" />

        <AnimatedCounter end={0} label="ADS EVER" />
      </div>

    </section>
  );
}
