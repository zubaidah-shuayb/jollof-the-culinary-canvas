import { forwardRef } from "react";

/**
 * FireAtmosphere — the midground: the light the fire throws into the room.
 *
 * No flame is drawn. This is purely the *effect* of a heat source: a warm
 * pool of light that breathes, plus smoke-coloured haze sitting above it.
 *
 * FUTURE: a React Three Fiber scene can replace the inner glow layers with a
 * real point light; the wrapper, parallax and scroll hooks stay identical.
 */
export const FireAtmosphere = forwardRef<HTMLDivElement, { paused?: boolean }>(
  function FireAtmosphere({ paused = false }, ref) {
    return (
      <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
        {/* the room the light lands in */}
        <div data-fire="room" className="fire-room absolute inset-0 opacity-0" />

        {/* the heat source itself — light, not flame */}
        <div
          data-fire="core"
          className="fire-core absolute left-1/2 bottom-[6%] h-[62vmin] w-[86vmin] -translate-x-1/2 opacity-0 md:h-[70vmin] md:w-[70vmin]"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />

        {/* spill light climbing the walls */}
        <div data-fire="spill" className="fire-spill absolute inset-0 opacity-0" />

        {/* smoke sitting in the upper air */}
        <div
          data-fire="smoke"
          className="fire-smoke absolute inset-x-[-10%] top-0 h-[70%] opacity-0"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />
      </div>
    );
  },
);
