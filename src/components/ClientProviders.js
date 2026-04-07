"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";

export default function ClientProviders({ children }) {
  const pathname = usePathname();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <div key={pathname}>{children}</div>
      </AnimatePresence>
      <Footer />
    </SmoothScroll>
  );
}
