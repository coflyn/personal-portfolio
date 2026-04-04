"use client";

import { motion } from "framer-motion";

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  as = "div",
  className = "",
}) {
  const Tag = motion[as] || motion.div;

  return (
    <div
      style={{ overflow: "hidden", position: "relative" }}
      className={className}
    >
      <Tag
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
