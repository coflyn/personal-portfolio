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
    const validRepos = repos.filter((repo) => repo.name !== GITHUB_USERNAME);

    const projects = validRepos.map((repo) => {
      let language = repo.language || "Unknown";
      const topics = (repo.topics || []).map((t) => t.toLowerCase());
      const name = repo.name.toLowerCase();

      if (language === "JavaScript" || language === "TypeScript") {
        const desc = (repo.description || "").toLowerCase();
        
        const isNext =
          topics.includes("nextjs") ||
          topics.includes("next") ||
          name.includes("nextjs") ||
          desc.includes("nextjs") ||
          desc.includes("next.js") ||
          desc.includes("next js");

        const isReact =
          topics.includes("react") ||
          name.includes("react") ||
          desc.includes("react");

        const isNode =
          topics.includes("nodejs") ||
          topics.includes("node") ||
          topics.includes("bot") ||
          topics.includes("discord-bot") ||
          topics.includes("scraper") ||
          topics.includes("cli") ||
          topics.includes("downloader") ||
          name.includes("bot") ||
          name.includes("scraper") ||
          name.includes("cli") ||
          name.includes("downloader") ||
          name.includes("server") ||
          name.includes("api") ||
          name.includes("discord") ||
          desc.includes("bot") ||
          desc.includes("discord") ||
          desc.includes("scraper") ||
          desc.includes("cli") ||
          desc.includes("downloader") ||
          desc.includes("api");

        const isFrontend =
          isNext ||
          isReact ||
          topics.includes("vue") ||
          topics.includes("frontend") ||
          name.includes("portfolio") ||
          name.includes("website") ||
          name.includes("ui");

        if (isNext) {
          language = "Next.js";
        } else if (isReact) {
          language = "React";
        } else if (isNode && !isFrontend) {
          language = "Node.js";
        }
      } else if (language === "PHP") {
        const desc = (repo.description || "").toLowerCase();
        const isLaravel =
          topics.includes("laravel") ||
          name.includes("laravel") ||
          desc.includes("laravel");

        if (isLaravel) {
          language = "Laravel";
        }
      }

      return {
        id: repo.id.toString(),
        title: repo.name,
        description: repo.description,
        language,
        tags: [language, ...(repo.topics || [])].filter(Boolean).slice(0, 4),
        github: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        featured: repo.stargazers_count > 0,
        topics: repo.topics || [],
      };
    });

    return projects
      .map((repo) => {
        let fallbackDesc = "CLI Tool / Automation script";
        const topics = (repo.topics || []).map((t) => t.toLowerCase());
        const name = repo.title.toLowerCase();

        if (
          topics.includes("bot") ||
          topics.includes("discord-bot") ||
          name.includes("bot") ||
          name.includes("discord")
        ) {
          fallbackDesc = "Discord Bot / Bot Application";
        } else if (
          repo.language === "JavaScript" ||
          repo.language === "TypeScript" ||
          topics.includes("nextjs") ||
          topics.includes("react")
        ) {
          fallbackDesc = "Web Application / Automation tool";
        }

        return {
          ...repo,
          description: repo.description || fallbackDesc,
        };
      })
      .sort((a, b) => b.stars - a.stars);
  } catch (err) {
    console.error("Github projects fetch error:", err);
    return [];
  }
}

export async function getGithubStats() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
        {
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos = await reposRes.json();

    const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const forks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    return {
      username: user.login,
      public_repos: user.public_repos,
      total_stars: stars,
      total_forks: forks,
      avatar: user.avatar_url,
    };
  } catch (err) {
    console.error("Github stats fetch error:", err);
    return null;
  }
}

export async function getRepoReadme(repoName) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/README.md`,
      { next: { revalidate: 3600 } },
    );

    if (res.ok) return await res.text();

    const masterRes = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/master/README.md`,
      { next: { revalidate: 3600 } },
    );

    if (masterRes.ok) return await masterRes.text();

    return null;
  } catch (err) {
    console.error("README fetch error:", err);
    return null;
  }
}

export async function getRepoFile(repoName, fileName) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/${fileName}`,
      { next: { revalidate: 3600 } },
    );
    if (res.ok) return await res.text();

    const masterRes = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/master/${fileName}`,
      { next: { revalidate: 3600 } },
    );
    if (masterRes.ok) return await masterRes.text();

    return null;
  } catch (err) {
    return null;
  }
}
export async function getLatestCommits(repoName, count = 5) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=${count}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const commits = await res.json();
    return commits.map((c) => ({
      message: c.commit.message,
      date: c.commit.author.date,
    }));
  } catch (err) {
    console.error("Commits fetch error:", err);
    return null;
  }
}
