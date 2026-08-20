/**
 * JOLLOF — central site configuration.
 * Edit values here; nothing below should be hardcoded in components.
 */

const creatorName = "Zubaidah Shuayb";

export const siteConfig = {
  creatorName,
  creatorRole: "Concept, creative direction, design, development and motion",
  creatorWebsite: "https://zeesportfolio-pearl.vercel.app/",
  creatorInstagram: "https://instagram.com/zeeaybb",
  creatorGithub: "https://github.com/zubaidah-shuayb",
  creatorEmail: "zubaidahshuayb000@gmail.com",

  siteTitle: "JOLLOF.",
  siteName: "JOLLOF. — A Nigerian Digital Experience",
  tagline: "A cinematic study of fire, rice and smoke.",
  description:
    "An immersive Nigerian digital experience inspired by jollof, fire, food and culture.",
  year: 2026,

  nav: [
    { label: "EXPERIENCE", to: "/experience" },
    { label: "STORY", to: "/story" },
    { label: "ABOUT", to: "/about" },
  ] as const,

  /** The signature block, in the order it is read. */
  credits: [
    { role: "CONCEPT", name: creatorName },
    { role: "CREATIVE DIRECTION", name: creatorName },
    { role: "DESIGN", name: creatorName },
    { role: "DEVELOPMENT", name: creatorName },
    { role: "MOTION / INTERACTION", name: creatorName },
  ] as const,

  contact: {
    email: "hello@jollof.experience",
    location: "Lagos, Nigeria",
  },

  social: [
    { label: "Website", href: "https://zeesportfolio-pearl.vercel.app/" },
    { label: "Instagram", href: "https://instagram.com/zeeaybb" },
    { label: "GitHub", href: "https://github.com/zubaidah-shuayb" },
  ],

  assets: {
    hero: "/src/assets/hero-jollof.jpg",
    ember: "/src/assets/texture-ember.jpg",
    fire: "/src/assets/story-fire.jpg",
    /** Drop-in slots for the future 3D hero (React Three Fiber). */
    models: {
      jollof: "/models/jollof.glb",
      chicken: "/models/chicken.glb",
      plate: "/models/plate.glb",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
