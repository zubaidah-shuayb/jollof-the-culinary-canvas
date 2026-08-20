import tomato from "@/assets/ingredient-tomato.png";
import pepper from "@/assets/ingredient-pepper.png";
import onion from "@/assets/ingredient-onion.png";
import rice from "@/assets/ingredient-rice.png";
import aromatics from "@/assets/ingredient-aromatics.png";

/**
 * The ingredient beats of chapter 02.
 *
 * `image` is a PLACEHOLDER still (transparent PNG), deliberately kept in a
 * separate field from `model`, which names the future .glb that will replace
 * it once the 3D assets exist. Nothing here loads 3D today.
 */
export type IngredientBeat = {
  id: string;
  label: string;
  line: string;
  note: string;
  /** Placeholder imagery — 2D, not 3D. */
  image: string;
  /** Future React Three Fiber asset. Does NOT exist yet. */
  model: string;
  /** Warm light colour for this beat's environment. */
  glow: string;
  /** Depth plane the dominant subject sits on. */
  depth: "near" | "mid" | "far";
};

export const ingredientBeats: IngredientBeat[] = [
  {
    id: "tomato",
    label: "Tomato",
    line: "The colour starts here.",
    note: "Blended, then cooked down until the water leaves and the red deepens.",
    image: tomato,
    model: "/models/tomato.glb",
    glow: "var(--ember)",
    depth: "near",
  },
  {
    id: "pepper",
    label: "Pepper",
    line: "Then the heat arrives.",
    note: "Tatashe for body. Rodo for the sting that stays after the spoon.",
    image: pepper,
    model: "/models/pepper.glb",
    glow: "var(--flame)",
    depth: "mid",
  },
  {
    id: "onion",
    label: "Onion",
    line: "The foundation.",
    note: "Sweated slow in oil until it stops being sharp and starts being sweet.",
    image: onion,
    model: "/models/onion.glb",
    glow: "var(--gold)",
    depth: "near",
  },
  {
    id: "rice",
    label: "Rice",
    line: "The canvas.",
    note: "Long grain, washed until the water runs clear. It takes everything in.",
    image: rice,
    model: "/models/rice.glb",
    glow: "var(--cream)",
    depth: "mid",
  },
];

/** Garlic, ginger and spice live in the background of the whole scene. */
export const aromaticsPlate = {
  image: aromatics,
  model: "/models/spices.glb",
  alt: "Garlic, ginger and ground pepper spice",
};
