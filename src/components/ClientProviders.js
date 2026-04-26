"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import PageTransition from "./PageTransition";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const AIAssistant = dynamic(() => import("./AIAssistant"), {
  ssr: false,
});

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasIntroduced = sessionStorage.getItem("assistant_introduced");

    if (hasIntroduced) {
      setIsReady(true);
    } else {
      const timer = setTimeout(() => {
        setIsReady(true);
        sessionStorage.setItem("assistant_introduced", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>{children}</PageTransition>
      </AnimatePresence>

      {/* 
        We use a persistent wrapper outside the PageTransition 
        to ensure the Assistant NEVER unmounts during navigation.
      */}
      <div style={{ position: "relative", zIndex: 9999 }}>
        <AnimatePresence>
          {isReady && (
            <motion.div
              key="ai-assistant-wrapper"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                pointerEvents: "none",
              }}
            >
              <div style={{ pointerEvents: "auto" }}>
                <AIAssistant />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </SmoothScroll>
  );
}
