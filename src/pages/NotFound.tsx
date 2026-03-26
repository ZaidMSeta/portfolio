import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Page Not Found
        </h1>

        <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
      </section>

      <Link
        to="/"
        className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}