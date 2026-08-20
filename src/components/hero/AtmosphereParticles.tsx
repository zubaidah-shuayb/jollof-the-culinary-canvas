import { useMemo } from "react";

/** Subtle atmospheric dust drifting in the warm light. Purely decorative. */
export function AtmosphereParticles({ count = 22, paused = false }: { count?: number; paused?: boolean }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 4297 + 7919) % 233280) / 233280;
        return {
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(r2 * 100).toFixed(2)}%`,
          size: 1 + r2 * 2.2,
          delay: -(r * 24).toFixed(2) + "s",
          duration: `${16 + r2 * 18}s`,
          opacity: 0.12 + r * 0.3,
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            animationDelay: m.delay,
            animationDuration: m.duration,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
    </div>
  );
}
