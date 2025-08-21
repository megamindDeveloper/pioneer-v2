import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { SRGBColorSpace } from "three";

interface Props {
  scrollProgress: number;
  imagePath: string;
  triggers: { introImageFade: [number, number] };
}

/**
 * Manages the intro image animation, controlled by props from the config.
 */
export default function IntroImageAnimation({ scrollProgress, imagePath, triggers }: Props) {
  const imagePlaneRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [holdEnd, fadeEnd] = triggers.introImageFade;

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imagePath, (texture) => {
      texture.colorSpace = SRGBColorSpace;
      if (materialRef.current) {
        materialRef.current.map = texture;
        materialRef.current.needsUpdate = true;
      }
    });
  }, [imagePath]);

  useEffect(() => {
    if (!imagePlaneRef.current || !materialRef.current) return;
    const { gsap } = require("gsap");

    const progress = THREE.MathUtils.clamp(scrollProgress / fadeEnd, 0, 1);
    const scale = THREE.MathUtils.lerp(12, 5.4, progress);
    imagePlaneRef.current.scale.set(scale, scale, 1);
    imagePlaneRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI, progress);
    
    let targetOpacity = 1;
    if (scrollProgress > holdEnd) {
      const t = (scrollProgress - holdEnd) / (fadeEnd - holdEnd);
      targetOpacity = THREE.MathUtils.lerp(1, 0, t);
    }

    gsap.to(materialRef.current, { opacity: targetOpacity, duration: 0.3, ease: "power1.out" });
    imagePlaneRef.current.visible = scrollProgress <= fadeEnd;

  }, [scrollProgress, holdEnd, fadeEnd]);

  return (
    <mesh ref={imagePlaneRef} renderOrder={10} position={[0.004, 1.211, -4]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={materialRef} transparent={true} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}