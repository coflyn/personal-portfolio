import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";
import fallbackProjects from "@/lib/data";
import { getProjects } from "@/lib/github";
import Loading from "./loading";

export const metadata = {
  title: "Repositories | Things I've built",
  description:
    "A showcase of automation tools, scripts, and web repositories fetched directly from GitHub.",
};

export const revalidate = 3600;

async function RepositoryData() {
  const githubProjects = await getProjects();
  const projects =
    githubProjects.length > 0 ? githubProjects : fallbackProjects;
  return <ProjectList projects={projects} />;
}

export default function Repositories() {
  return (
    <Suspense fallback={<Loading />}>
      <RepositoryData />
    </Suspense>
  );
}
