import { useRef } from "react";
import { FoodStage } from "@/components/hero/FoodStage";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { useHeroIntro } from "@/components/animation/useHeroIntro";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  useHeroIntro(rootRef);

  return (
    <section
      ref={rootRef}
      data-chapter="01"
      className="relative h-[100svh] overflow-hidden bg-char"
    >
      <FoodStage />
      <div className="relative h-full">
        <HeroCopy />
      </div>
    </section>
  );
}
