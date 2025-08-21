"use client";

import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, useTexture, AdaptiveDpr, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";
import { SRGBColorSpace } from "three";
import { Color } from "three";
import { Typography } from "@/components/CommonComponents/Typography/page";
import FadeLoader from "@/components/CommonComponents/Loader/page";
import Model4textOverlayMobile from "../MobileTextOverlayModel4/page";
import FadingHeroContent from "@/components/ModelHelperComponents/ScrollFadeAndScale";
useGLTF.preload("/models/car.glb");
useGLTF.preload("/models/VREC_H120dSC.glb");
useTexture.preload("/modelImages/CommonModelImages/aiNight.png");
const dashcamKeyframes = [
  {
    time: 0.0, // Start of the animation

    position: [-1.3, 0.2, 0],

    rotation: [-13, 0, 0], // Starts rotated 180 degrees

    scale: [220, 220, 220],
  },


  {
    time: 0.15, // Start of the animation

    position: [-0.01, -0.034, 0],

    rotation: [-13, 30, 0], // Starts rotated 180 degrees

    scale: [50, 50, 50],
  },
  {
    time: 0.3, // 60% of the way through

    position: [-0, -0.034, 0],

    rotation: [-13, 90, 0], // Starts rotated 180 degrees
    scale: [50, 50, 50],
  },
  {
    time: 0.6, // End of the animation

    position: [0, -0.01, 0], // Settles in the final, neutral position

    rotation: [-13, 150, 0], // Starts rotated 180 degrees

    scale: [50, 50, 50], // Settles at the final, neutral scale
  },
  {
    time: 0.75, // End of the animation

    position: [0, -0.01, 0], // Settles in the final, neutral position

    rotation: [-13, 180, 0], // Starts rotated 180 degrees

    scale: [50, 50, 50], // Settles at the final, neutral scale
  },
  {
    time: 0.9, // End of the animation

    position: [0, -0.01, 0], // Settles in the final, neutral position

    rotation: [-13, 220, 0], // Starts rotated 180 degrees

    scale: [50, 50, 50],// Settles at the final, neutral scale
  },
  {
    time: 1.0, // End of the animation

    position: [0, -0.01, 0], // Settles in the final, neutral position

    rotation: [-13, 220, 0], // Starts rotated 180 degrees

    scale: [50, 50, 50],// Settles at the final, neutral scale
  },
];
function useDashcamIntroAnimation(scrollProgress: number, dashcamOffsetGroupRef: React.RefObject<THREE.Group | null>) {
  const preAnimationStart = 0.06;
  const preAnimationEnd = 1;

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
const animationData = [
    { time: 0.0, position: [0.0011, 1.2214, 0.38], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 20 },
   
  
    // { time: 0.0, position: [0.0081, 1.2133, 0.4968], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 20 },
    { time: 0.041, position: [-0.09, 1.213, 0.48], quaternion: [0.02902204, -0.34, -0, 0.9276399], fov: 30 },
    // { time: 0.0417, position: [-0.1, 1.213, 0.48], quaternion: [0.02902204, -0.4, -0.0781377, 0.9276399], fov: 20 },
    { time: 0.1, position: [-0.1, 1.216, 0.32], quaternion: [-0.0, -0.83, 0.0000004, 0.61231], fov: 30 },
    // { time: 0.122, position: [-0.08, 1.216, 0.275], quaternion: [-0.0, -0.90010577, 0.00000004, 0.43567151], fov: 20 },
    { time: 0.1667, position: [-0.001, 1.2099, 0.292], quaternion: [0, 1.0, 0.0, 0.0], fov: 40 },

//   {
//     time: 0.2083,
//     position: [-0.002, 1.217, 0.25],
//     quaternion: [0.0, 1.0, 0.0, 0.0],
//     fov: 20,
//   }, // behind

  
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
      <Typography variant="hero-section-heading" className="font-bold text-white text-center px-4 max-w-2xl">
      Built to fit in, made to stand out
      </Typography>
      <p className="text-[16px] text-[#ABABAB] mt-2"> Compact, discreet, and always ready to capture your drive in stunning 1.5K</p>
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

function useFadeModelOpacity(groupRef: React.RefObject<THREE.Group | null>, scrollProgress: number, rangeStart = 0, rangeEnd = 0.12) {
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
    const inExplodeRange = scrollProgress >= 0.1911 && scrollProgress < 0.1985;

    // Camera animation sync
    const start = 0.09;
    const end = 1.0;
    const progressInRange = THREE.MathUtils.clamp((scrollProgress - start) / (end - start), 0, 1);
    const { position, quaternion, focalLength } = interpolateCamera(progressInRange, dashcamGroupRef);

    camera.position.copy(position);
    camera.quaternion.copy(quaternion);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = focalLength;
      camera.updateProjectionMatrix();
    }

    // Dashcam mount sync
    const cameraMount = carScene.getObjectByName("CameraMountFront");
    if (cameraMount && dashcamGroupRef.current && dashcamOffsetGroupRef.current) {
      cameraMount.updateWorldMatrix(true, false);
      cameraMountWorldMatrix.copy(cameraMount.matrixWorld);
      dashcamGroupRef.current.matrix.copy(cameraMountWorldMatrix);
      dashcamGroupRef.current.matrix.decompose(
        dashcamGroupRef.current.position,
        dashcamGroupRef.current.quaternion,
        dashcamGroupRef.current.scale
      );
    }
  });
}

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
  const dashcamGLTF = useGLTF("/models/VREC_H120SC.glb");
  const { scene: cameraModelScene, nodes: cameraNodes } = useGLTF("/models/VREC_H120SC.glb");
  const [carModelVisible, setCarModelVisible] = useState(false);
  const displayMountRef = useRef<THREE.Object3D | null>(null);
  const imagePlaneRef = useRef<THREE.Mesh | null>(null);
  const imageTextureRef = useRef<THREE.Texture | null>(null);
  const windshieldMeshesRef = useRef<THREE.Mesh[]>([]);
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
  }, [scrollProgress, dashcamGroupRef]);

  useEffect(() => {
    const carScene = carGLTF.scene as THREE.Group;
    const dashcamScene = dashcamGLTF.scene as THREE.Group;
    setCarSceneRef(carScene);

    carScene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.side = THREE.DoubleSide;
        }
      }
      if (node instanceof THREE.Mesh && node.name.toLowerCase().includes("windshield")) {
        windshieldMeshesRef.current.push(node);
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
      setCarModelVisible(true);
    } else {
      setCarModelVisible(false);
    }

    onLoadComplete();
    
  }, [carGLTF, dashcamGLTF, onLoadComplete, setCarSceneRef, scrollProgress]);
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
    // Load image texture
    const loader = new THREE.TextureLoader();
    loader.load("/Images/820Screen.webp", (texture) => {
      console.log("🎯 Image texture loaded successfully");
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
      // Create image plane
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 2),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: false,
          side: THREE.DoubleSide,
          toneMapped: false,
        })
      );
      plane.visible = false;
      imagePlaneRef.current = plane;
      plane.userData.imageMap = texture;

      console.log("🎯 Display mount found:", displayMountRef.current);
      if (displayMountRef.current) {
        displayMountRef.current.add(plane);
        plane.position.set(0, 0, 0);
        plane.visible = false;
        console.log("🎯 Plane added to display mount");
        console.log("🎯 Plane position:", plane.position);
        console.log("🎯 Plane world position:", plane.getWorldPosition(new THREE.Vector3()));
      } else {
        console.log("🎯 Display mount not found");
      }

      // Load video texture
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
  if (imagePlaneRef.current) {
    if (scrollProgress >= 0.417) {
      const { videoMap, videoEl } = imagePlaneRef.current.userData;
      if (videoMap) {
        const material = imagePlaneRef.current.material as THREE.MeshBasicMaterial;
        if (material.map !== videoMap) {
          material.map = videoMap;
          material.needsUpdate = true;
        }
        if (videoEl && videoEl.paused) videoEl.play();
        imagePlaneRef.current.visible = true;
      } else {
        // fallback: hide until video is ready
        imagePlaneRef.current.visible = false;
      }
    } else if (scrollProgress >= 0.1096 && scrollProgress <= 0.1864) {
      const { imageMap, videoEl } = imagePlaneRef.current.userData;
      const material = imagePlaneRef.current.material as THREE.MeshBasicMaterial;
      if (imageMap && material.map !== imageMap) {
        material.map = imageMap;
        material.needsUpdate = true;
      }
      if (videoEl && !videoEl.paused) videoEl.pause();
      imagePlaneRef.current.visible = true;
    } else {
      const { videoEl } = imagePlaneRef.current.userData;
      imagePlaneRef.current.visible = false;
      if (videoEl && !videoEl.paused) videoEl.pause();
    }
  }
  const fadeRef = useRef<THREE.Group | null>(null);
  const geometry = useMemo(() => {
    const interpolated = getInterpolatedClip(scrollProgress);
    return clipPathToShape(interpolated, 10, 10);
  }, [scrollProgress]);

  useFrame(() => {
    const highlightStart = 0.3546;
    const highlightEnd = 0.5221;

    const blend = THREE.MathUtils.clamp((scrollProgress - highlightStart) / (highlightEnd - highlightStart), 0, 1);

    windshieldMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.transparent = true;
      mat.opacity = THREE.MathUtils.lerp(0, 0.5, blend);
      mat.needsUpdate = true;
    });
  });

  const backdropGeometry = useMemo(() => {
    const interpolated = getInterpolatedClip(scrollProgress);
    return clipPathToShape(interpolated, 10, 10);
  }, [scrollProgress]);
  useFadeModelOpacity(fadeRef, scrollProgress);
  return (
    <>
    
      <primitive object={carGLTF.scene} visible={false} />
      <group ref={dashcamGroupRef}>
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

const openShape = "polygon(-60% 0%, 0 0, 100% 0, 155% 0%, 50% 49%)";
const closedShape = "polygon(49.75% 0%, 49.75% 0%, 49.75% 0%, 49.75% 0%, 50.41% 66.01%)";

function interpolateClipShape(from: string, to: string, t: number): string {
  const parse = (str: string) =>
    str
      .replace("polygon(", "")
      .replace(")", "")
      .split(",")
      .map((pt: string) => pt.trim().split(" ").map(parseFloat));

  const a = parse(from);
  const b = parse(to);

  const points = a.map(([ax, ay]: number[], i: number) => {
    const [bx, by] = b[i] as number[];
    const ix = THREE.MathUtils.lerp(ax, bx, t);
    const iy = THREE.MathUtils.lerp(ay, by, t);
    return `${ix}% ${iy}%`;
  });

  return `polygon(${points.join(", ")})`;
}

function getInterpolatedClip(scrollProgress: number): string {
  const openStart = 0.71;
  const openEnd = 0.75;
  const closeStart = 0.76;
  const closeEnd = 0.8;

  if (scrollProgress >= openStart && scrollProgress <= openEnd) {
    const t = (scrollProgress - openStart) / (openEnd - openStart);
    return interpolateClipShape(closedShape, openShape, t);
  } else if (scrollProgress >= closeStart && scrollProgress <= closeEnd) {
    const t = (scrollProgress - closeStart) / (closeEnd - closeStart);
    return interpolateClipShape(openShape, closedShape, t);
  } else if (scrollProgress < openStart || scrollProgress > closeEnd) {
    return closedShape;
  } else {
    return openShape;
  }
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
        const mat = imagePlaneRef.current.material as THREE.MeshBasicMaterial;
        if (mat) {
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
    const end = 0.113;
    const progress = THREE.MathUtils.clamp(scrollProgress / end, 0, 1);

    const scale = THREE.MathUtils.lerp(15.7, 3.4, progress);
    imagePlaneRef.current.scale.set(scale, scale, 1);

    const rotation = THREE.MathUtils.lerp(0, Math.PI * 1, progress);
    imagePlaneRef.current.rotation.z = rotation;

    // ✅ --- CORRECTED OPACITY LOGIC ---
    const holdEnd = 0.015;
    const fadeEnd = 0.08;
    let targetOpacity: number;

    if (scrollProgress <= holdEnd) {
      targetOpacity = 1; // Opacity is 1 until 0.08
    } else if (scrollProgress >= fadeEnd) {
      targetOpacity = 0; // Opacity is 0 after 0.11
    } else {
      // Calculate the progress of the fade (a value from 0 to 1)
      const fadeProgress = (scrollProgress - holdEnd) / (fadeEnd - holdEnd);
      // Animate opacity from 1 down to 0
      targetOpacity = THREE.MathUtils.lerp(1, 0, fadeProgress);
    }
    // --- END CORRECTION ---

    gsap.to(materialRef.current, {
      opacity: targetOpacity,
      duration: 0.3,
      ease: "power1.out",
    });

    materialRef.current.transparent = targetOpacity < 1;

    // Update visibility based on when the animation fully ends
    imagePlaneRef.current.visible = scrollProgress <= fadeEnd;
  }, [scrollProgress]);

  return (
    <mesh ref={imagePlaneRef} renderOrder={10} position={[0.2, -1.3, -4]} visible={true}>
      <planeGeometry args={[1, 1]} />
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
export default function Blender2JSPageModel4() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [lensAnimation, setLensAnimation] = useState(false);
  const [rawScrollProgress, setRawScrollProgress] = useState(0); // For debugging
  const dashcamGroupRef = useRef<THREE.Group>(null);
  const containerRef = useRef(null);
  const dashcamOffsetGroupRef = useRef<THREE.Group>(null);
  const { active } = useProgress();
  const animationProgress = useRef(0);
  const gsapRef = useRef<typeof import("gsap").gsap>();
  const stRef = useRef<typeof import("gsap/ScrollTrigger").ScrollTrigger>();
  const stickyZones = [
    // First pause
    [0.0435, 0.1], 
    [0.214, 0.254],
    // [0.2, 0.3],
    [0.353, 0.390],
    [0.55, 0.59],
    [0.748, 0.788],
    [0.849, 0.869],
   
  ];
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
    const targetProgress = { value: 0 };
    const rawTargetProgress = { value: 0 };
    const initGSAP = async () => {
      try {
        const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

      // --- Assign the modules to the .current property of the refs ---
      gsapRef.current = gsapModule.gsap;
      stRef.current = stModule.ScrollTrigger;
      
      // Now use the refs to register plugins
      gsapRef.current.registerPlugin(stRef.current, ScrollToPlugin);


      gsapRef.current.timeline({
        scrollTrigger: {
          // I also fixed a syntax error here by removing a misplaced comment
          id: "main-scroll",
          trigger: "#blender2js-scroll-container-model4",
          start: "top top",
          end: "bottom top",
          scrub: 0.1,
          onUpdate: (self) => {
            const rawProgress = self.progress;
            const mappedProgress = getAdjustedProgress(rawProgress, stickyZones);
            targetProgress.value = mappedProgress;
            rawTargetProgress.value = rawProgress;
          },
        },
      });

      gsapRef.current.ticker.add(() => {
        setScrollProgress((prev) => THREE.MathUtils.lerp(prev, targetProgress.value, 0.075));
        setRawScrollProgress((prev) => THREE.MathUtils.lerp(prev, rawTargetProgress.value, 0.075));
        animationProgress.current = targetProgress.value;
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        gsapRef.current.ticker.remove(() => {});
      };
      } catch (err) {
        console.error("Failed to load GSAP:", err);
      }
    };

    initGSAP();
    return () => cleanup?.();
  }, [modelIsReady]);

  return (
    <div id="blender2js-scroll-container-model4" ref={containerRef} style={{ height: "700vh", width: "100%" }}>
      {!modelIsReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
          {modelIsReady && <StickyNav stickyZones={stickyZones} rawScrollProgress={rawScrollProgress} onDotClick={handleDotClick} />}
      {/* <div id="text-overlay-portal"></div> */}
      {modelIsReady && <Timeline scrollProgress={scrollProgress} rawProgress={rawScrollProgress}/>}
      {/* {modelIsReady && <HeroTextFade scrollProgress={scrollProgress} />} */}
      {modelIsReady && (
        <FadingHeroContent
          scrollProgress={scrollProgress}
          heading="Built to fit in, made to stand out"
          subtitle=" Compact, discreet, and always ready to capture your drive in stunning 1.5K"
          buttonText="Scroll to explore"
        />
      )}
      {modelIsReady && <FullscreenBlackOverlay scrollProgress={scrollProgress} />}
            {modelIsReady && <Model4textOverlayMobile scrollProgress={scrollProgress} />}

      {/* Model4textOverlayMobile */}
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
        {/* {carScene && (
          <CameraAnimation
            scrollProgress={scrollProgress}
            carScene={carScene}
            dashcamGroupRef={dashcamGroupRef}
            dashcamOffsetGroupRef={dashcamOffsetGroupRef}
            setLensAnimation={setLensAnimation}
          />
        )} */}
      </Canvas>
    </div>
  );
}
