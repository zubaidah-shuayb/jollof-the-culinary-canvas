import { useEffect, useMemo, useState } from "react";

/**
 * Ember particle system — chapter 03 foreground.
 *
 * CSS/DOM implementation of the ember contract, deliberately isolated so it
 * can be swapped for a GPU/WebGL particle emitter later without touching
 * FireStage: render a component with the same props and change the import.
 *
 * Contract: absolutely positioned, pointer-events none, fills its parent.
 *   count     — desired particle budget (auto-reduced on small screens)
 *   paused    — freeze the system (reduced motion)
 *   intensity — 0 → 1 multiplier on opacity
 */
export type EmberProps = {
  count?: number;
  paused?: boolean;
  intensity?: number;
  className?: string;
};

/** Deterministic pseudo-random so SSR and client agree. */
function rand(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function EmberParticles({ count = 48, paused = false, intensity = 1, className }: EmberProps) {
  // Mount empty: the particle budget depends on the device, so it is decided
  // after hydration to keep server and client markup identical.
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    // Device tiers: mobile / tablet / desktop, further reduced on low-core
    // hardware. Decided once after hydration — never on scroll.
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    const tablet = window.matchMedia("(min-width: 640px) and (max-width: 1023px)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const tier = mobile ? 0.34 : tablet ? 0.6 : cores >= 8 ? 1 : 0.72;
    setBudget(Math.max(8, Math.round(count * tier)));
  }, [count]);


  const embers = useMemo(
    () =>
      Array.from({ length: budget }, (_, i) => {
        const a = rand(i, 1);
        const b = rand(i, 2);
        const c = rand(i, 3);
        const d = rand(i, 4);
        return {
          left: `${(a * 104 - 2).toFixed(2)}%`,
          size: 1.2 + b * 3.4,
          drift: `${(c * 120 - 60).toFixed(1)}px`,
          rise: `${(58 + d * 44).toFixed(0)}vh`,
          duration: `${(5.5 + c * 9).toFixed(2)}s`,
          delay: `${(-(a * 14)).toFixed(2)}s`,
          opacity: (0.22 + b * 0.62) * intensity,
          hot: d > 0.78,
        };
      }),
    [budget, intensity],
  );

  return (
    <div
      aria-hidden
      data-fire="embers"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            opacity: e.opacity,
            background: e.hot ? "var(--gold)" : "var(--flame)",
            animationDuration: e.duration,
            animationDelay: e.delay,
            animationPlayState: paused ? "paused" : "running",
            ["--ember-x" as string]: e.drift,
            ["--ember-y" as string]: e.rise,
          }}
        />
      ))}
    </div>
  );
}
