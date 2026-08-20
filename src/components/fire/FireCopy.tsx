/** Editorial typography for chapter 03. Purely presentational. */
export function FireCopy() {
  return (
    <div
      data-fire="copy"
      className="shell pointer-events-none absolute inset-x-0 bottom-[10svh] md:bottom-auto md:top-1/2 md:-translate-y-1/2"
    >
      <div className="max-w-[86vw] md:max-w-[44vw]">
        <span className="block overflow-hidden">
          <span data-fire="line" className="text-label block text-gold opacity-0">
            Chapter 03 — The fire
          </span>
        </span>

        <span className="mt-4 block overflow-hidden md:mt-6">
          <h2
            data-fire="line"
            className="text-display block text-[17vw] leading-[0.84] opacity-0 md:text-[9vw] lg:text-[8rem]"
          >
            The Fire.
          </h2>
        </span>

        <span className="mt-4 block overflow-hidden md:mt-6">
          <p data-fire="line" className="block max-w-[24ch] text-lg text-flame opacity-0 md:text-2xl">
            Everything changes when the fire comes on.
          </p>
        </span>
      </div>
    </div>
  );
}
