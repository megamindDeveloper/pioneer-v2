"use client";

import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, useTexture, AdaptiveDpr, useProgress, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { SRGBColorSpace } from "three";
import { Color } from "three";
import FadeLoader from "@/components/CommonComponents/Loader/page";
import Model1TextOverlay from "../TextOverlayModel1/page";
import FadingHeroContent from "@/components/ModelHelperComponents/ScrollFadeAndScale";
import { interpolateModelOneCameraFromScroll } from "@/features/Animation/utils/modelOneAnimationUtils";
import { modelOneAnimationData } from "@/features/Animation/data/modelOneAnimationData";
import { getInterpolatedClip } from "@/features/Animation/utils/clipPathUtils";
import { degToRad } from "@/features/Animation/utils/math";
import { useFadeModelOpacity } from "@/features/Animation/hooks/useFadeModelOpacity";
import FullscreenBlackOverlay from "@/components/ModelHelperComponents/FullscreenBlackOverlay";
import Timeline from "@/features/Animation/developmentHelpers/timeline";

useTexture.preload("/modelImages/CommonModelImages/aiNight.png");

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
    const inExplodeRange = scrollProgress >= 0.191 && scrollProgress < 0.196;

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
    const { position, quaternion, focalLength } = interpolateModelOneCameraFromScroll(progressInRange, modelOneAnimationData, dashcamGroupRef);

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
const clipAnimationTimings = { start: 0.66, mid: 0.7, end: 0.75 };

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
    if (scrollProgress > 0.4051) {
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
        plane.position.set(0, 0, -0.1);
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

    const imageFadeIn = 0.25;
    const imageMidpoint = 0.26;
    const imageFadeOut = 0.3;
    const videoFadeIn = 0.3208;
    const videoMidpoint = 0.329;
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
    const interpolated = getInterpolatedClip(scrollProgress, closedShape, openShape, clipAnimationTimings);
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

  useFadeModelOpacity(fadeRef, scrollProgress, 0, 0.12);
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

      {scrollProgress >= 0.66 && scrollProgress <= 0.8813 && (
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

export default function Blender2JSPageModel1({ onAnimationComplete,onAnimationStartReverse }) {
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [lensAnimation, setLensAnimation] = useState(false);
  const dashcamGroupRef = useRef<THREE.Group>(null);
  const containerRef = useRef(null);
  const dashcamOffsetGroupRef = useRef<THREE.Group>(null);
  const { active } = useProgress();
  const [rawScrollProgress, setRawScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const progressProxyRef = useRef({ raw: 0, adjusted: 0 });
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
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
  const stickyZones = [
    [0.0], // Add a starting point for index 0
    [0.045],
    [0.09],
    [0.20],
    [0.24],
    [0.33],
    [0.335],
    [0.515],
    [0.70],
    [0.822],
    [0.95],
    [1.0], // Add a final end point
  ];
  // In Blender2JSPageModel1.jsx


  useEffect(() => {
    if (!modelIsReady || !containerRef.current) return;

    let cleanup: (() => void) | undefined;
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        
        // The local progressProxy variable is no longer needed here

        const scrollToSection = (index: number) => {
          if (isAnimating.current || index < 0 || index >= stickyZones.length) {
            return;
          }
          isAnimating.current = true;
          // You still need to update the state to track the current section
          setCurrentIndex(index); 
          
          const rawTargetProgress = stickyZones[index][0];
          const adjustedTargetProgress = getAdjustedProgress(rawTargetProgress, [
              [0.03, 0.07], [0.13, 0.19], [0.245, 0.3], [0.34, 0.38],
              [0.381, 0.43], [0.56, 0.61], [0.65, 0.69], [0.72, 0.76],
              [0.842, 0.91], [0.95, 0.99]
          ]);

          // --- CHANGED: Animate the ref's current value ---
          gsap.to(progressProxyRef.current, {
            raw: rawTargetProgress,
            adjusted: adjustedTargetProgress,
            duration:3,
            ease: "power2.inOut",
            onUpdate: () => {
              // Update React state from the ref's values
              setRawScrollProgress(progressProxyRef.current.raw);
              setScrollProgress(progressProxyRef.current.adjusted);
              if (scrollProgress < 0.9999) {
                onAnimationStartReverse();
              }
            },
            onComplete: () => {
              isAnimating.current = false;
              if (index === 11) {
                setTimeout(() => {
                  if (onAnimationComplete) {
                    onAnimationComplete();
                  }
                }, 500);
              }
            },
          });
        };

        const handleWheel = (e: WheelEvent) => {
          e.preventDefault();
          if (isAnimating.current) return;

          // We need a way to get the latest currentIndex without re-running the effect.
          // The functional update form of setState is perfect for this.
          setCurrentIndex(prevIndex => {
            const direction = e.deltaY > 0 ? 1 : -1;
            const nextIndex = prevIndex + direction;
            const finalIndex = stickyZones.length - 1;
            // Trigger the animation with the newly calculated index
            scrollToSection(nextIndex);
            
            // Return the new index to update the state
            if (nextIndex >= 0 && nextIndex < stickyZones.length) {
                return nextIndex;
            }
            if (prevIndex === finalIndex && direction === -1) {
              if (onAnimationStartReverse) {
                onAnimationStartReverse();
              }
            }
            return prevIndex; // Return previous index if out of bounds
          });
        };
        
        scrollToSection(0); 
        window.addEventListener("wheel", handleWheel, { passive: false });
        cleanup = () => window.removeEventListener("wheel", handleWheel);

      } catch (err) {
        console.error("Failed to load GSAP:", err);
      }
    };

    initGSAP();
    return () => cleanup?.();
  }, [modelIsReady]); // <-- CHANGED: Removed currentIndex
  
  const [dpr, setDpr] = useState(1.5);
  return (
    <div id="blender2js-scroll-container-model1" ref={containerRef} style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
      {!modelIsReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <div id="text-overlay-portal"></div>
      {modelIsReady && (
        <Timeline key={"model1"} animationData={modelOneAnimationData} scrollProgress={scrollProgress} rawProgress={rawScrollProgress} />
      )}
      {modelIsReady && (
        <FadingHeroContent
          scrollProgress={scrollProgress}
          heading="4K Clarity Meets AI Intelligence"
          subtitle="VREC-Z820DC Keeps the Road on Record"
          buttonText="Scroll to explore"
        />
      )}
      {modelIsReady && <Model1TextOverlay scrollProgress={scrollProgress} />}
      {modelIsReady && (
        <FullscreenBlackOverlay scrollProgress={scrollProgress} fadeInStart={0} fadeInEnd={0} fadeOutStart={0.03} fadeOutEnd={0.065} key={"Model1"} />
      )}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 20, near: 0.01, far: 1000 }}
        style={{
          background: "#ffff",
          height: "100vh",
          position: "fixed",
          top: 0,
        }}
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
        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />
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
