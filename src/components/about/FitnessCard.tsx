import { Dumbbell } from "lucide-react";

export function FitnessCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-4 flex items-center gap-2">
        <Dumbbell size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Fitness</h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-2xl font-semibold text-white">4</p>
          <p className="text-sm text-white/60">Sessions this week</p>
        </div>

        <div className="space-y-2 text-sm text-white/65">
          <p>Current focus: consistency and strength</p>
          <p>Training style: gym + conditioning</p>
        </div>
      </div>
    </article>
  );
}