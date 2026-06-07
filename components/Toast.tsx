"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useState } from "react";

type Toast = { id: number; text: string };
type Ctx = { push: (text: string) => void };

const ToastCtx = createContext<Ctx>({ push: () => {} });
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, text }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="fixed left-1/2 -translate-x-1/2 z-[9998] flex flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-md bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass-strong chrome-border px-5 py-3 label-mono text-white"
            >
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
