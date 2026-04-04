"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export function LenisInit() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      duration: 1.4,
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
