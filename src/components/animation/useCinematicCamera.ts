import { useEffect, useRef, type RefObject } from "react";

/**
 * Shared cinematic camera architecture.
 *
 * There is ONE conceptual camera moving through the whole film:
 *   hero → ingredients → fire → pot → jollof
 * Sections never reset it; they only report "the camera is now at t = x
 * within my shot", and the rig interpolates a single continuous state.
 *
 * TODAY that state is consumed by CSS/GSAP layers (via `onUpdate`).
 * LATER a React Three Fiber <Canvas> can subscribe to the exact same rig and
 * drive a real PerspectiveCamera — no section code has to change.
 */

export type CameraShot = "hero" | "ingredients" | "fire" | "pot" | "jollof";

export type CameraState = {
  /** Current shot the camera is inside. */
  shot: CameraShot;
  /** 0 → 1 progress within that shot. */
  progress: number;
  /** Global 0 → 1 progress along the whole journey. */
  journey: number;
};

/** Order of shots along the journey. Extend as chapters are built. */
export const cameraShots: CameraShot[] = ["hero", "ingredients", "fire", "pot", "jollof"];

type Listener = (state: CameraState) => void;

const state: CameraState = { shot: "hero", progress: 0, journey: 0 };
const listeners = new Set<Listener>();

/** Sections call this from their ScrollTrigger onUpdate. Never resets. */
export function reportCameraShot(shot: CameraShot, progress: number) {
  const i = cameraShots.indexOf(shot);
  state.shot = shot;
  state.progress = progress;
  state.journey = (i + progress) / cameraShots.length;
  for (const l of listeners) l(state);
}

export function getCameraState(): Readonly<CameraState> {
  return state;
}

/**
 * Subscribe to the rig without re-rendering React. `onUpdate` is called on
 * every scroll tick, so keep it cheap (transform writes only).
 */
export function useCinematicCamera(onUpdate: (state: CameraState) => void) {
  const cb = useRef(onUpdate);
  cb.current = onUpdate;

  useEffect(() => {
    const listener: Listener = (s) => cb.current(s);
    listeners.add(listener);
    listener(state);
    return () => {
      listeners.delete(listener);
    };
  }, []);
}

/**
 * Convenience: mirror the camera state onto an element as CSS custom
 * properties (`--cam-progress`, `--cam-journey`) for purely visual effects.
 */
export function useCameraCssVars(ref: RefObject<HTMLElement | null>) {
  useCinematicCamera((s) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--cam-progress", s.progress.toFixed(4));
    el.style.setProperty("--cam-journey", s.journey.toFixed(4));
  });
}
