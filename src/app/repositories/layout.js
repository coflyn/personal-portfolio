import SectionHeader from "@/components/SectionHeader";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./page.module.css";

export default function ProjectsLayout({ children }) {
  return (
    <main className={styles.page}>
      <div className="container">
        <ScrollReveal
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <SectionHeader
            label="Projects"
            title="Things I've built."
            description="A collection of tools, scripts, bots, and websites. Fetched directly from my GitHub."
            className={styles.header}
          />
        </ScrollReveal>
        <ScrollReveal
          delay={0.15}
          variants={{
            hidden: { opacity: 0, y: 60, skewY: 3, scale: 0.95 },
            visible: {
              opacity: 1,
              y: 0,
              skewY: 0,
              scale: 1,
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {children}
        </ScrollReveal>
      </div>
    </main>
  );
}
