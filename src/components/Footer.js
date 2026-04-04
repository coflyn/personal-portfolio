"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} coflyn. All rights reserved.
        </p>

        <div className={styles.links}>
          <a
            href="https://github.com/coflyn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <button onClick={scrollToTop} className={styles.backTop}>
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
