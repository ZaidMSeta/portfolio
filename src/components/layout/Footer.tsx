export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-white">Zaid Seta</p>
            <p className="mt-1 text-sm text-white/45">
              Building practical software and clean interfaces.
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
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/8 pt-4 text-xs text-white/35 md:flex-row md:items-center">
          <p>© 2026 Zaid Seta</p>
          <p>Designed and built with React + Tailwind</p>
        </div>
      </div>
    </footer>
  );
}