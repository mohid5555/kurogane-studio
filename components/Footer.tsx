"use client";

import { studio } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="relative flex items-center justify-center w-9 h-9 chrome-border">
            <span className="text-chrome font-display text-sm font-black">{studio.brandShort}</span>
          </span>
          <div className="leading-none">
            <div className="font-display font-black tracking-hyper text-xs">{studio.brand}</div>
            <div className="label-mono mt-1">
              © {new Date().getFullYear()} / ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
        <div className="label-mono opacity-70">SOLO BUILT / {studio.kanji}</div>
        <div className="label-mono opacity-70">END OF SIGNAL</div>
      </div>
    </footer>
  );
}
