import ProjectList from "@/components/ProjectList";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import fallbackProjects from "@/lib/data";
import styles from "./page.module.css";
import SectionHeader from "@/components/SectionHeader";
import { getProjects } from "@/lib/github";

export const revalidate = 3600;

export default async function Projects() {
  const githubProjects = await getProjects();
  const projects = githubProjects.length > 0 ? githubProjects : fallbackProjects;

  return (
    <PageTransition>
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

          <ProjectList projects={projects} />
        </div>
      </main>
    </PageTransition>
  );
}
