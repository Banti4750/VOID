"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        Array.from(containerRef.current.children).slice(0, 3),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="contact" ref={containerRef} className="py-48 px-6 bg-black flex flex-col items-center text-center justify-center min-h-[80vh] border-t border-white/5 relative overflow-hidden">
      
      <h2 className="font-bebas text-6xl md:text-[8rem] tracking-[0.05em] leading-none text-bone mb-6">
        JOIN THE VOID
      </h2>
      <p className="font-sans text-steel text-sm md:text-sm uppercase tracking-[0.4em] mb-24">
        Exclusive Access. No Spam. Just Drops.
      </p>

      {submitted ? (
        <div className="font-bebas text-5xl text-red-accent tracking-[0.2em] transform origin-bottom animate-fade-in">
           YOU ARE ON THE LIST.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-lg relative group">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            className="w-full bg-transparent border-none border-b-[1px] border-steel/40 text-bone text-lg md:text-xl font-sans font-light tracking-[0.2em] uppercase pb-6 focus:ring-0 focus:outline-none focus:border-red-accent transition-colors duration-500 placeholder-steel/20 text-center peer"
            data-hover-cursor="true"
          />
          <button 
             type="submit" 
             data-hover-cursor="true"
             className="absolute right-0 bottom-6 font-bebas text-3xl text-bone hover:text-red-accent transition-all duration-300 opacity-0 transform translate-y-4 group-focus-within:opacity-100 group-focus-within:translate-y-0"
          >
             →
          </button>
        </form>
      )}

      <div className="absolute bottom-12 font-sans text-[10px] tracking-[0.5em] text-steel/30 uppercase">
        © 2026 MIKE STREETWEAR. SECURE COMM CLUSTER.
      </div>
    </section>
  );
}
