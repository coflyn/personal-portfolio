"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import dynamic from "next/dynamic";

const GithubActivity = dynamic(() => import("@/components/GithubActivity"), {
  ssr: false,
  loading: () => <div className="loading-placeholder">Loading Activity...</div>,
});

import styles from "./page.module.css";
import SectionHeader from "@/components/SectionHeader";
import TechIcon from "@/components/TechIcons";
import LiveStatusCard from "@/components/LiveStatusCard";

const techStack = [
  "Python",
  "JavaScript",
  "PHP",
  "Java",
  "Next.js",
  "React",
  "Node.js",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "MySQL",
  "Git",
  "Laravel",
  "HTML",
  "VS Code",
];

const info = [
  { label: "Status", value: "Undergraduate Student" },
  { label: "Major", value: "Informatics Engineering" },
  { label: "Location", value: "Makassar, Indonesia" },
  { label: "Focus", value: "Software Engineering" },
  { label: "Interests", value: "Automation, Bots, Web" },
];

const timeline = [
  {
    year: "2024 — Present",
    title: "Bachelor of Informatics Engineering",
    company: "University Dipa Makassar",
    description:
      "Currently pursuing a degree in Informatics Engineering with focus on Software Engineering and Web Development. Learning modern programming paradigms and methodologies.",
  },
  {
    year: "2020 — 2023",
    title: "High School (Vocational)",
    company: "SMK Darussalam Makassar",
    description:
      "Graduated with focus on Science and Mathematics. Started learning programming during this period, building a strong foundation in logical thinking and problem-solving.",
  },
  {
    year: "2017 — 2020",
    title: "Junior High School",
    company: "SMP IT Darussalam Makassar",
    description:
      "Completed junior high school education with focus on Islamic values and general academics. First exposure to basic computer skills and digital literacy.",
  },
  {
    year: "2012 — 2017",
    title: "Elementary School",
    company: "SD MI Al-Hijrah",
    description:
      "Foundational education with strong emphasis on character building and basic academic skills. First introduction to structured learning environment.",
  },
];

export default function About() {
  return (
    <PageTransition>
      <main className={styles.page}>
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              label="About"
              title="A bit about me and what I do."
              className={styles.header}
            />
          </ScrollReveal>

          <div className={styles.content}>
            <ScrollReveal className={styles.bioSection}>
              <div className={styles.bio}>
                <p>
                  Hi! My name is <span className={styles.highlight}>Raffi Andhika</span>, also known as <span className={styles.highlight}>Coflyn</span>. My journey into software development was driven by a deep curiosity about how automation systems and digital products are created to solve real-world problems.
                </p>
                <p>
                  As an Informatics Engineering student at <span className={styles.highlight}>Universitas Dipa Makassar</span>, I&apos;ve had the opportunity to deepen my understanding of software development—from core algorithms and data structures to building robust back-end systems and user-centered web applications.
                </p>
                <p>
                  When I&apos;m not busy with my studies, I&apos;m usually deep-diving into the world of open-source or tinkering with my latest automation tools. I&apos;m all about sharing ideas, collaborating on neat projects, and just trying to make the digital space a bit more efficient, one bot at a time.
                </p>

                <div className={styles.statusWrapper}>
                  <LiveStatusCard />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className={styles.details}>
              <div
                className={styles.techSide}
                style={{ transitionDelay: "0.1s" }}
              >
                <h3 className={styles.sectionTitle}>Tech Stack</h3>
                <div className={styles.techGrid}>
                  {techStack.map((tech) => (
                    <div key={tech} className={styles.techItem}>
                      <TechIcon name={tech} className={styles.techIcon} />
                      <span className={styles.techName}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={styles.detailBlock}
                style={{ transitionDelay: "0.2s" }}
              >
                <h3>Details</h3>
                <div className={styles.infoList}>
                  {info.map((item) => (
                    <div key={item.label} className={styles.infoItem}>
                      <span className={styles.infoLabel}>{item.label}</span>
                      <span className={styles.infoValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className={styles.availabilityBlock}
                style={{ transitionDelay: "0.3s" }}
              >
                <div className={styles.availabilityCard}>
                  <div className={styles.pulseContainer}>
                    <div className={styles.pulseDot} />
                    <div className={styles.pulseRing} />
                  </div>
                  <div className={styles.availabilityInfo}>
                    <span className={styles.availabilityLabel}>Work Status</span>
                    <span className={styles.availabilityStatus}>Available for Projects</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className={styles.githubSection}>
            <ScrollReveal>
              <h2 className="section-title">GitHub Contributions</h2>
              <GithubActivity username="coflyn" />
            </ScrollReveal>
          </div>

          <div className={styles.timelineSection}>
            <ScrollReveal>
              <div className={styles.timelineHeader}>
                <h2 className="section-title">Experience & Education</h2>
              </div>
            </ScrollReveal>

            <div className={styles.timelineContainer}>
              {timeline.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineYear}>{item.year}</div>
                    <div className={styles.timelineContent}>
                      <h4 className={styles.timelineTitle}>{item.title}</h4>
                      <span className={styles.timelineCompany}>
                        {item.company}
                      </span>
                      <p className={styles.timelineDesc}>{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className={styles.resumeSection}>
            <ScrollReveal>
              <div className={styles.resumeWrapper}>
                <MagneticButton>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resumeBtn}
                  >
                    Download Resume <span>↓</span>
                  </a>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
