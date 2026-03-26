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
          shape how I think about software.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_1.4fr]">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div className="aspect-[4/5] bg-white/5">
            <img
              src="/about/profile-placeholder.jpg"
              alt="Zaid Seta"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-white">Hi, I’m Zaid.</h2>

            <div className="space-y-4 text-sm leading-7 text-white/65 sm:text-base">
              <p>
                I’m a Computer Science student at McMaster University with a
                strong interest in full-stack development, product-focused
                software, and building tools that feel genuinely useful.
              </p>

              <p>
                I enjoy working on projects that sit at the intersection of
                practical functionality and thoughtful design — things that solve
                real problems, improve workflows, or make information easier to
                understand and use.
              </p>

              <p>
                Lately, I’ve been spending a lot of time building student tools,
                contributing to team-based product work, and improving how I
                approach frontend structure, usability, and implementation
                detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Interests</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChessCard />
          <FitnessCard />
          <BooksCard />
          <WatchlistCard />
        </div>
      </section>
    </div>
  );
}