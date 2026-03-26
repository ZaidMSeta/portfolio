const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "ZaidMSeta";

export type GitHubActivityCommit = {
  id: string;
  message: string;
  url: string;
  repoName: string;
  date: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo?: {
    name?: string;
  };
  payload?: {
    head?: string;
  };
};

type GitHubCommitResponse = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author?: {
      date?: string;
    };
  };
};

async function fetchCommitDetails(
  repoName: string,
  sha: string
): Promise<GitHubActivityCommit | null> {
  const [owner, repo] = repoName.split("/");

  if (!owner || !repo) return null;

  const res = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits/${encodeURIComponent(sha)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch commit ${repoName}@${sha}: ${res.status}`);
    return null;
  }

  const data: GitHubCommitResponse = await res.json();

  return {
    id: `${repoName}-${data.sha}`,
    message: data.commit.message,
    url: data.html_url,
    repoName,
    date: data.commit.author?.date || "",
  };
}

export async function fetchLatestCommits(): Promise<GitHubActivityCommit[]> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/events/public`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub activity: ${res.status}`);
  }

  const events: GitHubEvent[] = await res.json();

  const pushEvents = events
    .filter(
      (event) =>
        event.type === "PushEvent" &&
        typeof event.repo?.name === "string" &&
        typeof event.payload?.head === "string"
    )
    .slice(0, 4);

  const commits = await Promise.all(
    pushEvents.map((event) =>
      fetchCommitDetails(event.repo!.name!, event.payload!.head!)
    )
  );

  return commits
    .filter((commit): commit is GitHubActivityCommit => commit !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
}