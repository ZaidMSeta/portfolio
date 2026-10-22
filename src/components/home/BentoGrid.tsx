import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
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
  Radar,
} from "lucide-react";
import { fetchLatestCommits, type GitHubActivityCommit } from "../../lib/utils/githubActivity";
import { TechTag } from "../TechTag";
import { site } from "../../data/site";
import { getHardcoverData, getPrimaryAuthor } from "../../lib/utils/hardCover";
import { getTraktData } from "../../lib/utils/trakt";
import ratingHistory from "../../data/chessRatingHistory.json";
import contributions from "../../data/contributions.json";
import { Reveal, useInView } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";
import { projects } from "../../data/projects";
import { freeRightNow, type RoomRadarData } from "../../lib/utils/roomRadar";

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
    <div className={`${tileClassName} h-full`}>
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
          <p className="text-sm leading-6 text-subtle">
            Couldn't load recent commits right now.
          </p>
        )}

        {!loading && !error && commits.length === 0 && (
          <p className="text-sm leading-6 text-subtle">
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
                  <p className="mt-1 text-xs text-subtle">{commit.repoName}</p>
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
    <div className={`${tileClassName} h-full`}>
      <TileHeader icon={Layers} title="Stack" />
      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <TechTag key={tech} tech={tech} />
        ))}
      </div>
    </div>
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
    <div className={`${tileClassName} h-full`}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays size={14} className="text-accent" />
          <h3 className="text-sm font-medium text-fg">Contributions</h3>
        </div>
        <p className="font-mono text-[11px] text-subtle">{total.toLocaleString()} in the last year</p>
      </div>

      <div className="flex justify-between gap-[3px]" aria-hidden>
        {weeks.map((week, index) => {
          const month = Number(week[0].date.slice(5, 7)) - 1;
          const previousMonth = index > 0 ? Number(weeks[index - 1][0].date.slice(5, 7)) - 1 : -1;
          const mobileHidden = index < weeks.length - MOBILE_WEEKS ? "max-sm:hidden" : "";

          return (
            <div
              key={week[0].date}
              className={`flex min-w-0 flex-1 flex-col gap-[3px] ${mobileHidden}`}
              style={{ "--col": index } as CSSProperties}
            >
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  className={`contrib-cell aspect-square w-full rounded-[2px] ${LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0]}`}
                />
              ))}
              {/* Label the first week of each month; text overflows into the next columns */}
              <span className="relative mt-1 h-3">
                {month !== previousMonth && index > 0 && (
                  <span className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] leading-3 text-subtle">
                    {MONTHS[month]}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[10px] text-subtle" aria-hidden>
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

function OffTheClockRow({
  thumb,
  label,
  title,
  detail,
}: {
  thumb: ReactNode;
  label: string;
  title: string;
  detail: string;
}) {
  return (
    <li className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
      <div className="flex h-14 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-fg/10 bg-fg/5">
        {thumb}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] text-subtle">{label}</p>
        <p className="truncate text-sm font-medium text-fg/85">{title}</p>
        <p className="truncate text-xs text-subtle">{detail}</p>
      </div>
    </li>
  );
}

function OffTheClockTile() {
  const { currentRead, lastFinished } = getHardcoverData();
  const book = currentRead ?? lastFinished;
  const watched = getTraktData().items[0];
  const ratings = ratingHistory.map((point) => point.rating);

  const cover = (url?: string | null) =>
    url ? <img src={url} alt="" loading="lazy" className="h-full w-full object-cover" /> : null;

  return (
    <Link to="/about" className={`${tileClassName} group block h-full`}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Coffee size={14} className="text-accent" />
          <h3 className="text-sm font-medium text-fg">Off the clock</h3>
        </div>
        <span className="font-mono text-[11px] text-subtle transition group-hover:text-fg">about →</span>
      </div>

      <ul className="divide-y divide-fg/10">
        {book && (
          <OffTheClockRow
            thumb={cover(book.book.image?.url) ?? <BookOpen size={14} className="text-accent" />}
            label={currentRead ? "reading" : "last read"}
            title={book.book.title.split(":")[0]}
            detail={getPrimaryAuthor(book)}
          />
        )}

        {ratings.length > 1 && (
          <OffTheClockRow
            thumb={<ChessKnight size={16} className="text-accent" />}
            label="chess · rapid"
            title={String(ratings[ratings.length - 1])}
            detail={`peak ${Math.max(...ratings)}`}
          />
        )}

        {watched && (
          <OffTheClockRow
            thumb={cover(watched.posterUrl) ?? <Clapperboard size={14} className="text-accent" />}
            label="last watched"
            title={watched.title}
            detail={`${watched.year} · ${watched.type === "movie" ? "film" : "show"}`}
          />
        )}
      </ul>
    </Link>
  );
}

function RoomRadarTile() {
  const { ref, inView } = useInView<HTMLAnchorElement>();
  const [data, setData] = useState<RoomRadarData | null>(null);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // Only download the schedule once the tile is on screen
  useEffect(() => {
    if (!inView || data) return;
    let ignore = false;
    fetch("/roomradar.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`roomradar.json: ${res.status}`))))
      .then((json: RoomRadarData) => !ignore && setData(json))
      .catch(() => !ignore && setFailed(true));
    return () => {
      ignore = true;
    };
  }, [inView, data]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const status = data ? freeRightNow(data, now) : null;
  const liveUrl = projects.find((project) => project.slug === "roomradar")?.liveUrl;

  const note = status && {
    classes: status.topBuilding && `Most open: ${status.topBuilding.name} · ${status.topBuilding.free} free`,
    "after-hours": "Classes are done for now. Buildings may be locked.",
    "no-classes": "No classes today. Some buildings may be locked.",
    "out-of-term": "Between terms, so the timetable is empty.",
  }[status.reason];

  return (
    <a
      ref={ref}
      href={liveUrl}
      target="_blank"
      rel="noreferrer"
      className={`${tileClassName} group flex h-full flex-col`}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Radar size={14} className="text-accent" />
          <h3 className="text-sm font-medium text-fg">Free rooms at McMaster</h3>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-subtle transition group-hover:text-fg">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          live · roomradar ↗
        </span>
      </div>

      {failed && <p className="text-sm text-fg/60">Couldn't load room data right now.</p>}

      {!failed && !status && (
        <div className="space-y-3">
          <div className="h-9 w-32 animate-pulse rounded bg-fg/8" />
          <div className="h-2 w-full animate-pulse rounded-full bg-fg/8" />
        </div>
      )}

      {status && (
        <>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-fg">
              <CountUp value={String(status.free)} />
            </span>
            <span className="text-sm text-fg/60">of {status.total} rooms free right now</span>
          </p>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-fg/[0.08]" aria-hidden>
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-1000"
              style={{ width: `${(status.free / status.total) * 100}%` }}
            />
          </div>

          {note && <p className="mt-3 truncate font-mono text-[11px] text-subtle">{note}</p>}
        </>
      )}
    </a>
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
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-xl border border-fg/10 card">
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
        <Link to="/about" className="font-mono text-xs text-subtle transition hover:text-fg">
          more about me →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Reveal className="md:col-span-2 md:row-span-2">
          <GitHubActivity />
        </Reveal>
        <Reveal className="md:col-span-2" delay={80}>
          <ContributionsTile />
        </Reveal>
        <Reveal className="md:col-span-2" delay={160}>
          <RoomRadarTile />
        </Reveal>
        <Reveal className="md:col-span-2" delay={80}>
          <LocationTile />
        </Reveal>
        <Reveal className="md:col-span-2" delay={160}>
          <OffTheClockTile />
        </Reveal>
        <Reveal className="md:col-span-4" delay={80}>
          <StackTile />
        </Reveal>
      </div>
    </section>
  );
}
