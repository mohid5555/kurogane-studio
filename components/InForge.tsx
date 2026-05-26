"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { inForgeProjects } from "@/lib/data";

export default function InForge() {
  return (
    <section id="in-forge" className="relative py-32 noise overflow-hidden">
      <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none mask-fade-y" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 accent-dot rounded-full animate-pulse" />
              <span className="label-mono text-accent">// IN DEVELOPMENT</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9 }}
              className="font-display font-black text-5xl md:text-7xl tracking-tight mt-3"
            >
              <span className="text-chrome">WHAT&apos;S NEXT</span>{" "}
              <span className="text-holo">IN THE LAB.</span>
            </motion.h2>
          </div>
          <p className="max-w-sm text-chrome-300">
            Three real projects in active production. Codenames now, full reveals at launch — with
            dev-log signals you can verify.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {inForgeProjects.map((p, i) => (
            <ProjectCard key={p.codename} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof inForgeProjects)[number];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-150, 150], [3, -3]), { stiffness: 110, damping: 18 });
  const ry = useSpring(useTransform(mx, [-150, 150], [-4, 4]), { stiffness: 110, damping: 18 });
  const [expanded, setExpanded] = useState(false);

  const status = p.progress > 70 ? "POLISH" : p.progress > 45 ? "VERTICAL SLICE" : "PROTOTYPE";
  const statusColor =
    p.progress > 70 ? "var(--accent)" : p.progress > 45 ? "var(--cyber)" : "var(--holo-purple)";

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - (r.left + r.width / 2));
        my.set(e.clientY - (r.top + r.height / 2));
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="chrome-border glass-strong p-6 relative overflow-hidden group"
      data-cursor="hover"
    >
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 label-mono">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }}
          />
          <span>{p.codename}</span>
        </div>
        <span className="font-mono text-xs text-white/40">{p.progress}%</span>
      </div>

      <div className="mt-1 label-mono" style={{ color: statusColor }}>
        {p.genre}
      </div>

      <div className="mt-5 relative">
        <div className="font-display font-black text-2xl md:text-3xl text-chrome tracking-tight leading-tight">
          {p.title}
        </div>
        <motion.div
          className="absolute inset-0"
          style={{ background: "var(--accent)", originX: 0 }}
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, delay: index * 0.1 + 0.4, ease: [0.7, 0, 0.2, 1] }}
        />
      </div>

      <p className="mt-3 text-chrome-300 text-sm leading-relaxed">{p.blurb}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <Meta k="ETA" v={p.eta} />
        <Meta k="STATUS" v={status} accent={statusColor} />
        <Meta k="TEAM" v={p.team} full />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="px-2 py-1 text-[0.6rem] font-mono uppercase tracking-wider text-white/70 border border-white/10 bg-white/[0.02]"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between label-mono mb-2">
          <span>BUILD PROGRESS</span>
          <span style={{ color: statusColor }}>{p.progress}%</span>
        </div>
        <div className="h-1 bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${p.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: index * 0.1 + 0.3, ease: [0.7, 0, 0.2, 1] }}
            className="h-full rounded-full relative"
            style={{ background: statusColor, boxShadow: `0 0 10px ${statusColor}` }}
          >
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45"
              style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }}
            />
          </motion.div>
        </div>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-5 w-full flex items-center justify-between label-mono py-2 border-t border-white/10 hover:text-white transition-colors"
        data-cursor="hover"
      >
        <span>DEV LOG</span>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="text-sm">
          ▾
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
        <ul className="pt-3 space-y-2 text-xs">
          {p.devlog.map((d, i) => (
            <li key={i} className="flex items-start gap-3 text-chrome-300">
              <span className="font-mono text-white/40 shrink-0 w-12">{d.date}</span>
              <span>{d.note}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

function Meta({ k, v, accent, full }: { k: string; v: string; accent?: string; full?: boolean }) {
  return (
    <div className={`border border-white/10 p-2 ${full ? "col-span-2" : ""}`}>
      <div className="label-mono text-[0.6rem]">{k}</div>
      <div className="mt-1 font-mono text-xs text-white" style={accent ? { color: accent } : {}}>
        {v}
      </div>
    </div>
  );
}
