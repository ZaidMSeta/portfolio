import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  BookOpen,
  CalendarDays,
  ChessKnight,
  Clapperboard,
  Clock,
  Coffee,
  GitCommit,
  Layers,
  MapPin,
} from "lucide-react";
import { fetchLatestCommits, type GitHubActivityCommit } from "../../lib/utils/githubActivity";
import { TechTag } from "../TechTag";
import { site } from "../../data/site";
import { getHardcoverData, getPrimaryAuthor } from "../../lib/utils/hardCover";
import { getTraktData } from "../../lib/utils/trakt";
import ratingHistory from "../../data/chessRatingHistory.json";
import contributions from "../../data/contributions.json";

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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LEVEL_CLASSES =["bg-fg/[0.06]", "bg-accent/25", "bg-accent/50", "bg-accent/75", "bg-accent"];

// Weeks older than this drop off on phones, where 53 columns would be too small to read
const MOBILE_WEEKS = 26;

function ContributionsTile() {
  const { days, total } = contributions;
  if (days.length === 0) return null;

  // The calendar starts on a Sunday, so every 7 days is one column
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div className={`${tileClassName} md:col-span-2`}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays size={14} className="text-accent" />
          <h3 className="text-sm font-medium text-fg">Contributions</h3>
        </div>
        <p className="font-mono text-[11px] text-fg/45">{total.toLocaleString()} in the last year</p>
      </div>

      <div className="flex justify-between gap-[3px]" aria-hidden>
        {weeks.map((week, index) => {
          const month = Number(week[0].date.slice(5, 7)) - 1;
          const previousMonth = index > 0 ? Number(weeks[index - 1][0].date.slice(5, 7)) - 1 : -1;
          const mobileHidden = index < weeks.length - MOBILE_WEEKS ? "max-sm:hidden" : "";

          return (
            <div key={week[0].date} className={`flex min-w-0 flex-1 flex-col gap-[3px] ${mobileHidden}`}>
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  className={`aspect-square w-full rounded-[2px] ${LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0]}`}
                />
              ))}
              {/* Label the first week of each month; text overflows into the next columns */}
              <span className="relative mt-1 h-3">
                {month !== previousMonth && index > 0 && (
                  <span className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] leading-3 text-fg/35">
                    {MONTHS[month]}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[10px] text-fg/35" aria-hidden>
        less
        {LEVEL_CLASSES.map((className) => (
          <span key={className} className={`h-2.5 w-2.5 rounded-[2px] ${className}`} />
        ))}
        more
      </div>
      <p className="sr-only">{total} GitHub contributions in the last year.</p>
    </div>
  );
}

function OffTheClockItem({
  icon: Icon,
  label,
  title,
  detail,
  visual,
}: {
  icon: typeof Layers;
  label: string;
  title: string;
  detail: string;
  visual: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-3 h-24">{visual}</div>
      <p className="flex items-center gap-1.5 font-mono text-[10px] text-fg/40">
        <Icon size={11} className="text-accent/70" />
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-medium text-fg/80">{title}</p>
      <p className="truncate font-mono text-[10px] text-fg/40">{detail}</p>
    </div>
  );
}

function OffTheClockTile() {
  const { currentRead, lastFinished } = getHardcoverData();
  const book = currentRead ?? lastFinished;
  const watched = getTraktData().items[0];
  const ratings = ratingHistory.map((point) => point.rating);

  const coverClassName = "h-full w-16 rounded-md border border-fg/10 bg-fg/5 object-cover";

  return (
    <Link to="/about" className={`${tileClassName} group md:col-span-2`}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Coffee size={14} className="text-accent" />
          <h3 className="text-sm font-medium text-fg">Off the clock</h3>
        </div>
        <span className="font-mono text-[11px] text-fg/40 transition group-hover:text-fg/70">about →</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {book && (
          <OffTheClockItem
            icon={BookOpen}
            label={currentRead ? "reading" : "last read"}
            title={book.book.title.split(":")[0]}
            detail={getPrimaryAuthor(book)}
            visual={
              book.book.image?.url ? (
                <img src={book.book.image.url} alt="" loading="lazy" className={coverClassName} />
              ) : (
                <div className={coverClassName} />
              )
            }
          />
        )}

        {ratings.length > 1 && (
          <OffTheClockItem
            icon={ChessKnight}
            label="chess"
            title={`${ratings[ratings.length - 1]} rapid`}
            detail={`peak ${Math.max(...ratings)}`}
            visual={
              <div className="flex h-full items-end">
                <Sparkline values={ratings} />
              </div>
            }
          />
        )}

        {watched && (
          <OffTheClockItem
            icon={Clapperboard}
            label="watched"
            title={watched.title}
            detail={`${watched.year} · ${watched.type === "movie" ? "film" : "show"}`}
            visual={
              watched.posterUrl ? (
                <img src={watched.posterUrl} alt="" loading="lazy" className={coverClassName} />
              ) : (
                <div className={coverClassName} />
              )
            }
          />
        )}
      </div>
    </Link>
  );
}

function formatLocalTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
}

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => formatLocalTime(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(formatLocalTime(timeZone)), 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

function LocationTile() {
  const time = useLocalTime(site.timeZone);

  return (
    <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-fg/10 card md:col-span-2">
      <iframe
        title="Map of Hamilton, Ontario"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-79.932%2C43.225%2C-79.815%2C43.295&layer=mapnik&marker=43.2557%2C-79.8711"
        className="map-embed absolute inset-0 h-full w-full border-0"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-4 pt-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-accent" />
            <p className="text-sm font-medium text-fg">{site.location}</p>
          </div>
          <p className="flex items-center gap-1.5 font-mono text-xs text-fg/60">
            <Clock size={12} className="text-accent" />
            {time}
          </p>
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <GitHubActivity />
        <ContributionsTile />
        <StackTile />
        <LocationTile />
        <OffTheClockTile />
      </div>
    </section>
  );
}
