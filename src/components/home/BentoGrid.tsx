import {
  MapPin,
  GitCommit,
  Link2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const tileClassName =
  "rounded-xl border border-white/8 bg-white/5 p-5 transition hover:border-white/15 hover:bg-white/[0.07]";

function GitHubActivity() {
  const commits = [
    "feat: added project detail layout",
    "refactor: cleaned up featured projects",
    "fix: improved mobile spacing",
    "chore: updated portfolio structure",
  ];

  return (
    <div className={`${tileClassName} md:col-span-2`}>
      <div className="mb-4 flex items-center gap-2">
        <GitCommit size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Recent GitHub Activity</h3>
      </div>

      <div className="space-y-3">
        {commits.map((commit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300/70" />
            <p className="text-sm leading-6 text-white/65">{commit}</p>
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
            <p className="text-sm leading-6 text-white/65">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebringTile() {
  return (
    <a
      href="#"
      className={`${tileClassName} flex flex-col items-center justify-center text-center`}
    >
      <div className="mb-4 flex items-center gap-4 text-white/35">
        <ChevronLeft size={18} />
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
          <Link2 size={18} className="text-teal-300" />
        </div>
        <ChevronRight size={18} />
      </div>

      <p className="font-medium text-white">McMaster Webring</p>
      <p className="mt-1 text-sm text-white/55">Browse other McMaster sites</p>
    </a>
  );
}

function LocationTile() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-white/5 transition hover:border-white/15 hover:bg-white/[0.07] md:col-span-2 md:row-span-2">
      <div className="relative h-full min-h-[320px] w-full overflow-hidden">
        <iframe
          title="Hamilton, Ontario"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-79.98%2C43.20%2C-79.74%2C43.32&layer=mapnik&marker=43.2557%2C-79.8711"
          className="h-full w-full border-0 grayscale"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/75 to-transparent p-4">
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

function ConnectTile() {
  const links = [
    { icon: Mail, label: "Email", href: "mailto:zaid.seta@mcmaster.ca" },
    { icon: Github, label: "GitHub", href: "https://github.com/ZaidMSeta" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com" },
  ];

  return (
    <div className={`${tileClassName} md:col-span-2 flex flex-col justify-between`}>
      <div>
        <h3 className="text-sm font-medium text-white">Let’s Connect</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
          Always open to opportunities, projects, and interesting conversations.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            <link.icon size={14} />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:[grid-template-rows:auto_auto_auto]">
        <GitHubActivity />
        <CurrentFocusTile />
        <WebringTile />
        <LocationTile />
        <ConnectTile />
      </div>
    </section>
  );
}