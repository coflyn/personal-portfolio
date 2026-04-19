"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
        return;
      }

      if (!lenisRef.current) {
        initLenis();
      }
    };

    const initLenis = () => {
      if (window.innerWidth < 1024) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        infinite: false,
      });

      lenisRef.current = lenis;
      window.lenis = lenis;

      let rafId;
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      return rafId;
    };

    let rafId = initLenis();
    window.addEventListener("resize", handleResize);

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
          lenisRef.current.start();
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return children;
}
