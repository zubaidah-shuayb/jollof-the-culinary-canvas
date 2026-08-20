import { useRef } from "react";
import { SteamLayer } from "@/components/hero/SteamLayer";
import { AtmosphereParticles } from "@/components/hero/AtmosphereParticles";
import { useCursorParallax } from "@/components/animation/useCursorParallax";
import { usePrefersReducedMotion } from "@/components/animation/usePrefersReducedMotion";
import { useCameraCssVars } from "@/components/animation/useCinematicCamera";
import { useJollofReveal } from "@/components/animation/useJollofReveal";
import { jollofScene, finaleTriad } from "./jollof.scene";


export function JollofStage() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const airRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useJollofReveal(rootRef);
  useCameraCssVars(stageRef);

  useCursorParallax([
    { ref: plateRef, strength: 14 },
    { ref: airRef, strength: -26 },
  ]);

  if (reduced) return <JollofStageStatic />;

  return (
    <section
      ref={rootRef}
      data-chapter="04"
      aria-label="The jollof"
      className="relative h-[420svh] bg-char"
    >
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-jollof="glow" className="jollof-key pointer-events-none absolute inset-0" />

        <div data-jollof="plate" data-stage="jollof" className="absolute inset-0 origin-center">
          <div ref={plateRef} className="absolute -inset-[5%]">
            <img
              src={jollofScene.still}
              alt="Nigerian jollof rice with grilled chicken, fried plantain and egg on a dark plate"
              loading="lazy"
              width={1536}
              height={1024}
              className="h-full w-full object-cover object-[58%_52%] md:object-center"
            />
          </div>
        </div>

        <div ref={airRef} className="pointer-events-none absolute -inset-[8%]">
          <SteamLayer intensity={0.7} />
          <AtmosphereParticles count={12} />
        </div>

        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="hero-floor pointer-events-none absolute inset-x-0 bottom-0 h-[58%] md:h-2/5" />

        <div className="shell pointer-events-none absolute inset-x-0 bottom-[9svh] md:bottom-[12svh]">
          <span className="block overflow-hidden">
            <h2
              data-jollof="line"
              className="text-display block text-[16vw] leading-[0.84] opacity-0 md:text-[8vw] lg:text-[7.5rem]"
            >
              This is jollof.
            </h2>
          </span>
          <span className="mt-4 block overflow-hidden">
            <p data-jollof="line" className="block text-lg text-flame opacity-0 md:text-2xl">
              Made to be shared.
            </p>
          </span>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 md:mt-10">
            {finaleTriad.map((line) => (
              <li
                key={line}
                data-jollof="triad"
                className="text-label text-gold opacity-0"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* the darkness the fire leaves behind, lifting into calm */}
        <div data-jollof="calm" className="pointer-events-none absolute inset-0 bg-char" />
      </div>
    </section>
  );
}

/** Reduced motion: a still editorial plate. */
function JollofStageStatic() {
  return (
    <section data-chapter="04" aria-label="The jollof" className="shell py-28 md:py-40">
      <img
        src={jollofScene.still}
        alt="Nigerian jollof rice with grilled chicken, fried plantain and egg on a dark plate"
        loading="lazy"
        width={1536}
        height={1024}
        className="h-auto w-full"
      />
      <h2 className="text-display mt-12 text-6xl md:text-8xl">This is jollof.</h2>
      <p className="mt-4 text-lg text-flame md:text-2xl">Made to be shared.</p>
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
        {finaleTriad.map((line) => (
          <li key={line} className="text-label text-gold">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
