import { Clapperboard } from "lucide-react";

const watched = [
  {
    title: "Interstellar",
    meta: "Film",
    poster: "/about/watch/interstellar.jpg",
  },
  {
    title: "Breaking Bad",
    meta: "Series",
    poster: "/about/watch/breaking-bad.jpg",
  },
  {
    title: "Dune: Part Two",
    meta: "Film",
    poster: "/about/watch/dune-part-two.jpg",
  },
];

export function WatchlistCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-5 flex items-center gap-2">
        <Clapperboard size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Recently Watched</h3>
      </div>

      <div className="space-y-3">
        {watched.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md bg-white/5">
              <img
                src={item.poster}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {item.title}
              </p>
              <p className="text-xs text-white/50">{item.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}