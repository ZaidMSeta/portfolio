import { useEffect, useState } from "react";
import {
  MapPin,
  GitCommit,
  Link2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchLatestCommits, type GitHubActivityCommit } from "../../lib/utils/githubActivity";

const tileClassName =
  "rounded-xl border border-fg/8 bg-fg/5 p-5 transition hover:border-fg/15 hover:bg-fg/[0.07]";

function GitHubActivity() {
  const [commits, setCommits] = useState<GitHubActivityCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadCommits() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchLatestCommits();

        if (!ignore) {
          setCommits(data);
        }
      } catch (err) {
        console.error("GitHub activity error:", err);

        if (!ignore) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadCommits();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={`${tileClassName} md:col-span-2`}>
      <div className="mb-4 flex items-center gap-2">
        <GitCommit size={14} className="text-accent" />
        <h3 className="text-sm font-medium text-fg">Recent GitHub Activity</h3>
      </div>

      <div className="space-y-3">
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
              <div className="h-4 w-full animate-pulse rounded bg-fg/8" />
            </div>
          ))}

        {!loading && error && (
          <p className="text-sm leading-6 text-fg/55">
            Couldn't load recent commits right now.
          </p>
        )}

        {!loading && !error && commits.length === 0 && (
          <p className="text-sm leading-6 text-fg/55">
            No recent commits found.
          </p>
        )}

        {!loading &&
          !error &&
          commits.map((commit) => (
            <div key={commit.id} className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                <div className="min-w-0">
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="line-clamp-2 text-sm leading-6 text-fg/65 transition hover:text-fg"
                  >
                    {commit.message}
                  </a>
                  <p className="mt-1 text-xs text-fg/40">{commit.repoName}</p>
                </div>
              </div>

              <div className="mt-0.5 flex shrink-0 items-center text-xs font-medium">
                <span className="text-green-400">+{commit.additions}</span>
                <span className="px-1 text-fg/25">/</span>
                <span className="text-red-400">-{commit.deletions}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function CurrentFocusTile() {
  const items = [
    "Improving MacTrack and contributing to Morphace",
    "Building stronger full-stack projects",
    "Summer/Fall internship search",
  ];

  return (
    <div className={tileClassName}>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={14} className="text-accent" />
        <h3 className="text-sm font-medium text-fg">Current Focus</h3>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            <p className="text-sm leading-6 text-fg/65">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebringTile() {
  return (
    <a
      href="#"
      className={`${tileClassName} flex flex-col items-center justify-center text-center`}
    >
      <div className="mb-4 flex items-center gap-4 text-fg/35">
        <ChevronLeft size={18} />
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03]">
          <Link2 size={18} className="text-accent" />
        </div>
        <ChevronRight size={18} />
      </div>

      <p className="font-medium text-fg">McMaster Webring</p>
      <p className="mt-1 text-sm text-fg/55">Browse other McMaster sites</p>
    </a>
  );
}

function LocationTile() {
  return (
    <div className="overflow-hidden rounded-xl border border-fg/8 bg-fg/5 transition hover:border-fg/15 hover:bg-fg/[0.07] md:col-span-2 md:row-span-2">
      <div className="relative h-full min-h-[320px] w-full overflow-hidden">
        <iframe
          title="Hamilton, Ontario"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-79.932%2C43.225%2C-79.815%2C43.295&layer=mapnik&marker=43.2557%2C-79.8711"
          className="h-full w-full border-0 grayscale"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/75 to-transparent p-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-accent" />
            <h3 className="text-sm font-medium text-fg">Location</h3>
          </div>
          <p className="mt-1 text-sm text-fg/75">Hamilton, ON</p>
          <p className="text-xs text-fg/45">Ontario, Canada</p>
        </div>
      </div>
    </div>
  );
}

function ConnectTile() {
  const links = [
    { icon: Mail, label: "Email", href: "mailto:zaidmseta@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/ZaidMSeta" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/zaidseta" },
  ];

  return (
    <div className={`${tileClassName} md:col-span-2 flex flex-col justify-between`}>
      <div>
        <h3 className="text-sm font-medium text-fg">Let's Connect</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-fg/60">
          Always open to opportunities, projects, and interesting conversations.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-lg border border-fg/10 px-3 py-2 text-sm text-fg/70 transition hover:border-fg/20 hover:text-fg"
          >
            <link.icon size={14} />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:[grid-template-rows:auto_auto_auto]">
        <GitHubActivity />
        <CurrentFocusTile />
        <WebringTile />
        <LocationTile />
        <ConnectTile />
      </div>
    </section>
  );
}
