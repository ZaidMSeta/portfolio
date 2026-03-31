import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <p className="font-medium tracking-tight text-white">Zaid Seta</p>
              <span className="hidden text-white/20 md:inline">•</span>
              <a
                href="mailto:zaidmseta@gmail.com"
                className="inline-flex items-center gap-2 text-white/50 transition hover:text-white"
              >
                <Mail size={14} className="text-teal-300" />
                <span>zaidmseta [at] gmail [dot] com</span>
              </a>
            </div>

            <p className="mt-3 text-xs text-white/30">© 2026 Zaid Seta</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ZaidMSeta"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <Github size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/zaidseta"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <Linkedin size={16} />
            </a>

            <a
              href="mailto:zaidmseta@gmail.com"
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}