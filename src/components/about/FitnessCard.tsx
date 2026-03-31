import { Dumbbell } from "lucide-react";

const split = [
  { day: "Mon", label: "Push" },
  { day: "Tue", label: "Pull" },
  { day: "Wed", label: "Legs" },
  { day: "Thu", label: "Push" },
  { day: "Fri", label: "Pull" },
  { day: "Sat", label: "Legs" },
  { day: "Sun", label: "Rest" },
];

export function FitnessCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-5 flex items-center gap-2">
        <Dumbbell size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Fitness</h3>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-xs text-white/45">Current split</p>

        <div className="grid grid-cols-7 gap-1.5">
          {split.map((item) => (
            <div
              key={item.day}
              className="flex flex-col items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] py-2"
            >
              <p className="text-[10px] text-white/40">{item.day}</p>
              <p className="text-[11px] font-medium text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}