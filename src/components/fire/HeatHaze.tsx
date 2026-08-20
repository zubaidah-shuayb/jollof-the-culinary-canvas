/**
 * HeatHaze — lightweight atmospheric distortion above the heat source.
 *
 * Implemented as an SVG feTurbulence displacement over a transparent plate,
 * animated slowly. The animation only exists while the chapter is on screen
 * (`active`), so the filter never churns in the background. A future WebGL
 * pass can replace this component wholesale — the contract is "absolutely
 * positioned, pointer-events none, fills parent".
 */
export function HeatHaze({ active = true }: { active?: boolean }) {
  return (
    <div aria-hidden data-fire="haze" className="pointer-events-none absolute inset-0 hidden opacity-0 md:block">
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <filter id="jollof-heat" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="7">
            {active && (
              <animate
                attributeName="baseFrequency"
                dur="14s"
                values="0.012 0.05; 0.018 0.032; 0.012 0.05"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div
        className="heat-plate absolute inset-x-0 bottom-0 h-[62%]"
        style={{ filter: "url(#jollof-heat)" }}
      />
    </div>
  );
}
