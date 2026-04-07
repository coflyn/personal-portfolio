import ProjectList from "@/components/ProjectList";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import fallbackProjects from "@/lib/data";
import styles from "./page.module.css";

export const revalidate = 3600;

export default async function Projects() {
  let projects = fallbackProjects;

  try {
    const res = await fetch(
      "https://api.github.com/users/coflyn/repos?sort=updated&per_page=100",
      {
        next: { revalidate: 3600 },
      },
    );

    if (res.ok) {
      const repos = await res.json();
      const validRepos = repos.filter(
        (repo) => repo.name !== "coflyn" && !repo.fork,
      );
      const mappedProjects = validRepos.map((repo) => ({
        id: repo.id.toString(),
        title: repo.name,
        description: repo.description || "CLI Tool / Automation script",
        language: repo.language || "Unknown",
        tags: [repo.language, ...(repo.topics || [])]
          .filter(Boolean)
          .slice(0, 4),
        github: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        featured: false,
      }));

      mappedProjects.sort((a, b) => b.stars - a.stars);

      if (mappedProjects.length > 0) {
        projects = mappedProjects;
      }
    }
  } catch (err) {
    console.error("Failed to fetch Github repos", err);
  }

  return (
    <PageTransition>
      <main className={styles.page}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.header}>
              <p className="section-label">Projects</p>
              <h1 className="section-title">Things I&apos;ve built.</h1>
              <p className="section-description">
                A collection of tools, scripts, and experiments. Fed directly
                from my GitHub.
              </p>
            </div>
          </ScrollReveal>

          <ProjectList projects={projects} />
        </div>
      </main>
    </PageTransition>
  );
}
