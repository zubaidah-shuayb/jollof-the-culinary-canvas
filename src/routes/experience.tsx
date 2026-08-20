import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import heroImage from "@/assets/hero-jollof.jpg";
import emberImage from "@/assets/texture-ember.jpg";

const title = "Experience — JOLLOF.";
const description =
  "Four movements of heat: the blend, the reduction, the char and the plate. A slow, sensory walk through Nigerian jollof.";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ExperiencePage,
});

const movements = [
  { n: "I", name: "The Blend", detail: "Tatashe. Rodo. Onion. Ground coarse, never smooth." },
  { n: "II", name: "The Reduction", detail: "Forty minutes of stirring until the raw edge burns off." },
  { n: "III", name: "The Char", detail: "Chicken over open coal, turned by hand, never by timer." },
  { n: "IV", name: "The Plate", detail: "Served hot enough to hurt. That is the point." },
];

function ExperiencePage() {
  return (
    <div className="pt-40">
      <div className="shell">
        <SectionLabel index="01">The Experience</SectionLabel>
        <Reveal>
          <h1 className="text-display mt-8 max-w-5xl text-6xl md:text-8xl lg:text-9xl">
            Four movements <span className="text-ember">of heat.</span>
          </h1>
        </Reveal>
      </div>

      <div className="shell mt-24 grid gap-px border-y border-border md:grid-cols-2">
        {movements.map((m, i) => (
          <Reveal key={m.n} delay={i * 0.06}>
            <article className="flex h-full flex-col justify-between border-b border-border px-1 py-14 md:px-8">
              <span className="text-display text-5xl text-flame">{m.n}</span>
              <div className="mt-16">
                <h2 className="text-display text-4xl md:text-5xl">{m.name}</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {m.detail}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="shell my-28 grid gap-6 md:grid-cols-[2fr_1fr]">
        <img
          src={heroImage}
          alt="Plated jollof rice and grilled chicken"
          loading="lazy"
          width={1600}
          height={1200}
          className="h-[50vh] w-full object-cover md:h-[70vh]"
        />
        <img
          src={emberImage}
          alt="Charcoal embers"
          loading="lazy"
          width={1400}
          height={900}
          className="h-[50vh] w-full object-cover md:h-[70vh]"
        />
      </div>
    </div>
  );
}
