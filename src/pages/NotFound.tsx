import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Page Not Found
        </h1>

        <p className="max-w-2xl text-sm leading-7 text-fg/65 sm:text-base">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </section>

      <Link
        to="/"
        className="inline-flex items-center rounded-lg border border-fg/10 bg-fg/5 px-4 py-2 text-sm text-fg/75 transition hover:border-fg/20 hover:text-fg"
      >
        Back to Home
      </Link>
    </div>
  );
}
