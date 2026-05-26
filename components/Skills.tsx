"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";

const team = [
  { role: "SCRIPTERS", k: "Luau systems & networking" },
  { role: "BUILDERS", k: "Maps, props, environments" },
  { role: "MODELERS", k: "Blender → Roblox pipeline" },
  { role: "UI / UX DESIGNERS", k: "Menus, HUDs, shops" },
  { role: "ANIMATORS", k: "Character, weapon, UI motion" },
  { role: "VFX ARTISTS", k: "Particles, beams, shaders" },
  { role: "SFX / AUDIO", k: "Sound design & mixing" },
  { role: "PROJECT MANAGERS", k: "Scope, sprint, delivery" },
  { role: "MARKETERS", k: "Icons, thumbnails, traffic" },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const groups = Array.from(new Set(skills.map((s) => s.group)));

  return (
    <section id="skills" className="relative py-32 noise overflow-hidden">
      <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none mask-fade-y" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 accent-dot rounded-full" />
              <span className="label-mono text-accent">// WHAT I CAN DO</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-display font-black text-5xl md:text-7xl tracking-tight mt-3"
            >
              <span className="text-chrome">SKILLS,</span>{" "}
              <span className="text-holo">CRAFT &amp; CREW.</span>
            </motion.h2>
          </div>
          <p className="max-w-md text-chrome-300">
            I personally own every layer — engineering, design, and operations. For bigger or
            faster builds I bring in a vetted crew I&apos;ve shipped with for years.
          </p>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />

        <div ref={ref} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {groups.map((group, gi) => (
            <NodeCard key={group} group={group} index={gi} inView={inView}>
              {skills.filter((s) => s.group === group).map((s, i) => (
                <SkillBar
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  delay={gi * 0.15 + i * 0.08}
                  active={inView}
                />
              ))}
            </NodeCard>
          ))}
        </div>

        {/* TEAM PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9 }}
          className="mt-16 holo-border p-6 md:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
          <div className="grid lg:grid-cols-[1.1fr_2fr] gap-10 items-start relative">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 gold-dot rounded-full" />
                <span className="label-mono" style={{ color: "var(--gold)" }}>
                  // THE CREW
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-black tracking-tight text-chrome leading-tight">
                Solo by default.
                <br />
                <span className="text-holo">Team-powered on demand.</span>
              </h3>
              <p className="mt-5 text-chrome-300">
                For PRO and PREMIUM builds I scale up with a hand-picked crew of specialists I&apos;ve
                shipped with on previous projects. Same direction, same standard, same single point
                of contact — just more horsepower behind it.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 label-mono">
                <Badge>VETTED COLLABORATORS</Badge>
                <Badge>NDA-COVERED</Badge>
                <Badge>ONE POINT OF CONTACT</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {team.map((t, i) => (
                <motion.div
                  key={t.role}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="border border-white/10 bg-white/[0.02] p-3 hover:border-accent/60 hover:bg-accent/[0.04] transition-colors group cursor-default"
                  style={{ transitionProperty: "border-color, background-color, transform" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-white group-hover:text-accent transition-colors">
                      {t.role}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                      style={{ boxShadow: "0 0 8px var(--accent-glow)" }}
                    />
                  </div>
                  <div className="mt-1.5 text-xs text-chrome-300 leading-snug">{t.k}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BRIDGE CTA → PRICING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-12 bg-accent/60" />
            <span className="label-mono text-accent">// READY WHEN YOU ARE</span>
            <span className="h-px w-12 bg-accent/60" />
          </div>
          <h3 className="font-display text-4xl md:text-6xl font-black tracking-tight leading-tight">
            <span className="text-chrome">BRING YOUR DREAM IDEA</span>
            <br />
            <span className="text-holo">TO REALITY.</span>
          </h3>
          <p className="mt-5 text-chrome-300 max-w-xl mx-auto">
            Pick a package below. Flat pricing, ~10-day average turnaround, full source code on
            delivery. Custom scopes welcome — quoted in 24 hours.
          </p>
          <a
            href="#pricing"
            className="btn-primary mt-7 inline-flex"
            data-cursor="hover"
          >
            <span>SEE PACKAGES</span>
            <span aria-hidden>↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1.5 border border-white/10 text-white/70 bg-white/[0.02]">{children}</span>
  );
}

/* ─── interactive NODE card with 3D tilt ─── */
function NodeCard({
  group,
  index,
  inView,
  children,
}: {
  group: string;
  index: number;
  inView: boolean;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  // small tilt range so it stays classy
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 120, damping: 14 });
  // spotlight position
  const sx = useTransform(mx, (v) => `${v * 100}%`);
  const sy = useTransform(my, (v) => `${v * 100}%`);

  function onMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className="chrome-border glass p-5 md:p-6 relative overflow-hidden group will-change-transform"
      data-cursor="hover"
    >
      {/* mouse-follow spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [sx, sy] as never,
            ([x, y]: [string, string]) =>
              `radial-gradient(380px circle at ${x} ${y}, rgba(125,249,255,0.10), transparent 60%)`,
          ),
        }}
      />
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* header */}
      <div className="flex items-center justify-between label-mono relative">
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          NODE.{String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-white/70">{group.toUpperCase()}</span>
      </div>

      {/* animated sweep line under header */}
      <div className="relative mt-3 h-px bg-white/10 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={inView ? { x: "100%" } : {}}
          transition={{ duration: 1.4, delay: index * 0.15 + 0.2, ease: [0.7, 0, 0.2, 1] }}
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(125,249,255,0.9), transparent)",
          }}
        />
      </div>

      <div className="mt-6 space-y-5 relative">{children}</div>

      {/* footer */}
      <div className="mt-8 flex items-center justify-between label-mono relative">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: "0 0 8px var(--accent-glow)" }} />
          CALIBRATED
        </span>
        <span className="text-white/40 text-[0.62rem] tracking-[0.3em]">
          {String(index + 1).padStart(2, "0")} / 03
        </span>
      </div>
    </motion.div>
  );
}

