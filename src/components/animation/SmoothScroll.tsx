import { useEffect, type ReactNode } from "react";

/**
 * Animation layer only. Initialises Lenis smooth scrolling on the client
 * and syncs it with GSAP ScrollTrigger. Renders no markup of its own.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        lerp: 0.09,
      });

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
