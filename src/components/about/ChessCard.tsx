import { Trophy } from "lucide-react";

export function ChessCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-4 flex items-center gap-2">
        <Trophy size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Chess</h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-2xl font-semibold text-white">1450</p>
          <p className="text-sm text-white/60">Current rapid rating</p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-white">1450</p>
            <p className="text-white/50">Rapid</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-white">1320</p>
            <p className="text-white/50">Blitz</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-white">1180</p>
            <p className="text-white/50">Bullet</p>
          </div>
        </div>
      </div>
    </article>
  );
}