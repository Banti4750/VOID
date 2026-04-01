"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.classList.add("hide-cursor");

    // Start centered or hidden initially
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2, // lag duration
        ease: "power3.out",
      });
    };

    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    const attachHoverEvents = () => {
      const interactables = document.querySelectorAll("a, button, input, textarea, [data-hover-cursor='true']");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    attachHoverEvents();

    const observer = new MutationObserver((mutations) => {
      if(mutations.length > 0) attachHoverEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      document.body.classList.remove("hide-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9999] transition-all duration-300 ease-out mix-blend-difference flex items-center justify-center ${
        isHovering ? "scale-[1.8] bg-white/20 border-white" : "scale-100 backdrop-blur-[2px]"
      }`}
    >
      <div className={`w-1 h-1 bg-white rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}
