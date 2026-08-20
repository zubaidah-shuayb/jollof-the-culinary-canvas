import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { reportCameraShot } from "./useCinematicCamera";

/**
 * Scroll choreography for chapter 03 — the fire.
 *
 * One scrubbed timeline over a tall section with a sticky stage. Progress map
 * (0 → 1 of the timeline, not of the page):
 *   0.00  darkness carried in from the ingredients
 *   0.15  environment darkens further, dust thins out
 *   0.30  first embers
 *   0.45  "The Fire." resolves
 *   0.60  atmosphere intensifies, haze appears
 *   0.75  camera pushes toward the heat source
 *   0.90  the cooking area emerges, pot silhouette hinted
 *   1.00  hand-off toward the pot
 *
 * Opt-in attributes inside `scope`:
 *   [data-fire="bleed"]  darkness inherited from chapter 02
 *   [data-fire="room" | "core" | "spill" | "smoke"]  atmosphere layers
 *   [data-fire="embers"] foreground particles
 *   [data-fire="haze"]   heat distortion
 *   [data-fire="line"]   copy lines
 *   [data-fire="pot"]    the silhouette that closes the chapter
 *   [data-fire-depth]    parallax planes
 */
export function useFireSequence(scope: RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    if (reduced) return;

    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // The darkness handed over from the ingredients lifts as we arrive.
        gsap.fromTo(
          "[data-fire='bleed']",
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: true },
          },
        );

        // Depth planes: embers ahead of us, atmosphere around us, room behind.
        const planes: Record<string, number> = { back: 5, mid: -6, front: -16 };
        for (const [plane, yPercent] of Object.entries(planes)) {
          gsap.to(`[data-fire-depth='${plane}']`, {
            yPercent,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        }

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.4,
            onUpdate: (self) => {
              const p = self.progress;
              // One continuous camera: still the fire shot until the pot
              // begins to emerge, then the pot shot. Never reset.
              if (p < 0.78) reportCameraShot("fire", p / 0.78);
              else reportCameraShot("pot", (p - 0.78) / 0.22);
            },
          },
        });

        // 0 → 0.15 — the room falls further into darkness.
        tl.fromTo("[data-fire='room']", { opacity: 0 }, { opacity: 0.35, duration: 0.15 }, 0)
          .fromTo("[data-fire='dust']", { opacity: 0.9 }, { opacity: 0.1, duration: 0.3 }, 0)

          // 0.30 — the first embers.
          .fromTo("[data-fire='embers']", { opacity: 0 }, { opacity: 1, duration: 0.22 }, 0.28)

          // 0.30 → 0.60 — the heat source builds.
          .to("[data-fire='room']", { opacity: 1, duration: 0.35 }, 0.3)
          .fromTo(
            "[data-fire='core']",
            { opacity: 0, scale: 0.72 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power1.out" },
            0.3,
          )
          .fromTo("[data-fire='spill']", { opacity: 0 }, { opacity: 0.85, duration: 0.4 }, 0.34)
          .fromTo("[data-fire='smoke']", { opacity: 0 }, { opacity: 0.5, duration: 0.4 }, 0.36)

          // 0.45 — the title resolves.
          .fromTo(
            "[data-fire='line']",
            { opacity: 0, yPercent: 70, filter: "blur(14px)" },
            {
              opacity: 1,
              yPercent: 0,
              filter: "blur(0px)",
              duration: 0.18,
              ease: "power2.out",
              stagger: 0.05,
            },
            0.44,
          )

          // 0.60 — heat becomes visible in the air.
          .fromTo("[data-fire='haze']", { opacity: 0 }, { opacity: 0.75, duration: 0.2 }, 0.58)

          // 0.75 — the camera moves toward the source.
          .to("[data-fire='stagePush']", { scale: 1.22, duration: 0.25, ease: "power1.inOut" }, 0.72)
          .to(
            "[data-fire='line']",
            { opacity: 0, yPercent: -55, filter: "blur(12px)", duration: 0.16, stagger: 0.04 },
            0.74,
          )

          // 0.90 — the cooking area, and the first hint of the pot.
          .fromTo(
            "[data-fire='pot']",
            { opacity: 0, scale: 1.16, yPercent: 10, filter: "blur(24px)" },
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              filter: "blur(4px)",
              duration: 0.24,
              ease: "power2.out",
            },
            0.78,
          )
          .to("[data-fire='core']", { opacity: 0.55, duration: 0.2 }, 0.82)
          .fromTo(
            "[data-fire='potLine']",
            { opacity: 0, yPercent: 40 },
            { opacity: 1, yPercent: 0, duration: 0.14 },
            0.88,
          )
          .to({}, { duration: 0.08 });
      }, root);

      dispose = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
}
