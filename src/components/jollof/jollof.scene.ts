
import stillImage from "@/assets/jollof-final.jpg";

export type PbrSlot = {
  id: string;
  /** Path the loader will use once the asset exists. */
  url: string;
  /** Physically based material intent for the future 3D scene. */
  material: {
    roughness: number;
    metalness: number;
    normalMap?: string;
    aoMap?: string;
  };
};

export const jollofScene = {
  still: stillImage,
  /** No 3D is loaded while this is false. */
  available: false,
  /** Environment lighting intent for the future scene (HDRI + warm key). */
  environment: {
    hdri: "/hdri/warm-kitchen.hdr",
    keyLight: { color: "var(--flame)", intensity: 2.4 },
    exposure: 1.05,
  },
  models: [
    { id: "plate", url: "/models/plate.glb", material: { roughness: 0.42, metalness: 0.08 } },
    { id: "jollof", url: "/models/jollof.glb", material: { roughness: 0.78, metalness: 0 } },
    { id: "chicken", url: "/models/chicken.glb", material: { roughness: 0.55, metalness: 0 } },
    { id: "plantain", url: "/models/plantain.glb", material: { roughness: 0.6, metalness: 0 } },
  ] satisfies PbrSlot[],
} as const;

export const finaleLines = [
  { id: "title", text: "This is jollof." },
  { id: "sub", text: "Made to be shared." },
] as const;

export const finaleTriad = ["The taste.", "The fire.", "The memory."] as const;
