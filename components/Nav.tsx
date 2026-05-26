"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { studio } from "@/lib/data";

const links = [
  { label: "HOME", href: "#hero" },
  { label: "GAMES", href: "#games" },
  { label: "STATS", href: "#stats" },
  { label: "PROCESS", href: "#process" },
  { label: "IN LAB", href: "#in-forge" },
  { label: "SKILLS", href: "#skills" },
  { label: "PRICING", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [open, setOpen] = useState(false);

  // lock body scroll while mobile menu open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 py-4 sm:py-5 flex items-center justify-between gap-3">
        <a href="#hero" className="flex items-center gap-2 sm:gap-3 group min-w-0" data-cursor="hover">
          <span className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 chrome-border shrink-0">
            <span className="text-chrome font-display text-[11px] sm:text-sm font-black">{studio.brandShort}</span>
          </span>
          <div className="leading-none min-w-0">
            <div className="font-display font-black tracking-hyper text-[11px] sm:text-xs truncate">{studio.brand}</div>
            <div className="label-mono mt-1 hidden sm:block">{studio.kanji} / DEV</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0 glass rounded-full px-2 py-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-3 py-2 label-mono hover:text-white transition-colors"
              data-cursor="hover"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden lg:inline-flex" data-cursor="hover">
            <span>CONTACT</span>
            <span aria-hidden>→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center chrome-border"
            data-cursor="hover"
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <motion.span
              className="absolute h-px w-5 bg-white"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <motion.span
              className="absolute h-px w-5 bg-white"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute h-px w-5 bg-white"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div className="relative h-px bg-white/5">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ width: w, boxShadow: "0 0 12px var(--accent-glow)" }}
        />
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm -z-10"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 mx-4 mt-3 glass-strong border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
              <ul className="relative divide-y divide-white/10">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-5 py-4 hover:bg-accent/[0.08] active:bg-accent/[0.12] transition-colors"
                    >
                      <span className="font-display font-black tracking-wider text-base text-white">
                        {l.label}
                      </span>
                      <span className="label-mono text-white/40 group-hover:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="relative p-4 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  <span>START A PROJECT</span>
                  <span aria-hidden>→</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
