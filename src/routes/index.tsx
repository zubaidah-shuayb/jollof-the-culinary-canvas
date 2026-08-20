import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { IngredientStage } from "@/components/ingredients/IngredientStage";
import { FireStage } from "@/components/fire/FireStage";
import { JollofStage } from "@/components/jollof/JollofStage";
import { CreatorSignature } from "@/components/sections/CreatorSignature";
import { Manifesto } from "@/components/sections/Manifesto";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { Marquee } from "@/components/ui/Marquee";
import { ChapterIndicator } from "@/components/ui/ChapterIndicator";
import { siteConfig } from "@/config/site";

const title = siteConfig.siteName;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: siteConfig.description },
      { name: "author", content: siteConfig.creatorName },
      { property: "og:title", content: title },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: siteConfig.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: title,
          description: siteConfig.description,
          author: {
            "@type": "Person",
            name: siteConfig.creatorName,
            url: siteConfig.creatorWebsite,
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ChapterIndicator total={4} />
      <Hero />
      <IngredientStage />
      <FireStage />
      <JollofStage />
      <Marquee words={["TOMATO", "RODO", "TATASHE", "ONION", "RICE", "SMOKE", "FIRE"]} />
      <Manifesto />
      <StoryTeaser />
      <CreatorSignature />
    </>
  );
}
