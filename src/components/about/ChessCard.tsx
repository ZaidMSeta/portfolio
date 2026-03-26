import { Trophy } from "lucide-react";

export function ChessCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-teal-300" />
          <h3 className="text-sm font-medium text-white">Chess</h3>
        </div>
        <span className="text-xs text-white/50">Rapid: 1450</span>
      </div>

      <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-white/70">Rating over time</p>
          <p className="text-xs text-white/45">Since account creation</p>
        </div>

        <div className="h-32 rounded-md bg-[linear-gradient(to_top,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] relative overflow-hidden">
          <svg viewBox="0 0 300 100" className="h-full w-full">
            <polyline
              fill="none"
              stroke="rgba(126,231,193,0.85)"
              strokeWidth="2"
              points="0,78 30,72 60,74 90,66 120,60 150,64 180,52 210,44 240,46 270,36 300,28"
            />
          </svg>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-1 text-xs text-white/45">White</p>
          <p className="text-sm text-white">Queen’s Gambit</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-1 text-xs text-white/45">Black</p>
          <p className="text-sm text-white">Caro-Kann</p>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-1 text-xs text-white/45">Last Game</p>
        <p className="text-sm text-white">Won vs. chessfan92</p>
        <p className="text-xs text-white/50">Rapid · 1 day ago</p>
      </div>
    </article>
  );
}