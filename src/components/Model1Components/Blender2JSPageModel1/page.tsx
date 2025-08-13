"use client";

import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, useTexture, AdaptiveDpr, useProgress, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { SRGBColorSpace } from "three";
import { Color } from "three";
import { Typography } from "@/components/CommonComponents/Typography/page";
import FadeLoader from "@/components/CommonComponents/Loader/page";
import Model1TextOverlay from "../TextOverlayModel1/page";
useGLTF.preload("/models/car.glb");
useGLTF.preload("/models/VREC-Z820DC.glb");
useTexture.preload("/modelImages/CommonModelImages/aiNight.png");

const animationData = [
  { time: 0.0, position: [0.0081, 1.2133, 0.38], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 20 },
  { time: 0.0, position: [0.0081, 1.2133, 0.40], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 20 },

  // { time: 0.0, position: [0.0081, 1.2133, 0.4968], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 20 },
  { time: 0.0417, position: [-0.08, 1.213, 0.48], quaternion: [0.02902204, -0.37, -0.0781377, 0.9276399], fov: 20 },
  // { time: 0.0417, position: [-0.1, 1.213, 0.48], quaternion: [0.02902204, -0.4, -0.0781377, 0.9276399], fov: 20 },
  { time: 0.122, position: [-0.09, 1.216, 0.32], quaternion: [-0.0, -0.75, 0.0000004, 0.61231], fov: 20 },
  // { time: 0.122, position: [-0.08, 1.216, 0.275], quaternion: [-0.0, -0.90010577, 0.00000004, 0.43567151], fov: 20 },
  { time: 0.1667, position: [-0.0, 1.21, 0.292], quaternion: [0, 1.0, 0.0, 0.0], fov: 20 },
  { time: 0.1667, position: [-0.00, 1.205, 0.26], quaternion: [0, 1.0, 0, 0], fov: 20 },
  { time: 0.2083, position: [-0.00, 1.2136, 0.1], quaternion: [0.0, 1.0, -0.00000004, 0.00000004], fov: 20 },
  { time: 0.25, position: [-0.0093, 1.2509, -2.2], quaternion: [0.00000002, 0.99999607, 0.00280268, 0.00000016], fov: 20 },
  { time: 0.2917, position: [-0.0093, 3.9288, -3.2975], quaternion: [0.00000007, 0.9208445, 0.38993004, 0.00000008], fov: 35 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.375, position: [-0.0093, 6.6768, 2.0115], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 20 },
  { time: 0.375, position: [-0.0092, 6.6768, -9], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 20 },
  { time: 0.375, position: [-0.0092, 6.6768, -9], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 20 },
  // { time: 0.375, position: [-0.0092, 6.6768, -9], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 20},
];

function HeroTextFade({ scrollProgress }: { scrollProgress: number }) {
  const progress = THREE.MathUtils.clamp(scrollProgress / 0.028, 0, 1);
  const scale = THREE.MathUtils.lerp(1, 2.6, progress);
  const opacity = THREE.MathUtils.lerp(1, 0, progress);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        zIndex: 30,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        transform: `scale(${scale})`,
        opacity,
        transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
      }}
    >
      <Typography variant="hero-section-heading" className="text-xl !md:text-[62px] font-bold text-white text-center px-4 max-w-2xl">
        4K Clarity Meets AI Intelligence
      </Typography>
      <p className="text-[32px] text-[#ABABAB] mt-2">VREC-Z820DC Keeps the Road on Record</p>
      <button className="bg-[#262626] px-2 pl-4 py-2 rounded-full text-white mt-12 flex text-[16px] font-medium items-center mx-auto">
        Scroll to explore
        <img src="/icons/chevDownCircle.svg" width={24} height={24} alt="Arrow Down" className="ml-3" />
      </button>
    </div>
  );
}

