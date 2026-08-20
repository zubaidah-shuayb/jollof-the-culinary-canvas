import { useRef } from "react";
import { AtmosphereParticles } from "@/components/hero/AtmosphereParticles";
import { useCursorParallax } from "@/components/animation/useCursorParallax";
import { usePrefersReducedMotion } from "@/components/animation/usePrefersReducedMotion";
import { useIngredientScroll } from "@/components/animation/useIngredientScroll";
import { useCameraCssVars } from "@/components/animation/useCinematicCamera";
import { ingredientBeats, aromaticsPlate } from "./ingredients.data";

/**
 * IngredientStage — chapter 02 of the film.
 *
 * CURRENT: photographic cut-out placeholders (transparent PNGs) staged on
 * near / mid / far depth planes, lit by the same warm environment as the hero.
 *
 * FUTURE 3D SLOT: each [data-stage="ingredient"] wrapper is the drop-in point
 * for a React Three Fiber <Canvas> rendering the .glb named in
 * `ingredients.data.ts` (tomato / pepper / onion / rice / spices). The scroll
 * choreography, depth planes, cursor parallax, lighting and atmosphere all
 * target those same wrappers and need no changes.
 */
export function IngredientStage() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useIngredientScroll(rootRef);
  useCameraCssVars(stageRef);

  // Reuses the hero's single pointer system — fine pointers only, no second
  // competing listener. Touch devices fall back to the scroll choreography.
  useCursorParallax([
    { ref: nearRef, strength: 22 },
    { ref: farRef, strength: -30 },
  ]);

  if (reduced) return <IngredientStageStatic />;

  return (
    <section
      ref={rootRef}
      data-chapter="02"
      aria-label="The ingredients"
      className="relative h-[500svh] bg-char"
    >
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* far — the deep end of the room */}
        <div ref={farRef} data-depth="far" className="absolute inset-0">
          <div className="ing-room absolute inset-0" />
          <img
            src={aromaticsPlate.image}
            alt=""
            aria-hidden
            loading="eager"
            width={1024}
            height={1024}
            className="absolute -left-[8%] bottom-[-6%] w-[46vw] max-w-[520px] opacity-[0.13] blur-[10px] md:w-[30vw]"
          />
        </div>

        {/* mid + near — one dominant subject at a time */}
        <div ref={nearRef} className="absolute inset-0">
          {ingredientBeats.map((beat) => (
            <div key={beat.id} data-ing="beat" className="absolute inset-0">
              <div
                data-ing="glow"
                className="ing-glow absolute left-1/2 top-[34%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-0 md:left-[64%] md:top-1/2"
                style={{ ["--glow" as string]: beat.glow }}
              />

              <div
                data-depth={beat.depth}
                data-ing="art"
                data-stage="ingredient"
                data-model={beat.model}
                className="absolute left-1/2 top-[30%] w-[62vw] max-w-[430px] -translate-x-1/2 -translate-y-1/2 opacity-0 md:left-[66%] md:top-1/2 md:w-[38vw] md:max-w-[560px]"
              >
                {/* PLACEHOLDER IMAGERY — replace with <Canvas> + {beat.model} */}
                <img
                  src={beat.image}
                  alt={beat.label}
                  loading="eager"
                  width={1024}
                  height={1024}
                  className="ing-subject h-auto w-full"
                />
              </div>

              <div
                data-ing="copy"
                className="shell absolute inset-x-0 bottom-[8svh] md:bottom-auto md:top-1/2 md:-translate-y-1/2"
              >
                <div className="max-w-[86vw] md:max-w-[46vw]">
                  <span className="block overflow-hidden">
                    <span data-ing="line" className="text-label block text-gold opacity-0">
                      {beat.id === "tomato" ? "Chapter 02 — The ingredients" : "The ingredients"}
                    </span>
                  </span>
                  <span className="mt-4 block overflow-hidden md:mt-6">
                    <h2
                      data-ing="line"
                      className="text-display block whitespace-nowrap text-[15vw] leading-[0.85] opacity-0 md:text-[8vw] lg:text-[7rem]"
                    >
                      {beat.label}
                    </h2>
                  </span>
                  <span className="mt-3 block overflow-hidden md:mt-5">
                    <p
                      data-ing="line"
                      className="block max-w-[22ch] text-lg text-flame opacity-0 md:text-2xl"
                    >
                      {beat.line}
                    </p>
                  </span>
                  <span className="mt-3 block overflow-hidden">
                    <p
                      data-ing="line"
                      className="block max-w-[34ch] text-sm leading-relaxed text-muted-foreground opacity-0"
                    >
                      {beat.note}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* the same dust as the hero — same world, same air */}
        <AtmosphereParticles count={16} />

        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="hero-floor pointer-events-none absolute inset-x-0 bottom-0 h-[46%] md:h-1/3" />

        {/* darkness carried over from the hero, lifting as we arrive */}
        <div data-ing="bleed" className="pointer-events-none absolute inset-0 bg-char" />
      </div>
    </section>
  );
}

/** Reduced motion: the same story, told as a still editorial spread. */
function IngredientStageStatic() {
  return (
    <section data-chapter="02" aria-label="The ingredients" className="shell py-28 md:py-40">
      <p className="text-label text-gold">Chapter 02 — The ingredients</p>
      <div className="mt-14 grid gap-16 sm:grid-cols-2">
        {ingredientBeats.map((beat) => (
          <article key={beat.id} className="border-t border-border pt-8">
            <img
              src={beat.image}
              alt={beat.label}
              loading="eager"
              width={1024}
              height={1024}
              className="ing-subject h-auto w-full max-w-[320px]"
            />
            <h2 className="text-display mt-8 text-4xl md:text-5xl">{beat.label}</h2>
            <p className="mt-3 text-lg text-flame">{beat.line}</p>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
              {beat.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
