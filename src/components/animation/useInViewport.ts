import { useEffect, useState, type RefObject } from "react";

/**
 * True while `ref` intersects the viewport (with a small margin so effects
 * are already alive just before they scroll in). Used to pause expensive
 * atmospheric effects — embers, SVG turbulence — while a chapter is off
 * screen. State flips at most twice per pass, so it costs no re-render churn.
 */
export function useInViewport(ref: RefObject<HTMLElement | null>, rootMargin = "20% 0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin]);

  return inView;
}
