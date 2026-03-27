export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">Zaid Seta</p>
            <p className="max-w-md text-sm leading-6 text-white/45">
              Building practical software, thoughtful tools, and clean interfaces.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55">
            <a
              href="mailto:zaid.seta@mcmaster.ca"
              className="transition hover:text-white"
            >
              Email
            </a>
            <a
              href="https://github.com/ZaidMSeta"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/zaidseta"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/8 pt-4 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Zaid Seta</p>
          <p>Designed and built with React + Tailwind</p>
        </div>
      </div>
    </footer>
  );
}