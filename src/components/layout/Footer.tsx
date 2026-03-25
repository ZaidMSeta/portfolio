import { site } from "../../data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-white">Zaid Seta</p>
            <p className="text-sm text-white/50">
              Building practical software and clean interfaces.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                className="transition hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-4 text-xs text-white/40 md:flex-row md:items-center">
          <p>© 2026 Zaid Seta</p>
          <a href="#" className="transition hover:text-white/70">
            Last commit
          </a>
        </div>
      </div>
    </footer>
  );
}