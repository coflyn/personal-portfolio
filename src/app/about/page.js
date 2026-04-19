"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import MagneticButton from "@/components/MagneticButton";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";
import styles from "./page.module.css";
import SectionHeader from "@/components/SectionHeader";

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
                  I&apos;m <span className={styles.highlight}>coflyn</span>,
                  an undergraduate student and developer who enjoys building
                  tools that solve real-world problems. My work mostly
                  revolves around{" "}
                  <span className={styles.highlight}>Python automation</span>,{" "}
                  <span className={styles.highlight}>Bots automation</span>,
                  and{" "}
                  <span className={styles.highlight}>Web development</span>.
                </p>
                <p>
                  I believe in the power of simplicity — clean code, minimal
                  interfaces, and tools that just work without unnecessary
                  complexity. Most of my projects are open source and
                  available on GitHub.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m probably exploring new
                  technologies, diving into interesting open-source projects,
                  or working on the next downloader tool in my suite. I&apos;m
                  a lifelong learner always looking for the next interesting
                  challenge.
                </p>
              </div>
            </ScrollReveal>

            <div className={styles.details}>
              <ScrollReveal delay={0.1}>
                <div className={styles.detailBlock}>
                  <h3>Tech Stack</h3>
                  <div className={styles.techGrid}>
                    {techStack.map((tech) => (
                      <span key={tech} className={styles.techItem}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className={styles.detailBlock}>
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
          </div>

          <div className={styles.githubSection}>
            <ScrollReveal>
              <div className={styles.githubHeader}>
                <h2 className="section-title">GitHub Contributions</h2>
              </div>
              <div className={styles.githubCalendar}>
                <GitHubCalendar
                  username="coflyn"
                  colorScheme="dark"
                  fontSize={15}
                  blockSize={14}
                  blockMargin={4}
                  showWeekdayLabels
                  loading={false}
                  renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                      title: `${activity.count} contributions on ${activity.date}`,
                    })
                  }
                >
                  <div className={styles.calendarSkeleton}>
                    <div className={styles.skeletonGrid}>
                      {Array.from({ length: 7 }).map((_, row) => (
                        <div key={row} className={styles.skeletonRow}>
                          {Array.from({ length: 20 }).map((_, col) => (
                            <div key={col} className={styles.skeletonBlock} />
                          ))}
                        </div>
                      ))}
                    </div>
                    <p className={styles.skeletonText}>
                      Loading contributions...
                    </p>
                  </div>
                </GitHubCalendar>
              </div>
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
                      <p className={styles.timelineDesc}>
                        {item.description}
                      </p>
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
