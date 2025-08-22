import * as THREE from "three";

/**
 * Adjusts raw scroll progress to account for "sticky" or "paused" zones.
 * @param rawProgress - The linear scroll progress from 0 to 1.
 * @param zones - An array of [start, end] tuples defining the pause zones.
 * @returns The adjusted progress value, which freezes during sticky zones.
 */
export function getAdjustedProgress(rawProgress: number, zones: [number, number][]): number {
  const totalPauseDuration = zones.reduce((acc, [start, end]) => acc + (end - start), 0);
  const totalAnimationDuration = 1.0 - totalPauseDuration;

  if (totalAnimationDuration <= 0) return 1;

  let accumulatedPauseDuration = 0;

  for (const [start, end] of zones) {
    if (rawProgress >= start && rawProgress <= end) {
      const effectiveProgress = start - accumulatedPauseDuration;
      return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
    }

    if (rawProgress < start) {
      const effectiveProgress = rawProgress - accumulatedPauseDuration;
      return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
    }
    
    accumulatedPauseDuration += end - start;
  }

  const effectiveProgress = rawProgress - accumulatedPauseDuration;
  return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
}