"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";
import { studio } from "@/lib/data";
import { useLiveGames, useProfile } from "@/lib/useLiveData";
import { formatNumber } from "@/lib/format";
import { useIsTouch } from "@/lib/useIsTouch";

export default function Hero() {
  const isTouch = useIsTouch();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-1, 1], [-20, 20]), { stiffness: 60, damping: 18 });
  const py = useSpring(useTransform(my, [-1, 1], [-14, 14]), { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (isTouch) return; // no mouse parallax on touch
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, isTouch]);

  const { data: games } = useLiveGames();
  const profile = useProfile(studio.roblox.userId);

  const totals = useMemo(() => {
    if (!games) return null;
    const visits = games.reduce((a, g) => a + (g.visits ?? 0), 0);
    const playing = games.reduce((a, g) => a + (g.playing ?? 0), 0);
    const favorites = games.reduce((a, g) => a + (g.favoritedCount ?? 0), 0);
    const up = games.reduce((a, g) => a + (g.upVotes ?? 0), 0);
    const down = games.reduce((a, g) => a + (g.downVotes ?? 0), 0);
    const ratio = up + down > 0 ? up / (up + down) : 0;
    return { visits, playing, favorites, ratio, live: games.length };
  }, [games]);

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden noise">
      {/* HUD grid w/ parallax */}
      <motion.div className="absolute inset-0 hud-grid mask-fade-y" style={{ x: px, y: py }} />

      {/* radial light pools */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 78% 38%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 18% 80%, rgba(255,255,255,0.05), transparent 55%)",
        }}
      />

      {/* massive ghost kanji */}
      <motion.div
        className="absolute top-[10%] right-[4%] font-display text-[26vw] leading-none text-white/[0.03] select-none pointer-events-none"
        style={{ x: useTransform(mx, [-1, 1], [-16, 16]), y: useTransform(my, [-1, 1], [-12, 12]) }}
      >
        {studio.kanji}
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-44 md:pt-48 pb-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left – Title */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex items-center gap-3 label-mono mb-6"
            >
              <span className="h-px w-10 bg-white/30" />
              <span>
                {studio.established} / {studio.city}
              </span>
            </motion.div>

            {/* Availability badge */}
            <motion.a
              href="#contact"
              data-cursor="hover"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-flex items-center gap-2.5 mb-8 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/[0.08] hover:bg-accent/[0.14] transition-colors"
              style={{ boxShadow: "0 0 24px var(--accent-glow)" }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full accent-dot"
                style={{ animation: "pulse 1.6s ease-in-out infinite" }}
              />
              <span
                className="font-mono text-[0.66rem] tracking-[0.28em]"
                style={{ color: "var(--accent)" }}
              >
                {studio.availability.label}
              </span>
            </motion.a>

            <h1 className="font-display font-black leading-[0.84] tracking-tight text-[clamp(2.8rem,9vw,8.5rem)]">
              {["BUILT", "BY", "ONE.", "PLAYED", "BY", "MILLIONS."].map((word, i) => (
                <span key={i + word} className="block overflow-hidden">
                  <motion.span
                    className={`inline-block mr-[0.25em] ${i === 2 || i === 5 ? "text-chrome" : "text-stroke"}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.0, delay: 0.18 + i * 0.09, ease: [0.7, 0, 0.2, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9 }}
              className="mt-8 max-w-xl text-chrome-200 text-base md:text-lg leading-relaxed"
            >
              <span className="text-white">{studio.roblox.username}</span> — solo full-stack Roblox developer.
              Scripting, UI, building, VFX, animation. Four live titles, three in the forge. Every system
              from first line to live op, shipped by one person.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="mt-5 flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.24em] uppercase text-white/55"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span>{studio.availability.replySla}</span>
              <span className="text-white/25">·</span>
              <span>FIXED-PRICE QUOTES</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#games" className="btn-primary" data-cursor="hover">
                <span>EXPLORE GAMES</span>
                <span aria-hidden>↘</span>
              </a>
              <a href="#contact" className="btn-magnet" data-cursor="hover">
                <span>HIRE / COLLAB</span>
                <span aria-hidden>→</span>
              </a>
            </motion.div>

            {/* Profile chip */}
            <motion.a
              href={studio.roblox.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.9 }}
              className="mt-10 inline-flex items-center gap-4 glass chrome-border px-4 py-3 group"
              data-cursor="hover"
            >
              <span className="relative w-12 h-12 chrome-border overflow-hidden bg-ink-800">
                {profile?.headshot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.headshot} alt={studio.roblox.username} className="w-full h-full object-cover" />
                ) : (
                  <span className="absolute inset-0 skeleton" />
                )}
              </span>
              <span className="leading-tight">
                <span className="block label-mono">VERIFIED // ROBLOX</span>
                <span className="block font-display text-sm tracking-hyper text-chrome">
                  @{studio.roblox.username}
                </span>
              </span>
              <span className="text-white/40 group-hover:text-white transition-colors text-xl ml-2">↗</span>
            </motion.a>
          </div>

          {/* Right – Live telemetry */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="chrome-border glass-strong p-6 relative overflow-hidden">
              <div className="absolute inset-0 scanlines pointer-events-none" />
              <div className="flex items-center justify-between label-mono">
                <span>LIVE.TELEMETRY</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full accent-dot animate-flicker" />
                  {games ? "STREAMING" : "BOOTING"}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <BigStat
                  label="Total Visits"
                  tip="Total times my games have been played"
                  value={totals ? formatNumber(totals.visits) : null}
                />
                <BigStat
                  label="Playing Now"
                  tip="Players in my games right now"
                  value={totals ? formatNumber(totals.playing) : null}
                />
                <BigStat
                  label="Favorites"
                  tip="Players who favorited my games"
                  value={totals ? formatNumber(totals.favorites) : null}
                />
                <BigStat
                  label="Like Ratio"
                  tip="% of players who liked vs disliked"
                  value={totals ? (totals.ratio * 100).toFixed(1) + "%" : null}
                />
              </div>

              <div className="mt-6 h-32 relative overflow-hidden chrome-border">
                <FakeGraph />
              </div>

              <div className="mt-6 flex items-center justify-between label-mono">
                <span>SIGNAL // STABLE</span>
                <span>BUILD 2.0.0</span>
              </div>
            </div>

            {/* small per-game count chip strip */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {(games ?? Array.from({ length: 4 })).map((g, i) => (
                <div key={i} className="glass px-3 py-2 chrome-border">
                  <div className="label-mono truncate">{(g as { name?: string } | undefined)?.name ?? "—"}</div>
                  <div className="font-display text-sm text-chrome mt-1">
                    {g ? formatNumber((g as { visits?: number }).visits ?? 0) : "···"}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="mt-24 border-y border-white/10 py-5 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap font-display tracking-hyper text-xl text-white/40"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 shrink-0">
                {[
                  "LUAU",
                  "◆",
                  "NETWORKING",
                  "◆",
                  "VFX",
                  "◆",
                  "UI/UX",
                  "◆",
                  "BUILDING",
                  "◆",
                  "ANIMATION",
                  "◆",
                  "MONETIZATION",
                  "◆",
                  "LIVE OPS",
                  "◆",
                ].map((t, i) => (
                  <span key={i} className={t === "◆" ? "text-white/20" : ""}>
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BigStat({ label, value, tip }: { label: string; value: string | null; tip?: string }) {
  return (
    <div className="border border-white/10 p-4 relative overflow-hidden tip" data-tip={tip}>
      <div className="label-mono">{label}</div>
      <div className="mt-2 font-display text-2xl text-chrome min-h-[2rem]">
        {value ?? <span className="skeleton inline-block w-16 h-5" aria-label="loading" />}
      </div>
    </div>
  );
}

function FakeGraph() {
  return (
    <svg viewBox="0 0 400 120" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,80 L40,80 L60,30 L80,90 L120,60 L160,65 L200,20 L240,70 L280,55 L320,75 L360,40 L400,60"
        fill="none"
        stroke="white"
        strokeWidth="1.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <path
        d="M0,80 L40,80 L60,30 L80,90 L120,60 L160,65 L200,20 L240,70 L280,55 L320,75 L360,40 L400,60 L400,120 L0,120 Z"
        fill="url(#g1)"
        opacity="0.5"
      />
    </svg>
  );
}
