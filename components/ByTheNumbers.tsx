"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLiveGames } from "@/lib/useLiveData";
import { formatNumber } from "@/lib/format";

export default function ByTheNumbers() {
  const { data } = useLiveGames();

  const totals = data?.reduce(
    (acc, g) => ({
      visits: acc.visits + (g.visits ?? 0),
      favorites: acc.favorites + (g.favoritedCount ?? 0),
      playing: acc.playing + (g.playing ?? 0),
      ratioSum: acc.ratioSum + (g.likeRatio ?? 0),
      count: acc.count + 1,
    }),
    { visits: 0, favorites: 0, playing: 0, ratioSum: 0, count: 0 }
  );

  const stats = [
    { k: "GAMES SHIPPED", v: data ? data.length : null, tip: "Live on Roblox right now" },
    {
      k: "TOTAL PLAYS",
      v: totals ? formatNumber(totals.visits) : null,
      tip: "All-time plays across all games",
      big: true,
    },
    {
      k: "AVG LIKE RATIO",
      v: totals && totals.count ? ((totals.ratioSum / totals.count) * 100).toFixed(1) + "%" : null,
      tip: "Average % of likes vs dislikes",
    },
    {
      k: "FAVORITES",
      v: totals ? formatNumber(totals.favorites) : null,
      tip: "Total saves across all games",
    },
    { k: "YEARS DEVELOPING", v: "2+", tip: "Building on Roblox since 2024" },
    { k: "TEAM SIZE", v: "SOLO + CREW", tip: "Solo by default, scaled with a vetted crew on bigger builds" },
  ];

  return (
    <section id="stats" className="relative py-32 noise overflow-hidden">
      {/* y2k bg */}
      <div className="absolute inset-0 y2k-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px scan-stripe" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 gold-dot rounded-full" />
            <span className="label-mono" style={{ color: "var(--gold)" }}>
              // BY THE NUMBERS
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-chrome">PROOF IN</span>{" "}
            <span className="text-holo">NUMBERS.</span>
          </h2>
          <p className="mt-4 text-chrome-300 max-w-xl">
            Live stats pulled from the Roblox API. Refreshed automatically — no static screenshots.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <StatTile key={s.k} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatTile({
  k,
  v,
  tip,
  big,
  index,
}: {
  k: string;
  v: string | number | null;
  tip: string;
  big?: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState<string>("");

  // counter animation for numeric values
  useEffect(() => {
    if (!inView || v == null) return;
    if (typeof v === "string" && /^[0-9.]+%?$/.test(v.replace(/[KMB]/g, ""))) {
      // no counter for formatted strings like "23K" — just show
      setN(String(v));
      return;
    }
    if (typeof v === "number") {
      let start = 0;
      const end = v;
      const dur = 1200;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(String(Math.floor(start + (end - start) * eased)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else {
      setN(String(v));
    }
  }, [inView, v]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      className={`tip relative overflow-hidden chrome-border p-6 group ${big ? "md:col-span-2 md:row-span-1" : ""}`}
      data-tip={tip}
      data-cursor="hover"
    >
      <div className="flex items-center justify-between">
        <span className="label-mono">{k}</span>
        <span className="font-mono text-[0.6rem] text-white/30">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div
        className={`mt-4 font-display font-black leading-none ${
          big ? "text-6xl md:text-8xl" : "text-4xl md:text-5xl"
        }`}
      >
        {v == null ? (
          <span
            className={`skeleton inline-block ${
              big ? "w-56 h-20 md:h-24" : "w-32 h-12 md:h-14"
            }`}
            aria-label="loading"
          />
        ) : (
          <span className={big ? "text-holo" : "text-chrome"}>{n || String(v)}</span>
        )}
      </div>
      {/* hover sweep */}
      <div className="absolute inset-x-0 -bottom-px h-px scan-stripe opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
