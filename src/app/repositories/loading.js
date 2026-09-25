import SectionHeader from "@/components/SectionHeader";
import ProjectSkeleton from "@/components/ProjectSkeleton";
import styles from "@/components/ProjectList.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <div
          className={`${styles.pill} ${styles.active}`}
          style={{ width: "64px", height: "38px", opacity: 0.8 }}
        />
        <div
          className={styles.pill}
          style={{ width: "84px", height: "38px", opacity: 0.1 }}
        />
        <div
          className={styles.pill}
          style={{ width: "104px", height: "38px", opacity: 0.1 }}
        />
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