function FullscreenBlackOverlay({
  scrollProgress,
  fadeInStart = 0,
  fadeInEnd = 0,
  fadeOutStart = 0.02,
  fadeOutEnd = 0.065,
}: {
  scrollProgress: number;
  fadeInStart?: number;
  fadeInEnd?: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
}) {
  const scaleProgress = THREE.MathUtils.clamp(scrollProgress / 0.08, 0, 1);
  const scale = THREE.MathUtils.lerp(1, 2.6, scaleProgress);
  let opacity = 0;

  if (scrollProgress <= fadeInStart) {
    opacity = 0;
  } else if (scrollProgress <= fadeInEnd) {
    const t = THREE.MathUtils.clamp((scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart), 0, 1);
    opacity = THREE.MathUtils.lerp(0, 1, t);
  } else if (scrollProgress < fadeOutStart) {
    opacity = 1;
  } else if (scrollProgress <= fadeOutEnd) {
    const t = THREE.MathUtils.clamp((scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart), 0, 1);
    opacity = THREE.MathUtils.lerp(1, 0, t);
  } else {
    opacity = 0;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        zIndex: 20,
        pointerEvents: "none",
        transform: `scale(${scale})`,
        opacity: opacity * 0.65,
        transition: "none",
      }}
    />
  );
}

const degToRad = (degrees: number): number => degrees * (Math.PI / 180);

function useFadeModelOpacity(
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

function interpolateCamera(time: number, dashcamGroupRef?: React.RefObject<THREE.Group | null>) {
  const totalFrames = animationData.length;
  const frameIndex = time * (totalFrames - 1);
  const frame1 = Math.floor(frameIndex);
  const frame2 = Math.min(frame1 + 1, totalFrames - 1);
  const t = frameIndex - frame1;

  const keyframe1 = animationData[frame1];
  const keyframe2 = animationData[frame2];

  const pos1 = new THREE.Vector3(...keyframe1.position);
  const pos2 = new THREE.Vector3(...keyframe2.position);
  const position = pos1.lerp(pos2, t);

  const isProblematicRange = keyframe1.time === 0.0417 && keyframe2.time === 0.0833;

  let quaternion: THREE.Quaternion;

  if (isProblematicRange) {
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    const normalQuaternion = new THREE.Quaternion();
    normalQuaternion.slerpQuaternions(quat1, quat2, t);

    let target: THREE.Vector3;
    if (dashcamGroupRef?.current) {
      target = new THREE.Vector3();
      dashcamGroupRef.current.getWorldPosition(target);
    } else {
      target = new THREE.Vector3(0, 1.2, 0.3);
    }

    const direction = new THREE.Vector3().subVectors(position, target).normalize();
    const distance = new THREE.Vector3(...keyframe1.position).distanceTo(target);
    const newPosition = new THREE.Vector3().copy(target).add(direction.multiplyScalar(distance));
    const blendFactor = THREE.MathUtils.smoothstep(0, 1, t);
    position.lerpVectors(position, newPosition, blendFactor);

    const tempCamera = new THREE.PerspectiveCamera();
    tempCamera.position.copy(position);
    tempCamera.lookAt(target);
    const lookAtQuaternion = tempCamera.quaternion.clone();

    const smoothBlend = THREE.MathUtils.smoothstep(0.4, 0.6, t);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(normalQuaternion, lookAtQuaternion, smoothBlend);
  } else {
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(quat1, quat2, t);
  }

  const fov1 = keyframe1.fov;
  const fov2 = keyframe2.fov;
  const focalLength = THREE.MathUtils.lerp(fov1, fov2, t);

  return { position, quaternion, focalLength };
}

function interpolateCameraFromScroll(scrollProgress: number, dashcamGroupRef?: React.RefObject<THREE.Group | null>) {
  return interpolateCamera(scrollProgress, dashcamGroupRef);
}

function useCameraAnimationSync(
  scrollProgress: number,
  carScene: THREE.Group,
  dashcamGroupRef: React.RefObject<THREE.Group | null>,
  dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>,
  setLensAnimation: (isAnimating: boolean) => void
) {
  const { camera } = useThree();
  const explodedRef = useRef(false);
  const cameraMountWorldMatrix = new THREE.Matrix4();

  useFrame(() => {
    const inExplodeRange = scrollProgress >= 0.195 && scrollProgress < 0.235;

    if (inExplodeRange && !explodedRef.current) {
      console.log("🎯 Scroll in range → EXPLODE");
      setLensAnimation(true);
      explodedRef.current = true;
    }

    if (!inExplodeRange && explodedRef.current) {
      console.log("🎯 Scroll out of range → COLLAPSE");
      setLensAnimation(false);
      explodedRef.current = false;
    }

    const start = 0.06;
    const end = 1.0;
    const progressInRange = THREE.MathUtils.clamp((scrollProgress - start) / (end - start), 0, 1);
    const { position, quaternion, focalLength } = interpolateCameraFromScroll(progressInRange, dashcamGroupRef);

    camera.position.copy(position);
    camera.quaternion.copy(quaternion);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = focalLength;
      camera.updateProjectionMatrix();
    }

    const cameraMount = carScene.getObjectByName("CameraMountFront");
    if (cameraMount && dashcamGroupRef?.current && dashcamOffsetGroupRef?.current) {
      cameraMount.updateWorldMatrix(true, false);
      cameraMountWorldMatrix.copy(cameraMount.matrixWorld);
      dashcamGroupRef.current.matrix.copy(cameraMountWorldMatrix);
      dashcamGroupRef.current.matrix.decompose(dashcamGroupRef.current.position, dashcamGroupRef.current.quaternion, dashcamGroupRef.current.scale);
    }
  });
}

