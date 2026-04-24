"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectList.module.css";

export default function ProjectList({ projects }) {
  const [filter, setFilter] = useState("All");

  const languages = [
    "All",
    ...new Set(
      projects.map((p) => p.language).filter((l) => l && l !== "Unknown"),
    ),
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.language === filter);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {languages.map((lang) => (
          <button
            key={lang}
            className={`${styles.pill} ${filter === lang ? styles.active : ""}`}
            onClick={() => setFilter(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      <motion.div layout className={styles.grid}>
        <AnimatePresence>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id || project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              layoutId={project.id || project.title}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
