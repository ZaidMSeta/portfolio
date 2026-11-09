import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ChessCard } from "../components/about/ChessCard";
import { FitnessCard } from "../components/about/FitnessCard";
import { BooksCard } from "../components/about/BooksCard";
import { WatchlistCard } from "../components/about/WatchlistCard";
import { Reveal } from "../components/motion/Reveal";

export default function About() {
  useDocumentTitle("About");
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl tracking-tight text-fg sm:text-5xl">
          About
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-fg/65 sm:text-base">
          A bit more about me, what I enjoy building, and the interests that
          shape how I think.
        </p>
      </section>

      <section>
        <div className="rounded-xl border border-fg/10 card p-6">
          <div className="space-y-5">
            <h2 className="text-2xl text-fg">Hi, I'm Zaid.</h2>

            <div className="max-w-3xl space-y-4 text-sm leading-7 text-fg/65 sm:text-base">
              <p>
                I'm studying Computer Science at McMaster. Most of what I build is
                full-stack, and the projects I'm proudest of are the ones people are still
                using months later.
              </p>

              <p>
                A lot of them started with someone doing something tedious by hand. Planning
                a degree at McMaster meant jumping between five different sites, so I built a
                course planner. A local soccer club was entering 400 events one at a time, so
                I wrote a script to do it for them. A nonprofit kept retyping the same poster
                into four platforms, so I made them an event tool.
              </p>

              <p>
                Lately I've been doing more client work. The code is usually the easy part.
                The hard part is turning vague feedback into something I can actually build,
                and keeping a project on track when the revisions keep coming.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl text-fg">Interests</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[BooksCard, FitnessCard, WatchlistCard, ChessCard].map((Card, index) => (
            <Reveal key={index} delay={(index % 2) * 80} className="*:h-full">
              <Card />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