function Timeline({ scrollProgress }: { scrollProgress: number }) {
  const totalFrames = animationData.length + 1;
  const frameIndex = scrollProgress * (totalFrames - 1);
  const frame1 = Math.floor(frameIndex);
  const frame2 = Math.min(frame1 + 1, totalFrames - 1);
  const t = frameIndex - frame1;

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(0,0,0,0.8)",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        fontFamily: "monospace",
        fontSize: "12px",
        zIndex: 1000,
        minWidth: "120px",
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold", textAlign: "center" }}>Timeline</div>
      {animationData.map((keyframe, index) => {
        const isActive = index === frame1;
        const keyframeTime = index / (totalFrames - 1);

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              padding: "4px",
              borderRadius: "4px",
              background: isActive ? "rgba(255, 255, 0, 0.3)" : "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isActive ? "#ffff00" : "#666",
                marginRight: "8px",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontWeight: isActive ? "bold" : "normal" }}>{keyframeTime.toFixed(4)}</div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#aaa",
                  marginTop: "2px",
                }}
              >
                KF {index + 1}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          marginTop: "15px",
          padding: "8px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>{scrollProgress.toFixed(4)}</div>
        <div style={{ fontSize: "10px", color: "#aaa" }}>Progress</div>
      </div>

      <div
        style={{
          marginTop: "10px",
          padding: "8px",
          background: "rgba(0,255,0,0.1)",
          borderRadius: "4px",
          fontSize: "9px",
          color: "#aaa",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Debug:</div>
        <div style={{ fontSize: "8px", marginBottom: "2px", color: "#ffff00" }}>Frame Index: {frameIndex.toFixed(3)}</div>
        <div style={{ fontSize: "8px", marginBottom: "2px", color: "#ffff00" }}>
          Frame1: {frame1} | Frame2: {frame2}
        </div>
        <div style={{ fontSize: "8px", marginBottom: "2px", color: "#ffff00" }}>Interpolation: {t.toFixed(3)}</div>
        {animationData.map((keyframe, index) => {
          const isActive = index === frame1;
          const keyframeTime = index / (totalFrames - 1);
          return (
            <div
              key={index}
              style={{
                color: isActive ? "#ffff00" : "#666",
                fontSize: "8px",
                marginBottom: "2px",
              }}
            >
              KF{index + 1}: {keyframeTime.toFixed(4)} | Active: {isActive ? "YES" : "NO"}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "10px",
          padding: "8px",
          background: scrollProgress >= 0.0417 && scrollProgress <= 0.0833 ? "rgba(255,0,0,0.3)" : "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          textAlign: "center",
          border: scrollProgress >= 0.0417 && scrollProgress <= 0.0833 ? "2px solid #ff0000" : "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: "bold" }}>
          {scrollProgress >= 0.0417 && scrollProgress <= 0.0833 ? "🚨 LOOKAT ACTIVE" : "Normal Mode"}
        </div>
        <div style={{ fontSize: "9px", color: "#aaa" }}>0.0417 → 0.0833</div>
      </div>
    </div>
  );
}

function Blender2JSScene({
  onLoadComplete,
  scrollProgress,
  setCarSceneRef,
  dashcamGroupRef,
  dashcamOffsetGroupRef,
}: {
  onLoadComplete: () => void;
  scrollProgress: number;
  setCarSceneRef: (ref: THREE.Group) => void;
  dashcamGroupRef: React.RefObject<THREE.Group | null>;
  dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>;
}) {
  const carGLTF = useGLTF("/models/car.glb");
  const dashcamGLTF = useGLTF("/models/VREC-Z820DC.glb");
  const rearCamGLTF = useGLTF("/models/REARCAM.glb");
  const { scene: cameraModelScene, nodes: cameraNodes } = useGLTF("/models/VREC-Z820DC.glb");
  const [carVisible, setCarVisible] = useState(false);
  const displayMountRef = useRef<THREE.Object3D | null>(null);
  const imagePlaneRef = useRef<THREE.Mesh | null>(null);
  const imageTextureRef = useRef<THREE.Texture | null>(null);
  const windshieldObjects = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (scrollProgress >= 1) {
      console.log("🎬 Triggering animation at scrollProgress 1");
      (async () => {
        const { gsap } = await import("gsap");
        gsap.to(dashcamGroupRef.current?.rotation || {}, {
          y: "+=Math.PI * 2",
          duration: 2,
          ease: "power2.inOut",
        });
      })();
    }
  }, [scrollProgress]);

  useEffect(() => {
    const carScene = carGLTF.scene;
    const dashcamScene = dashcamGLTF.scene;
    const rearcamScene = rearCamGLTF.scene;
    setCarSceneRef(carScene);
    const rearMount = carScene.getObjectByName("CameraMountRear");
    if (rearMount) {
      rearMount.add(rearcamScene);
      rearcamScene.position.set(0, 0, 0);
      rearcamScene.rotation.set(0, degToRad(180), 0);
      rearcamScene.scale.set(1, 1, 1);
      console.log("✅ Rear camera mounted");
    }
    carScene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.side = THREE.DoubleSide;
        }
      }
      if (node instanceof THREE.Mesh && node.name.toLowerCase().includes("windshield")) {
        windshieldObjects.current.push(node);
      }
    });

    dashcamScene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.transparent = true;
          node.material.depthWrite = true;
        }
      }
    });
    if (scrollProgress > 0.5) {
      setCarVisible(true);
    } else {
      setCarVisible(false);
    }

    onLoadComplete();
  }, [carGLTF, dashcamGLTF, onLoadComplete, setCarSceneRef]);

  useEffect(() => {
    console.log("🎯 Searching for DISPLAY object in camera model...");
    const displayMount = cameraModelScene.getObjectByName("DISPLAY");
    if (displayMount) {
      console.log("🎯 Found DISPLAY as object:", displayMount);
      console.log("🎯 DISPLAY position:", displayMount.position);
      console.log("🎯 DISPLAY world position:", displayMount.getWorldPosition(new THREE.Vector3()));
      displayMountRef.current = displayMount;
    } else {
      console.log("🎯 DISPLAY not found - searching all objects...");
      cameraModelScene.traverse((node) => {
        console.log("🎯 Node name:", node.name);
        if (node.name.toLowerCase().includes("display")) {
          console.log("🎯 Found similar object:", node.name);
        }
      });
    }

    const loader = new THREE.TextureLoader();
    loader.load("/modelImages/CommonModelImages/820 Screen.webp", (texture) => {
      console.log("🎯 Image texture loaded successfully");
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.repeat.x = -1;
      texture.offset.x = 1;
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 2.2),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          toneMapped: false,
          opacity: 0,
        })
      );
      plane.visible = true;
      imagePlaneRef.current = plane;
      plane.userData.imageMap = texture;

      console.log("🎯 Display mount found:", displayMountRef.current);
      if (displayMountRef.current) {
        displayMountRef.current.add(plane);
        plane.position.set(0, 0, 0);
        console.log("🎯 Plane added to display mount");
        console.log("🎯 Plane position:", plane.position);
        console.log("🎯 Plane world position:", plane.getWorldPosition(new THREE.Vector3()));
      } else {
        console.log("🎯 Display mount not found");
      }

      const video = document.createElement("video");
      video.src = "/video/video.mp4";
      video.crossOrigin = "anonymous";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.load();

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;

      plane.userData.videoMap = videoTexture;
      plane.userData.videoEl = video;

      console.log("🎯 Video texture created");
    });
  }, [cameraNodes]);

  useEffect(() => {
    if (!imagePlaneRef.current) return;

    const material = imagePlaneRef.current.material as THREE.MeshBasicMaterial;
    const { imageMap, videoMap, videoEl } = imagePlaneRef.current.userData;
    let targetOpacity = 0;

    const imageFadeIn = 0.27;
    const imageMidpoint = 0.28;
    const imageFadeOut = 0.3;
    const videoFadeIn = 0.3462;
    const videoMidpoint = 0.36;
    const videoFadeOut = 1;

    if (scrollProgress >= imageFadeIn && scrollProgress <= imageFadeOut) {
      if (imageMap && material.map !== imageMap) {
        material.map = imageMap;
        material.needsUpdate = true;
      }
      if (videoEl && !videoEl.paused) videoEl.pause();
      let t;
      if (scrollProgress < imageMidpoint) {
        t = THREE.MathUtils.clamp((scrollProgress - imageFadeIn) / (imageMidpoint - imageFadeIn), 0, 1);
        targetOpacity = t;
      } else {
        t = THREE.MathUtils.clamp((scrollProgress - imageMidpoint) / (imageFadeOut - imageMidpoint), 0, 1);
        targetOpacity = 1 - t;
      }
    } else if (scrollProgress >= videoFadeIn && scrollProgress <= videoFadeOut) {
      if (videoMap) {
        if (material.map !== videoMap) {
          material.map = videoMap;
          material.needsUpdate = true;
        }
        if (videoEl && videoEl.paused) videoEl.play();
        let t;
        if (scrollProgress < videoMidpoint) {
          t = THREE.MathUtils.clamp((scrollProgress - videoFadeIn) / (videoMidpoint - videoFadeIn), 0, 1);
          targetOpacity = t;
        } else {
          t = THREE.MathUtils.clamp((scrollProgress - videoMidpoint) / (videoFadeOut - videoMidpoint), 0, 1);
          targetOpacity = 1 - t;
        }
      } else {
        targetOpacity = 0;
      }
    } else {
      targetOpacity = 0;
      if (videoEl && !videoEl.paused) videoEl.pause();
    }

    const { gsap } = require("gsap");
    gsap.to(material, {
      opacity: targetOpacity,
      duration: 0.3,
      ease: "linear",
    });

    imagePlaneRef.current.visible = targetOpacity > 0.01;
    material.transparent = true;
    material.needsUpdate = true;
  }, [scrollProgress]);

  const fadeRef = useRef<THREE.Group>(null);
  const clipMaskGeometry = useMemo(() => {
    const interpolated = getInterpolatedClip(scrollProgress);
    return clipPathToShape(interpolated, 10, 10);
  }, [scrollProgress]);

  useFrame(() => {
    const highlightStart = 0.4968;
    const highlightEnd = 0.6024;

    const blend = THREE.MathUtils.clamp((scrollProgress - highlightStart) / (highlightEnd - highlightStart), 0, 1);

    windshieldObjects.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.transparent = true;
      mat.opacity = THREE.MathUtils.lerp(0, 0.5, blend);
      mat.needsUpdate = true;
    });
  });
  useEffect(() => {
    if (!carGLTF.scene || !dashcamGLTF.scene) return;

    const fadeStart = 0.06;
    const fadeEnd = 0.1;

    let opacity = 0;

    if (scrollProgress < fadeStart) {
      opacity = 0;
    } else if (scrollProgress > fadeEnd) {
      opacity = 1;
    } else {
      const fadeProgress = (scrollProgress - fadeStart) / (fadeEnd - fadeStart);
      opacity = THREE.MathUtils.lerp(0, 1, fadeProgress);
    }



    dashcamGLTF.scene.traverse((child) => {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.Material;
        mat.transparent = true;
        (mat as any).opacity = opacity;
      }
    });

  }, [scrollProgress]);

  useFadeModelOpacity(fadeRef, scrollProgress);
  return (
    <>
      {imageTextureRef.current && (
        <mesh position={[0, 2, 5]} visible={true}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={imageTextureRef.current} toneMapped={false} />
        </mesh>
      )}

      {displayMountRef.current && imageTextureRef.current && (
        <mesh position={displayMountRef.current.getWorldPosition(new THREE.Vector3())} visible={true}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={imageTextureRef.current} toneMapped={false} color="red" />
        </mesh>
      )}

      {scrollProgress >= 0.703 && scrollProgress <= 0.8813 && (
        <mesh geometry={clipMaskGeometry} rotation={[-Math.PI / 2, 0, Math.PI / 1]} position={[0, 0.1, 0]}>
          <meshBasicMaterial color="#313131" toneMapped={false} />
        </mesh>
      )}

      <primitive object={carGLTF.scene} visible={carVisible} />
      <group ref={dashcamGroupRef} visible={scrollProgress >= 0.06}>
        <group ref={dashcamOffsetGroupRef}>
          <primitive object={dashcamGLTF.scene} />
        </group>
      </group>
    </>
  );
}

