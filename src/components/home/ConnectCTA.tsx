import { Mail, Github, Linkedin } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:zaid.seta@mcmaster.ca",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/ZaidMSeta",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com",
  },
];

export function ConnectSection() {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mx-auto max-w-2xl space-y-3">
        <h2 className="text-xl font-semibold text-white">Let’s Connect</h2>
        <p className="text-sm text-white/60 sm:text-base">
          I’m always open to talking about projects, internships, and new
          opportunities.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            <link.icon size={14} />
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}