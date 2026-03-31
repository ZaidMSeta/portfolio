import { Clapperboard, Tv, Film } from "lucide-react";
import { getTraktData, type TraktItem } from "../../lib/utils/trakt";

const { items } = getTraktData();

function PosterFallback({ title, type }: { title: string; type: TraktItem["type"] }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white/[0.04]">
      {type === "movie" ? (
        <Film size={14} className="text-teal-300/60" />
      ) : (
        <Tv size={14} className="text-teal-300/60" />
      )}
    </div>
  );
}

export function WatchlistCard() {
  return (
    <article className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-5 flex items-center gap-2">
        <Clapperboard size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Recently Watched</h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-white/40">Nothing tracked yet.</p>
      ) : (
        <div className="flex flex-1 flex-col gap-3">
          {items.map((item) => (
            <div
              key={`${item.type}-${item.title}-${item.watchedAt}`}
              className="flex flex-1 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md border border-white/5">
                {item.posterUrl ? (
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PosterFallback title={item.title} type={item.type} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-white/50">
                  {item.year} · {item.type === "movie" ? "Movie" : "Show"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
