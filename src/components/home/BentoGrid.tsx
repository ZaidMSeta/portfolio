import {
  MapPin,
  GitCommit,
  MessageSquare,
  Link2,
  Sparkles,
} from "lucide-react";

const tileClassName =
  "rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]";

function GitHubActivity() {
  const commits = [
    "feat: added project detail layout",
    "refactor: cleaned up featured projects",
    "fix: improved mobile spacing",
    "chore: updated portfolio structure",
  ];

  return (
    <div className={`${tileClassName} md:col-span-2 md:row-span-2`}>
      <div className="mb-4 flex items-center gap-2">
        <GitCommit size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Recent GitHub Activity</h3>
      </div>

      <div className="space-y-3">
        {commits.map((commit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300/70" />
            <p className="text-sm text-white/65">{commit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrentFocusTile() {
  const items = [
    "Shipping portfolio",
    "Building stronger full-stack projects",
    "Summer internship search",
  ];

  return (
    <div className={tileClassName}>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Current Focus</h3>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300/70" />
            <p className="text-sm text-white/65">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationTile() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07] md:col-span-2">
      <div className="relative h-56 w-full overflow-hidden">
        <iframe
          title="Hamilton, Ontario"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-79.98%2C43.20%2C-79.74%2C43.32&layer=mapnik&marker=43.2557%2C-79.8711"
          className="h-full w-full border-0 grayscale"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/70 to-transparent p-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-teal-300" />
            <h3 className="text-sm font-medium text-white">Location</h3>
          </div>
          <p className="mt-1 text-sm text-white/75">Hamilton, ON</p>
          <p className="text-xs text-white/45">Ontario, Canada</p>
        </div>
      </div>
    </div>
  );
}

function GuestbookPreview() {
  const entries = [
    { name: "Sarah", msg: "Really clean portfolio." },
    { name: "Dev", msg: "Nice project selection." },
    { name: "Jamie", msg: "Love the layout so far." },
  ];

  return (
    <div className={`${tileClassName} md:col-span-2`}>
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Guestbook</h3>
      </div>

      <div className="mb-4 space-y-3">
        {entries.map((entry, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white/70">
              {entry.name[0]}
            </div>
            <p className="text-sm text-white/65">
              <span className="font-medium text-white/90">{entry.name}</span>{" "}
              {entry.msg}
            </p>
          </div>
        ))}
      </div>

      <button className="text-sm text-white/60 transition hover:text-white">
        Sign the guestbook →
      </button>
    </div>
  );
}

function WebringTile() {
  return (
    <a href="#" className={tileClassName}>
      <Link2 size={14} className="mb-3 text-teal-300" />
      <p className="font-medium text-white">McMaster</p>
      <p className="text-sm text-white/60">Webring ↗</p>
    </a>
  );
}

export function BentoGrid() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Extras</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <GitHubActivity />
        <CurrentFocusTile />
        <LocationTile />
        <GuestbookPreview />
        <WebringTile />
      </div>
    </section>
  );
}