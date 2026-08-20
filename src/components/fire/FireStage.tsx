import { useRef } from "react";
import coals from "@/assets/fire-coals.jpg";
import pot from "@/assets/fire-pot.jpg";
import { EmberParticles } from "./EmberParticles";
import { FireAtmosphere } from "./FireAtmosphere";
import { HeatHaze } from "./HeatHaze";
import { FireCopy } from "./FireCopy";
import { AtmosphereParticles } from "@/components/hero/AtmosphereParticles";
import { useCursorParallax } from "@/components/animation/useCursorParallax";
import { usePrefersReducedMotion } from "@/components/animation/usePrefersReducedMotion";
import { useCameraCssVars } from "@/components/animation/useCinematicCamera";
import { useInViewport } from "@/components/animation/useInViewport";
import { useFireSequence } from "@/components/animation/useFireSequence";

/**
 * FireStage — chapter 03 of the film.
 *
 * The camera has kept moving: same world, deeper in, hotter. Nothing here
 * draws a "flame"; the fire is expressed as light, embers, smoke and heat.
 *
 * FUTURE 3D SLOT: [data-stage="fire"] is the drop-in point for a React Three
 * Fiber <Canvas> (shader flame / GPU embers / real point light). The scroll
 * choreography, depth planes, parallax and copy all target the same wrappers
 * and need no changes. No .glb is referenced or loaded today.
 */
export function FireStage() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useFireSequence(rootRef);
  useCameraCssVars(stageRef);
  // Embers and the SVG turbulence only run while the chapter is on screen.
  const active = useInViewport(rootRef);

  useCursorParallax([
    { ref: frontRef, strength: 26 },
    { ref: backRef, strength: -18 },
  ]);

  if (reduced) return <FireStageStatic />;

  return (
    <section ref={rootRef} data-chapter="03" aria-label="The fire" className="relative h-[600svh] bg-char">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-fire="stagePush" className="absolute inset-0 origin-[50%_78%]">
          {/* background — the dark cooking environment */}
          <div ref={backRef} data-fire-depth="back" data-stage="fire" className="absolute inset-0">
            <img
              src={coals}
              alt=""
              aria-hidden
              loading="eager"
              width={1536}
              height={1024}
              className="fire-plate h-full w-full object-cover object-[46%_62%]"
            />
          </div>

          {/* midground — the atmosphere the heat creates */}
          <div data-fire-depth="mid" className="absolute inset-0">
            <FireAtmosphere />
            <HeatHaze active={active} />
          </div>

          {/* the pot, emerging from the darkness at the very end */}
          <div
            data-fire="pot"
            className="absolute inset-x-0 bottom-0 h-[72%] opacity-0 md:h-[78%]"
          >
            <img
              src={pot}
              alt="The silhouette of a blackened pot on the fire"
              loading="eager"
              width={1536}
              height={1024}
              className="fire-pot h-full w-full object-cover object-bottom"
            />
          </div>

          {/* foreground — embers between the visitor and the fire */}
          <div ref={frontRef} data-fire-depth="front" className="absolute -inset-[6%]">
            <EmberParticles count={54} paused={!active} />
            {/* the dust of the previous chapters, thinning out */}
            <div data-fire="dust" className="absolute inset-0">
              <AtmosphereParticles count={10} />
            </div>
          </div>
        </div>

        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="hero-floor pointer-events-none absolute inset-x-0 bottom-0 h-[52%] md:h-2/5" />

        <FireCopy />

        <div
          data-fire="potLine"
          className="shell pointer-events-none absolute inset-x-0 bottom-[12svh] opacity-0"
        >
          <p className="text-label text-gold">Something is already in the pot</p>
        </div>

        {/* darkness carried in from chapter 02 */}
        <div data-fire="bleed" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-char via-char/80 to-transparent"/>
      </div>
    </section>
  );
}

/** Reduced motion: the same heat, told as a still editorial spread. */
function FireStageStatic() {
  return (
    <section data-chapter="03" aria-label="The fire" className="shell py-28 md:py-40">
      <p className="text-label text-gold">Chapter 03 — The fire</p>
      <h2 className="text-display mt-8 text-6xl md:text-8xl">The Fire.</h2>
      <p className="mt-5 max-w-[26ch] text-lg text-flame md:text-2xl">
        Everything changes when the fire comes on.
      </p>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <img
          src={coals}
          alt="Glowing charcoal in a dark kitchen"
          loading="eager"
          width={1536}
          height={1024}
          className="h-auto w-full"
        />
        <img
          src={pot}
          alt="The silhouette of a blackened pot on the fire"
          loading="eager"
          width={1536}
          height={1024}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
