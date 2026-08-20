import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Layer = { ref: RefObject<HTMLElement | null>; strength: number };

/**
 * Desktop-only cursor parallax. Each layer moves by `strength` px at the
 * viewport edges, eased with a quickTo tween so it never feels snappy.
 * Disabled on coarse pointers and under prefers-reduced-motion.
 */
export function useCursorParallax(layers: Layer[]) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      const setters = layers
        .filter((l) => l.ref.current)
        .map((l) => ({
          strength: l.strength,
          x: gsap.quickTo(l.ref.current!, "x", { duration: 1.1, ease: "power3.out" }),
          y: gsap.quickTo(l.ref.current!, "y", { duration: 1.1, ease: "power3.out" }),
        }));

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        for (const s of setters) {
          s.x(nx * s.strength);
          s.y(ny * s.strength);
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      dispose = () => window.removeEventListener("pointermove", onMove);
    })();

    return () => {
      cancelled = true;
      dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
}
