"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 180, damping: 24 });
  const ringY = useSpring(0, { stiffness: 180, damping: 24 });

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const move = (e) => {
      setVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleOver = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovering(true);
      }
    };

    const handleOut = () => {
      setHovering(false);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  ) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className={styles.dot}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: visible ? 1 : 0,
          scale: hovering ? 0 : 1,
        }}
      />
      {/* Ring */}
      <motion.div
        className={styles.ring}
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
          scale: hovering ? 2 : 1,
        }}
      />
    </>
  );
}
