"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { studio } from "@/lib/data";
import { useToast } from "./Toast";

type Pkg = {
  id: string;
  name: string;
  tag: string;
  price: string;
  priceNote: string;
  delivery: string;
  blurb: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  accent: "gold" | "accent" | "holo";
};

const packages: Pkg[] = [
  {
    id: "starter",
    name: "STARTER",
    tag: "SIMPLE LOOP",
    price: "$500 – $700",
    priceNote: "USD · most popular",
    delivery: "~7 DAYS",
    blurb: "One polished gameplay loop. Built fast, shipped clean.",
    features: [
      "1 core gameplay loop",
      "Custom UI / HUD",
      "Basic monetization (gamepass + dev product)",
      "Soft-launch icon + thumbnail",
      "Datastore + leaderboard",
      "Source code handover",
    ],
    cta: "BOOK STARTER",
    highlight: true,
    accent: "accent",
  },
  {
    id: "pro",
    name: "PRO",
    tag: "MID — HIGH QUALITY",
    price: "$1,000 – $1,500",
    priceNote: "USD · best value",
    delivery: "~10 DAYS",
    blurb: "A real, marketable game. Built to perform on Roblox.",
    features: [
      "Full systems + content loop",
      "Polished UI/UX + VFX",
      "Multi-tier monetization",
      "Custom 3D models + map",
      "Optimization & anti-exploit",
      "2 weeks post-launch support",
      "Thumbnail / icon A/B testing",
    ],
    cta: "BOOK PRO",
    accent: "gold",
  },
  {
    id: "premium",
    name: "PREMIUM",
    tag: "HIGH-END / TRENDING",
    price: "$2,000 – $2,500",
    priceNote: "USD · team-assisted",
    delivery: "10 – 21 DAYS",
    blurb: "Front-page-ready production. Solo direction, team execution.",
    features: [
      "Everything in PRO, scaled up",
      "Original art direction + custom assets",
      "Advanced VFX, shaders, animation",
      "Live ops setup (events, analytics)",
      "Marketing-ready trailer cuts",
      "30-day post-launch support",
      "Team-assisted production",
    ],
    cta: "BOOK PREMIUM",
    accent: "holo",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 noise overflow-hidden">
      <div className="absolute inset-0 y2k-grid opacity-20 pointer-events-none mask-fade-y" />
      <div className="absolute inset-x-0 top-0 h-px scan-stripe" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 accent-dot rounded-full" />
            <span className="label-mono text-accent">// PACKAGES</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            <span className="text-chrome">YOUR IDEA.</span>{" "}
            <span className="text-holo">SHIPPED.</span>
          </h2>
          <p className="mt-5 text-chrome-300 max-w-2xl text-lg">
            Three clear packages. Flat pricing, real timelines, full source code on delivery.
            Pick the tier that fits — or send me a custom brief and I&apos;ll quote in 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 label-mono">
            <Badge>FLAT PRICING</Badge>
            <Badge>NO HIDDEN FEES</Badge>
            <Badge>~10 DAY AVG TURNAROUND</Badge>
            <Badge>SOURCE CODE INCLUDED</Badge>
            <Badge>YOU OWN THE IP</Badge>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((p, i) => (
            <PriceCard key={p.id} pkg={p} index={i} />
          ))}
        </div>

        <TrustStrip />

        <ContactStrip />
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1.5 border border-white/10 text-white/70 bg-white/[0.02]">{children}</span>
  );
}

