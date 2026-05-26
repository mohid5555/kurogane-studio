"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // Show once user has scrolled past ~25% of the page.
      setVisible(v > 0.25);
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Build a stroke-dashoffset for a circular progress ring.
  // r = 16, circumference = 2*pi*r ≈ 100.53
  const dash = useTransform(scrollYProgress, (v) => 100.53 - v * 100.53);

  function onClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="totop"
          type="button"
          aria-label="Scroll back to top"
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 bg-ink-900/80 backdrop-blur-md flex items-center justify-center group hover:border-accent/60 transition-colors"
          data-cursor="hover"
          style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}
        >
          {/* progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 36 36"
            aria-hidden
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="rgba(245,245,245,0.08)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#7df9ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="100.53"
              style={{
                strokeDashoffset: dash,
                filter: "drop-shadow(0 0 4px rgba(125,249,255,0.6))",
              }}
            />
          </svg>
          {/* arrow */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="relative text-white group-hover:text-accent transition-colors"
            aria-hidden
          >
            <path
              d="M12 19V5M12 5l-6 6M12 5l6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
