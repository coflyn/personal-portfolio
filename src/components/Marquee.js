"use client";

import styles from "./Marquee.module.css";

export default function Marquee({
  items = [],
  separator = "·",
  speed = 30,
  className = "",
}) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={`${styles.marquee} ${className}`}>
      <div
        className={styles.track}
        style={{ animationDuration: `${speed}s` }}
      >
        <span className={styles.text}>{content}</span>
        <span className={styles.text}>{content}</span>
      </div>
    </div>
  );
}
