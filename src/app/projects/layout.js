import SectionHeader from "@/components/SectionHeader";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./page.module.css";

export default function ProjectsLayout({ children }) {
  return (
    
      <main className={styles.page}>
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              label="Projects"
              title="Things I've built."
              description="A collection of tools, scripts, and experiments. Fed directly from my GitHub."
              className={styles.header}
            />
          </ScrollReveal>
          {children}
        </div>
      </main>
    
  );
}
