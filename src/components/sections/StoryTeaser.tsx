import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import fireImage from "@/assets/story-fire.jpg";

export function StoryTeaser() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
        <Reveal>
          <figure className="relative">
            <img
              src={fireImage}
              alt="Open flame at a Nigerian night market grill"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-[60vh] w-full object-cover lg:h-[78vh]"
            />
            <span className="absolute bottom-4 left-4 text-label text-cream/80">
              Suya row, 11:40 PM
            </span>
          </figure>
        </Reveal>

        <div>
          <SectionLabel index="03">The Story</SectionLabel>
          <Reveal>
            <h2 className="text-display mt-8 text-5xl md:text-7xl">
              Told in smoke, <br />
              not in slogans.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Every region argues its own version. Every family guards its own ratio. This is not a
              recipe — it is a record of heat, hands and the hours between them.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link
              to="/story"
              className="mt-10 inline-flex items-center gap-4 border-b border-flame pb-2 text-label text-foreground transition-colors hover:text-flame"
            >
              Read the story <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
