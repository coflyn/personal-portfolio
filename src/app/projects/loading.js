import SectionHeader from "@/components/SectionHeader";
import ProjectSkeleton from "@/components/ProjectSkeleton";
import styles from "./page.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className="container">
        <SectionHeader
          label="Projects"
          title="Things I've built."
          description="A collection of tools, scripts, and experiments. Fed directly from my GitHub."
          className={styles.header}
        />

        <div className={styles.grid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
