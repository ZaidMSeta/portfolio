import { ChessCard } from "../components/about/ChessCard";
import { FitnessCard } from "../components/about/FitnessCard";
import { BooksCard } from "../components/about/BooksCard";
import { WatchlistCard } from "../components/about/WatchlistCard";

export default function About() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          About
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
          A bit more about me, what I enjoy building, and the interests that
          shape how I think.
        </p>
      </section>

      <section>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-white">Hi, I’m Zaid.</h2>

            <div className="space-y-4 text-sm leading-7 text-white/65 sm:text-base">
              <p>
                I’m a Computer Science student at McMaster University with a strong interest in 
                full-stack development, product-focused software, and building tools that are genuinely useful.
              </p>

              <p>
                Working on the app at Morphace, along with the tools I’ve built for students, 
                has pushed me to think more carefully about how software should function, 
                feel, and fit into real people’s workflows.
              </p>

              <p>
                Lately, I’ve been spending a lot of time building tools for fellow students, 
                contributing to team-based product work, and getting better at structure, 
                usability, and implementation details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Interests</h2>

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