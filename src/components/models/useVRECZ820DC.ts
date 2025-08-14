// components/models/useVRECZ820DC.ts
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export function useVRECZ820DC() {
  const { scene } = useGLTF("/models/VREC-Z820DC-2.glb");

  // Return a cloned scene to prevent scene mutations between instances
  return useMemo(() => scene.clone(), [scene]);
}
