import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-fg/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <p className="font-medium tracking-tight text-fg">Zaid Seta</p>
              <span className="hidden text-fg/20 md:inline">•</span>
              <a
                href="mailto:zaidmseta@gmail.com"
                className="inline-flex items-center gap-2 text-fg/50 transition hover:text-fg"
              >
                <Mail size={14} className="text-accent" />
                <span>zaidmseta [at] gmail [dot] com</span>
              </a>
            </div>

            <p className="mt-3 text-xs text-fg/30">© 2026 Zaid Seta</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ZaidMSeta"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03] text-fg/55 transition hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg"
            >
              <Github size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/zaidseta"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03] text-fg/55 transition hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg"
            >
              <Linkedin size={16} />
            </a>

            <a
              href="mailto:zaidmseta@gmail.com"
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03] text-fg/55 transition hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
