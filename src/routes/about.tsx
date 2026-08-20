import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/config/site";

const title = "About — JOLLOF.";
const description =
  "JOLLOF. is an independent, experimental digital project exploring Nigerian food culture through cinematic web design.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-40 pb-32">
      <div className="shell">
        <SectionLabel index="04">About</SectionLabel>
        <Reveal>
          <h1 className="text-display mt-8 max-w-4xl text-6xl md:text-8xl">
            An independent <span className="text-ember">experiment.</span>
          </h1>
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-28">
          <Reveal>
            <p className="max-w-xl text-xl leading-relaxed text-foreground/90 md:text-2xl">
              JOLLOF. is not a restaurant. It is a study — an attempt to give a Nigerian dish the
              same visual seriousness the world reserves for wine, watches and architecture.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="space-y-8">
              <div className="border-t border-border pt-5">
                <dt className="text-label text-muted-foreground">Created by</dt>
                <dd className="text-display mt-2 text-3xl">{siteConfig.creatorName}</dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt className="text-label text-muted-foreground">Based in</dt>
                <dd className="mt-2 text-lg">{siteConfig.contact.location}</dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt className="text-label text-muted-foreground">Enquiries</dt>
                <dd className="mt-2 text-lg">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition-colors hover:text-flame"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
