import { useGLTF } from "@react-three/drei";

export default function VRECH120SC(props: any) {
  const { scene } = useGLTF("/models/VREC_H120SC.glb"); // Ensure this path matches your public folder setup
  return (
    <group scale={[40, 40, 40]} position={[0, 0, 0]}>
      <primitive object={scene} {...props} />
    </group>
  );
}
