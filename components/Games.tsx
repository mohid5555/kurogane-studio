"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { releasedGames, type ReleasedGame } from "@/lib/data";
import { useLiveGames, type LiveGame } from "@/lib/useLiveData";
import { formatNumber, placeUrl } from "@/lib/format";

export default function Games() {
  const { data } = useLiveGames();

  // merge static catalog with live data (preserves ordering / fallback)
  const merged = releasedGames.map((g) => {
    const live = data?.find((d) => d.placeId === g.placeId);
    return { ...g, live };
  });

  const featured = merged[0];

  return (
    <section id="games" className="relative py-32 noise overflow-hidden">
      <SectionHeader
        eyebrow="// LIVE GAMES"
        title="MY GAMES"
        sub="Four titles live on Roblox. Real-time stats below — visits, players online, favorites, like ratio."
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 space-y-6">
        {/* FEATURED — large cinematic card */}
        <FeaturedCard catalog={featured} live={featured.live} />

        {/* Grid of the rest */}
        <div className="grid md:grid-cols-3 gap-6">
          {merged.slice(1).map((g, i) => (
            <GameCard key={g.placeId} catalog={g} live={g.live} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

function FeaturedCard({ catalog, live }: { catalog: ReleasedGame; live?: LiveGame }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-200, 200], [3, -3]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-200, 200], [-4, 4]), { stiffness: 80, damping: 18 });
  const tx = useSpring(useTransform(mx, [-200, 200], [-10, 10]), { stiffness: 80, damping: 18 });
  const ty = useSpring(useTransform(my, [-200, 200], [-6, 6]), { stiffness: 80, damping: 18 });

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className="chrome-border glass-strong relative overflow-hidden min-h-[520px] group"
      data-cursor="hover"
    >
      {/* Background thumbnail */}
      <motion.div className="absolute inset-0" style={{ x: tx, y: ty, scale: 1.08 }}>
        {live?.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={live.thumbnail}
            alt={catalog.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-700"
          />
        ) : (
          <div className="absolute inset-0 hud-grid opacity-30" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.7) 45%, rgba(5,5,7,0.1) 100%), linear-gradient(180deg, transparent 40%, rgba(5,5,7,0.9) 100%)",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8 md:p-12 min-h-[520px]">
        <div className="flex items-center justify-between label-mono">
          <span>FEATURED // 001</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full accent-dot animate-flicker" />
            LIVE
          </span>
        </div>

        <h3 className="font-display font-black text-5xl md:text-7xl mt-6 text-chrome tracking-tight leading-none max-w-3xl">
          {catalog.title.toUpperCase()}
        </h3>

        <p className="mt-5 text-chrome-200 max-w-xl">{catalog.tagline}</p>

        <div className="mt-auto pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          <LiveStat k="Total Visits" tip="Total times played" v={live ? formatNumber(live.visits) : null} />
          <LiveStat k="Playing Now" tip="Players in-game right now" v={live ? formatNumber(live.playing) : null} />
          <LiveStat k="Favorites" tip="Players who favorited it" v={live ? formatNumber(live.favoritedCount) : null} />
          <LiveStat
            k="Like Ratio"
            tip="% liked vs disliked"
            v={live?.likeRatio != null ? (live.likeRatio * 100).toFixed(1) + "%" : null}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {catalog.tags.map((t) => (
              <span key={t} className="label-mono px-3 py-1 border border-white/20">
                {t}
              </span>
            ))}
          </div>
          <a
            href={placeUrl(catalog.placeId, catalog.title.replace(/\s+/g, "-"))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnet"
          >
            <span>PLAY ON ROBLOX</span>
            <span aria-hidden>↗</span>
          </a>
          {catalog.title === "My Baddie" && (
            <a
              href={`/work/${catalog.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="label-mono inline-flex items-center gap-2 mt-3 text-accent hover:text-white transition-colors group/cs"
              data-cursor="hover"
            >
              <span className="h-px w-6 bg-accent group-hover/cs:bg-white transition-colors" />
              READ CASE STUDY
              <span aria-hidden className="group-hover/cs:translate-x-1 transition-transform">→</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function GameCard({
  catalog,
  live,
  index,
}: {
  catalog: ReleasedGame;
  live?: LiveGame;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-150, 150], [5, -5]), { stiffness: 130, damping: 16 });
  const ry = useSpring(useTransform(mx, [-150, 150], [-6, 6]), { stiffness: 130, damping: 16 });

  return (
    <motion.a
      href={placeUrl(catalog.placeId, catalog.title.replace(/\s+/g, "-"))}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - (r.left + r.width / 2));
        my.set(e.clientY - (r.top + r.height / 2));
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="chrome-border glass relative overflow-hidden block group"
      data-cursor="hover"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/10] relative overflow-hidden">
        {live?.thumbnail ? (
          <motion.img
            src={live.thumbnail}
            alt={catalog.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hover ? 1.08 : 1.0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          />
        ) : (
          <div className="absolute inset-0 bg-ink-800">
            <div className="absolute inset-0 hud-grid opacity-30" />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,7,0.2) 0%, rgba(5,5,7,0.6) 60%, rgba(5,5,7,0.95) 100%)",
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 label-mono">
          <span className="w-1.5 h-1.5 rounded-full accent-dot animate-flicker" />
          LIVE
        </div>
        <div className="absolute top-3 right-3 label-mono">{`00${index + 2}`}</div>

        {/* Hover overlay arrow */}
        <motion.div
          className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center chrome-border bg-ink-900/60"
          animate={{ x: hover ? 4 : 0, y: hover ? -4 : 0, opacity: hover ? 1 : 0.6 }}
        >
          <span className="text-white text-lg">↗</span>
        </motion.div>
      </div>

      {/* Body */}
      <div className="p-5 relative">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="font-display text-xl text-chrome font-black tracking-tight leading-tight">
          {catalog.title}
        </div>
        <p className="mt-2 text-sm text-chrome-300 line-clamp-2">{catalog.tagline}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat k="Visits" v={live ? formatNumber(live.visits) : "···"} />
          <Stat k="Now" v={live ? formatNumber(live.playing) : "···"} />
          <Stat k="♥" v={live ? formatNumber(live.favoritedCount) : "···"} />
        </div>

        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1.5 mt-4">
                {catalog.tags.map((t) => (
                  <span key={t} className="label-mono px-2 py-0.5 border border-white/15">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-white/10 px-2 py-1.5">
      <div className="label-mono text-[0.55rem]">{k}</div>
      <div className="font-display text-sm text-chrome mt-0.5">{v}</div>
    </div>
  );
}

function LiveStat({ k, v, tip }: { k: string; v: string | null; tip?: string }) {
  return (
    <div className="glass chrome-border px-3 py-3 tip" data-tip={tip}>
      <div className="label-mono">{k}</div>
      <div className="mt-1 font-display text-xl text-chrome min-h-[1.5rem]">
        {v ?? <span className="skeleton inline-block w-12 h-4" aria-label="loading" />}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <div className="label-mono">{eyebrow}</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-black text-5xl md:text-7xl text-chrome tracking-tight mt-3"
          >
            {title}
          </motion.h2>
        </div>
        <p className="max-w-sm text-chrome-300">{sub}</p>
      </div>
      <div className="mt-8 h-px w-full bg-white/10" />
    </div>
  );
}
