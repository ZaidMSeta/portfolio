import { Dumbbell } from "lucide-react";

const split = [
  { day: "Mon", label: "Push" },
  { day: "Tue", label: "Pull" },
  { day: "Wed", label: "Legs" },
  { day: "Thu", label: "Push" },
  { day: "Fri", label: "Pull" },
  { day: "Sat", label: "Legs" },
  { day: "gi", label: "Legs" },

];

export function FitnessCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-5 flex items-center gap-2">
        <Dumbbell size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Fitness</h3>
      </div>

      {/*<div className="mb-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-sm text-white/70">Current split</p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-7">
          {split.map((item) => (
            <div
              key={`${item.day}-${item.label}`}
              className="rounded-md border border-white/10 bg-white/[0.03] p-3"
            >
              <p className="text-xs text-white/45">{item.day}</p>
              <p className="text-sm text-white">{item.label}</p>
            </div>
          ))}
        </div>
          </div>*/}

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="space-y-1 text-sm text-white/65">
          <p>TBA</p>

        </div>
      </div>
    </article>
  );
}