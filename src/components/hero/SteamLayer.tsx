/**
 * Steam architecture.
 *
 * This is the CSS/SVG implementation of the steam contract. It is deliberately
 * isolated so it can be swapped for a WebGL/GPU particle version later without
 * touching the hero layout: render a component with the same props from
 * `src/components/hero/steam/` and change the import in `FoodStage.tsx`.
 *
 * Contract: absolutely positioned, pointer-events none, fills its parent,
 * `intensity` scales opacity/volume, `paused` freezes it (reduced motion).
 */
export type SteamProps = {
  intensity?: number;
  paused?: boolean;
  className?: string;
};

const plumes = [
  { left: "38%", width: 180, delay: 0, duration: 11 },
  { left: "50%", width: 240, delay: 2.6, duration: 14 },
  { left: "62%", width: 160, delay: 5.2, duration: 12.5 },
];

export function SteamLayer({ intensity = 1, paused = false, className }: SteamProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {plumes.map((p, i) => (
        <span
          key={i}
          className="steam-plume"
          style={{
            left: p.left,
            width: p.width,
            opacity: 0.14 * intensity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
    </div>
  );
}
