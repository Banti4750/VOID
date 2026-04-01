"use client";

export function Footer() {
  return (
    <footer className="relative w-full bg-black border-t border-dark-3 overflow-hidden text-bone flex flex-col pt-20">
      
      {/* Top Footer Items */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 mb-32">
        <div className="flex flex-col gap-4">
          <h4 className="font-bebas text-xl text-steel mb-2">SHOP</h4>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">NEW ARRIVALS</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">OUTERWEAR</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">BOTTOMS</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">ACCESSORIES</a>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="font-bebas text-xl text-steel mb-2">SUPPORT</h4>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">FAQ</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">SHIPPING</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">RETURNS</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">CONTACT</a>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="font-bebas text-xl text-steel mb-2">BRAND</h4>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">MANIFESTO</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">STOCKISTS</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">CAREERS</a>
          <a href="#" className="font-sans text-xs tracking-widest uppercase hover:text-red transition-colors">TERMS</a>
        </div>
        
        <div className="flex flex-col items-start gap-4 h-full md:items-end md:text-right">
          <h4 className="font-bebas text-xl text-steel mb-2">SOCIAL</h4>
          <div className="flex gap-4 mb-4">
            {/* Minimal SVG icons */}
            <a href="#" className="hover:-translate-y-1 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="hover:-translate-y-1 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
          
          <div className="flex items-center gap-2 mt-auto">
             <div className="w-2 h-2 rounded-full bg-red animate-pulse" />
             <span className="font-sans text-[0.6rem] tracking-widest text-steel mt-1">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Massive Brand Typo */}
      <div className="w-full overflow-hidden relative z-10 select-none pb-4 md:pb-0 pointer-events-none">
        <h1 className="font-bebas text-[35vw] md:text-[28vw] leading-[0.7] text-bone text-center m-0 p-0 text-transparent opacity-80 mix-blend-difference"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
          VØID
        </h1>
      </div>

      {/* Copyright Strip */}
      <div className="relative z-20 w-full border-t border-dark-3 py-4 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 bg-black">
        <p className="font-sans text-[0.65rem] tracking-[0.2em] text-steel uppercase text-center md:text-left">
          © 2026 VØID. ALL RIGHTS RESERVED. NO GODS, NO RULES.
        </p>
        <p className="font-sans text-[0.65rem] tracking-[0.2em] text-dark-3 uppercase mt-2 md:mt-0 cursor-default hover:text-red transition-colors">
          DESIGNED FOR THOSE WHO MOVE IN SILENCE
        </p>
      </div>
    </footer>
  );
}