function PriceCard({ pkg, index }: { pkg: Pkg; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-150, 150], [3, -3]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-150, 150], [-4, 4]), { stiffness: 120, damping: 18 });

  const accentVar =
    pkg.accent === "gold" ? "var(--gold)" : pkg.accent === "accent" ? "var(--accent)" : "var(--holo-purple)";
  const glowVar =
    pkg.accent === "gold" ? "var(--gold-glow)" : "var(--accent-glow)";

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
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={`relative ${pkg.highlight ? "holo-border" : "chrome-border"} p-7 flex flex-col group`}
      data-cursor="hover"
    >
      {pkg.highlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[0.6rem] font-mono tracking-[0.32em] uppercase text-white"
          style={{ background: "var(--accent)", boxShadow: "0 0 20px var(--accent-glow)" }}
        >
          MOST POPULAR
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="label-mono" style={{ color: accentVar }}>
          {pkg.tag}
        </span>
        <span className="font-mono text-[0.6rem] text-white/30">
          PKG / {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-3 font-display text-4xl font-black text-chrome tracking-tight">{pkg.name}</h3>

      <div className="mt-4">
        <div
          className={`font-display text-3xl font-black ${
            pkg.highlight ? "text-holo" : "text-chrome"
          }`}
        >
          {pkg.price}
        </div>
        <div className="label-mono mt-1">{pkg.priceNote}</div>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-b border-white/10 py-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: accentVar, boxShadow: `0 0 8px ${glowVar}` }}
        />
        <span className="label-mono">DELIVERY</span>
        <span className="ml-auto font-mono text-sm text-white">{pkg.delivery}</span>
      </div>

      <p className="mt-4 text-chrome-300 text-sm">{pkg.blurb}</p>

      <ul className="mt-5 space-y-2 text-sm flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full"
              style={{ background: accentVar, boxShadow: `0 0 6px ${glowVar}` }}
            />
            <span className="text-chrome-300">{f}</span>
          </li>
        ))}
      </ul>

      <BookButton pkg={pkg} />

      {/* hover sweep */}
      <div className="absolute inset-x-0 -bottom-px h-px scan-stripe opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

function BookButton({ pkg }: { pkg: Pkg }) {
  const { push } = useToast();
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(studio.discord.username);
      setCopied(true);
      push(`Discord copied: ${studio.discord.username} — message me about the ${pkg.name} package`);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      push(`Add me on Discord: ${studio.discord.username}`);
    }
    window.open(studio.discord.openUrl, "_blank", "noopener");
  };

  return (
    <button
      onClick={onClick}
      className={`mt-6 ${pkg.highlight ? "btn-primary" : "btn-magnet"} w-full justify-between`}
      data-cursor="hover"
    >
      <span>{copied ? "COPIED ✓" : pkg.cta}</span>
      <span aria-hidden>→</span>
    </button>
  );
}

function TrustStrip() {
  const items = [
    { k: "FIXED PRICE", v: "Locked at signoff. No scope creep invoices." },
    { k: "MILESTONE UPDATES", v: "Progress every 2–3 days. Live build access." },
    { k: "FULL HANDOVER", v: "Source, assets, docs, monetization — all yours." },
    { k: "POST-LAUNCH", v: "2–30 days of support included by tier." },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
      className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      {items.map((it) => (
        <div
          key={it.k}
          className="chrome-border p-4 hover:border-accent/40 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 accent-dot rounded-full group-hover:scale-150 transition-transform" />
            <span className="label-mono text-white">{it.k}</span>
          </div>
          <div className="mt-2 text-xs text-chrome-300 leading-snug">{it.v}</div>
        </div>
      ))}
    </motion.div>
  );
}

function ContactStrip() {
  const { push } = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(studio.discord.username);
      push(`Discord copied: ${studio.discord.username}`);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
      className="mt-10 chrome-border glass-strong p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
    >
      <div className="flex items-center gap-4">
        <div className="roblox-stud w-10 h-10 shrink-0" aria-hidden />
        <div>
          <div className="label-mono" style={{ color: "var(--gold)" }}>
            // CUSTOM SCOPE?
          </div>
          <div className="mt-1 font-display text-2xl md:text-3xl font-black text-chrome">
            Tell me your idea. I&apos;ll quote in 24h.
          </div>
        </div>
      </div>

      <div className="md:ml-auto flex flex-wrap items-center gap-3">
        <button onClick={copy} className="btn-magnet" data-cursor="hover">
          <span>COPY DISCORD</span>
          <span className="font-mono text-white/60">{studio.discord.username}</span>
        </button>
        <a
          href={studio.discord.openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          data-cursor="hover"
        >
          <span>CONTACT NOW</span>
          <span aria-hidden>↗</span>
        </a>
      </div>
    </motion.div>
  );
}