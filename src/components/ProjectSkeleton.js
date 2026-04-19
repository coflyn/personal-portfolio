import styles from "./ProjectSkeleton.module.css";

export default function ProjectSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.topBar}>
        <div className={styles.number} />
        <div className={styles.languageBox} />
      </div>
      <div className={styles.header}>
        <div className={styles.title} />
      </div>
      <div className={styles.description}>
        <div className={styles.line} />
        <div className={styles.line} style={{ width: "80%" }} />
      </div>
      <div className={styles.footer}>
        <div className={styles.tags}>
          <div className={styles.tag} />
          <div className={styles.tag} />
        </div>
        <div className={styles.stats} />
      </div>
    </div>
  );
}
