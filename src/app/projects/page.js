import ProjectList from "@/components/ProjectList";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import fallbackProjects from "@/lib/data";
import styles from "./page.module.css";
import SectionHeader from "@/components/SectionHeader";
import { getProjects } from "@/lib/github";

export const metadata = {
  title: "Projects — Things I've built",
  description: "A showcase of automation tools, scripts, and web projects fetched directly from GitHub.",
};

export const revalidate = 3600;

export default async function Projects() {
  const githubProjects = await getProjects();
  const projects = githubProjects.length > 0 ? githubProjects : fallbackProjects;

  return <ProjectList projects={projects} />;
}