function CameraAnimation({
  scrollProgress,
  carScene,
  dashcamGroupRef,
  dashcamOffsetGroupRef,
  setLensAnimation,
}: {
  scrollProgress: number;
  carScene: THREE.Group;
  dashcamGroupRef: React.RefObject<THREE.Group | null>;
  dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>;
  setLensAnimation: (isAnimating: boolean) => void;
}) {
  useCameraAnimationSync(scrollProgress, carScene, dashcamGroupRef, dashcamOffsetGroupRef, setLensAnimation);
  return null;
}

function clipPathToShape(points: string, width = 5, height = 5) {
  const shape = new THREE.Shape();
  const coords = points
    .replace("polygon(", "")
    .replace(")", "")
    .split(",")
    .map((point) => {
      const [x, y] = point.trim().split(" ");
      return [(parseFloat(x) / 100 - 0.5) * width, ((100 - parseFloat(y)) / 100 - 0.5) * height];
    });

  shape.moveTo(coords[0][0], coords[0][1]);
  for (let i = 1; i < coords.length; i++) {
    shape.lineTo(coords[i][0], coords[i][1]);
  }
  shape.lineTo(coords[0][0], coords[0][1]);

  return new THREE.ShapeGeometry(shape);
}

const openShape = "polygon(-15% 34%, 0 0, 100% 0, 115% 34%, 50% 44%)";
const closedShape = "polygon(49.75% 0%, 49.75% 0%, 49.75% 0%, 49.75% 0%, 50.41% 66.01%)";

