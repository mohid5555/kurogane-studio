"use client";

import { motion } from "framer-motion";
import { studio } from "@/lib/data";
import { useToast } from "./Toast";
import { useProfile } from "@/lib/useLiveData";

export default function Contact() {
  const { push } = useToast();
  const profile = useProfile(studio.roblox.userId);

  const handleDiscord = async () => {
    try {
      await navigator.clipboard.writeText(studio.discord.username);
      push(`COPIED @${studio.discord.username} — OPENING DISCORD`);
    } catch {
      push(`USERNAME: @${studio.discord.username}`);
    }
    // Try app first, fall back to web. Open in new tab so they keep the site.
    window.open("discord://discordapp.com/", "_blank");
    setTimeout(() => window.open(studio.discord.openUrl, "_blank"), 200);
  };

  const handleCopyRoblox = async () => {
    try {
      await navigator.clipboard.writeText(studio.roblox.username);
      push(`COPIED @${studio.roblox.username}`);
    } catch {
      push(`USERNAME: @${studio.roblox.username}`);
    }
  };

  return (
    <section id="contact" className="relative py-32 noise overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="chrome-border glass-strong p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 scanlines pointer-events-none" />
          <motion.div
            className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.14), transparent 60%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="label-mono">// CONTACT</div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-4 font-display font-black text-5xl md:text-7xl text-chrome tracking-tight leading-[0.9]"
              >
                LET'S BUILD
                <br />
                <span className="text-stroke">SOMETHING LOUD.</span>
              </motion.h2>
              <p className="mt-6 text-chrome-200 max-w-xl">
                Open for commissions, collabs, publishing talks, and serious partnership offers.
                Fastest reply via Discord.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3 w-full">
              {/* Discord */}
              <button
                onClick={handleDiscord}
                className="btn-primary justify-between w-full"
                data-cursor="hover"
              >
                <span className="flex items-center gap-3">
                  <DiscordIcon />
                  <span className="text-left leading-tight">
                    <span className="block">@{studio.discord.username}</span>
                    <span className="block text-[0.6rem] tracking-[0.28em] opacity-60 mt-0.5">
                      COPY & OPEN DISCORD
                    </span>
                  </span>
                </span>
                <span aria-hidden>↗</span>
              </button>

              {/* Roblox profile */}
              <a
                href={studio.roblox.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnet justify-between w-full"
                data-cursor="hover"
              >
                <span className="flex items-center gap-3">
                  <span className="relative w-7 h-7 chrome-border overflow-hidden bg-ink-800">
                    {profile?.headshot ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profile.headshot}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : null}
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block">@{studio.roblox.username}</span>
                    <span className="block text-[0.6rem] tracking-[0.28em] opacity-60 mt-0.5">
                      ROBLOX PROFILE
                    </span>
                  </span>
                </span>
                <span aria-hidden>↗</span>
              </a>

              {/* Copy Roblox name */}
              <button
                onClick={handleCopyRoblox}
                className="btn-magnet justify-between w-full"
                data-cursor="hover"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-base">⌘</span>
                  <span className="text-left leading-tight">
                    <span className="block">COPY USERNAME</span>
                    <span className="block text-[0.6rem] tracking-[0.28em] opacity-60 mt-0.5">
                      ADD ON ROBLOX
                    </span>
                  </span>
                </span>
                <span aria-hidden>⎘</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.075.075 0 0 0-.079.037c-.34.607-.717 1.397-.98 2.02a18.27 18.27 0 0 0-5.487 0c-.265-.633-.652-1.413-.995-2.02a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 5.18 4.369a.07.07 0 0 0-.032.027C2.36 8.69 1.61 12.882 1.973 17.024a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.030.078.078 0 0 0 .084-.027 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.030.077.077 0 0 0 .032-.054c.5-5.177-.838-9.328-3.549-13.661a.061.061 0 0 0-.031-.029ZM8.02 14.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}
