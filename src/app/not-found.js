"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticButton from "@/components/MagneticButton";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.title}>Lost in space.</h2>
            <p className={styles.subtitle}>
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <div className={styles.actions}>
              <MagneticButton>
                <Link href="/" className={styles.goHome}>
                  Back to Home
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
