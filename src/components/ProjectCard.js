import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index = 0 }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.topBar}>
        <span className={styles.number}>{num}</span>
        {project.language !== "Unknown" && (
          <span className={styles.languageBox}>{project.language}</span>
        )}
      </div>
      <div className={styles.header}>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.arrow}>↗</span>
      </div>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.footer}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        
        {(project.stars > 0 || project.forks > 0) && (
          <div className={styles.stats}>
            {project.stars > 0 && (
              <span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                </svg>
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                </svg>
                {project.forks}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.a>
  );
}
