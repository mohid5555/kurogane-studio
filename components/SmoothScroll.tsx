"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Skip Lenis on touch devices — native mobile inertia is smoother
    // and Lenis often causes janky frame drops on phones/tablets.
    if (typeof window !== "undefined" && window.matchMedia) {
      const isTouch =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isTouch) return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf: number;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
