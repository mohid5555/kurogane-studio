"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Are you a solo developer or a team?",
    a: "Solo by default — I personally own the entire stack: code, design, UI/UX, art direction, live ops. For larger or faster builds (PREMIUM tier or custom scopes), I bring in a trusted team of artists, animators and engineers I've worked with for years. Either way you get one point of contact (me), one clear timeline, and one professional standard.",
  },
  {
    q: "How much does a game cost?",
    a: "Three flat packages: STARTER ($500–$700) for a simple polished loop, PRO ($1,000–$1,500) for a real shippable mid-to-high quality game, and PREMIUM ($2,000–$2,500) for high-end front-page-ready production. Custom scopes are quoted within 24 hours. No hidden fees, no surprise invoices.",
  },
  {
    q: "How long until my game is delivered?",
    a: "It depends on the package and scope, but most projects ship in around 10 days. STARTER is typically ~7 days, PRO is ~10 days, and PREMIUM ranges 10–21 days depending on art and content volume. You get progress updates every 2–3 days so you're never left guessing.",
  },
  {
    q: "What kinds of games do you build?",
    a: "Anything that performs on Roblox — chaotic multiplayer, trend-driven obbys, simulators, social/avatar games, racing, survival, tycoons. I read the meta hard and shape the game around what's actually working right now, not what worked two years ago.",
  },
  {
    q: "Do you handle live operations after launch?",
    a: "Yes — included in PRO (2 weeks) and PREMIUM (30 days), and available as a flat monthly retainer after. Weekly updates, events, balance patches, monetization tuning, and analytics-driven decisions. A live game is never finished.",
  },
  {
    q: "What's included in the delivery?",
    a: "Full source code (your IP, not mine), all custom assets, documentation for systems and configs, soft-launch icon + thumbnail, monetization setup, and a handover walkthrough. You own everything outright.",
  },
  {
    q: "How do I get started or get a custom quote?",
    a: "Fastest route is Discord: 1tradeforfun. Send me a 2-line description of your idea and I'll come back within 24 hours with a tier recommendation, timeline, and a fixed quote. No long sales calls, no fluff.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-32 noise overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 gold-dot rounded-full" />
            <span className="label-mono" style={{ color: "var(--gold)" }}>
              // QUESTIONS
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-chrome">YOU ASKED.</span>{" "}
            <span className="text-holo">I ANSWERED.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="chrome-border overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
        data-cursor="hover"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-mono text-xs text-white/30">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-display text-lg md:text-xl text-chrome truncate">{q}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0, color: open ? "#7df9ff" : "rgba(255,255,255,0.6)" }}
          className="text-2xl font-light leading-none shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-14 text-chrome-300 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
