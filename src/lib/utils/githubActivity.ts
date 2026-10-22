const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "ZaidMSeta";

const MAX_PER_REPO = 3;

// PR merges carry the PR title on the line after "Merge pull request #n from ..."
function readableMessage(message: string) {
  const [first, ...rest] = message.split("\n").map((line) => line.trim());
  if (/^Merge pull request/i.test(first)) {
    return rest.find(Boolean) ?? first;
  }
  return first;
}

// Dependency bumps, branch syncs and rebuilds say nothing about the work itself
function isNoise(message: string) {
  return /^(Merge (branch|remote-tracking)|Bump |build: rebuild)/i.test(message);
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
    message: readableMessage(data.commit.message),
    url: data.html_url,
    repoName,
    date: data.commit.author?.date || "",
    additions: data.stats?.additions ?? 0,
    deletions: data.stats?.deletions ?? 0,
  };
}

// Unauthenticated GitHub allows 60 requests an hour per IP and one load costs up
// to 11, so reuse the last result for a while instead of refetching every visit
const CACHE_KEY = "github-activity";
const CACHE_TTL_MS = 10 * 60 * 1000;

type CachedCommits = { savedAt: number; commits: GitHubActivityCommit[] };

function readCache(): CachedCommits | null {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null");
  } catch {
    // Storage blocked or malformed entry
    return null;
  }
}

function writeCache(commits: GitHubActivityCommit[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), commits }));
  } catch {
    // Caching is best effort
  }
}

export async function fetchLatestCommits(): Promise<GitHubActivityCommit[]> {
  const cached = readCache();
  if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) return cached.commits;

  try {
    const commits = await fetchFreshCommits();
    if (commits.length > 0) {
      writeCache(commits);
      return commits;
    }
  } catch (err) {
    if (!cached) throw err;
  }

  // Rate limited or nothing came back: older commits beat an empty tile
  if (cached) return cached.commits;
  throw new Error("No commits could be loaded");
}

async function fetchFreshCommits(): Promise<GitHubActivityCommit[]> {
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
