import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DirectionalLightConfig } from "@/types/lights";

export const SceneLights = ({
  hovered,
  directionalLights,
}: {
  hovered: boolean;
  directionalLights: DirectionalLightConfig[];
}) => {
  const lightRefs = useRef<(THREE.DirectionalLight | null)[]>([]);

  useFrame(() => {
    directionalLights.forEach((light, i) => {
      const ref = lightRefs.current[i];
      if (!ref) return;

      const targetPos = new THREE.Vector3(
        ...(hovered ? light.hoveredPosition ?? light.position : light.position)
      );

      const targetIntensity = hovered
        ? light.hoveredIntensity ?? light.intensity ?? 1.5
        : light.intensity ?? 1.5;

      ref.position.lerp(targetPos, 0.1);
      ref.intensity += (targetIntensity - ref.intensity) * 0.1;
    });
  });

  return (
    <>
      {directionalLights.map((light, index) => (
        <directionalLight
          key={index}
          ref={(el) => (lightRefs.current[index] = el)}
          position={light.position}
          intensity={light.intensity ?? 1.5}
          castShadow={light.castShadow ?? true}
          color={light.color ?? "#ffffff"}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      ))}
    </>
  );
};
