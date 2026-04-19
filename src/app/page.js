"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import TextReveal from "@/components/TextReveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectSkeleton from "@/components/ProjectSkeleton";

import MagneticButton from "@/components/MagneticButton";
import projects from "@/lib/data";
import styles from "./page.module.css";
import { getProjects } from "@/lib/github";

const HeartSVG = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Home() {
  const [featured, setFeatured] = useState(
    projects.filter((p) => p.featured).slice(0, 3),
  );
  const [catMsgIndex, setCatMsgIndex] = useState(0);
  const [isHappy, setIsHappy] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const phrases = ["downloaders.", "web apps.", "bot apps.", "automations."];

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = phrases[wordIndex];

      if (isSelecting) {
        setTimeout(() => {
          setIsSelecting(false);
          setTypewriterText("");
          setWordIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(150);
        }, 500);
        return;
      }

      if (isDeleting) {
        setTypewriterText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);

        if (typewriterText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(150);
        }
      } else {
        let nextChar = currentWord[typewriterText.length];

        if (
          Math.random() < 0.03 &&
          typewriterText.length > 2 &&
          typewriterText.length < currentWord.length - 1
        ) {
          nextChar = "x";
          setTypewriterText((prev) => prev + nextChar);
          setTypingSpeed(150);
          setTimeout(() => setIsDeleting(true), 200);
          return;
        }

        setTypewriterText((prev) => prev + nextChar);
        setTypingSpeed(150);

        if (typewriterText + nextChar === currentWord) {
          setTypingSpeed(2000);
          if (Math.random() > 0.5) {
            setIsDeleting(true);
          } else {
            setIsSelecting(true);
          }
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, wordIndex, typingSpeed, isSelecting]);

  const catMessages = [
    "Hello!",
    "Hope you're having a great day!",
    "I'm feeling a bit lonely...",
    "Check out my latest work!",
    "Aww! You're so kind!",
  ];

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("has_seen_intro");
    if (hasSeenIntro) {
      setCatMsgIndex(1);
    } else {
      sessionStorage.setItem("has_seen_intro", "true");
    }
  }, []);

  const handleCatClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsHappy(true);
    setShowFeed(false);
    setTimeout(() => setShowFeed(true), 10);
    setCatMsgIndex(4);

    setTimeout(() => {
      setIsHappy(false);
      setShowFeed(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHappy) {
        setCatMsgIndex((prev) => (prev + 1) % (catMessages.length - 1));
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [isHappy]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const cached = sessionStorage.getItem("featured_repos");
        if (cached) {
          setFeatured(JSON.parse(cached).slice(0, 3));
          setIsLoading(false);
          return;
        }

        const mapped = await getProjects();
        if (mapped.length === 0) {
          setIsLoading(false);
          return;
        }

        const top3 = mapped.slice(0, 3);
        setFeatured(top3);
        sessionStorage.setItem("featured_repos", JSON.stringify(top3));
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroLayout}>
              <motion.div
                className={styles.content}
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                <h1 className={styles.title}>
                  Hi, I&apos;m{" "}
                  <span className={styles.titleAccent}>coflyn.</span>
                </h1>
                <h2 className={styles.titleSub}>
                  <span className={isSelecting ? styles.selecting : ""}>
                    {typewriterText}
                  </span>
                  <span className={styles.cursor}>|</span>
                </h2>

                <motion.p
                  className={styles.subtitle}
                  variants={fadeUp}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  An undergraduate student exploring interesting things in
                  tech and automation. Learning every day to build better,
                  more efficient tools.
                </motion.p>
                <motion.div className={styles.ctas} variants={fadeUp}>
                  <MagneticButton>
                    <Link href="/projects" className={styles.ctaPrimary}>
                      View Projects
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href="/contact" className={styles.ctaSecondary}>
                      Get in Touch
                    </Link>
                  </MagneticButton>
                </motion.div>
              </motion.div>

              <motion.div
                className={styles.heroImage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onClick={handleCatClick}
                style={{ cursor: "pointer" }}
              >
                <div key={catMsgIndex} className={styles.catSpeech}>
                  {catMessages[catMsgIndex]}
                </div>

                {showFeed && (
                  <motion.div
                    className={styles.feedAnim}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [1, 2.8],
                      opacity: [0, 1, 0],
                    }}
                    style={{
                      left: clickPos.x,
                      top: clickPos.y,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <HeartSVG />
                  </motion.div>
                )}

                <video
                  src="/icon.mp4"
                  poster="/og-image.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  width="480"
                  height="480"
                  className={`${styles.image} ${isHappy ? styles.happyCat : ""}`}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <span>scroll</span>
            <div className={styles.chevron} />
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className={styles.featured}>
          <div className="container">
            <ScrollReveal>
              <SectionHeader
                label="Selected Work"
                title="Featured Projects"
                className={styles.featuredHeader}
              >
                <Link href="/projects" className={styles.viewAll}>
                  View all →
                </Link>
              </SectionHeader>
            </ScrollReveal>

            <div className={styles.grid}>
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <ProjectSkeleton key={i} />
                  ))
                : featured.map((project, i) => (
                    <ScrollReveal key={project.id} delay={i * 0.1}>
                      <ProjectCard
                        project={{ ...project, tags: project.tags.slice(0, 2) }}
                        index={i}
                      />
                    </ScrollReveal>
                  ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
