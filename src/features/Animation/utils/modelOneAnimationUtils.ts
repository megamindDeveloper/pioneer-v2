import { ModelOneKeyframe } from "@/types/animationTypes";
import * as THREE from "three";


/**
 * Interpolates camera properties for the Model 1 animation.
 */
export function interpolateModelOneCamera(time: number, keyframes: ModelOneKeyframe[], dashcamGroupRef?: React.RefObject<THREE.Group | null>) { // Renamed function
  
    const totalFrames = keyframes.length;
  const frameIndex = time * (totalFrames - 1);
  const frame1 = Math.floor(frameIndex);
  const frame2 = Math.min(frame1 + 1, totalFrames - 1);
  const t = frameIndex - frame1;

  const keyframe1 = keyframes[frame1];
  const keyframe2 = keyframes[frame2];

  const pos1 = new THREE.Vector3(...keyframe1.position);
  const pos2 = new THREE.Vector3(...keyframe2.position);
  const position = pos1.lerp(pos2, t);

  const isProblematicRange = keyframe1.time === 0.0417 && keyframe2.time === 0.0833;

  let quaternion: THREE.Quaternion;

  if (isProblematicRange) {
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    const normalQuaternion = new THREE.Quaternion();
    normalQuaternion.slerpQuaternions(quat1, quat2, t);

    let target: THREE.Vector3;
    if (dashcamGroupRef?.current) {
      target = new THREE.Vector3();
      dashcamGroupRef.current.getWorldPosition(target);
    } else {
      target = new THREE.Vector3(0, 1.2, 0.3);
    }

    const direction = new THREE.Vector3().subVectors(position, target).normalize();
    const distance = new THREE.Vector3(...keyframe1.position).distanceTo(target);
    const newPosition = new THREE.Vector3().copy(target).add(direction.multiplyScalar(distance));
    const blendFactor = THREE.MathUtils.smoothstep(0, 1, t);
    position.lerpVectors(position, newPosition, blendFactor);

    const tempCamera = new THREE.PerspectiveCamera();
    tempCamera.position.copy(position);
    tempCamera.lookAt(target);
    const lookAtQuaternion = tempCamera.quaternion.clone();

    const smoothBlend = THREE.MathUtils.smoothstep(0.4, 0.6, t);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(normalQuaternion, lookAtQuaternion, smoothBlend);
  } else {
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(quat1, quat2, t);
  }

  const fov1 = keyframe1.fov;
  const fov2 = keyframe2.fov;
  const focalLength = THREE.MathUtils.lerp(fov1, fov2, t);
  return { position, quaternion, focalLength };
}

/**
 * A wrapper to call interpolateModelOneCamera with scroll progress.
 */
export function interpolateModelOneCameraFromScroll( // Renamed function
  scrollProgress: number,
  keyframes: ModelOneKeyframe[],
  dashcamGroupRef?: React.RefObject<THREE.Group | null>
) {
  return interpolateModelOneCamera(scrollProgress, keyframes, dashcamGroupRef);
}

/**
 * Calculates the adjusted animation progress based on sticky scroll zones.
 * NOTE: This function is generic and can be used for any scroll animation.
 */
export function getAdjustedProgress(rawProgress: number, zones: [number, number][]): number {
  // 1. Calculate the total duration of all pauses.
  const totalPauseDuration = zones.reduce((acc, [start, end]) => acc + (end - start), 0);
  const totalAnimationDuration = 1.0 - totalPauseDuration;

  // Edge case: If pauses take up the entire timeline, the animation is always at its end.
  if (totalAnimationDuration <= 0) return 1;

  let accumulatedPauseDuration = 0;

  // 2. Iterate through each defined sticky zone.
  for (const [start, end] of zones) {
    // If the scroll is INSIDE the current sticky zone...
    if (rawProgress >= start && rawProgress <= end) {
      // The animation progress should be frozen at the value it had right when it ENTERED this zone.
      // This value is the zone's start time, adjusted for any PREVIOUS pauses.
      const effectiveProgress = start - accumulatedPauseDuration;
      // Scale the result to the available animation time and return.
      return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
    }

    // If the scroll is BEFORE the current sticky zone...
    if (rawProgress < start) {
      // We haven't reached this pause yet. The animation progress is simply the raw
      // scroll progress, adjusted for the pauses we've already passed.
      const effectiveProgress = rawProgress - accumulatedPauseDuration;
      // Scale and return.
      return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
    }

    // If we reach here, it means the scroll is AFTER the current zone.
    // Add this zone's duration to our accumulator and check the next zone.
    accumulatedPauseDuration += end - start;
  }

  // 3. If the loop completes, it means the raw scroll is past ALL sticky zones.
  // The animation progress is the raw progress minus the total duration of all pauses.
  const effectiveProgress = rawProgress - accumulatedPauseDuration;
  return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
}
