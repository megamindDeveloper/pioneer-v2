import React, { useRef, useEffect, useState, useMemo } from "react";

import * as THREE from "three";
import { SRGBColorSpace } from "three";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "@/features/Animation/utils/math";

import { getInterpolatedClip } from "@/features/Animation/utils/clipPathUtils";
import { ModelAnimationConfig } from "@/features/Animation/configs/animationConfigTypes";
import { useGLTF } from "@react-three/drei";
import { clipPathToShape } from "@/features/Animation/utils/threeUtils";

// Placeholder shapes for clip path animation - consider moving to config if they change per model
const openShape = "polygon(-15% 34%, 0 0, 100% 0, 115% 34%, 50% 44%)";
const closedShape = "polygon(49.75% 0%, 49.75% 0%, 49.75% 0%, 49.75% 0%, 50.41% 66.01%)";

interface SceneProps {
  onLoadComplete: () => void;
  scrollProgress: number;
  config: ModelAnimationConfig;
  setCarSceneRef: (ref: THREE.Group) => void;
  dashcamGroupRef: React.RefObject<THREE.Group | null>;
}
/**
 * The main 3D scene. It's now a generic component that loads and manages models
 * and animations based entirely on the provided config object.
 */
export default function Scene({ onLoadComplete, scrollProgress, config, setCarSceneRef, dashcamGroupRef }: SceneProps) {
  const { assetPaths, scrollTriggers } = config;

  const mainGltf = useGLTF(assetPaths.mainModel);
  const subGltf = useGLTF(assetPaths.subModel);
  const rearGltf = useGLTF(assetPaths.rearModel);

  const [carVisible, setCarVisible] = useState(false);
  const windshieldObjects = useRef<THREE.Mesh[]>([]);
  const imagePlaneRef = useRef<THREE.Mesh | null>(null);

  // Initial one-time setup
  useEffect(() => {
    setCarSceneRef(mainGltf.scene);
    
    // Mount rear camera
    const rearMount = mainGltf.scene.getObjectByName("CameraMountRear");
    if (rearMount) {
      rearMount.add(rearGltf.scene);
      rearGltf.scene.rotation.y = degToRad(180);
    }
    
    mainGltf.scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.name.toLowerCase().includes("windshield")) {
          windshieldObjects.current.push(node);
        }
      }
    });

    onLoadComplete();
  }, [mainGltf, rearGltf, onLoadComplete, setCarSceneRef]);
  
  // Dashcam screen (image/video plane) setup
  useEffect(() => {
    const displayMount = subGltf.scene.getObjectByName("DISPLAY");
    if (!displayMount) return;

    const loader = new THREE.TextureLoader();
    loader.load(assetPaths.screenImage, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(6, 2.2),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false, opacity: 0 })
        );
        imagePlaneRef.current = plane;
        displayMount.add(plane);
        plane.position.z = -0.1;

        const video = document.createElement("video");
        video.src = assetPaths.screenVideo;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        
        plane.userData = { imageMap: texture, videoMap: videoTexture, videoEl: video };
    });
  }, [subGltf.scene, assetPaths.screenImage, assetPaths.screenVideo]);

  // Logic to switch between image and video on the dashcam screen
  useEffect(() => {
    if (!imagePlaneRef.current) return;
    const material = imagePlaneRef.current.material as THREE.MeshBasicMaterial;
    const { imageMap, videoMap, videoEl } = imagePlaneRef.current.userData;
    const [imgStart, imgMid, imgEnd] = scrollTriggers.screenImageFade;
    const [vidStart, vidMid, vidEnd] = scrollTriggers.screenVideoFade;

    const inImageRange = scrollProgress >= imgStart && scrollProgress <= imgEnd;
    const inVideoRange = scrollProgress >= vidStart && scrollProgress <= vidEnd;

    let targetOpacity = 0;
    if (inImageRange) {
        if (material.map !== imageMap) material.map = imageMap;
        if (videoEl && !videoEl.paused) videoEl.pause();
        targetOpacity = THREE.MathUtils.smoothstep(scrollProgress, imgStart, imgMid) - THREE.MathUtils.smoothstep(scrollProgress, imgMid, imgEnd);
    } else if (inVideoRange) {
        if (material.map !== videoMap) material.map = videoMap;
        if (videoEl && videoEl.paused) videoEl.play().catch(console.error);
        targetOpacity = THREE.MathUtils.smoothstep(scrollProgress, vidStart, vidMid) - THREE.MathUtils.smoothstep(scrollProgress, vidEnd - 0.1, vidEnd); // Fade out at the very end
    } else {
        if (videoEl && !videoEl.paused) videoEl.pause();
    }
    
    material.opacity = targetOpacity;
    imagePlaneRef.current.visible = targetOpacity > 0.01;

  }, [scrollProgress, scrollTriggers]);
  
  const clipMaskGeometry = useMemo(() => {
      const timings = { start: 0.66, mid: 0.7, end: 0.75 }; // Can also be moved to config
      const interpolated = getInterpolatedClip(scrollProgress, closedShape, openShape, timings);
      return clipPathToShape(interpolated, 10, 10);
  }, [scrollProgress]);

  // Per-frame updates driven by config values
  useFrame(() => {
    const [startH, endH] = scrollTriggers.windshieldHighlight;
    const highlightBlend = THREE.MathUtils.smoothstep(scrollProgress, startH, endH);
    windshieldObjects.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.transparent = true;
      mat.opacity = THREE.MathUtils.lerp(0, 0.5, highlightBlend);
    });

    const [startC, endC] = scrollTriggers.carVisible;
    setCarVisible(scrollProgress > startC);

    const [startD, endD] = scrollTriggers.dashcamFadeIn;
    const dashcamFade = THREE.MathUtils.smoothstep(scrollProgress, startD, endD);
    subGltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.Material;
        mat.opacity = dashcamFade;
        mat.transparent = true;
      }
    });
  });

  const [clipStart, clipEnd] = scrollTriggers.clipMask;

  return (
    <>
      {scrollProgress >= clipStart && scrollProgress <= clipEnd && (
        <mesh geometry={clipMaskGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <meshBasicMaterial color="#313131" toneMapped={false} />
        </mesh>
      )}
      <primitive object={mainGltf.scene} visible={carVisible} />
      <group ref={dashcamGroupRef} visible={scrollProgress >= scrollTriggers.dashcamFadeIn[0]}>
        <primitive object={subGltf.scene} />
      </group>
    </>
  );
}