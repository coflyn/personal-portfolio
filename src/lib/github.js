const GITHUB_USERNAME = "coflyn";

export async function getProjects() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];

    const repos = await res.json();
    const validRepos = repos.filter(
      (repo) => repo.name !== GITHUB_USERNAME && !repo.fork,
    );
    const featuredTitles = ["scribdl-py", "slidesharedl-py", "academiadl-py", "dplayerdl-py"];
    
    const projects = validRepos.map((repo) => ({
      id: repo.id.toString(),
      title: repo.name,
      description: repo.description,
      language: repo.language || "Unknown",
      tags: [repo.language, ...(repo.topics || [])]
        .filter(Boolean)
        .slice(0, 4),
      github: repo.html_url,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      featured: featuredTitles.includes(repo.name),
      topics: repo.topics || []
    }));

    return projects.map((repo) => {
      let fallbackDesc = "CLI Tool / Automation script";
      const topics = (repo.topics || []).map(t => t.toLowerCase());
      const name = repo.title.toLowerCase();

      if (topics.includes("bot") || topics.includes("discord-bot") || name.includes("bot") || name.includes("discord")) {
        fallbackDesc = "Discord Bot / Bot Application";
      } else if (repo.language === "JavaScript" || repo.language === "TypeScript" || topics.includes("nextjs") || topics.includes("react")) {
        fallbackDesc = "Web Application / Automation tool";
      }

      return {
        ...repo,
        description: repo.description || fallbackDesc
      };
    }).sort((a, b) => b.stars - a.stars);
  } catch (err) {
    console.error("Github projects fetch error:", err);
    return [];
  }
}
