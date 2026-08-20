import { useEffect, useRef, useState } from "react";

/**
 * Storytelling progress indicator — "SCROLL — 02 / 04".
 *
 * Watches every [data-chapter] section with one IntersectionObserver so it
 * never re-renders on scroll ticks, only when the chapter actually changes.
 */
export function ChapterIndicator({ total = 4 }: { total?: number }) {
  const [chapter, setChapter] = useState("01");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setChapter(e.target.getAttribute("data-chapter") ?? "01");
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-3 md:flex lg:left-16"
    >
      <span className="text-label text-muted-foreground">Scroll</span>
      <span className="hairline h-px w-8" />
      <span className="text-label text-gold tabular-nums">
        {chapter} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
