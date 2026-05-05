"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/icon.svg"
              alt="coflyn"
              className={styles.logoIcon}
              width={24}
              height={24}
              priority
            />
            <span>coflyn</span>
          </Link>
          <nav className={styles.nav}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    className={styles.activeBar}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ""}`}
                >
                  <div style={{ position: "relative", display: "inline-block" }}>
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        className={styles.activeBar}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
