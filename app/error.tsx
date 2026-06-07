"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[portfolio] route error:", error);
    }
  }, [error]);

  return (
    <main className="min-h-[100svh] bg-ink-950 text-bone flex items-center justify-center px-6 overflow-hidden relative">
      <div
        aria-hidden
        className="absolute font-display font-black text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: "min(60vw, 800px)", lineHeight: 1 }}
      >
        誤
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
        style={{
          background: "linear-gradient(90deg, transparent, #7df9ff 50%, transparent)",
          transform: "rotate(-12deg)",
          opacity: 0.5,
          boxShadow: "0 0 24px rgba(125,249,255,0.4)",
        }}
      />

      <div className="relative text-center max-w-2xl">
        <div className="label-mono text-white/60">// SYSTEM HICCUP</div>
        <h1 className="mt-6 font-display font-black tracking-tight leading-[0.85] text-[clamp(3rem,12vw,9rem)]">
          <span className="text-chrome">OFFLINE</span>
        </h1>
        <p className="mt-8 text-base md:text-xl text-white/70 max-w-lg mx-auto">
          Something glitched while loading this page. The blade is fine — try reloading.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={() => reset()} className="btn-primary">
            <span>TRY AGAIN</span>
            <span aria-hidden>↻</span>
          </button>
          <a href="/" className="btn-magnet">
            <span>RELOAD HOME</span>
            <span aria-hidden>→</span>
          </a>
        </div>
        {error?.digest && (
          <div className="mt-6 label-mono text-white/30">REF // {error.digest}</div>
        )}
      </div>
    </main>
  );
}
