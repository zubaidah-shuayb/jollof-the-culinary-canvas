import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { reportCameraShot } from "./useCinematicCamera";

/**
 * Scroll choreography for the final reveal.
 *
 * The camera emerges from the cooking environment, starts close on the plate
 * and slowly pulls back until the whole composition is readable. Typography
 * arrives progressively, never all at once.
 *
 *   [data-jollof="plate"]  the dish (future <Canvas> wrapper)
 *   [data-jollof="calm"]   the darkness the fire leaves behind
 *   [data-jollof="line"]   title + subtitle
 *   [data-jollof="triad"]  the three closing lines
 *   [data-jollof="glow"]   soft key light
 */
export function useJollofReveal(scope: RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root || reduced) return;

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
        gsap.fromTo(
          "[data-jollof='calm']",
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: true },
          },
        );

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.4,
            onUpdate: (self) => reportCameraShot("jollof", self.progress),
          },
        });

        // Close on the plate, then a long, slow pull back.
        tl.fromTo(
          "[data-jollof='plate']",
          { scale: 1.3, yPercent: 6, filter: "blur(10px) brightness(0.6)" },
          {
            scale: 1,
            yPercent: 0,
            filter: "blur(0px) brightness(1)",
            duration: 0.6,
            ease: "power1.out",
          },
          0,
        )
          .fromTo("[data-jollof='glow']", { opacity: 0.2 }, { opacity: 1, duration: 0.5 }, 0)
          .fromTo(
            "[data-jollof='line']",
            { opacity: 0, yPercent: 60, filter: "blur(12px)" },
            {
              opacity: 1,
              yPercent: 0,
              filter: "blur(0px)",
              duration: 0.2,
              ease: "power2.out",
              stagger: 0.12,
            },
            0.3,
          )
          .fromTo(
            "[data-jollof='triad']",
            { opacity: 0, yPercent: 40 },
            { opacity: 1, yPercent: 0, duration: 0.16, stagger: 0.1, ease: "power2.out" },
            0.66,
          )
          .to({}, { duration: 0.1 });
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
