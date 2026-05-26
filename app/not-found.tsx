import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Path not found",
  description: "The page you sliced for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-[100svh] bg-ink-950 text-bone flex items-center justify-center px-6 overflow-hidden relative">
      {/* Ghost kanji */}
      <div
        aria-hidden
        className="absolute font-display font-black text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: "min(60vw, 800px)", lineHeight: 1 }}
      >
        操
      </div>

      {/* Slash */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, #7df9ff 50%, transparent)",
          transform: "rotate(-12deg)",
          opacity: 0.5,
          boxShadow: "0 0 24px rgba(125,249,255,0.4)",
        }}
      />

      <div className="relative text-center max-w-2xl">
        <div className="label-mono text-white/60">// PATH NOT FOUND</div>
        <h1 className="mt-6 font-display font-black tracking-tight leading-[0.85] text-[clamp(4rem,16vw,11rem)]">
          <span className="text-chrome">404</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/70 max-w-lg mx-auto">
          The page you were looking for got cut clean in half. Nothing on this
          path.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <span>RETURN HOME</span>
            <span aria-hidden>↗</span>
          </Link>
          <Link href="/#contact" className="btn-magnet">
            <span>HIRE / COLLAB</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