function getInterpolatedClip(scrollProgress: number) {
  const start = 0.703;
  const mid = 0.792;
  const end = 0.8813;

  let blend;
  let shapeFrom, shapeTo;

  if (scrollProgress <= mid) {
    blend = THREE.MathUtils.clamp((scrollProgress - start) / (mid - start), 0, 1);
    shapeFrom = closedShape;
    shapeTo = openShape;
  } else {
    blend = THREE.MathUtils.clamp((scrollProgress - mid) / (end - mid), 0, 1);
    shapeFrom = openShape;
    shapeTo = closedShape;
  }

  const parse = (str: string): number[][] =>
    str
      .replace("polygon(", "")
      .replace(")", "")
      .split(",")
      .map((pt: string) => pt.trim().split(" ").map((v: string) => parseFloat(v)) as number[]);

  const a = parse(shapeFrom);
  const b = parse(shapeTo);

  const points = a.map(([ax, ay]: number[], i: number) => {
    const [bx, by] = b[i];
    const ix = THREE.MathUtils.lerp(ax, bx, blend);
    const iy = THREE.MathUtils.lerp(ay, by, blend);
    return `${ix}% ${iy}%`;
  });

  return `polygon(${points.join(", ")})`;
}

function IntroImageAnimation({ scrollProgress }: { scrollProgress: number }) {
  const imagePlaneRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    // Load image texture
    const loader = new THREE.TextureLoader();
    loader.load("/modelImages/CommonModelImages/aiNight.png", (texture) => {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;

      if (imagePlaneRef.current) {
        const mat = imagePlaneRef.current.material as unknown as THREE.MeshBasicMaterial | THREE.MeshBasicMaterial[];
        if (Array.isArray(mat)) {
          mat.forEach((m) => {
            m.map = texture;
            m.needsUpdate = true;
          });
        } else if (mat) {
          mat.map = texture;
          mat.needsUpdate = true;
        }
      } else {
        console.warn("⚠️ imagePlaneRef or its material is null");
      }
    });
  }, []);

  useEffect(() => {
    if (!imagePlaneRef.current || !materialRef.current) return;

    const { gsap } = require("gsap");
    const start = 0;
    const end = 0.113;
    const progress = THREE.MathUtils.clamp(scrollProgress / end, 0, 1);

    // Scale: from 5 to 1
    const scale = THREE.MathUtils.lerp(12, 5.4, progress);
    imagePlaneRef.current.scale.set(scale, scale, 1);

    // Rotation: 0 to 2π
    const rotation = THREE.MathUtils.lerp(0, Math.PI * 1, progress);
    imagePlaneRef.current.rotation.z = rotation;

    // Opacity behavior: 0 → 0.07 keep at 1; 0.07 → 0.1 fade 1 → 0
    const holdEnd = 0.08;
    const fadeEnd = 0.1;
    let targetOpacity: number;
    if (scrollProgress <= holdEnd) {
      targetOpacity = 1;
    } else if (scrollProgress >= fadeEnd) {
      targetOpacity = 0;
    } else {
      const t = (scrollProgress - holdEnd) / (fadeEnd - holdEnd);
      targetOpacity = THREE.MathUtils.lerp(1, 0, t);
    }

    gsap.to(materialRef.current, {
      opacity: targetOpacity,
      duration: 0.3,
      ease: "power1.out",
    });

    materialRef.current.opacity = targetOpacity;
    materialRef.current.transparent = true;

    // Visibility
    imagePlaneRef.current.visible = scrollProgress <= fadeEnd;
  }, [scrollProgress]);
  return (
    <mesh ref={imagePlaneRef} renderOrder={10} position={[0.004, 1.211, -4]} visible={true}>
      <planeGeometry args={[1]} />
      <meshBasicMaterial
        ref={materialRef}
        blending={THREE.NormalBlending}
        transparent={true}
        opacity={1}
        depthWrite={false}
        depthTest={false}
        side={THREE.DoubleSide}
        toneMapped={false}
        color="white"
      />
    </mesh>
  );
}

