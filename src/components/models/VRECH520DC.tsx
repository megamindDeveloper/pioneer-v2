import { useGLTF } from "@react-three/drei";

export default function VRECH520DC(props: any) {
  const { scene } = useGLTF("/models/VREC_H520DC.glb"); // Ensure this path matches your public folder setup
  return (
    <group scale={[40, 40, 40]} position={[0, 0, 0]}  rotation={[0, 0, 0]}  >
      <primitive object={scene} {...props} />
    </group>
  );
}
