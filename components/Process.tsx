"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    k: "CONCEPT",
    title: "Find the hook.",
    body: "Trend research, gameplay loop sketches, monetization mapped before code is written.",
  },
  {
    id: "02",
    k: "PROTOTYPE",
    title: "Build the fun.",
    body: "Greybox systems in Studio. Validate the core loop in days, not weeks.",
  },
  {
    id: "03",
    k: "PRODUCTION",
    title: "Ship it tight.",
    body: "Final art, UI/UX, VFX, networking, anti-exploit, and analytics — all by one person.",
  },
  {
    id: "04",
    k: "LAUNCH",
    title: "Hit the algorithm.",
    body: "Soft launch → icon/thumbnail testing → traffic acquisition → conversion tuning.",
  },
  {
    id: "05",
    k: "LIVE OPS",
    title: "Keep it alive.",
    body: "Weekly updates, events, balance patches. Listen to players, ship daily.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 noise overflow-hidden">
      <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none mask-fade-y" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 accent-dot rounded-full" />
            <span className="label-mono text-accent">// HOW I WORK</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-chrome">FROM IDEA TO</span>{" "}
            <span className="text-holo">LIVE GAME.</span>
          </h2>
          <p className="mt-4 text-chrome-300 max-w-xl">
            The exact pipeline I run for every project. No fluff, no agency layers — just one
            developer moving from concept to live ops.
          </p>
        </motion.div>

        <div className="relative">
          {/* connecting line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent md:-translate-x-1/2 pointer-events-none"
            aria-hidden
          />

          <div className="space-y-8 md:space-y-16">
            {steps.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className={`relative grid md:grid-cols-2 gap-6 items-center ${
                  i % 2 ? "md:[&>:first-child]:order-2" : ""
                }`}
              >
                {/* node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
                  <div className="roblox-stud w-5 h-5" aria-hidden />
                </div>

                <div className={`pl-16 md:pl-0 ${i % 2 ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}`}>
                  <div className="font-mono text-xs text-white/30 tracking-widest">STEP / {s.id}</div>
                  <div className="label-mono mt-1" style={{ color: "var(--gold)" }}>
                    {s.k}
                  </div>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl font-black text-chrome">
                    {s.title}
                  </h3>
                </div>

                <div className={`pl-16 md:pl-0 ${i % 2 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="chrome-border p-5 glass-strong">
                    <p className="text-chrome-300">{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
