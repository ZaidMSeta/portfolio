import { Dumbbell } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const split = [
  { day: "Mon", label: "Push" },
  { day: "Tue", label: "Pull" },
  { day: "Wed", label: "Legs" },
  { day: "Thu", label: "Push" },
  { day: "Fri", label: "Pull" },
  { day: "Sat", label: "Legs" },
  { day: "Sun", label: "Rest" },
];

const goals = [
  "Currently bulking",
  "Improve consistency on leg days",
  "Increase compound lift numbers",
];

export function FitnessCard() {
  const today = DAYS[new Date().getDay()];

  return (
    <article className="flex flex-col rounded-xl border border-fg/10 bg-fg/5 p-5 transition hover:border-fg/20">
      <div className="mb-5 flex items-center gap-2">
        <Dumbbell size={14} className="text-accent" />
        <h3 className="text-sm font-medium text-fg">Fitness</h3>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="rounded-lg border border-fg/10 bg-fg/[0.03] p-4">
          <p className="mb-3 text-xs text-fg/45">Current split</p>

          <div className="grid grid-cols-7 gap-1.5">
            {split.map((item) => {
              const isToday = item.day === today;
              return (
                <div
                  key={item.day}
                  className={`flex flex-col items-center gap-1.5 rounded-md border py-3 transition ${
                    isToday
                      ? "border-accent/40 bg-accent/10"
                      : "border-fg/10 bg-fg/[0.03]"
                  }`}
                >
                  <p className={`text-[10px] ${isToday ? "text-accent/70" : "text-fg/40"}`}>
                    {item.day}
                  </p>
                  <p className={`text-[11px] font-medium ${isToday ? "text-accent" : "text-fg"}`}>
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center rounded-lg border border-fg/10 bg-fg/[0.03] p-4">
          <p className="mb-3 text-xs text-fg/45">Current goals</p>
          <div className="space-y-2">
            {goals.map((goal) => (
              <div key={goal} className="flex items-start gap-2.5">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                <p className="text-sm text-fg/65">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
