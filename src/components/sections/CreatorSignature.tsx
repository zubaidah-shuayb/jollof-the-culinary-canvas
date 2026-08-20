import { Reveal } from "@/components/animation/Reveal";
import { siteConfig } from "@/config/site";

/**
 * The signature at the end of the film.
 *
 * Authorship is stated once, quietly, the way an artist signs a piece — no
 * watermark, no copy protection, no interference with the browser.
 */
export function CreatorSignature() {
  return (
    <section
      aria-label={`Built by ${siteConfig.creatorName}`}
      className="relative overflow-hidden bg-char py-32 md:py-48"
    >
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="shell relative">
        <Reveal>
          <p className="text-label text-gold">The signature</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="text-display mt-8 text-[13vw] leading-[0.86] md:text-[7vw] lg:text-[6.5rem]">
            Built by{" "}
            <a
              href={siteConfig.creatorWebsite}
              target="_blank"
              rel="noreferrer author"
              className="signature-name rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              {siteConfig.creatorName}
            </a>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[34ch] text-lg text-muted-foreground md:text-xl">
            An independent Nigerian digital experiment.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <dl className="mt-20 grid max-w-4xl gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.credits.map((credit) => (
              <div key={credit.role} className="border-t border-border pt-5">
                <dt className="text-label text-muted-foreground">{credit.role}</dt>
                <dd className="text-display mt-2 text-2xl md:text-3xl">{credit.name}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
