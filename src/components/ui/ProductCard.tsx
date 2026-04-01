"use client";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import VanillaTilt from "vanilla-tilt";

interface ProductCardProps {
  title: string;
  price: string;
}

export function ProductCard({ title, price }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        gyroscope: false,
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative w-full aspect-[3/5] bg-black border border-white/5 overflow-hidden transition-all duration-300"
      style={{ transformStyle: 'preserve-3d' }}
      data-hover-cursor="true"
    >
      {/* Red Glow Effect tied to mouse */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 32, 32, 0.4), transparent 50%)`
        }}
      />
      
      {/* Abstract Model/Object Placeholder */}
      <div 
        className="absolute inset-[1px] z-10 flex flex-col justify-end p-8 bg-[#0a0a0a] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity duration-700">
           <div className="w-48 h-64 border border-steel/30 rounded-full" />
        </div>

        <h3 className="font-bebas tracking-[0.15em] text-4xl text-bone mb-1 relative z-20 group-hover:text-red-accent transition-colors duration-500 ease-out">{title}</h3>
        <p className="font-sans text-steel text-sm tracking-[0.2em] font-medium uppercase relative z-20">{price}</p>
      </div>

       {/* Decorative Lines */}
       <div className="absolute top-6 left-6 w-8 h-[1px] bg-white/20 z-20" />
       <div className="absolute top-6 left-6 w-[1px] h-8 bg-white/20 z-20" />
       <div className="absolute bottom-6 right-6 w-8 h-[1px] bg-white/20 z-20" />
       <div className="absolute bottom-6 right-6 w-[1px] h-8 bg-white/20 z-20" />
    </div>
  );
}
