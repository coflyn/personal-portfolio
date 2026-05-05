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
  { label: "Focus", value: "Web & App Development" },
  { label: "Interests", value: "Automation, Bots, & AI" },
];

const timeline = [
  {
    year: "2024 — Present",
    title: "University Student",
    company: "University Dipa Makassar",
    description:
      "Currently diving deep into the world of software engineering and web development. I'm focusing on learning how to build high-quality applications that solve real-world needs while making sure the technology is easy and helpful for everyone to use.",
  },
  {
    year: "2020 — 2023",
    title: "Vocational High School",
    company: "SMK Darussalam Makassar",
    description:
      "This is where my real journey with code began. I started learning the foundations of programming and spent countless hours figuring out how to think logically to solve complex puzzles through lines of code.",
  },
  {
    year: "2017 — 2020",
    title: "Junior High School",
    company: "SMP IT Darussalam Makassar",
    description:
      "My first steps into the digital world. This is where I learned the basics of how computers work and started understanding how important digital tools are in our modern lives.",
  },
  {
    year: "2012 — 2017",
    title: "Elementary School",
    company: "SD MI Al-Hijrah",
    description:
      "The beginning of my learning journey. I focused on building strong academic foundations and developing the character traits-like discipline and curiosity-that still drive me today.",
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
                Hi! I&apos;m <span className={styles.highlight}>Dika</span>,
                also known as <span className={styles.highlight}>Coflyn</span>.
                I love building things that make life easier using technology
                and automation. Since I was young, I&apos;ve always been
                fascinated by how things work behind the scenes, and that
                curiosity eventually led me into the world of software
                development.
              </p>
              <p>
                I am currently a student at{" "}
                <span className={styles.highlight}>
                  University Dipa Makassar
                </span>
                . I spend my days learning how to create web applications that
                are not only powerful and reliable but also feel very smooth and
                easy for anyone to use.
              </p>
              <p>
                When I&apos;m not studying for my university courses,
                you&apos;ll usually find me experimenting with new automation
                tools or building helpful bots. I really enjoy sharing my ideas
                and working together with others to make the digital space a bit
                more efficient and fun for everyone.
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
                  <span className={styles.availabilityStatus}>
                    Available for Projects
                  </span>
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
  );
}
