"use client";

import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useTexture,
  AdaptiveDpr,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { SRGBColorSpace } from "three";
import { Color } from "three";
import { Typography } from "@/components/CommonComponents/Typography/page";
import FadeLoader from "@/components/CommonComponents/Loader/page";
import TextOverlay from "../TextOverlayModel2/page";
import FadingHeroContent from "@/components/ModelHelperComponents/ScrollFadeAndScale";
useGLTF.preload("/models/car.glb");
useGLTF.preload("/models/VREC_H520DC.glb");
useTexture.preload("/modelImages/CommonModelImages/aiNight.png");

const animationData = [
  {
    time: 0.0,
    position: [0.005, 1.222, 0.4968],
    quaternion: [0.0, 0.0, 0.0, 1.0],
    fov: 2,
  },
  // { time: 0.0, position: [0.005, 1.222, 0.4968], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 2.5 },
  // { time: 0.0, position: [0.005, 1.222, 0.4968], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 3 },
  {
    time: 0.0417,
    position: [-0.11, 1.215, 0.44],
    quaternion: [0.03902204, -0.5, -0.0781377, 0.9276399],
    fov: 20,
  },
  // {
  //   time: 0.0417,
  //   position: [-0.11, 1.215, 0.44],
  //   quaternion: [0.03902204, -0.5, -0.0781377, 0.9276399],
  //   fov: 20,
  // },
  {
    time: 0.122,
    position: [-0.08, 1.22, 0.275],
    quaternion: [0, -0.90010577, 0.00000004, 0.43567151],
    fov: 20,
  },
  // {
  //   time: 0.122,
  //   position: [-0.08, 1.22, 0.275],
  //   quaternion: [0, -0.90010577, 0.00000004, 0.43567151],
  //   fov: 20,
  // },
  {
    time: 0.1667,
    position: [-0.001, 1.216, 0.3],
    quaternion: [0, 1.0, 0.0, 0.0],
    fov: 30,
  },

  // {
  //   time: 0.1667,
  //   position: [-0.001, 1.216, 0.3],
  //   quaternion: [0, 1.0, 0.0, 0.0],
  //   fov: 30,
  // },

  // {
  //   time: 0.1667,
  //   position: [-0.002, 1.216, 0.3],
  //   quaternion: [0, 1.0, 0.0, 0.0],
  //   fov: 35,
  // },
  {
    time: 0.2083,
    position: [-0.0094, 1.2136, 0.0113],
    quaternion: [0.0, 1.0, -0.00000004, 0.00000004],
    fov: 30.9915,
  },

  {
    time: 0.25,
    position: [-0.0093, 1.1809, -2.2],
    quaternion: [0.00000002, 0.99999607, 0.00280268, 0.00000016],
    fov: 30,
  },

  {
    time: 0.2917,
    position: [-0.0093, 3.9288, -3.2975],
    quaternion: [0.00000007, 0.9208445, 0.38993004, 0.00000008],
    fov: 26.9915,
  },

  {
    time: 0.3333,
    position: [-0.0093, 6.6768, 0.0038],
    quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003],
    fov: 43.6028,
  },
  {
    time: 0.3333,
    position: [-0.0093, 6.6768, 0.0038],
    quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003],
    fov: 43.6028,
  },
  {
    time: 0.3333,
    position: [-0.00, 6.6768, 0.0038],
    quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003],
    fov: 43.6028,
  },
  {
    time: 0.375,
    position: [-0.0093, 6.6768, 3.1115],
    quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883],
    fov: 30.6028,
  },
  {
    time: 0.375,
    position: [-0.0093, 6.6768, -9],
    quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883],
    fov: 33.6028,
  },
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
      <Typography
        variant="hero-section-heading"
        className="text-xl lg:text-[62px] lg2:text-[72px] xl:text-[92px] font-medium text-white text-center px-4"
      >
        When Detail Matters the Most
      </Typography>
      <p className="text-xl lg:text-[36px] xl:text-[40px] leading-tight text-[#ABABAB] mt-2 max-w-3xl">
        VREC‑H520DC captures sharp 2K video, even in low light and on the move.
      </p>
      <button className="bg-[#262626] px-2 pl-4 py-2 rounded-full text-white mt-8 flex lg:text-xl xl:text-[24px] font-medium items-center mx-auto">
        Explore the features
        <img
          src="/icons/chevDownCircle.svg"
          width={24}
          height={24}
          alt="Arrow Down"
          className="ml-3"
        />
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
    const t = THREE.MathUtils.clamp(
      (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart),
      0,
      1
    );
    opacity = THREE.MathUtils.lerp(0, 1, t);
  } else if (scrollProgress < fadeOutStart) {
    opacity = 1;
  } else if (scrollProgress <= fadeOutEnd) {
    const t = THREE.MathUtils.clamp(
      (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart),
      0,
      1
    );
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

    const progress = THREE.MathUtils.clamp(
      (scrollProgress - rangeStart) / (rangeEnd - rangeStart),
      0,
      1
    );
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

function interpolateCamera(
  time: number,
  dashcamGroupRef?: React.RefObject<THREE.Group | null>
) {
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

  const isProblematicRange =
    keyframe1.time === 0.0417 && keyframe2.time === 0.0833;

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

    const direction = new THREE.Vector3()
      .subVectors(position, target)
      .normalize();
    const distance = new THREE.Vector3(...keyframe1.position).distanceTo(
      target
    );
    const newPosition = new THREE.Vector3()
      .copy(target)
      .add(direction.multiplyScalar(distance));
    const blendFactor = THREE.MathUtils.smoothstep(0, 1, t);
    position.lerpVectors(position, newPosition, blendFactor);

    const tempCamera = new THREE.PerspectiveCamera();
    tempCamera.position.copy(position);
    tempCamera.lookAt(target);
    const lookAtQuaternion = tempCamera.quaternion.clone();

    const smoothBlend = THREE.MathUtils.smoothstep(0.4, 0.6, t);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(
      normalQuaternion,
      lookAtQuaternion,
      smoothBlend
    );
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

function interpolateCameraFromScroll(
  scrollProgress: number,
  dashcamGroupRef?: React.RefObject<THREE.Group | null>
) {
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
    const inExplodeRange = scrollProgress >= 0.1229 && scrollProgress < 0.1552;
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
    const progressInRange = THREE.MathUtils.clamp(
      (scrollProgress - start) / (end - start),
      0,
      1
    );
    const { position, quaternion, focalLength } = interpolateCameraFromScroll(
      progressInRange,
      dashcamGroupRef
    );

    camera.position.copy(position);
    camera.quaternion.copy(quaternion);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = focalLength;
      camera.updateProjectionMatrix();
    }

    const cameraMount = carScene.getObjectByName("CameraMountFront");
    if (
      cameraMount &&
      dashcamGroupRef?.current &&
      dashcamOffsetGroupRef?.current
    ) {
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
  dashcamGroupRef: React.RefObject<THREE.Group>;
  dashcamOffsetGroupRef: React.RefObject<THREE.Group>;
}) {
  const carGLTF = useGLTF("/models/car.glb");
  const dashcamGLTF = useGLTF("/models/VREC_H520DC.glb");
  const rearCamGLTF = useGLTF("/models/REARCAM.glb");
  const { scene: cameraModelScene, nodes: cameraNodes } = useGLTF(
    "/models/VREC_H520DC.glb"
  );
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
      if (
        node instanceof THREE.Mesh &&
        node.name.toLowerCase().includes("windshield")
      ) {
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
      displayMountRef.current = displayMount;
    } else {
      console.log("🎯 DISPLAY not found");
    }

    const loader = new THREE.TextureLoader();
    loader.load("/modelImages/CommonModelImages/520 Screen.webp", (texture) => {
      console.log("🎯 Image texture loaded successfully");
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.repeat.x = -1;
      texture.offset.x = 1;

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.065, 0.036),
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

      if (displayMountRef.current) {
        displayMountRef.current.add(plane);
        plane.position.set(0.0038, 0.00353, 0);
        plane.visible = false;
        console.log("🎯 Plane added to display mount");
      }

      // ✨ --- START: NEW CODE --- ✨
      // Load the new HDR image texture
      loader.load(
        "/productPageImages/comparisionImages/h520dc/520 - 3rd card.webp",
        (hdrTexture) => {
          console.log("🎯 HDR image texture loaded successfully");
          hdrTexture.colorSpace = THREE.SRGBColorSpace;
          // Store it in userData, following the existing pattern
          plane.userData.hdrImageMap = hdrTexture;
        }
      );
      // ✨ --- END: NEW CODE --- ✨

      const video = document.createElement("video");
      video.src = "/video/Video520.mp4";
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
  }, [cameraNodes]); // Note: dependency array is intentionally kept simple

  // This logic block now handles all 3 states for the screen
  if (imagePlaneRef.current) {
    if (scrollProgress >= 0.3149) {
      const { videoMap, videoEl } = imagePlaneRef.current.userData;
      if (videoMap) {
        const material = imagePlaneRef.current
          .material as THREE.MeshBasicMaterial;
        if (material.map !== videoMap) {
          material.map = videoMap;
          material.needsUpdate = true;
        }
        if (videoEl && videoEl.paused) videoEl.play();
        imagePlaneRef.current.visible = true;
      } else {
        imagePlaneRef.current.visible = false;
      }
    } else if (scrollProgress >= 0.302 && scrollProgress <= 0.3149) {
      const { imageMap, videoEl } = imagePlaneRef.current.userData;
      const material = imagePlaneRef.current
        .material as THREE.MeshBasicMaterial;
      if (imageMap && material.map !== imageMap) {
        material.map = imageMap;
        material.needsUpdate = true;
      }
      if (videoEl && !videoEl.paused) videoEl.pause();
      imagePlaneRef.current.visible = true;
    }
    // ✨ --- START: NEW CODE --- ✨
    // Add new condition for the HDR image
    else if (scrollProgress >= 0.22 && scrollProgress <= 0.26) {
      const { hdrImageMap, videoEl } = imagePlaneRef.current.userData;
      const material = imagePlaneRef.current
        .material as THREE.MeshBasicMaterial;
      // Check if hdrImageMap is loaded and not already set
      if (hdrImageMap && material.map !== hdrImageMap) {
        material.map = hdrImageMap;
        material.needsUpdate = true;
      }
      // Ensure video is paused
      if (videoEl && !videoEl.paused) videoEl.pause();
      // Make plane visible if texture is ready
      imagePlaneRef.current.visible = !!hdrImageMap;
    }
    // ✨ --- END: NEW CODE --- ✨
    else {
      const { videoEl } = imagePlaneRef.current.userData;
      imagePlaneRef.current.visible = false;
      if (videoEl && !videoEl.paused) videoEl.pause();
    }
  }

  const fadeRef = useRef<THREE.Group>(null);
  // This part of your code remains unchanged
  const geometry = useMemo(() => {
    const interpolated = getInterpolatedClip(scrollProgress);

    return clipPathToShape(interpolated, 10, 10);
  }, [scrollProgress]);

  useFrame(() => {
    const highlightStart = 0.4968;

    const highlightEnd = 0.6024;

    const blend = THREE.MathUtils.clamp(
      (scrollProgress - highlightStart) / (highlightEnd - highlightStart),
      0,
      1
    );

    windshieldObjects.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;

      mat.transparent = true;

      mat.opacity = THREE.MathUtils.lerp(0, 0.5, blend);

      mat.needsUpdate = true;
    });
  });

  useFadeModelOpacity(fadeRef, scrollProgress);

  return (
    <>
      {/* DEBUG: Always visible test plane */}

      {imageTextureRef.current && (
        <mesh position={[0, 2, 5]} visible={true}>
          <planeGeometry args={[2, 2]} />

          <meshBasicMaterial map={imageTextureRef.current} toneMapped={false} />
        </mesh>
      )}

      {/* DEBUG: Independent plane at DISPLAY world position */}

      {displayMountRef.current && imageTextureRef.current && (
        <mesh
          position={displayMountRef.current.getWorldPosition(
            new THREE.Vector3()
          )}
          visible={true}
        >
          <planeGeometry args={[2, 2]} />

          <meshBasicMaterial
            map={imageTextureRef.current}
            toneMapped={false}
            color="red"
          />
        </mesh>
      )}

      {/* ✅ White platform under car model */}

      {scrollProgress >= 0.7663 && scrollProgress <= 0.8879 && (
        <mesh
          geometry={geometry}
          rotation={[-Math.PI / 2, 0, Math.PI / 1]}
          position={[0, 0.1, 0]}
        >
          <meshBasicMaterial color="#313131" toneMapped={false} />
        </mesh>
      )}

      <primitive object={carGLTF.scene} visible={carVisible} />

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
  useCameraAnimationSync(
    scrollProgress,
    carScene,
    dashcamGroupRef,
    dashcamOffsetGroupRef,
    setLensAnimation
  );
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
      return [
        (parseFloat(x) / 100 - 0.5) * width,
        ((100 - parseFloat(y)) / 100 - 0.5) * height,
      ];
    });

  shape.moveTo(coords[0][0], coords[0][1]);
  for (let i = 1; i < coords.length; i++) {
    shape.lineTo(coords[i][0], coords[i][1]);
  }
  shape.lineTo(coords[0][0], coords[0][1]);

  return new THREE.ShapeGeometry(shape);
}