function SkillBar({
  label,
  value,
  delay,
  active,
}: {
  label: string;
  value: number;
  delay: number;
  active: boolean;
}) {
  return (
    <div className="group/row -mx-2 px-2 py-1 rounded-sm hover:bg-white/[0.03] transition-colors">
      <div className="flex items-center justify-between text-sm">
        <span className="text-chrome-100 transition-colors group-hover/row:text-white">
          {label}
        </span>
        <motion.span
          className="font-mono text-white/70 text-xs group-hover/row:text-accent transition-colors"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6 }}
        >
          <Counter to={value} active={active} delay={delay} />%
        </motion.span>
      </div>
      <div className="mt-2 h-[3px] bg-white/10 overflow-hidden relative rounded-full">
        <motion.div
          initial={{ width: "0%" }}
          animate={active ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.7, 0, 0.2, 1] }}
          className="h-full relative rounded-full"
          style={{
            background: "linear-gradient(90deg, #f5f5f5 0%, #f5f5f5 70%, #7df9ff 100%)",
          }}
        >
          {/* moving shimmer along the bar */}
          <motion.span
            aria-hidden
            className="absolute inset-y-0 w-10 -skew-x-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
            }}
            animate={active ? { x: ["-100%", "1200%"] } : {}}
            transition={{
              duration: 2.6,
              delay: delay + 0.6,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
          {/* glowing diamond tip */}
          <motion.span
            aria-hidden
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
            style={{
              background: "#7df9ff",
              boxShadow: "0 0 10px rgba(125,249,255,0.8), 0 0 2px #fff",
            }}
            animate={active ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1.8, delay: delay + 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function Counter({ to, active, delay }: { to: number; active: boolean; delay: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    let start: number | null = null;
    const dur = 1100;
    const tick = (t: number) => {
      if (!start) start = t + delay * 1000;
      const p = Math.max(0, Math.min(1, (t - start) / dur));
      setVal(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, delay]);
  return <>{val}</>;
}
