import { useState } from "react";
import {
  MapPin,
  GitCommit,
  MessageSquare,
  MousePointerClick,
  Link2,
} from "lucide-react";

function GitHubActivity() {
  const commits = [
    "feat: added project detail layout",
    "refactor: cleaned up featured projects",
    "fix: improved mobile spacing",
    "chore: updated portfolio structure",
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 md:col-span-2 md:row-span-2">
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

function ClickMeTile() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="rounded-xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      <MousePointerClick size={14} className="mb-3 text-teal-300" />
      <p className="mb-1 text-3xl font-semibold text-white">{count}</p>
      <p className="text-sm text-white/60">clicks — go ahead</p>
    </button>
  );
}

function LocationTile() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="h-28 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.18),_transparent_55%)]" />
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-teal-300" />
          <h3 className="text-sm font-medium text-white">Location</h3>
        </div>
        <p className="font-medium text-white">Hamilton, ON</p>
        <p className="text-sm text-white/60">Canada</p>
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 md:col-span-2">
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
    <a
      href="#"
      className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      <Link2 size={14} className="mb-3 text-teal-300" />
      <p className="font-medium text-white">McMaster</p>
      <p className="text-sm text-white/60">Webring ↗</p>
    </a>
  );
}

export function BentoGrid() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Extras</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <GitHubActivity />
        <ClickMeTile />
        <LocationTile />
        <GuestbookPreview />
        <WebringTile />
      </div>
    </section>
  );
}