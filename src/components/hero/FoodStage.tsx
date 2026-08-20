import { useRef } from "react";
import heroImage from "@/assets/hero-jollof.jpg";
import { SteamLayer } from "./SteamLayer";
import { AtmosphereParticles } from "./AtmosphereParticles";
import { useCursorParallax } from "@/components/animation/useCursorParallax";
import { usePrefersReducedMotion } from "@/components/animation/usePrefersReducedMotion";

/**
 * FoodStage — the food composition layer of the hero.
 *
 * CURRENT: a photographic plate (jollof rice + grilled chicken) treated with
 * cinematic lighting, steam and atmosphere. It is honestly a 2D still, not a
 * 3D render.
 *
 * FUTURE 3D SLOT: replace the <img> inside [data-stage="subject"] with a
 * React Three Fiber <Canvas> loading the models declared in
 * `siteConfig.assets.models` (jollof.glb, chicken.glb, plate.glb). Everything
 * around it — lighting vignette, steam, particles, parallax, GSAP hooks —
 * already works against that same wrapper and needs no changes.
 */
export function FoodStage() {
  const subjectRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useCursorParallax([
    { ref: subjectRef, strength: 18 },
    { ref: atmosphereRef, strength: -34 },
  ]);

  return (
    <div data-hero="food" className="absolute inset-0">
      <div data-hero="light" className="absolute inset-0">
        <div ref={subjectRef} data-stage="subject" className="absolute -inset-[6%]">
          <img
            src={heroImage}
            alt="A steaming plate of Nigerian jollof rice with charred grilled chicken"
            width={1600}
            height={1200}
            fetchPriority="high"
            className="h-full w-full object-cover object-[62%_58%] md:object-center"
          />
        </div>

        {/* Warm directional key light + falloff into darkness */}
        <div className="key-light absolute inset-0" />
        <div className="vignette absolute inset-0" />
        <div className="hero-floor absolute inset-x-0 bottom-0 h-[62%] md:h-2/5" />
      </div>

      <div ref={atmosphereRef} className="absolute -inset-[8%]">
        <SteamLayer intensity={1} paused={reduced} />
        <AtmosphereParticles paused={reduced} />
      </div>
    </div>
  );
}
