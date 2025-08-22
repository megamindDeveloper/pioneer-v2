"use client";

import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Environment, useGLTF, useTexture, AdaptiveDpr, useProgress } from "@react-three/drei";

import * as THREE from "three";

import { SRGBColorSpace } from "three";

import { Color } from "three";

import { Typography } from "@/components/CommonComponents/Typography/page";

import FadeLoader from "@/components/CommonComponents/Loader/page";

import TextOverlay from "../MobileTextOverlay/MobileTextOverlay";
import Image from "next/image";
import FadingHeroContent from "@/components/ModelHelperComponents/ScrollFadeAndScale";

useGLTF.preload("/models/car.glb");

useGLTF.preload("/models/VREC-Z820DC.glb");

useTexture.preload("/modelImages/CommonModelImages/aiNight.png");

const animationData = [
  { time: 0.1667, position: [-0.001, 1.2099, 0.292], quaternion: [0, 1.0, 0, 0], fov: 40 },
  { time: 0.2083, position: [-0.0, 1.2136, 0.16], quaternion: [0.0, 1.0, -0.00000004, 0.00000004], fov: 40 },
  { time: 0.2083, position: [-0.0, 1.2136, 0.15], quaternion: [0.0, 1.0, -0.00000004, 0.00000004], fov: 40 },
  { time: 0.25, position: [-0.0093, 1.2509, -2.7], quaternion: [0.00000002, 0.99999607, 0.00280268, 0.0000004], fov: 40 },
  { time: 0.2917, position: [-0.0093, 3.9288, -3.2975], quaternion: [0.00000007, 0.9208445, 0.38993004, 0.00000008], fov: 40 },
  { time: 0.3333, position: [-0.0, 5.6768, 1.5038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.3333, position: [-0.0, 5.6768, 2.038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  // { time: 0.3333, position: [-0.0, 5.6768, -1.5038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
  { time: 0.3333, position: [-0.0, 5.6768, -5.5038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 40 },
];

const dashcamKeyframes = [
  {
    time: 0.0, // Start of the animation

    position: [0.086, 0.0425, 0],

    rotation: [0, 180, 0], // Starts rotated 180 degrees

    scale: [3, 3, 3],
  },

  {
    time: 0.3, // Start of the animation

    position: [0.05, 0.01, 0],

    rotation: [10, 230, 20], // Starts rotated 180 degrees

    scale: [1, 1, 1],
  },

  {
    time: 0.6, // 60% of the way through

    position: [0, 0.0125, 0],

    rotation: [0, 310, 0], // Fully rotated to face forward

    scale: [1, 1, 1],
  },

  {
    time: 1.0, // End of the animation

    position: [0, 0.0125, 0], // Settles in the final, neutral position

    rotation: [0, 0, 0],

    scale: [1, 1, 1], // Settles at the final, neutral scale
  },
];

// --- ADD THIS HELPER FUNCTION TO YOUR FILE ---

// --- REPLACE your old function with this new version ---



function HeroImageFade({ scrollProgress }: { scrollProgress: number }) {
  const animationStart = 0.02;
  const animationDuration = 0.03;

  // This check correctly makes the component appear and disappear at the right times
  if (scrollProgress < animationStart || scrollProgress > animationStart + animationDuration) {
    return null;
  }

  // This calculates the overall progress of the animation (from 0 to 1)
  const progress = THREE.MathUtils.clamp(
    (scrollProgress - animationStart) / animationDuration,
    0,
    1
  );

  // --- NEW FADE-IN and FADE-OUT LOGIC ---
  let opacity = 0;
  const midpoint = 0.5; // The halfway point of the animation

  if (progress <= midpoint) {
    // FADE-IN: In the first half, calculate progress from 0 to 1 and lerp opacity from 0 to 1.
    const fadeInProgress = progress / midpoint;
    opacity = THREE.MathUtils.lerp(0, 1, fadeInProgress);
  } else {
    // FADE-OUT: In the second half, calculate progress from 0 to 1 and lerp opacity from 1 to 0.
    const fadeOutProgress = (progress - midpoint) / (1 - midpoint);
    opacity = THREE.MathUtils.lerp(1, 0, fadeOutProgress);
  }
  // --- END OF NEW LOGIC ---

  // The scale animation will continue to grow during the whole duration
  const scale = THREE.MathUtils.lerp(2.6, 1.8, progress);

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        transform: `scale(${scale})`,
        opacity, // Use the new calculated opacity
        transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
      }}
    >
      <Image fill alt="image" className="object-cover" src="/modelImages/CommonModelImages/aiNight.png" />
    </div>
  );
}
function FullscreenBlackOverlay({
  scrollProgress,

  fadeInStart = 0,

  fadeInEnd = 0,

  fadeOutStart = 0.02,

  fadeOutEnd = 0.06,
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

function useFadeModelOpacity(groupRef: React.RefObject<THREE.Group | null>, scrollProgress: number, rangeStart = 0, rangeEnd = 0.02) {
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
    const inExplodeRange = scrollProgress >= 0.13 && scrollProgress < 0.14;

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

    const start = 0.31;

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

// --- The Complete, Updated Timeline Component ---

function Timeline({ scrollProgress, rawProgress }: { scrollProgress: number; rawProgress?: number }) {
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

      {/* Display for Mapped Animation Progress */}
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
        <div style={{ fontSize: "10px", color: "#aaa" }}>Mapped Progress</div>
      </div>

      {/* NEW: Display for Raw Scroll Progress */}
      {rawProgress !== undefined && (
        <div
          style={{
            marginTop: "10px",
            padding: "8px",
            background: "rgba(150, 150, 255, 0.15)", // Different color for distinction
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#aaccff" }}>{rawProgress.toFixed(4)}</div>
          <div style={{ fontSize: "10px", color: "#aaa" }}>Raw Scroll</div>
        </div>
      )}

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

function getAdjustedProgress(rawProgress: number, zones: [number, number][]): number {
  // 1. Calculate the total duration of all pauses.
  const totalPauseDuration = zones.reduce((acc, [start, end]) => acc + (end - start), 0);
  const totalAnimationDuration = 1.0 - totalPauseDuration;

  // Edge case: If pauses take up the entire timeline, the animation is always at its end.
  if (totalAnimationDuration <= 0) return 1;

  let accumulatedPauseDuration = 0;

  // 2. Iterate through each defined sticky zone.
  for (const [start, end] of zones) {
    // If the scroll is INSIDE the current sticky zone...
    if (rawProgress >= start && rawProgress <= end) {
      // The animation progress should be frozen at the value it had right when it ENTERED this zone.
      // This value is the zone's start time, adjusted for any PREVIOUS pauses.
      const effectiveProgress = start - accumulatedPauseDuration;
      // Scale the result to the available animation time and return.
      return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
    }

    // If the scroll is BEFORE the current sticky zone...
    if (rawProgress < start) {
      // We haven't reached this pause yet. The animation progress is simply the raw
      // scroll progress, adjusted for the pauses we've already passed.
      const effectiveProgress = rawProgress - accumulatedPauseDuration;
      // Scale and return.
      return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
    }

    // If we reach here, it means the scroll is AFTER the current zone.
    // Add this zone's duration to our accumulator and check the next zone.
    accumulatedPauseDuration += end - start;
  }

  // 3. If the loop completes, it means the raw scroll is past ALL sticky zones.
  // The animation progress is the raw progress minus the total duration of all pauses.
  const effectiveProgress = rawProgress - accumulatedPauseDuration;
  return THREE.MathUtils.clamp(effectiveProgress / totalAnimationDuration, 0, 1);
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

    if (scrollProgress > 0.31) {
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

      video.src = "/video/Video.mp4";

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

    const imageFadeIn = 0.221;

    const imageMidpoint = 0.222;

    const imageFadeOut = 0.244;

    const videoFadeIn = 0.2625;

    const videoMidpoint = 0.27;

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

    const fadeStart = 0.0;

    const fadeEnd = 0;

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

      {scrollProgress >= 0.73 && scrollProgress <= 0.800 && (
        <mesh geometry={clipMaskGeometry} rotation={[-Math.PI / 2, 0, Math.PI / 1]} position={[0, 0.1, 0]}>
          <meshBasicMaterial color="#313131" toneMapped={false} />
        </mesh>
      )}

      <primitive object={carGLTF.scene} visible={carVisible} />

      <group ref={dashcamGroupRef} visible={scrollProgress >= 0.0}>
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
  const start = 0.73;

  const mid = 0.77;

  const end = 0.8;

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

      .map(
        (pt: string) =>
          pt

            .trim()

            .split(" ")

            .map((v: string) => parseFloat(v)) as number[]
      );

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
    const scale = THREE.MathUtils.lerp(3, 3, progress);
    imagePlaneRef.current.scale.set(scale, scale, 1);

    // Rotation: 0 to 2π
    const rotation = THREE.MathUtils.lerp(0, Math.PI * 1, progress);
    imagePlaneRef.current.rotation.z = rotation;

    // Opacity behavior: 0 → 0.07 keep at 1; 0.07 → 0.1 fade 1 → 0
    const holdEnd = 0.06;
    const fadeEnd = 0.1;
    let targetOpacity: number;
    if (scrollProgress <= holdEnd) {
      targetOpacity = 1;
    } else if (scrollProgress >= fadeEnd) {
      targetOpacity = 1;
    } else {
      const t = (scrollProgress - holdEnd) / (fadeEnd - holdEnd);
      targetOpacity = THREE.MathUtils.lerp(1, 1, t);
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
              z: [0.04, 0.04, 0.03, 0.02, 0.01, 0.001][i] || 0.05,

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
    const start = 0; // fade start

    const end = 0.1; // fade end

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

// A new hook for the dashcam's introductory animation

function useDashcamIntroAnimation(scrollProgress: number, dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>) {
  const preAnimationStart = 0.06;
  const preAnimationEnd = 0.3;

  const vec3 = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);

  useFrame(() => {
    if (!dashcamOffsetGroupRef.current) return;

    // --- NEW CONDITION ADDED ---
    // If the scroll is before the animation starts, lock the model to the first keyframe.
    if (scrollProgress < preAnimationStart) {
      const firstKeyframe = dashcamKeyframes[0];
      dashcamOffsetGroupRef.current.position.set(...firstKeyframe.position);
      dashcamOffsetGroupRef.current.scale.set(...firstKeyframe.scale);
      const rot = firstKeyframe.rotation;
      dashcamOffsetGroupRef.current.rotation.set(
        THREE.MathUtils.degToRad(rot[0]),
        THREE.MathUtils.degToRad(rot[1]),
        THREE.MathUtils.degToRad(rot[2])
      );
    }
    // --- The existing "if" is now an "else if" ---
    else if (scrollProgress >= preAnimationStart && scrollProgress <= preAnimationEnd) {
      const phaseProgress = (scrollProgress - preAnimationStart) / (preAnimationEnd - preAnimationStart);

      let keyframe1 = dashcamKeyframes[0];
      let keyframe2 = dashcamKeyframes[0];

      for (let i = 0; i < dashcamKeyframes.length; i++) {
        if (phaseProgress >= dashcamKeyframes[i].time) {
          keyframe1 = dashcamKeyframes[i];
          keyframe2 = dashcamKeyframes[Math.min(i + 1, dashcamKeyframes.length - 1)];
        } else {
          break;
        }
      }

      const segmentDuration = keyframe2.time - keyframe1.time;
      const t = segmentDuration === 0 ? 1 : (phaseProgress - keyframe1.time) / segmentDuration;

      // Interpolate Position
      const pos1 = vec3.set(...keyframe1.position);
      const pos2 = new THREE.Vector3().set(...keyframe2.position);
      dashcamOffsetGroupRef.current.position.lerpVectors(pos1, pos2, t);

      // Interpolate Rotation
      const rot1Deg = keyframe1.rotation;
      const rot2Deg = keyframe2.rotation;
      const quat1 = quat.setFromEuler(euler.set(
        THREE.MathUtils.degToRad(rot1Deg[0]),
        THREE.MathUtils.degToRad(rot1Deg[1]),
        THREE.MathUtils.degToRad(rot1Deg[2])
      ));
      const quat2 = new THREE.Quaternion().setFromEuler(euler.set(
        THREE.MathUtils.degToRad(rot2Deg[0]),
        THREE.MathUtils.degToRad(rot2Deg[1]),
        THREE.MathUtils.degToRad(rot2Deg[2])
      ));
      dashcamOffsetGroupRef.current.quaternion.slerpQuaternions(quat1, quat2, t);

      // Interpolate Scale
      const scale1 = vec3.set(...keyframe1.scale);
      const scale2 = new THREE.Vector3().set(...keyframe2.scale);
      dashcamOffsetGroupRef.current.scale.lerpVectors(scale1, scale2, t);
    }
    else if (scrollProgress > preAnimationEnd) {
      // This part remains the same, locking to the last keyframe after the animation.
      const lastKeyframe = dashcamKeyframes[dashcamKeyframes.length - 1];
      dashcamOffsetGroupRef.current.position.set(...lastKeyframe.position);
      dashcamOffsetGroupRef.current.scale.set(...lastKeyframe.scale);
      const lastRotDeg = lastKeyframe.rotation;
      dashcamOffsetGroupRef.current.rotation.set(
        THREE.MathUtils.degToRad(lastRotDeg[0]),
        THREE.MathUtils.degToRad(lastRotDeg[1]),
        THREE.MathUtils.degToRad(lastRotDeg[2])
      );
    }
  });
}

// Create a new component to apply the intro animation
// --- ADD THIS NEW HELPER FUNCTION ---
/**
 * Maps the raw scroll progress to a new progress value that includes a "sticky" section.
 * @param {number} rawProgress - The actual scroll progress from ScrollTrigger (0 to 1).
 * @param {number} stickStart - The progress value where the animation should start sticking.
 * @param {number} stickEnd - The progress value where the animation should unstick and resume.
 * @returns {number} The mapped animation progress.
 */
function mapScrollProgress(rawProgress: number, stickStart: number, stickEnd: number): number {
  // 1. Before the sticky section, progress is normal.
  if (rawProgress < stickStart) {
    return rawProgress;
  }

  // 2. During the sticky section, the animation progress is pinned to the stickStart value.
  if (rawProgress >= stickStart && rawProgress <= stickEnd) {
    return stickStart;
  }

  // 3. After the sticky section, we remap the remaining scroll range to the remaining animation range.
  // This ensures the animation resumes smoothly from where it left off.
  if (rawProgress > stickEnd) {
    const remainingScrollRange = 1.0 - stickEnd;
    const remainingAnimationRange = 1.0 - stickStart;
    const progressAfterStick = (rawProgress - stickEnd) / remainingScrollRange;

    return stickStart + progressAfterStick * remainingAnimationRange;
  }

  return rawProgress; // Fallback
}
function DashcamIntroAnimation({
  scrollProgress,

  dashcamOffsetGroupRef,
}: {
  scrollProgress: number;

  dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>;
}) {
  useDashcamIntroAnimation(scrollProgress, dashcamOffsetGroupRef);

  return null; // This component doesn't render anything itself
}
// Add this new component to your file

// Replace your entire StickyNav component with this one

function StickyNav({
  stickyZones,
  rawScrollProgress,
  onDotClick,
}: {
  stickyZones: [number, number][];
  rawScrollProgress: number;
  onDotClick: (index: number) => void;
}) {
  // --- THIS IS THE CORRECTED PART ---
  // Define the base style for the container
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    zIndex: 100,
    transition: "opacity 0.3s ease", // Add a smooth fade transition
    // Conditionally set the opacity to hide the component
    opacity: rawScrollProgress >= 0.98 ? 0 : 1,
    // Prevent mouse events when hidden
    pointerEvents: rawScrollProgress >= 1 ? "none" : "auto",
  };
  // --- END OF CORRECTION ---
  console.log("dededwdew", rawScrollProgress)
  return (
    <div style={containerStyle}> {/* Use the new style object here */}
      {stickyZones.map((zone, index) => {
        const [start, end] = zone;
        const isActive = rawScrollProgress + 0.001 >= start && rawScrollProgress <= end;

        const dotStyle: React.CSSProperties = {
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: isActive ? "white" : "rgba(255, 255, 255, 0.3)",
          transform: isActive ? "scale(1.5)" : "scale(1)",
          transition: "all 0.3s ease",
          cursor: "pointer",
        };

        return <div key={index} style={dotStyle} onClick={() => onDotClick(index)} />;
      })}
    </div>
  );
}

export default function Blender2JSPageModel1Mobile() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rawScrollProgress, setRawScrollProgress] = useState(0); // For debugging
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [lensAnimation, setLensAnimation] = useState(false);
  const dashcamGroupRef = useRef<THREE.Group>(null);
  const containerRef = useRef(null);
  const dashcamOffsetGroupRef = useRef<THREE.Group>(null);
  // ADD THIS LINE
  const animationProgress = useRef(0);
  // --- MODIFIED: Use the new stickyZones array ---
  // --- WITH THESE useRef declarations ---
  const gsapRef = useRef<typeof import("gsap").gsap>();
  const stRef = useRef<typeof import("gsap/ScrollTrigger").ScrollTrigger>();

  const stickyZones = [
    // First pause
    [0.02, 0.06],
    [0.0735, 0.1],
    [0.148, 0.188],
    [0.248, 0.288],
    [0.334, 0.364],
    [0.369, 0.412],
    [0.57, 0.61],
    [0.74, 0.78],
    [0.85, 0.89],
    [0.95, 0.99],
  ];
  // Replace your handleDotClick function with this one

  const handleDotClick = (zoneIndex: number) => {
    // --- THIS IS THE CORRECTED PART ---
    // Access ScrollTrigger and gsap from their refs' .current property
    const ScrollTrigger = stRef.current;
    const gsap = gsapRef.current;

    // Safety check to ensure GSAP has loaded before we try to use it
    if (!ScrollTrigger || !gsap) {
      console.error("GSAP instances not available yet.");
      return;
    }
    // --- END OF CORRECTION ---

    const mainScrollTrigger = ScrollTrigger.getById("main-scroll");
    if (!mainScrollTrigger) {
      console.error("ScrollTrigger instance not found!");
      return;
    }

    const targetProgress = stickyZones[zoneIndex][0];
    const scrollAmount = mainScrollTrigger.start + (mainScrollTrigger.end - mainScrollTrigger.start) * targetProgress;

    gsap.to(window, {
      scrollTo: {
        y: scrollAmount,
        autoKill: false,
      },
      duration: 1.5,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    if (!modelIsReady) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [modelIsReady]);

  // Replace your entire GSAP useEffect with this one


useEffect(() => {

    if (!modelIsReady) return;
    if (typeof window === "undefined") return;
    const snapPoints = [
      0,        // Start
      0.0300,    // First key view
      0.0465,     // Wide angle view
      0.1392,    // Top-down view
      0.2236,     // Focus on screen
      0.2890,     // Rear camera view
      0.3169,     // End
      0.5699,
      0.7540,
      0.8885,
      0.9850
    ];
    let cleanup: (() => void) | undefined;
    // This object will be directly manipulated by ScrollTrigger
    const targetProgress = { value: 0 }; 
  
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
  
        // We create a GSAP timeline and link it to the ScrollTrigger
        gsap.timeline({
          scrollTrigger: {
            trigger: "#blender2js-scroll-container-model1",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
        
            // ✅ NEW: ADD THE SNAP PROPERTY HERE
            snap: {
              snapTo: snapPoints, // The array of points to snap to
              duration: 2.5, // How long the snap animation takes
              ease: "power2.inOut", // Easing for a smooth start and end
              delay: 0.2, // A small delay before snapping
              directional: true,
            },
        
            onUpdate: (self) => {
              targetProgress.value = self.progress;
            },
          },
        });
        
  
        // Your existing ticker for smoothly updating React state from the targetProgress object
        gsap.ticker.add(() => {
          // We no longer need two progress trackers. The main scrollProgress is all we need.
          setScrollProgress((prev) => THREE.MathUtils.lerp(prev, targetProgress.value, 0.07));
          setRawScrollProgress(targetProgress.value); // Raw and mapped can now be the same
        });
        
        // Cleanup function
        cleanup = () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      } catch (err)
       {
        console.error("Failed to load GSAP:", err);
      }
    };
  
    initGSAP();
    return () => cleanup?.();
  }, [modelIsReady]);

  // The rest of your component's JSX remains the same...
  return (
    <div id="blender2js-scroll-container-model1" ref={containerRef} style={{ height: "1000vh", width: "100%" }}>
      {!modelIsReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <div id="text-overlay-portal"></div>
      {/* --- ADD THIS NEW LINE --- */}
      {modelIsReady && <StickyNav stickyZones={stickyZones} rawScrollProgress={rawScrollProgress} onDotClick={handleDotClick} />}

      {/* Pass both raw and mapped progress to your debug timeline to see the effect */}
      {/* {modelIsReady && <Timeline scrollProgress={scrollProgress} rawProgress={rawScrollProgress} />} */}
      {modelIsReady && (
        <FadingHeroContent
          scrollProgress={scrollProgress}
          heading="4K Clarity Meets AI Intelligence"
          subtitle="VREC-Z820DC Keeps the Road on Record"
          buttonText="Scroll to explore"
        />
      )}
      {modelIsReady && (
        <FullscreenBlackOverlay scrollProgress={scrollProgress} />
      )}
      {modelIsReady && <HeroImageFade scrollProgress={scrollProgress} />}
      {modelIsReady && <TextOverlay scrollProgress={scrollProgress} />}
      <FullscreenBlackOverlay scrollProgress={scrollProgress} />
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
        dpr={[1, 2]}
        frameloop={modelIsReady ? "always" : "never"}
      >
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
        {carScene && <DashcamIntroAnimation scrollProgress={scrollProgress} dashcamOffsetGroupRef={dashcamOffsetGroupRef} />}
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
