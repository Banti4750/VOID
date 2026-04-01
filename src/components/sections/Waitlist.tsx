"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const countdownTarget = new Date();
  countdownTarget.setDate(countdownTarget.getDate() + 14); // arbitrary 14 days

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTarget.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setSubmitted(true);
  };

  const titleWords = ["THE", "NEXT", "DROP", "DROPS", "WHEN", "IT", "DROPS."];

  return (
    <section className="relative w-full min-h-[90vh] bg-black text-bone py-32 px-4 md:px-16 flex flex-col justify-center overflow-hidden">
      
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* Left Side: Headline */}
        <div className="flex flex-col">
           {titleWords.map((word, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <h2 className="font-bebas text-[12vw] lg:text-[6vw] leading-[0.85] text-white">
                  {word}
                </h2>
              </motion.div>
           ))}
           <p className="mt-8 font-sans text-sm tracking-[0.2em] text-steel uppercase max-w-sm">
             Get access before the world.
           </p>
        </div>

        {/* Right Side: Form & Counter */}
        <div className="flex flex-col">
          
          <div className="mb-20 min-h-[100px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col relative group"
                >
                  <div className="flex items-end">
                    <input 
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="YOUR EMAIL ADDRESS"
                      className="w-full bg-transparent border-none outline-none font-bebas text-4xl text-bone placeholder:text-dark-3 pb-2 appearance-none rounded-none focus:ring-0"
                      required
                    />
                    <button 
                      type="submit" 
                      data-hover-cursor="true"
                      className="p-2 font-sans overflow-hidden group/btn"
                    >
                      <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1">→</span>
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 text-red">↗</span>
                    </button>
                  </div>
                  <div className="w-full h-[1px] bg-dark-3 mt-0 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-bone w-full -translate-x-full group-focus-within:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col"
                >
                  <h3 className="font-bebas text-5xl text-red tracking-widest">YOU'RE IN THE VOID.</h3>
                  <div className="w-full border-b-[2px] border-red mt-4 animate-[expand_1s_ease-out]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-xl">
            {Object.entries(timeLeft).map(([unit, value], i) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="relative overflow-hidden w-full h-[60px] md:h-[100px] flex items-center justify-center bg-dark-2 mb-2">
                   <AnimatePresence mode="popLayout">
                      <motion.span
                        key={value}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="font-bebas text-5xl md:text-8xl text-bone leading-none absolute"
                      >
                        {String(value).padStart(2, '0')}
                      </motion.span>
                   </AnimatePresence>
                </div>
                <span className="font-sans text-[0.55rem] tracking-[0.4em] text-steel uppercase">
                  {unit === 'd' ? 'DAYS' : unit === 'h' ? 'HOURS' : unit === 'm' ? 'MINUTES' : 'SECONDS'}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes expand {
          0% { width: 0%; transform-origin: left; }
          100% { width: 100%; transform-origin: left; }
        }
      `}} />
    </section>
  );
}
