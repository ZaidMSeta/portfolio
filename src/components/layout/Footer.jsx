import { site } from "../../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="mb-3 flex flex-wrap items-center gap-4">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              {social.label}
            </a>
          ))}
        </div>

        <p className="text-sm text-zinc-500">{site.footer.note}</p>
        <p className="text-xs text-zinc-400">Last updated: {site.footer.lastUpdated}</p>
      </div>
    </footer>
  );
}
