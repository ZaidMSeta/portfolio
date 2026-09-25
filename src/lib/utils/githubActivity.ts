const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "ZaidMSeta";

const MAX_PER_REPO = 2;

// Merge commits, dependency bumps and rebuilds say nothing about the work itself
function isNoise(message: string) {
  return /^(Merge (pull request|branch)|Bump |build: rebuild)/i.test(message);
}

export type GitHubActivityCommit = {
  id: string;
  message: string;
  url: string;
  repoName: string;
  date: string;
  additions: number;
  deletions: number;
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
  stats?: {
    additions?: number;
    deletions?: number;
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
    message: data.commit.message.split("\n")[0],
    url: data.html_url,
    repoName,
    date: data.commit.author?.date || "",
    additions: data.stats?.additions ?? 0,
    deletions: data.stats?.deletions ?? 0,
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

  // Look past the latest few pushes so there's room to drop noise below
  const pushEvents = events
    .filter(
      (event) =>
        event.type === "PushEvent" &&
        typeof event.repo?.name === "string" &&
        typeof event.payload?.head === "string"
    )
    .slice(0, 10);

  const commits = await Promise.all(
    pushEvents.map((event) =>
      fetchCommitDetails(event.repo!.name!, event.payload!.head!)
    )
  );

  const perRepo = new Map<string, number>();

  return commits
    .filter((commit): commit is GitHubActivityCommit => commit !== null)
    .filter((commit) => !isNoise(commit.message))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((commit) => {
      const count = perRepo.get(commit.repoName) ?? 0;
      perRepo.set(commit.repoName, count + 1);
      return count < MAX_PER_REPO;
    })
    .slice(0, 4);
}
