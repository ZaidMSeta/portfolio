import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BookOpen, ChessKnight, Clapperboard, GitCommit, Layers, MapPin } from "lucide-react";
import { fetchLatestCommits, type GitHubActivityCommit } from "../../lib/utils/githubActivity";
import { TechTag } from "../TechTag";
import { site } from "../../data/site";
import { getHardcoverData, getPrimaryAuthor } from "../../lib/utils/hardCover";
import { getTraktData } from "../../lib/utils/trakt";
import ratingHistory from "../../data/chessRatingHistory.json";

const tileClassName =
  "rounded-xl border border-fg/10 card p-5 transition hover:border-fg/20";

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
    <div className={`${tileClassName} md:col-span-2 md:row-span-2`}>
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
                <span className="text-added">+{commit.additions}</span>
                <span className="px-1 text-fg/25">/</span>
                <span className="text-removed">-{commit.deletions}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function TileHeader({ icon: Icon, title }: { icon: typeof Layers; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon size={14} className="text-accent" />
      <h3 className="text-sm font-medium text-fg">{title}</h3>
    </div>
  );
}

function StackTile() {
  const stack = ["Python", "TypeScript", "React", "Go", "FastAPI", "PostgreSQL", "Tailwind", "Playwright"];

  return (
    <div className={`${tileClassName} md:col-span-2`}>
      <TileHeader icon={Layers} title="Stack" />
      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <TechTag key={tech} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function ReadingTile() {
  const { currentRead, lastFinished } = getHardcoverData();
  const book = currentRead ?? lastFinished;
  if (!book) return null;

  const cover = book.book.image?.url;

  return (
    <div className={tileClassName}>
      <TileHeader icon={BookOpen} title={currentRead ? "Reading" : "Last read"} />
      <div className="flex gap-4">
        {cover && (
          <img
            src={cover}
            alt=""
            loading="lazy"
            className="h-24 w-16 shrink-0 rounded-md border border-fg/10 object-cover"
          />
        )}
        <div className="min-w-0">
          <p className="line-clamp-3 text-sm font-medium text-fg">{book.book.title.split(":")[0]}</p>
          <p className="mt-1 text-xs text-fg/50">{getPrimaryAuthor(book)}</p>
        </div>
      </div>
    </div>
  );
}

// Tiny inline sparkline; avoids pulling recharts into the home bundle
function Sparkline({ values }: { values: number[] }) {
  const width = 200;
  const height = 48;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-12 w-full" aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ChessTile() {
  const ratings = ratingHistory.map((point) => point.rating);
  if (ratings.length < 2) return null;

  const current = ratings[ratings.length - 1];
  const peak = Math.max(...ratings);

  return (
    <Link to="/about" className={`${tileClassName} flex flex-col`}>
      <TileHeader icon={ChessKnight} title="Chess" />
      <p className="font-display text-3xl text-fg">{current}</p>
      <p className="font-mono text-[11px] text-fg/45">rapid · peak {peak}</p>
      <div className="mt-auto pt-3">
        <Sparkline values={ratings} />
      </div>
    </Link>
  );
}

function WatchingTile() {
  const items = getTraktData().items.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <div className={`${tileClassName} md:col-span-2`}>
      <TileHeader icon={Clapperboard} title="Recently watched" />
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={`${item.title}-${item.watchedAt}`} className="min-w-0">
            <div className="aspect-[2/3] overflow-hidden rounded-md border border-fg/10 bg-fg/5">
              {item.posterUrl && (
                <img src={item.posterUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
              )}
            </div>
            <p className="mt-2 truncate text-xs text-fg/70">{item.title}</p>
            <p className="font-mono text-[10px] text-fg/40">
              {item.year} · {item.type === "movie" ? "film" : "show"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationTile() {
  return (
    <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-fg/10 card md:col-span-2">
      <iframe
        title="Map of Hamilton, Ontario"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-79.932%2C43.225%2C-79.815%2C43.295&layer=mapnik&marker=43.2557%2C-79.8711"
        className="map-embed absolute inset-0 h-full w-full border-0"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-4 pt-10">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-accent" />
          <p className="text-sm font-medium text-fg">{site.location}</p>
        </div>
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl tracking-tight text-fg">Lately</h2>
        <Link to="/about" className="font-mono text-xs text-fg/50 transition hover:text-fg">
          more about me →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <GitHubActivity />
        <StackTile />
        <ReadingTile />
        <ChessTile />
        <LocationTile />
        <WatchingTile />
      </div>
    </section>
  );
}
