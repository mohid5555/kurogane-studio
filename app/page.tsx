"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import EntryScene from "@/components/EntryScene";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Games from "@/components/Games";
import ByTheNumbers from "@/components/ByTheNumbers";
import Process from "@/components/Process";
import InForge from "@/components/InForge";
import Pricing from "@/components/Pricing";
import Skills from "@/components/Skills";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SakuraAmbient from "@/components/SakuraAmbient";
import ScrollToTop from "@/components/ScrollToTop";
import { ToastProvider } from "@/components/Toast";

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (entered) document.body.style.overflow = "";
  }, [entered]);

  return (
    <ToastProvider>
      {mounted && <Cursor />}
      <AnimatePresence>
        {!entered && <EntryScene key="entry" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && <SmoothScroll />}
      {entered && <SakuraAmbient />}

      <motion.main
        initial={{ opacity: 0, scale: 1.04 }}
        animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10"
      >
        <Nav />
        <Hero />
        <Games />
        <ByTheNumbers />
        <Process />
        <InForge />
        <Skills />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
        <Footer />
        {entered && <ScrollToTop />}

        <div className="pointer-events-none fixed inset-0 z-0 noise" />
      </motion.main>
    </ToastProvider>
  );
}
