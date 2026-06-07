"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on coarse-pointer / touch-primary devices.
 * SSR-safe: starts as `false`, updates after mount, and reacts to changes
 * (e.g. user docks a tablet to a keyboard with trackpad).
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return isTouch;
}
