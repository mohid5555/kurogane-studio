"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const KatanaCanvas = dynamic(() => import("./KatanaCanvas"), { ssr: false });

type Phase = "idle" | "charging" | "slashing" | "done";

export default function EntryScene({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [charge, setCharge] = useState(0);
  const chargeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const holding = useRef(false);

  // Smooth charge while holding
  useEffect(() => {
    const tick = () => {
      if (holding.current && phase === "charging") {
        chargeRef.current = Math.min(1, chargeRef.current + 0.018);
      } else if (phase === "idle") {
        chargeRef.current = Math.max(0, chargeRef.current - 0.04);
      }
      setCharge(chargeRef.current);
      if (phase === "charging" && chargeRef.current >= 1) {
        triggerSlash();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  const triggerSlash = () => {
    setPhase("slashing");
    holding.current = false;
    // Total cinematic duration ~ 1750ms, then reveal main site
    setTimeout(() => {
      setPhase("done");
      onEnter();
    }, 1750);
  };

  const onPointerDown = () => {
    if (phase !== "idle") return;
    holding.current = true;
    setPhase("charging");
  };
  const onPointerUp = () => {
    if (phase !== "charging") return;
    holding.current = false;
    if (chargeRef.current > 0.6) {
      triggerSlash();
    } else {
      setPhase("idle");
    }
  };

  // Keyboard shortcut (Space / Enter)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "Enter") && phase === "idle") {
        e.preventDefault();
        onPointerDown();
      }
    };
    const up = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "Enter") && phase === "charging") {
        onPointerUp();
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [phase]);

  // Mouse parallax for HUD overlay
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });
  const py = useSpring(useTransform(my, [-1, 1], [-6, 6]), { stiffness: 80, damping: 20 });

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-ink-950 noise scanlines select-none"
      onPointerMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width * 2 - 1);
        my.set((e.clientY - r.top) / r.height * 2 - 1);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      initial={{ opacity: 1 }}
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* HUD grid */}
      <motion.div
        className="absolute inset-0 hud-grid mask-fade-y"
        style={{ x: px, y: py }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)" }} />

      {/* Corner brackets */}
      <CornerBrackets />

      {/* Top label */}
      <motion.div
        className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 label-mono whitespace-nowrap text-[10px] sm:text-xs px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: phase === "slashing" ? 0 : 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span className="h-px w-6 sm:w-12 bg-white/30" />
        <span>MOHID_GREAT // SYSTEM ONLINE</span>
        <span className="h-px w-6 sm:w-12 bg-white/30" />
      </motion.div>

      {/* Bottom telemetry */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 label-mono space-y-1 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "slashing" ? 0 : 0.7 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div>BLADE.STATUS &nbsp; <span className="text-white">SHEATHED</span></div>
        <div>SIGNAL &nbsp; ▮▮▮▮▮▮▯▯</div>
        <div>RUNTIME &nbsp; v1.0 / CHROME</div>
      </motion.div>
      <motion.div
        className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 label-mono space-y-1 text-right hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "slashing" ? 0 : 0.7 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div>OPERATOR &nbsp; MOHID_GREAT</div>
        <div>ROLE &nbsp; SOLO // FULL-STACK</div>
        <div>CH &nbsp; 操</div>
      </motion.div>

      {/* The katana stage */}
      <motion.div
        className="absolute inset-0"
        animate={
          phase === "slashing"
            ? { scale: 1.15, filter: "blur(8px)" }
            : { scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
      >
        <KatanaCanvas charge={charge} />
      </motion.div>

      {/* Center prompt */}
      <AnimatePresence>
        {phase !== "slashing" && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-32 px-4 pointer-events-none text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="label-mono mb-3 animate-flicker text-[10px] sm:text-xs">
              HOLD &nbsp;◆&nbsp; DRAG &nbsp;◆&nbsp; RELEASE
            </div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-6xl font-black tracking-wider sm:tracking-hyper text-chrome leading-tight">
              UNSHEATH THE PORTFOLIO
            </h1>
            <div className="mt-6 w-44 sm:w-64 h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${charge * 100}%` }}
                transition={{ type: "tween" }}
              />
            </div>
            <div className="label-mono mt-3 text-[10px] sm:text-xs">
              {phase === "charging" ? "FORGING CUT..." : "STANDBY"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slash transition layer */}
      <SlashTransition active={phase === "slashing"} />
    </motion.div>
  );
}

function CornerBrackets() {
  const arm = "h-[1px] bg-white/40";
  const armV = "w-[1px] bg-white/40";
  return (
    <>
      <div className="absolute top-6 left-6 w-10 h-10">
        <div className={`absolute top-0 left-0 w-10 ${arm}`} />
        <div className={`absolute top-0 left-0 h-10 ${armV}`} />
      </div>
      <div className="absolute top-6 right-6 w-10 h-10">
        <div className={`absolute top-0 right-0 w-10 ${arm}`} />
        <div className={`absolute top-0 right-0 h-10 ${armV}`} />
      </div>
      <div className="absolute bottom-6 left-6 w-10 h-10">
        <div className={`absolute bottom-0 left-0 w-10 ${arm}`} />
        <div className={`absolute bottom-0 left-0 h-10 ${armV}`} />
      </div>
      <div className="absolute bottom-6 right-6 w-10 h-10">
        <div className={`absolute bottom-0 right-0 w-10 ${arm}`} />
        <div className={`absolute bottom-0 right-0 h-10 ${armV}`} />
      </div>
    </>
  );
}

/** The slash that opens the site */
function SlashTransition({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Flash */}
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.55, times: [0, 0.35, 1], ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Slash beam */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: "260vmax",
              height: "10px",
              transformOrigin: "center",
              rotate: "-18deg",
              x: "-50%",
              y: "-50%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 15%, rgba(255,255,255,0.9) 45%, #ffffff 50%, rgba(255,255,255,0.9) 55%, rgba(255,255,255,0.0) 85%, transparent 100%)",
              filter: "blur(1px)",
              boxShadow: "0 0 60px rgba(255,255,255,0.85), 0 0 120px rgba(255,255,255,0.55)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.85, times: [0, 0.55, 1], ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Thin afterglow */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: "260vmax",
              height: "1px",
              transformOrigin: "center",
              rotate: "-18deg",
              x: "-50%",
              y: "-50%",
              background: "white",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.3, delay: 0.1, times: [0, 0.4, 1], ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Split halves — top */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 calc(50% + 22vh))",
              background: "linear-gradient(180deg, #050507, #050507)",
              borderBottom: "1px solid rgba(255,255,255,0.4)",
            }}
            initial={{ y: 0, rotate: 0, filter: "blur(0px)" }}
            animate={{ y: "-120%", x: "-6%", rotate: -2.2, filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"] }}
            transition={{ duration: 1.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Split halves — bottom */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "polygon(0 calc(50% + 22vh), 100% 50%, 100% 100%, 0 100%)",
              background: "linear-gradient(180deg, #050507, #050507)",
              borderTop: "1px solid rgba(255,255,255,0.4)",
            }}
            initial={{ y: 0, rotate: 0, filter: "blur(0px)" }}
            animate={{ y: "120%", x: "6%", rotate: -2.2, filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"] }}
            transition={{ duration: 1.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Camera-dive zoom feel: faint scan band */}
          <motion.div
            className="absolute inset-x-0 pointer-events-none h-[40vh] top-1/2 -translate-y-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
            initial={{ opacity: 0, scaleY: 0.4 }}
            animate={{ opacity: [0, 1, 0], scaleY: [0.4, 1.2, 1.6] }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
