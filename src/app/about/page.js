"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import GithubActivity from "@/components/GithubActivity";
import "react-github-calendar/tooltips.css";
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
  { label: "Location", value: "Makassar, Indonesia" },
  { label: "Focus", value: "Software Engineering" },
  { label: "Interests", value: "Automation, Bots, Web" },
];

const timeline = [
  {
    year: "Present",
    title: "Bachelor of Computer Science",
    company: "University Dipa Makassar",
    description:
      "Currently pursuing a degree in Computer Science with focus on Software Engineering and Web Development. Learning modern programming paradigms and methodologies.",
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
            <ScrollReveal>
              <div className={styles.bio}>
                <p>
                  Hi! I&apos;m <span className={styles.highlight}>coflyn</span>,
                  an IT student and software developer who loves building
                  digital tools to make daily life easier. I&apos;m a tech
                  enthusiast who enjoys creating automated systems—like smart
                  bots—that can handle repetitive tasks, saving people time and
                  effort.
                </p>
                <p>
                  My main focus is on building{" "}
                  <span className={styles.highlight}>Automation Systems</span>{" "}
                  and{" "}
                  <span className={styles.highlight}>
                    Modern Web Applications
                  </span>{" "}
                  that are advanced yet simple to use. I prioritize writing
                  clean code and designing minimal, user-friendly interfaces so
                  that technology remains accessible to everyone, regardless of
                  their background.
                </p>
                <p>
                  Most of my work is open-source, as I value sharing my research
                  and code with the world. I believe sharing is the best way to
                  grow together with the global developer community through
                  platforms like GitHub.
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
