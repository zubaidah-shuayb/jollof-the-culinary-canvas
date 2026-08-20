import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import fireImage from "@/assets/story-fire.jpg";

const title = "Story — JOLLOF.";
const description =
  "The story of jollof rice: a dish argued over, guarded and perfected across Nigerian kitchens, streets and night markets.";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: StoryPage,
});

const chapters = [
  {
    year: "Before",
    text: "It begins in a pot too heavy for one person to lift, in a kitchen where the windows stay open all day.",
  },
  {
    year: "The Argument",
    text: "Every household holds a position. Longer parboil. More stock. Less water. The debate is part of the flavour.",
  },
  {
    year: "The Bottom",
    text: "The burnt layer at the base of the pot is not a mistake. It is the most contested portion at the table.",
  },
  {
    year: "After",
    text: "What remains is not a meal but an atmosphere — smoke in fabric, pepper on fingers, a room gone quiet.",
  },
];

function StoryPage() {
  return (
    <div className="pt-40">
      <div className="shell">
        <SectionLabel index="03">The Story</SectionLabel>
        <Reveal>
          <h1 className="text-display mt-8 max-w-4xl text-6xl md:text-8xl">
            Written by fire, <br />
            read in <span className="text-flame">smoke.</span>
          </h1>
        </Reveal>
      </div>

      <div className="shell mt-28 grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <img
            src={fireImage}
            alt="Flames at a night market grill"
            loading="lazy"
            width={1200}
            height={1500}
            className="w-full object-cover"
          />
        </Reveal>

        <div className="space-y-16 pb-28">
          {chapters.map((c, i) => (
            <Reveal key={c.year} delay={i * 0.05}>
              <div className="border-t border-border pt-6">
                <p className="text-label text-gold">{c.year}</p>
                <p className="mt-5 max-w-lg text-xl leading-relaxed text-foreground/90 md:text-2xl">
                  {c.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