function LensAnimation({ isAnimating, dashcamGroupRef }: { isAnimating: boolean; dashcamGroupRef: React.RefObject<THREE.Group | null> }) {
  const timelineRef = useRef<any>(null);
  const explodedRef = useRef(false);

  useEffect(() => {
    const root = dashcamGroupRef.current;
    if (!root) return;

    const runAnimation = async () => {
      const { gsap } = await import("gsap");

      const lensElements: THREE.Object3D[] = [];
      root.traverse((child) => {
        if (child.name.toLowerCase().includes("lens") || child.name.match(/^\d+$/)) {
          lensElements.push(child);
        }
      });

      if (lensElements.length === 0) return;
      lensElements.reverse();

      const explodeLens = () => {
        if (timelineRef.current) timelineRef.current.kill();
        timelineRef.current = gsap.timeline();
        lensElements.forEach((part, i) => {
          timelineRef.current.to(
            part.position,
            {
              z: [0.07, 0.075, 0.055, 0.04, 0.02, 0.01][i] || 0.05,
              duration: 1.2,
              ease: "power2.out",
            },
            0
          );
        });
        explodedRef.current = true;
      };

      const collapseLens = () => {
        if (timelineRef.current) timelineRef.current.kill();
        timelineRef.current = gsap.timeline();
        lensElements.forEach((part) => {
          timelineRef.current.to(
            part.position,
            {
              z: 0,
              duration: 0.4,
              ease: "power2.inOut",
            },
            0
          );
        });
        explodedRef.current = false;
      };

      if (isAnimating && !explodedRef.current) {
        explodeLens();
      } else if (!isAnimating && explodedRef.current) {
        collapseLens();
      }
    };

    runAnimation();
  }, [isAnimating, dashcamGroupRef]);

  return null;
}