const openShape = "polygon(-15% 34%, 0 0, 100% 0, 115% 34%, 50% 44%)";
const closedShape =
  "polygon(49.75% 0%, 49.75% 0%, 49.75% 0%, 49.75% 0%, 50.41% 66.01%)";

function getInterpolatedClip(scrollProgress: number) {
  const start = 0.7664;
  const mid = 0.792;
  const end = 0.8413;

  let blend;
  let shapeFrom, shapeTo;

  if (scrollProgress <= mid) {
    blend = THREE.MathUtils.clamp(
      (scrollProgress - start) / (mid - start),
      0,
      1
    );
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

    const scale = THREE.MathUtils.lerp(0.7, 0.7, progress);
    imagePlaneRef.current.scale.set(scale, scale, 1);

    const rotation = THREE.MathUtils.lerp(0, Math.PI * 1, progress);
    imagePlaneRef.current.rotation.z = rotation;

    // ✅ --- CORRECTED OPACITY LOGIC ---
    const holdEnd = 0.01;
    const fadeEnd = 0.0605;
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
    <mesh
      ref={imagePlaneRef}
      renderOrder={10}
      position={[0, 1.211, -4]}
      visible={true}
    >
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

function LensAnimation({
  isAnimating,
  dashcamGroupRef,
}: {
  isAnimating: boolean;
  dashcamGroupRef: React.RefObject<THREE.Group | null>;
}) {
  const timelineRef = useRef<any>(null);
  const explodedRef = useRef(false);

  useEffect(() => {
    const root = dashcamGroupRef.current;
    if (!root) return;

    const runAnimation = async () => {
      const { gsap } = await import("gsap");

      const lensElements: THREE.Object3D[] = [];
      root.traverse((child) => {
        if (
          child.name.toLowerCase().includes("lens") ||
          child.name.match(/^\d+$/)
        ) {
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
              z: [0.001, 0.0, 0.03, 0.015, 0.026, 0.05][i] || 0.036,
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
export default function Blender2JSPageModel2() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [lensAnimation, setLensAnimation] = useState(false);
  const dashcamGroupRef = useRef<THREE.Group>(null);
   const [rawScrollProgress, setRawScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const dashcamOffsetGroupRef = useRef<THREE.Group>(null);
  const { active } = useProgress();
  const stickyZones = [
    // First pause
    [0.027, 0.047], // Second pause
    [0.1195, 0.1595],
    [0.171, 0.218],
    [0.263, 0.303],
    [0.365, 0.405],
    [0.4072, 0.4412],
    [0.5604, 0.6004],
    [0.90, 0.94],
  ];

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
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        gsap.timeline({
          scrollTrigger: {
            trigger: "#blender2js-scroll-container-model2",
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
          onUpdate: (self) => {
              const rawProgress = self.progress;

              // --- MODIFIED: Call the new function with the zones array ---
              const mappedProgress = getAdjustedProgress(rawProgress, stickyZones);

              targetProgress.value = mappedProgress;
              rawTargetProgress.value = rawProgress;
            },
          },
        });
          gsap.ticker.add(() => {
                  setScrollProgress((prev) => THREE.MathUtils.lerp(prev, targetProgress.value, 0.04));
                  setRawScrollProgress((prev) => THREE.MathUtils.lerp(prev, rawTargetProgress.value, 0.04));
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

  return (
    <div
      id="blender2js-scroll-container-model2"
      ref={containerRef}
      style={{ height: "2000vh", width: "100%" }}
    >
      {!modelIsReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <div id="text-overlay-portal"></div>
      {/* {modelIsReady && <Timeline scrollProgress={scrollProgress} rawProgress={rawScrollProgress} />} */}
      {/* {modelIsReady && <HeroTextFade scrollProgress={scrollProgress} />} */}
      {modelIsReady && (
        <FadingHeroContent
          scrollProgress={scrollProgress}
          heading="When Detail Matters the Most"
          subtitle="VREC‑H520DC captures sharp 2K video, even in low light and on the move."
          buttonText="Scroll to explore"
        />
      )}
      {modelIsReady && (
        <FullscreenBlackOverlay scrollProgress={scrollProgress} />
      )}
      {modelIsReady && <TextOverlay scrollProgress={scrollProgress} />}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 20, near: 0.01, far: 1000 }}
        style={{
          background: "#ffff",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
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
          {modelIsReady && (
            <Environment files="/hdri/111.hdr" background={false} />
          )}
          <Blender2JSScene
            scrollProgress={scrollProgress}
            onLoadComplete={() => setModelIsReady(true)}
            setCarSceneRef={(ref) => setCarScene(ref)}
            dashcamGroupRef={dashcamGroupRef}
            dashcamOffsetGroupRef={dashcamOffsetGroupRef}
          />
          <LensAnimation
            isAnimating={lensAnimation}
            dashcamGroupRef={dashcamGroupRef}
          />
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
