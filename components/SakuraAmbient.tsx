"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/**
 * Subtle Japanese-themed ambient layer that lives behind all content.
 * Renders:
 *  - A faint vermillion sun gradient on the right
 *  - A barely-visible torii gate silhouette on the left
 *  - Sakura petals drifting diagonally (reduced count on mobile for perf)
 *
 * Performance: all CSS transforms / opacity. Pointer-events-none.
 * Mounted only after the entry scene completes.
 */
export default function SakuraAmbient() {
  const [petalCount, setPetalCount] = useState(22);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const isCoarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isSmall || isCoarse) setPetalCount(8);
  }, []);

  const petals = useMemo(() => {
    return Array.from({ length: petalCount }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 8 + Math.random() * 10;
      const duration = 18 + Math.random() * 22;
      const delay = -Math.random() * duration;
      const drift = (Math.random() - 0.5) * 40;
      const rot = Math.random() * 360;
      const opacity = 0.18 + Math.random() * 0.35;
      return { i, left, size, duration, delay, drift, rot, opacity };
    });
  }, [petalCount]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* ice haze — top right */}
      <div
        className="absolute"
        style={{
          top: "-20vh",
          right: "-15vw",
          width: "70vmax",
          height: "70vmax",
          background:
            "radial-gradient(circle at center, rgba(125,249,255,0.05) 0%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      {/* chrome depth glow — bottom left */}
      <div
        className="absolute"
        style={{
          bottom: "-25vh",
          left: "-20vw",
          width: "70vmax",
          height: "70vmax",
          background:
            "radial-gradient(circle at center, rgba(245,245,245,0.04) 0%, transparent 55%)",
          filter: "blur(20px)",
        }}
      />

      {/* large faint torii silhouette */}
      <svg
        className="absolute left-[-6vw] top-1/2 -translate-y-1/2 opacity-[0.035]"
        width="55vmax"
        height="55vmax"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* top kasagi */}
        <path
          d="M20 50 Q100 30 180 50 L185 60 Q100 42 15 60 Z"
          fill="#bfc3c9"
        />
        {/* second beam (nuki) */}
        <rect x="35" y="72" width="130" height="8" fill="#bfc3c9" />
        {/* two pillars */}
        <rect x="48" y="55" width="10" height="120" fill="#bfc3c9" />
        <rect x="142" y="55" width="10" height="120" fill="#bfc3c9" />
      </svg>

      {/* enso (zen circle) — bottom right, drawing slowly */}
      <svg
        className="absolute right-[6vw] bottom-[8vh] opacity-[0.06]"
        width="22vmax"
        height="22vmax"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <motion.circle
          cx="100"
          cy="100"
          r="78"
          stroke="#8be9fd"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 0.92 }}
          transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "100px 100px" }}
        />
      </svg>

      {/* sakura petals */}
      {petals.map((p) => (
        <Petal key={p.i} {...p} />
      ))}

      {/* horizon mist band */}
      <div
        className="absolute inset-x-0 top-1/3 h-[18vh] mix-blend-screen opacity-[0.04]"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(245,245,245,0.4), transparent)",
        }}
      />
    </div>
  );
}

function Petal({
  left,
  size,
  duration,
  delay,
  drift,
  rot,
  opacity,
}: {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rot: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${left}vw`,
        top: "-10vh",
        width: size,
        height: size,
        opacity,
      }}
      initial={{ y: 0, x: 0, rotate: rot }}
      animate={{
        y: ["0vh", "115vh"],
        x: [`0px`, `${drift}vw`],
        rotate: [rot, rot + 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg viewBox="0 0 20 20" width="100%" height="100%" aria-hidden>
        {/* sakura petal shape — teardrop with notched tip */}
        <defs>
          <linearGradient id="petalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f5f5" />
            <stop offset="60%" stopColor="#f5f5f5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7df9ff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M10 1 C13 6, 17 9, 14 16 C12 18, 11 19, 10 19 C9 19, 8 18, 6 16 C3 9, 7 6, 10 1 Z M10 16 L9 18 M10 16 L11 18"
          fill="url(#petalGrad)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.3"
        />
      </svg>
    </motion.div>
  );
}
