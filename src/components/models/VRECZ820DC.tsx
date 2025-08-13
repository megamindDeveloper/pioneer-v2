import { useVRECZ820DC } from "./useVRECZ820DC";


export default function VRECZ820DC(props: any) {
  const scene = useVRECZ820DC();

  return (
    <group scale={[40, 40, 40]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} {...props} />
    </group>
  );
}
