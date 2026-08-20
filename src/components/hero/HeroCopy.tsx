import { siteConfig } from "@/config/site";

export function HeroCopy() {
  return (
    <div data-hero="copy" className="shell relative flex h-full flex-col justify-between pb-10 pt-28 md:pb-14">
      <p data-hero="line" className="text-label text-gold opacity-0">
        {siteConfig.contact.location}
      </p>

      <div className="mt-auto">
        <h1
          data-hero="title"
          className="text-display text-[23vw] leading-[0.78] opacity-0 sm:text-[20vw] md:text-[16vw] lg:text-[15vw]"

        >
          JOLLOF<span className="text-ember">.</span>
        </h1>

        <div className="mt-6 flex flex-col gap-8 md:mt-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p data-hero="line" className="text-label text-flame opacity-0">
              Not just rice.
            </p>
            <p
              data-hero="line"
              className="mt-4 text-base leading-relaxed text-muted-foreground opacity-0"
            >
              A Nigerian story told through fire, spice, smoke and flavor.
            </p>
          </div>

          <div data-hero="scroll" className="flex items-center gap-4 opacity-0">
            <span className="scroll-rule h-10 w-px md:h-14" />
            <span className="text-label text-muted-foreground">Scroll to enter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
