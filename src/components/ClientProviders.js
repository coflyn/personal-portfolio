"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";

import AIAssistant from "./AIAssistant";

export default function ClientProviders({ children }) {
  const pathname = usePathname();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <div key={pathname}>{children}</div>
      <AIAssistant />
      <Footer />
    </SmoothScroll>
  );
}
