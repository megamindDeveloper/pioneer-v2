import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { interpolateModelOneCameraFromScroll } from "@/features/Animation/utils/modelOneAnimationUtils";

/**
 * This hook is now generic. It takes animation data and scroll triggers as arguments,
 * allowing it to control the camera for any model configuration.
 */
export function useCameraAnimationSync(
  scrollProgress: number,
  carScene: THREE.Group,
  dashcamGroupRef: React.RefObject<THREE.Group | null>,
  setLensAnimation: (isAnimating: boolean) => void,
  cameraAnimationData: any,
  triggers: { cameraMoveStart: number, lensExplode: [number, number] }
) {
  const { camera } = useThree();
  const explodedRef = useRef(false);
  const cameraMountWorldMatrix = new THREE.Matrix4();

  useFrame(() => {
    const [startExplode, endExplode] = triggers.lensExplode;
    const inExplodeRange = scrollProgress >= startExplode && scrollProgress < endExplode;

    if (inExplodeRange && !explodedRef.current) {
      setLensAnimation(true);
      explodedRef.current = true;
    } else if (!inExplodeRange && explodedRef.current) {
      setLensAnimation(false);
      explodedRef.current = false;
    }

    const progressInRange = THREE.MathUtils.clamp(
      (scrollProgress - triggers.cameraMoveStart) / (1.0 - triggers.cameraMoveStart),
      0, 1
    );

    const { position, quaternion, focalLength } = interpolateModelOneCameraFromScroll(
      progressInRange, cameraAnimationData, dashcamGroupRef
    );

    camera.position.copy(position);
    camera.quaternion.copy(quaternion);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = focalLength;
      camera.updateProjectionMatrix();
    }

    const cameraMount = carScene.getObjectByName("CameraMountFront");
    if (cameraMount && dashcamGroupRef?.current) {
      cameraMount.updateWorldMatrix(true, false);
      dashcamGroupRef.current.matrix.copy(cameraMount.matrixWorld);
      dashcamGroupRef.current.matrix.decompose(
        dashcamGroupRef.current.position,
        dashcamGroupRef.current.quaternion,
        dashcamGroupRef.current.scale
      );
    }
  });
}