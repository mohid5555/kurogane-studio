"use client";

import { motion } from "framer-motion";
import { studio, timeline } from "@/lib/data";
import { useProfile } from "@/lib/useLiveData";

const roles = [
  { k: "SCRIPTING", v: "Luau, game systems, networking, anti-exploit." },
  { k: "UI / UX", v: "Menus, HUDs, shops — designed and coded." },
  { k: "BUILDING", v: "Maps, props, environments in Studio." },
  { k: "VFX", v: "Particles, beams, shaders, screen FX." },
  { k: "ANIMATION", v: "Character, weapon, UI motion." },
  { k: "LIVE OPS", v: "Updates, events, balancing, analytics." },
];

export default function About() {
  const profile = useProfile(studio.roblox.userId);

  return (
    <section id="about" className="relative py-32 noise overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="label-mono">// ABOUT ME</div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-display font-black text-5xl md:text-7xl text-chrome tracking-tight mt-3"
            >
              ONE PERSON.
              <br />
              <span className="text-stroke">FULL STACK.</span>
            </motion.h2>
            <p className="mt-8 text-chrome-200 max-w-md">
              I'm <span className="text-white">{studio.roblox.username}</span> — a solo Roblox
              developer running the entire pipeline. Scripting, UI, building, animation, VFX,
              monetization, live ops. No team. No outsourcing. Every system shipped by one
              person.
            </p>
            <p className="mt-4 text-chrome-300 max-w-md">
              Four titles live, three in the forge. Built on trends, polished like product.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3">
              <BigStat k="Roles" v="ALL" />
              <BigStat k="Live" v="04" />
              <BigStat k="Forge" v="03" />
            </div>

            {/* Avatar showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-10 chrome-border glass p-4 flex items-center gap-5"
            >
              <div className="relative w-24 h-24 chrome-border overflow-hidden bg-ink-800 flex-shrink-0">
                {profile?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar}
                    alt={studio.roblox.username}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 skeleton" />
                )}
              </div>
              <div>
                <div className="label-mono">ROBLOX // AVATAR</div>
                <div className="mt-1 font-display text-xl text-chrome">
                  @{studio.roblox.username}
                </div>
                <a
                  href={studio.roblox.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono mt-1 inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                  data-cursor="hover"
                >
                  VIEW PROFILE <span>↗</span>
                </a>
              </div>
            </motion.div>

            {/* What I Do — plain-language role grid */}
            <div className="mt-10">
              <div className="label-mono mb-4">WHAT I DO</div>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r, i) => (
                  <motion.div
                    key={r.k}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                    className="border border-white/10 p-3 hover:border-accent/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full accent-dot group-hover:scale-150 transition-transform" />
                      <span className="label-mono text-white">{r.k}</span>
                    </div>
                    <div className="mt-1.5 text-sm text-chrome-300 leading-snug">{r.v}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7 relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ delay: i * 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  className="relative pl-12"
                >
                  <span className="absolute left-0 top-2 w-9 h-9 rounded-full chrome-border flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                  <div className="flex items-center gap-4 label-mono">
                    <span>{t.year}</span>
                    <span className="h-px w-8 bg-white/30" />
                    <span>STAGE {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-3 font-display font-black text-3xl text-chrome">{t.title}</h3>
                  <p className="mt-3 text-chrome-300 max-w-lg">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-white/10 p-4">
      <div className="label-mono">{k}</div>
      <div className="mt-2 font-display text-2xl text-chrome">{v}</div>
    </div>
  );
}
