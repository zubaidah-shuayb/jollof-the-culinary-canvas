import { Reveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import emberImage from "@/assets/texture-ember.jpg";

const notes = [
  {
    n: "01",
    title: "Smoke",
    body: "Wood, char and patience. The base note that no shortcut can imitate.",
  },
  {
    n: "02",
    title: "Pepper",
    body: "Tatashe, rodo and onion, blended and reduced until the colour turns deep.",
  },
  {
    n: "03",
    title: "Heat",
    body: "The bottom of the pot, where the rice stops being rice and becomes memory.",
  },
];

export function Manifesto() {
  return (
    <section className="shell py-28 md:py-40">
      <SectionLabel index="02">The Manifesto</SectionLabel>

      <Reveal>
        <h2 className="text-display mt-10 max-w-4xl text-5xl md:text-7xl lg:text-8xl">
          A pot of rice is never <span className="text-flame">just</span> a pot of rice.
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div className="space-y-12">
          {notes.map((note, i) => (
            <Reveal key={note.n} delay={i * 0.08}>
              <div className="border-t border-border pt-6">
                <div className="flex items-baseline gap-6">
                  <span className="text-label text-ember">{note.n}</span>
                  <h3 className="text-display text-3xl md:text-4xl">{note.title}</h3>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {note.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="self-start">
          <figure className="relative">
            <img
              src={emberImage}
              alt="Glowing charcoal embers"
              loading="lazy"
              width={1400}
              height={900}
              className="w-full object-cover opacity-90"
            />
            <figcaption className="mt-4 text-label text-muted-foreground">
              Fig. — embers, 900°
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
