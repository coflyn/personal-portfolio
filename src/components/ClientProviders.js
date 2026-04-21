"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import PageTransition from "./PageTransition";
import dynamic from "next/dynamic";

const AIAssistant = dynamic(() => import("./AIAssistant"), {
  ssr: false,
});

export default function ClientProviders({ children }) {
  const pathname = usePathname();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          {children}
        </PageTransition>
      </AnimatePresence>
      <AIAssistant />
      <Footer />
    </SmoothScroll>
  );
}
