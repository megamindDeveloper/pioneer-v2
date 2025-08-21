
import { useCameraAnimationSync } from '@/features/Animation/hooks/useCameraAnimationSync';
import * as THREE from 'three';

interface CameraAnimationProps {
  scrollProgress: number;
  carScene: THREE.Group;
  dashcamGroupRef: React.RefObject<THREE.Group | null>;
  setLensAnimation: (isAnimating: boolean) => void;
}

/**
 * A component responsible for orchestrating the camera animation via a custom hook.
 */
export default function CameraAnimation({
  scrollProgress,
  carScene,
  dashcamGroupRef,
  setLensAnimation,
}: CameraAnimationProps) {
  useCameraAnimationSync(
    scrollProgress,
    carScene,
    dashcamGroupRef,
    setLensAnimation
  );
  return null;
}