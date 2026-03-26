import { Clapperboard } from "lucide-react";

export function WatchlistCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-4 flex items-center gap-2">
        <Clapperboard size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Recently Watched</h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="font-medium text-white">Interstellar</p>
          <p className="text-white/50">Film</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="font-medium text-white">Breaking Bad</p>
          <p className="text-white/50">Series</p>
        </div>
      </div>
    </article>
  );
}