import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { reportCameraShot } from "./useCinematicCamera";

/**
 * Scroll choreography for the ingredient chapter.
 *
 * The section is tall; its inner stage is CSS-sticky. A single scrubbed GSAP
 * timeline moves the camera through one beat at a time. Elements opt in with:
 *   [data-ing="beat"]   — one ingredient beat (contains art + copy + glow)
 *   [data-ing="art"]    — the dominant subject
 *   [data-ing="glow"]   — that beat's environment light
 *   [data-ing="line"]   — copy lines, staggered
 *   [data-depth]        — near | mid | far parallax planes
 *   [data-ing="bleed"]  — the darkness carried over from the hero
 */
export function useIngredientScroll(scope: RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    if (reduced) {
      root.querySelectorAll<HTMLElement>("[data-ing]").forEach((el) => {
        el.style.opacity = "1";
        el.style.filter = "none";
        el.style.transform = "none";
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
        const beats = gsap.utils.toArray<HTMLElement>("[data-ing='beat']");
        if (!beats.length) return;

        // Darkness handed over from the hero lifts as the new world settles.
        gsap.fromTo(
          "[data-ing='bleed']",
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: true },
          },
        );

        // Depth planes drift at different speeds — parallax, not chaos.
        const planes: Record<string, number> = { far: 6, mid: -8, near: -20 };
        for (const [depth, yPercent] of Object.entries(planes)) {
          gsap.to(`[data-depth='${depth}']`, {
            yPercent,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            onUpdate: (self) => reportCameraShot("ingredients", self.progress),
          },
        });

        beats.forEach((beat, i) => {
          const at = i;
          const art = beat.querySelector("[data-ing='art']");
          const glow = beat.querySelector("[data-ing='glow']");
          const lines = beat.querySelectorAll("[data-ing='line']");
          const isLast = i === beats.length - 1;

          tl.fromTo(
            art,
            { yPercent: 22, scale: 0.78, rotate: -9, opacity: 0, filter: "blur(20px)" },
            {
              yPercent: 0,
              scale: 1,
              rotate: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power2.out",
            },
            at,
          )
            .fromTo(
              glow,
              { opacity: 0, scale: 0.7 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" },
              at,
            )
            .fromTo(
              lines,
              { opacity: 0, yPercent: 60, filter: "blur(12px)" },
              {
                opacity: 1,
                yPercent: 0,
                filter: "blur(0px)",
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.08,
              },
              at + 0.08,
            );

          if (!isLast) {
            tl.to(
              art,
              {
                yPercent: -18,
                scale: 1.14,
                rotate: 7,
                opacity: 0,
                filter: "blur(16px)",
                duration: 0.5,
                ease: "power2.in",
              },
              at + 0.62,
            )
              .to(glow, { opacity: 0, scale: 1.25, duration: 0.5, ease: "power1.in" }, at + 0.62)
              .to(
                lines,
                {
                  opacity: 0,
                  yPercent: -50,
                  filter: "blur(10px)",
                  duration: 0.42,
                  ease: "power2.in",
                  stagger: 0.05,
                },
                at + 0.62,
              );
          }
        });

        // Hold on the final beat so the exit into the next chapter is soft.
        tl.to({}, { duration: 0.6 });
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
