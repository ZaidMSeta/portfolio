import { ChessCard } from "../components/about/ChessCard";
import { FitnessCard } from "../components/about/FitnessCard";
import { BooksCard } from "../components/about/BooksCard";
import { WatchlistCard } from "../components/about/WatchlistCard";

export default function About() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          About
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-fg/65 sm:text-base">
          A bit more about me, what I enjoy building, and the interests that
          shape how I think.
        </p>
      </section>

      <section>
        <div className="rounded-xl border border-fg/10 bg-fg/5 p-6">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-fg">Hi, I'm Zaid.</h2>

            <div className="space-y-4 text-sm leading-7 text-fg/65 sm:text-base">
              <p>
                I'm a Computer Science student at McMaster University, interested in
                full-stack development and in building tools that people actually keep using
                once the novelty wears off.
              </p>

              <p>
                Most of what I've built has come out of watching someone do something tedious
                by hand. A course planner because degree planning is scattered across five
                places. A scheduling automation for a local soccer club because 400 events were
                being entered one at a time. An event tool for a nonprofit because the same
                poster was being retyped into four platforms.
              </p>

              <p>
                Lately I've been doing more client work, which has turned out to be its own
                skill. Translating vague feedback into scoped work, and shipping something
                through fifteen rounds of review without losing the thread, is harder than
                the code usually is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-fg">Interests</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BooksCard />
          <FitnessCard />
          <WatchlistCard />
          <ChessCard />
        </div>
      </section>
    </div>
  );
}