function BackgroundFade({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useThree();

  useEffect(() => {
    const start = 0;   // fade start
    const end = 0.1;   // fade end
    let t = 0;

    if (scrollProgress < start) {
      t = 0;
    } else if (scrollProgress > end) {
      t = 1;
    } else {
      t = (scrollProgress - start) / (end - start);
    }

    // Start color #0D0D0D
    const startColor = new Color("#0D0D0D");
    const endColor = new Color("#000000");

    const mixed = startColor.clone().lerp(endColor, t);
    scene.background = mixed;
  }, [scrollProgress, scene]);

  return null;
}

export default function Blender2JSPageModel1() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [lensAnimation, setLensAnimation] = useState(false);
  const dashcamGroupRef = useRef<THREE.Group>(null);
  const containerRef = useRef(null);
  const dashcamOffsetGroupRef = useRef<THREE.Group>(null);
  const { active } = useProgress();

  // When all assets are loaded (useProgress active = false), mark ready
  useEffect(() => {
    if (!active) {
      setModelIsReady(true);
    }
  }, [active]);

  // Prevent body scrolling while loading to reduce jank on mobile
  useEffect(() => {
    if (!modelIsReady) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [modelIsReady]);

  useEffect(() => {
    if (!modelIsReady) return; // Defer ScrollTrigger init until models are ready
    if (typeof window === "undefined") return;
    let cleanup: (() => void) | undefined;
    let targetProgress = 0;
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        gsap.timeline({
          scrollTrigger: {
            trigger: "#blender2js-scroll-container-model1",
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
            onUpdate: (self) => {
              targetProgress = self.progress;
            },
          },
        });
        gsap.ticker.add(() => {
          setScrollProgress((prev) => THREE.MathUtils.lerp(prev, targetProgress, 0.03));
        });

        cleanup = () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      } catch (err) {
        console.error("Failed to load GSAP:", err);
      }
    };

    initGSAP();
    return () => cleanup?.();
  }, [modelIsReady]);
  const [dpr, setDpr] = useState(1.5);
  return (
    <div id="blender2js-scroll-container-model1" ref={containerRef} style={{ height: "3500vh", width:"100%"}}>
      {!modelIsReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <div id="text-overlay-portal"></div>
      {/* {modelIsReady && <Timeline scrollProgress={scrollProgress} />} */}
      {modelIsReady && <HeroTextFade scrollProgress={scrollProgress} />}
      {modelIsReady && <Model1TextOverlay />}
      {modelIsReady && <FullscreenBlackOverlay scrollProgress={scrollProgress} />}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 20, near: 0.01, far: 1000 }}
        style={{ background: "#ffff", height: "100vh", position: "sticky", top: 0 }}
        shadows
        gl={{
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: SRGBColorSpace,
          antialias: false,
          powerPreference: "high-performance",
        }}
        dpr={dpr}
        frameloop={modelIsReady ? "always" : "never"}

      >
        <PerformanceMonitor 
          onIncline={() => setDpr(1.5)} 
          onDecline={() => setDpr(1)} 
        />
        <AdaptiveDpr pixelated />
        <BackgroundFade scrollProgress={scrollProgress} />

        <Suspense fallback={null}>
          <IntroImageAnimation scrollProgress={scrollProgress} />
          {modelIsReady && <Environment files="/hdri/111.hdr" background={false} />}
          <Blender2JSScene
            scrollProgress={scrollProgress}
            onLoadComplete={() => setModelIsReady(true)}
            setCarSceneRef={(ref) => setCarScene(ref)}
            dashcamGroupRef={dashcamGroupRef}
            dashcamOffsetGroupRef={dashcamOffsetGroupRef}
          />
          <LensAnimation isAnimating={lensAnimation} dashcamGroupRef={dashcamGroupRef} />
        </Suspense>
        {carScene && (
          <CameraAnimation
            scrollProgress={scrollProgress}
            carScene={carScene}
            dashcamGroupRef={dashcamGroupRef}
            dashcamOffsetGroupRef={dashcamOffsetGroupRef}
            setLensAnimation={setLensAnimation}
          />
        )}
      </Canvas>
    </div>
  );
}