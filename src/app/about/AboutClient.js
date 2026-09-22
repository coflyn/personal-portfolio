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
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
  "Python",
  "Node.js",
  "PHP",
  "Laravel",
  "Java",
  "Kotlin",
  "Flutter",
  "Dart",
  "Swift",
  "MySQL",
  "Git",
];

const info = [
  { label: "Work Status", value: "Available for Projects", isStatus: true },
  { label: "Status", value: "Undergraduate Student" },
  { label: "Major", value: "Informatics Engineering" },
  { label: "Location", value: "Makassar, Indonesia" },
  { label: "Focus", value: "Web & App Development" },
  { label: "Interests", value: "Automation, Bots, & AI" },
];

const timeline = [
  {
    year: "2024–Present",
    title: "University Student",
    company: "Universitas Dipa Makassar",
    description:
      "Informatics Engineering. Most of what I actually learn happens outside the classroom: building projects, reading docs, and shipping things that work. Focused on web development and automation.",
  },
  {
    year: "2020–2023",
    title: "Vocational High School",
    company: "SMK Darussalam Makassar",
    description:
      "Software Engineering major. Where I wrote my first real lines of code and started thinking in terms of logic and systems. Spent a lot of time figuring out what breaks and why.",
  },
  {
    year: "2017–2020",
    title: "Junior High School",
    company: "SMP IT Darussalam Makassar",
    description:
      "First real contact with computers and how they work. Started realizing that understanding the machine was more interesting than just using it.",
  },
  {
    year: "2012–2017",
    title: "Elementary School",
    company: "SD MI Al-Hijrah",
    description:
      "Built the habits that still run in the background: showing up, staying curious, and finishing what I start.",
  },
];

export default function About() {
  return (
    <main className={styles.page}>
      <div className="container">
        <ScrollReveal delay={0.1}>
          <SectionHeader
            label="About"
            title="A bit about me and what I do."
            className={styles.header}
          />
        </ScrollReveal>

        <div className={styles.content}>
          <ScrollReveal
            className={styles.bioSection}
            delay={0.2}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <div className={styles.bio}>
              <p>
                I&apos;m <span className={styles.highlight}>Dika</span>, also
                known as <span className={styles.highlight}>Coflyn</span>. I
                build tools, bots, and web apps. Tech has always been something
                I wanted to get into, not just use but actually understand and
                shape.
              </p>
              <p>
                Currently studying Informatics Engineering at{" "}
                <span className={styles.highlight}>
                  Universitas Dipa Makassar
                </span>
                . Most of what I learn happens outside the classroom: building
                projects, reading docs, and figuring out why something broke at
                2am.
              </p>
              <p>
                I spend a lot of time on automation and Discord bots. There is
                something satisfying about writing a script that just runs and
                handles something you would otherwise do manually a hundred
                times. I also play games, which is where half my project ideas
                come from.
              </p>
              <p>
                The name &quot;coflyn&quot; comes from &quot;coffin&quot;. It
                is a reminder to take the work seriously but not myself. Build
                things that matter while there is still time to build them.
              </p>

              <div className={styles.statusWrapper}>
                <LiveStatusCard />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className={styles.details}
            delay={0.4}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
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
                    {item.isStatus ? (
                      <span className={styles.statusBadge}>
                        <span className={styles.statusDot} />
                        {item.value}
                      </span>
                    ) : (
                      <span className={styles.infoValue}>{item.value}</span>
                    )}
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
              <h2 className="section-title">Education</h2>
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
  );
}
