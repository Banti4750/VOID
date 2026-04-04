"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "product";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>("default");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest("[data-cursor='product']") ||
        target.hasAttribute("data-cursor") &&
          target.getAttribute("data-cursor") === "product"
      ) {
        setState("product");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    // Ring follows with lerp in rAF
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Sizes based on state
  const dotSize =
    state === "default" ? 8 : state === "hover" ? 16 : 0;
  const ringSize =
    state === "default" ? 38 : state === "hover" ? 64 : 80;
  const ringOpacity =
    state === "default" ? 1 : state === "hover" ? 0.3 : 0.5;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference flex items-center justify-center"
        style={{
          width: state === "product" ? "auto" : dotSize,
          height: state === "product" ? "auto" : dotSize,
          transition: "width 0.3s var(--ease), height 0.3s var(--ease)",
        }}
      >
        {state === "product" ? (
          <span className="font-bebas text-[12px] tracking-widest text-bone select-none">
            VIEW
          </span>
        ) : (
          <div
            className="w-full h-full rounded-full bg-red"
            style={{
              width: dotSize,
              height: dotSize,
              transition: "width 0.3s var(--ease), height 0.3s var(--ease)",
            }}
          />
        )}
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-9998 rounded-full border border-red"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
          transition:
            "width 0.35s var(--ease), height 0.35s var(--ease), opacity 0.35s var(--ease)",
        }}
      />
    </>
  );
}
