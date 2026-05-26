import type { Metadata } from "next";
import Link from "next/link";
import { studio, releasedGames } from "@/lib/data";

const SLUG = "my-baddie";
const game = releasedGames.find((g) => g.title.toLowerCase().replace(/\s+/g, "-") === SLUG)!;

export const metadata: Metadata = {
  title: `Case Study: ${game.title}`,
  description: `${game.tagline} — Case study on the design, scripting, and live ops behind ${game.title}.`,
  alternates: { canonical: `/work/${SLUG}` },
  openGraph: {
    title: `${game.title} // Case Study`,
    description: game.tagline,
    type: "article",
  },
};

const sections = [
  {
    label: "BRIEF",
    title: "What it had to be.",
    body: [
      `${game.title} needed to land in the avatar-first social space without feeling like every other dress-up game on the platform.`,
      "The target was a social loop where players spend time customizing, showing off, and being seen — not grinding for paywalled items.",
      "Constraint: ship a tight v1 in weeks, not months, with room to iterate on what players actually used.",
    ],
  },
  {
    label: "DIRECTION",
    title: "Style as the gameplay.",
    body: [
      "I anchored the whole experience around a single verb: dress. Every system feeds into helping players express themselves faster and more confidently.",
      "Minimal HUD, clean lobby flow, and zero-friction outfit swaps. No menus deeper than two taps. No tutorial wall — players learn by doing.",
      "Monetization is sidecar, not gate. Cosmetics enhance expression; they don't unlock it.",
    ],
  },
  {
    label: "BUILD",
    title: "Solo, full-stack, from a blank baseplate.",
    body: [
      "Scripted the avatar customization loop, social interactions, and persistent save layer in Luau end-to-end.",
      "Designed the UI/UX from scratch in Figma, then implemented every screen with custom Roblox UI primitives — no template kits.",
      "Built the lobby environment, props, and lighting pass solo. Networking and replication tuned for high-concurrency social hubs.",
    ],
  },
  {
    label: "LIVE OPS",
    title: "Shipped, then sharpened.",
    body: [
      "Launched with one core loop, then added themed drops and seasonal events based on session telemetry.",
      "Iterated on retention friction: cut a load-screen step, simplified the outfit save flow, and added a one-tap re-equip — all within the first month live.",
      "Continuous balance and economy tuning. Every change tracked against engagement deltas.",
    ],
  },
];

const stack = [
  "Luau (full-stack)",
  "Custom UI primitives",
  "DataStore + Profile service",
  "Avatar customization API",
  "Server-authoritative economy",
  "Telemetry pipeline",
];

const metrics = [
  { k: "ROLE", v: "Solo developer" },
  { k: "DISCIPLINES", v: "Scripting · UI · Building · Live ops" },
  { k: "STATUS", v: "Live · iterating" },
  { k: "PLATFORM", v: "Roblox" },
];

export default function MyBaddieCaseStudy() {
  return (
    <main className="relative min-h-screen bg-ink-900 text-white">
      {/* sticky back nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-ink-900/70 border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="label-mono flex items-center gap-2 hover:text-accent transition-colors"
          >
            <span aria-hidden>←</span>
            BACK TO {studio.brand}
          </Link>
          <a
            href={`https://www.roblox.com/games/${game.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            <span>PLAY ON ROBLOX</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden noise">
        <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none mask-fade-y" />
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 relative">
          <div className="label-mono flex items-center gap-3">
            <span className="accent-dot w-2 h-2 rounded-full" />
            // CASE STUDY · 001
          </div>
          <h1 className="mt-5 font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.95]">
            <span className="text-chrome">{game.title.toUpperCase()}.</span>
            <br />
            <span className="text-stroke">{game.tagline}</span>
          </h1>

          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.k} className="border border-white/10 bg-white/[0.02] p-4">
                <div className="label-mono text-white/55">{m.k}</div>
                <div className="mt-1.5 font-display font-bold text-sm text-white">{m.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {game.tags.map((t) => (
              <span
                key={t}
                className="label-mono border border-accent/30 text-accent/90 bg-accent/[0.05] px-3 py-1.5"
              >
                {t.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* sections */}
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-24 space-y-20 md:space-y-28">
        {sections.map((s, i) => (
          <section key={s.label} className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-12">
            <aside className="md:sticky md:top-24 md:self-start">
              <div className="label-mono text-white/55">
                {String(i + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
              </div>
              <div className="mt-2 label-mono text-accent">{s.label}</div>
              <div className="mt-4 h-px w-12 bg-accent/50" />
            </aside>
            <div>
              <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-chrome">
                {s.title}
              </h2>
              <div className="mt-6 space-y-4 text-white/75 leading-relaxed text-lg">
                {s.body.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* stack */}
        <section className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-12">
          <aside className="md:sticky md:top-24 md:self-start">
            <div className="label-mono text-white/55">
              {String(sections.length + 1).padStart(2, "0")} / {String(sections.length + 1).padStart(2, "0")}
            </div>
            <div className="mt-2 label-mono text-accent">STACK</div>
            <div className="mt-4 h-px w-12 bg-accent/50" />
          </aside>
          <div className="grid sm:grid-cols-2 gap-3">
            {stack.map((s) => (
              <div
                key={s}
                className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3 hover:border-accent/40 transition-colors"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 8px var(--accent-glow)" }}
                />
                <span className="text-white/85">{s}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/10 noise">
        <div className="mx-auto max-w-[900px] px-6 md:px-10 text-center">
          <div className="label-mono text-accent">// WANT ONE LIKE THIS?</div>
          <h2 className="mt-4 font-display font-black text-4xl md:text-6xl tracking-tight leading-tight">
            <span className="text-chrome">BRING ME YOUR IDEA.</span>
            <br />
            <span className="text-holo">I&apos;LL SHIP IT.</span>
          </h2>
          <p className="mt-5 text-white/65 max-w-lg mx-auto">
            Fixed-price quotes in 24 hours. Full source on delivery. Same standard, every project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#contact" className="btn-primary">
              <span>START A PROJECT</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/#games" className="btn-magnet">
              <span>SEE OTHER WORK</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
