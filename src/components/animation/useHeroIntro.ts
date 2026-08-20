import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { reportCameraShot } from "./useCinematicCamera";

/**
 * Cinematic hero entrance + scroll hand-off.
 *
 * Animation logic lives here so hero UI components stay presentational.
 * Elements opt in with data attributes inside `scope`:
 *   [data-hero="light"]  — the darkness lifting off the food
 *   [data-hero="food"]   — the food composition (also scroll-parallaxed)
 *   [data-hero="title"]  — the JOLLOF. wordmark
 *   [data-hero="line"]   — supporting lines, staggered
 *   [data-hero="scroll"] — scroll cue
 */
export function useHeroIntro(scope: RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    if (reduced) {
      root.querySelectorAll<HTMLElement>("[data-hero]").forEach((el) => {
        el.style.opacity = "1";
        el.style.filter = "none";
        el.style.transform = "none";
        el.style.letterSpacing = "normal";
      });
      return;
    }

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
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // 1. Light rises out of near-total darkness.
        tl.fromTo(
          "[data-hero='light']",
          { opacity: 0, scale: 1.18, filter: "blur(28px) brightness(0.25)" },
          { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)", duration: 2.8 },
        )
          // 2. Wordmark unlocks: tight -> settled tracking, blur burning off.
          .fromTo(
            "[data-hero='title']",
            { opacity: 0, y: 60, scale: 1.06, letterSpacing: "0.32em", filter: "blur(18px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              letterSpacing: "-0.02em",
              filter: "blur(0px)",
              duration: 2.2,
            },
            "-=1.9",
          )
          .fromTo(
            "[data-hero='line']",
            { opacity: 0, y: 24, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, stagger: 0.18 },
            "-=1.4",
          )
          .fromTo(
            "[data-hero='scroll']",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 1.4 },
            "-=1.1",
          );

        // 3. Scroll hand-off: the camera keeps travelling, the plate falls
        //    behind and out of focus rather than simply switching off.
        gsap.to("[data-hero='food']", {
          yPercent: 14,
          scale: 1.14,
          filter: "blur(14px) brightness(0.45)",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => reportCameraShot("hero", self.progress),
          },
        });

        gsap.to("[data-hero='copy']", {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "60% top", scrub: true },
        });
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
