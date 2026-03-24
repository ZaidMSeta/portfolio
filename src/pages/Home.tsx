import { Hero } from "../components/home/Hero";
import { FeaturedProjects } from "../components/home/FeaturedProjects";
import { ExperienceSnapshot } from "../components/home/ExperienceSnapshot";
import { BentoGrid } from "../components/home/BentoGrid";
import { ConnectSection } from "../components/home/ConnectCTA";

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero />

      <section className="space-y-20">
        <FeaturedProjects />
        <ExperienceSnapshot />
        <BentoGrid />
        <ConnectSection />
      </section>
    </div>
  );
}