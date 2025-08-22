import { useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

/**
 * A hook to fade a 3D model in or out based on scroll progress.
 */
export function useFadeModelOpacity(
  groupRef: React.RefObject<THREE.Group | null>,
  scrollProgress: number,
  rangeStart = 0,
  rangeEnd = 0.12
) {
  useFrame(() => {
    if (!groupRef.current) return;

    const progress = THREE.MathUtils.clamp((scrollProgress - rangeStart) / (rangeEnd - rangeStart), 0, 1);
    const opacity = progress;

    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = opacity;
            mat.needsUpdate = true;
          });
        } else {
          mesh.material.transparent = true;
          mesh.material.opacity = opacity;
          mesh.material.needsUpdate = true;
        }
      }
    });
  });
}