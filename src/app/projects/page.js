import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";
import fallbackProjects from "@/lib/data";
import { getProjects } from "@/lib/github";
import Loading from "./loading";

export const metadata = {
  title: "Projects — Things I've built",
  description: "A showcase of automation tools, scripts, and web projects fetched directly from GitHub.",
};

export const revalidate = 3600;

async function ProjectData() {
  const githubProjects = await getProjects();
  const projects = githubProjects.length > 0 ? githubProjects : fallbackProjects;
  return <ProjectList projects={projects} />;
}

export default function Projects() {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectData />
    </Suspense>
  );
}
