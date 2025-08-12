"use client";

import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Environment, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { SRGBColorSpace } from "three";
useGLTF.preload("/models/car.glb");
useGLTF.preload("/models/VREC_H520DC.glb");
useTexture.preload("/modelImages/CommonModelImages/aiNight.png");
const animationData = [
  { time: 0.0, position: [0.005, 1.222, 0.4968], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 2 },
  // { time: 0.0, position: [0.005, 1.222, 0.4968], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 2.5 },
  { time: 0.0, position: [0.005, 1.222, 0.4968], quaternion: [0.0, 0.0, 0.0, 1.0], fov: 3 },
  { time: 0.0417, position: [-0.11, 1.215, 0.44], quaternion: [0.03902204, -0.5, -0.0781377, 0.9276399], fov: 20 },
  { time: 0.0417, position: [-0.11, 1.215, 0.44], quaternion: [0.03902204, -0.5, -0.0781377, 0.9276399], fov: 20 },
  { time: 0.122, position: [-0.08, 1.22, 0.275], quaternion: [0, -0.90010577, 0.00000004, 0.43567151], fov: 20 },
  { time: 0.122, position: [-0.08, 1.22, 0.275], quaternion: [0, -0.90010577, 0.00000004, 0.43567151], fov: 20 },
  { time: 0.1667, position: [-0.000, 1.216, 0.3], quaternion: [0, 1.0, 0.0, 0.0], fov: 30 },

  { time: 0.1667, position: [-0.001, 1.216, 0.3], quaternion: [0, 1.0, 0.0, 0.0], fov: 30 },

  { time: 0.1667, position: [-0.002, 1.216, 0.3], quaternion: [0, 1.0, 0.0, 0.0], fov: 35 },
  { time: 0.2083, position: [-0.0094, 1.2136, 0.0113], quaternion: [0.0, 1.0, -0.00000004, 0.00000004], fov: 30.9915 },

  { time: 0.25, position: [-0.0093, 1.1809, -2.2], quaternion: [0.00000002, 0.99999607, 0.00280268, 0.00000016], fov: 40 },

  { time: 0.2917, position: [-0.0093, 3.9288, -3.2975], quaternion: [0.00000007, 0.9208445, 0.38993004, 0.00000008], fov: 26.9915 },

  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 43.6028 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 43.6028 },
  { time: 0.3333, position: [-0.0093, 6.6768, 0.0038], quaternion: [-0.0000001, 0.70092404, 0.71323591, 0.0000003], fov: 43.6028 },
  { time: 0.375, position: [-0.0093, 6.6768, 3.1115], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 30.6028 },
  { time: 0.375, position: [-0.0093, 6.6768, -9], quaternion: [-0.50217175, 0.49781877, 0.50217175, 0.49781883], fov: 33.6028 },

];

import { OrbitControls, Stats, TransformControls } from "@react-three/drei";
import { Html } from "@react-three/drei";


function EditableCameraHelper({ setKeyframe }: { setKeyframe: Function }) {
  const camGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [currentTime, setCurrentTime] = useState(0);
  const [capturedKeyframes, setCapturedKeyframes] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleCapture = () => {
    if (!camGroupRef.current) return;
    const pos = camGroupRef.current.position.toArray();
    const quat = camGroupRef.current.quaternion.toArray();
    const fov = camera.fov;

    const newKeyframe = {
      time: currentTime,
      position: pos,
      quaternion: quat,
      fov,
    };

    setCapturedKeyframes((prev) => {
      const filtered = prev.filter((kf) => Math.abs(kf.time - currentTime) > 0.001);
      return [...filtered, newKeyframe].sort((a, b) => a.time - b.time);
    });

    const output = JSON.stringify(newKeyframe, null, 2);
    navigator.clipboard.writeText(output);
    console.log("Captured keyframe:", newKeyframe);
  };

  const handleExportAll = () => {
    const sortedKeyframes = capturedKeyframes.sort((a, b) => a.time - b.time);
    const output = JSON.stringify(sortedKeyframes, null, 2);
    navigator.clipboard.writeText(output);
    console.log("Exported all keyframes:", sortedKeyframes);
  };

  const handleClearAll = () => {
    setCapturedKeyframes([]);
  };

  const handleDeleteKeyframe = (time: number) => {
    setCapturedKeyframes((prev) => prev.filter((kf) => Math.abs(kf.time - time) > 0.001));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const handleJumpToKeyframe = (keyframe: any) => {
    setCurrentTime(keyframe.time);
    if (camGroupRef.current) {
      camGroupRef.current.position.set(keyframe.position[0], keyframe.position[1], keyframe.position[2]);
      camGroupRef.current.quaternion.set(keyframe.quaternion[0], keyframe.quaternion[1], keyframe.quaternion[2], keyframe.quaternion[3]);
    }
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = keyframe.fov;
      camera.updateProjectionMatrix();
    }
  };

  return (
    <>
      <group ref={camGroupRef} position={[0, 1, 5]}>
        <mesh>
          <boxGeometry args={[0.2, 0.2, 0.5]} />
          <meshBasicMaterial color="orange" />
        </mesh>
        <Html position={[0, 0.5, 0]}>
          <div
            style={{
              background: "rgba(0,0,0,0.9)",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "12px",
              minWidth: "250px",
              fontFamily: "monospace",
            }}
          >
            <div style={{ marginBottom: "10px", fontWeight: "bold", textAlign: "center" }}>🎥 Camera Keyframe Tool</div>

            {/* Time Control */}
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Time: {currentTime.toFixed(4)}</label>
              <input type="range" min="0" max="1" step="0.001" value={currentTime} onChange={handleTimeChange} style={{ width: "100%" }} />
            </div>

            {/* Capture Controls */}
            <div style={{ marginBottom: "10px", display: "flex", gap: "5px" }}>
              <button
                onClick={handleCapture}
                style={{
                  padding: "5px 10px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                📸 Capture
              </button>
              <button
                onClick={handleExportAll}
                style={{
                  padding: "5px 10px",
                  background: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                📋 Export All
              </button>
            </div>

            <button
              onClick={handleClearAll}
              style={{
                padding: "5px 10px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              🗑️ Clear All
            </button>

            {/* Keyframes List */}
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Keyframes ({capturedKeyframes.length}):</div>
              {capturedKeyframes.length === 0 ? (
                <div style={{ color: "#aaa", fontSize: "10px", textAlign: "center" }}>No keyframes captured yet</div>
              ) : (
                capturedKeyframes.map((keyframe, index) => (
                  <div
                    key={index}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "5px",
                      marginBottom: "3px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{keyframe.time.toFixed(4)}</span>
                    <div>
                      <button
                        onClick={() => handleJumpToKeyframe(keyframe)}
                        style={{
                          padding: "2px 5px",
                          background: "#FF9800",
                          color: "white",
                          border: "none",
                          borderRadius: "2px",
                          cursor: "pointer",
                          marginRight: "3px",
                          fontSize: "8px",
                        }}
                      >
                        Jump
                      </button>
                      <button
                        onClick={() => handleDeleteKeyframe(keyframe.time)}
                        style={{
                          padding: "2px 5px",
                          background: "#f44336",
                          color: "white",
                          border: "none",
                          borderRadius: "2px",
                          cursor: "pointer",
                          fontSize: "8px",
                        }}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Camera Info */}
            <div style={{ marginTop: "10px", fontSize: "10px", color: "#aaa" }}>
              <div>
                Position:{" "}
                {camGroupRef.current?.position
                  .toArray()
                  .map((v) => v.toFixed(3))
                  .join(", ")}
              </div>
              <div>FOV: {camera instanceof THREE.PerspectiveCamera ? camera.fov.toFixed(1) : "N/A"}°</div>
            </div>
          </div>
        </Html>
      </group>
      <TransformControls object={camGroupRef.current} />
    </>
  );
}
const degToRad = (degrees) => degrees * (Math.PI / 180);
// Axes Helper
function DebugAxesHelper({ size = 2 }) {
  const { scene } = useThree();
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(size);
    scene.add(axesHelper);
    return () => {
      scene.remove(axesHelper);
    };
  }, [scene, size]);
  return null;
}

// Grid Helper
function DebugGridHelper({ size = 10, divisions = 10 }) {
  const { scene } = useThree();
  useEffect(() => {
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    return () => {
      scene.remove(gridHelper);
    };
  }, [scene, size, divisions]);
  return null;
}

// Bounding Box Helper
function BoundingBoxHelper({ objectRef }: { objectRef: React.RefObject<THREE.Object3D> }) {
  const { scene } = useThree();
  useEffect(() => {
    if (!objectRef.current) return;
    const boxHelper = new THREE.BoxHelper(objectRef.current, 0xffff00);
    scene.add(boxHelper);
    return () => scene.remove(boxHelper);
  }, [scene, objectRef]);
  return null;
}

// Log Position (every frame)
function LogWorldPosition({ objectRef }: { objectRef: React.RefObject<THREE.Object3D> }) {
  useFrame(() => {
    if (objectRef.current) {
      const pos = new THREE.Vector3();
      objectRef.current.getWorldPosition(pos);
    }
  });
  return null;
}

function useFadeModelOpacity(groupRef: React.RefObject<THREE.Group>, scrollProgress: number, rangeStart = 0, rangeEnd = 0.1) {
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

function interpolateCamera(time: number, dashcamGroupRef?: React.RefObject<THREE.Group>) {
  const totalFrames = animationData.length;
  const frameIndex = time * (totalFrames - 1);
  const frame1 = Math.floor(frameIndex);
  const frame2 = Math.min(frame1 + 1, totalFrames - 1);
  const t = frameIndex - frame1;

  const keyframe1 = animationData[frame1];
  const keyframe2 = animationData[frame2];

  // Simple linear interpolation for position
  const pos1 = new THREE.Vector3(...keyframe1.position);
  const pos2 = new THREE.Vector3(...keyframe2.position);
  const position = pos1.lerp(pos2, t);

  // Check if we're in the problematic range (from keyframe 2 to keyframe 3)
  const isProblematicRange = keyframe1.time === 0.0417 && keyframe2.time === 0.0833;

  let quaternion: THREE.Quaternion;

  if (isProblematicRange) {
    // Calculate both normal SLERP and lookAt quaternions
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    const normalQuaternion = new THREE.Quaternion();
    normalQuaternion.slerpQuaternions(quat1, quat2, t);

    // Calculate lookAt quaternion - target the dashcam object
    let target: THREE.Vector3;
    if (dashcamGroupRef?.current) {
      // Get the actual world position of the dashcam
      target = new THREE.Vector3();
      dashcamGroupRef.current.getWorldPosition(target);
    } else {
      // Fallback to approximate position if dashcam ref is not available
      target = new THREE.Vector3(0, 1.2, 0.3);
    }

    // Create a camera that maintains a consistent view of the object
    const tempCamera = new THREE.PerspectiveCamera();

    // Calculate the direction from target to current position
    const direction = new THREE.Vector3().subVectors(position, target).normalize();

    // Maintain a consistent distance from the target (use the distance from keyframe1)
    const distance = new THREE.Vector3(...keyframe1.position).distanceTo(target);

    // Calculate the new position that maintains the same distance and angle
    const newPosition = new THREE.Vector3().copy(target).add(direction.multiplyScalar(distance));

    // Blend between original position and the locked position
    const blendFactor = THREE.MathUtils.smoothstep(0, 1, t);
    position.lerpVectors(position, newPosition, blendFactor);

    // Set up the camera for lookAt
    tempCamera.position.copy(position);
    tempCamera.lookAt(target);
    const lookAtQuaternion = tempCamera.quaternion.clone();

    // Very slight smoothing between normal quaternion and lookAt quaternion
    const smoothBlend = THREE.MathUtils.smoothstep(0.4, 0.6, t); // Very gentle smoothing
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(normalQuaternion, lookAtQuaternion, smoothBlend);
  } else {
    // Normal SLERP interpolation for other ranges
    const quat1 = new THREE.Quaternion(...keyframe1.quaternion);
    const quat2 = new THREE.Quaternion(...keyframe2.quaternion);
    quaternion = new THREE.Quaternion();
    quaternion.slerpQuaternions(quat1, quat2, t);
  }

  // Linear FOV interpolation
  const fov1 = keyframe1.fov;
  const fov2 = keyframe2.fov;
  const focalLength = THREE.MathUtils.lerp(fov1, fov2, t);

  return { position, quaternion, focalLength };
}

function interpolateCameraFromScroll(scrollProgress: number, dashcamGroupRef?: React.RefObject<THREE.Group>) {
  return interpolateCamera(scrollProgress, dashcamGroupRef);
}

function useCameraAnimationSync(
  scrollProgress: number,
  carScene: THREE.Group,
  dashcamGroupRef: React.RefObject<THREE.Group>,
  dashcamOffsetGroupRef: React.RefObject<THREE.Group>,
  setLensAnimation: (isAnimating: boolean) => void
) {
  const { camera } = useThree();
  const explodedRef = useRef(false);
  const cameraMountWorldMatrix = new THREE.Matrix4();

  useFrame(() => {
    const inExplodeRange = scrollProgress >= 0.2104 && scrollProgress < 0.2432;

    // 🔓 Explode lens when entering the range
    if (inExplodeRange && !explodedRef.current) {
      console.log("🎯 Scroll in range → EXPLODE");
      setLensAnimation(true);
      explodedRef.current = true;
    }

    // 🔒 Collapse lens when leaving the range
    if (!inExplodeRange && explodedRef.current) {
      console.log("🎯 Scroll out of range → COLLAPSE");
      setLensAnimation(false);
      explodedRef.current = false;
    }

    // Camera animation sync
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

    // Dashcam mount sync
    const cameraMount = carScene.getObjectByName("CameraMountFront");
    if (cameraMount && dashcamGroupRef.current && dashcamOffsetGroupRef.current) {
      cameraMount.updateWorldMatrix(true, false);
      cameraMountWorldMatrix.copy(cameraMount.matrixWorld);
      dashcamGroupRef.current.matrix.copy(cameraMountWorldMatrix);
      dashcamGroupRef.current.matrix.decompose(dashcamGroupRef.current.position, dashcamGroupRef.current.quaternion, dashcamGroupRef.current.scale);
    }
  });
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
     
    if (imagePlaneRef.current && imagePlaneRef.current.material) {
      imagePlaneRef.current.material.map = texture;
      imagePlaneRef.current.material.needsUpdate = true;
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
    const scale = THREE.MathUtils.lerp(0.9, 0.4, progress);
    imagePlaneRef.current.scale.set(scale, scale, 1);

    // Rotation: 0 to 2π
    const rotation = THREE.MathUtils.lerp(0, Math.PI * 1, progress);
    imagePlaneRef.current.rotation.z = rotation;
    const targetOpacity = THREE.MathUtils.lerp(1, 0, progress);

    gsap.to(materialRef.current, {
      opacity: targetOpacity,
      duration: 1,
      ease: "power1.out",
    });
    // Opacity: 1 to 0
    const opacity = THREE.MathUtils.lerp(1, 1, progress);
    materialRef.current.opacity = opacity;
    materialRef.current.transparent = true;

    // Visibility
    imagePlaneRef.current.visible = scrollProgress <= 0.0999999999999;
  }, [scrollProgress]);
  depthWrite: false;
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
function LensAnimation({ isAnimating, dashcamGroupRef }: { isAnimating: boolean; dashcamGroupRef: React.RefObject<THREE.Group> }) {
  const timelineRef = useRef<any>(null);
  const explodedRef = useRef(false); // tracks exploded state

  useEffect(() => {
    if (!dashcamGroupRef.current) return;

    const runAnimation = async () => {
      const { gsap } = await import("gsap");

      const lensElements: THREE.Object3D[] = [];
      dashcamGroupRef.current.traverse((child) => {
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
              z: [0.001, 0.01, 0.02, 0.035, 0.02, 0.01][i] || 0.0,
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

      // Trigger based on isAnimating
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

function CameraMover() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const callback = () => (gl.domElement.style.pointerEvents = "none");
    controls.addEventListener("dragging-changed", (e: any) => {
      gl.domElement.style.pointerEvents = e.value ? "none" : "auto";
    });

    return () => {
      controls.removeEventListener("dragging-changed", callback);
    };
  }, [gl]);

  useFrame(() => {
    camera.updateProjectionMatrix();
  });

  return (
    <>
      {/* <TransformControls ref={controlsRef} object={camera} /> */}
      <OrbitControls enabled={false} />
    </>
  );
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
  shape.lineTo(coords[0][0], coords[0][1]); // close the shape

  return new THREE.ShapeGeometry(shape);
}
const openShape = "polygon(-15% 34%, 0 0, 100% 0, 115% 34%, 50% 44%)";
const closedShape = "polygon(49.75% 0%, 49.75% 0%, 49.75% 0%, 49.75% 0%, 50.41% 66.01%)";

function getInterpolatedClip(scrollProgress) {
  const start = 0.7833;
  const mid = 0.834; // halfway (adjust if needed)
  const end = 0.8879;

  let blend;
  let shapeFrom, shapeTo;

  if (scrollProgress <= mid) {
    // Phase 1: close → open
    blend = THREE.MathUtils.clamp((scrollProgress - start) / (mid - start), 0, 1);
    shapeFrom = closedShape;
    shapeTo = openShape;
  } else {
    // Phase 2: open → close
    blend = THREE.MathUtils.clamp((scrollProgress - mid) / (end - mid), 0, 1);
    shapeFrom = openShape;
    shapeTo = closedShape;
  }

  const parse = (str) =>
    str
      .replace("polygon(", "")
      .replace(")", "")
      .split(",")
      .map((pt) =>
        pt
          .trim()
          .split(" ")
          .map((v) => parseFloat(v))
      );

  const a = parse(shapeFrom);
  const b = parse(shapeTo);

  const points = a.map(([ax, ay], i) => {
    const [bx, by] = b[i];
    const ix = THREE.MathUtils.lerp(ax, bx, blend);
    const iy = THREE.MathUtils.lerp(ay, by, blend);
    return `${ix}% ${iy}%`;
  });

  return `polygon(${points.join(", ")})`;
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
  const { scene: cameraModelScene, nodes: cameraNodes } = useGLTF("/models/VREC_H520DC.glb");
  const [carVisible, setCarVisible] = useState(false);
  const displayMountRef = useRef<THREE.Object3D | null>(null);
  const imagePlaneRef = useRef<THREE.Mesh | null>(null);
  const imageTextureRef = useRef<THREE.Texture | null>(null);
  const windshieldObjects = useRef<THREE.Mesh[]>([]);
  useEffect(() => {
    if (scrollProgress >= 1) {
      console.log("🎬 Triggering animation at scrollProgress 1");

      // Example: start GSAP animation
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
    // Load image texture
    const loader = new THREE.TextureLoader();
    loader.load("/modelImages/CommonModelImages/520 Screen.webp", (texture) => {
      console.log("🎯 Image texture loaded successfully");
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.repeat.x = -1;
      texture.offset.x = 1;

      // Create image plane
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.064, 0.036), // Adjust width and height here
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
        plane.position.set(0.003, 0.00353, 0); // Much further in front to be outside the model
        plane.visible = false; // Start hidden, controlled by scroll logic
        console.log("🎯 Plane added to display mount");
        console.log("🎯 Plane position:", plane.position);
        console.log("🎯 Plane world position:", plane.getWorldPosition(new THREE.Vector3()));
      } else {
        console.log("🎯 Display mount not found");
      }

      // Load video texture
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
  }, [cameraNodes]);
  if (imagePlaneRef.current) {
    if (scrollProgress >= 0.4556) {
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
    } else if (scrollProgress >= 0.2884 && scrollProgress <= 0.3493) {
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
  const fadeRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const interpolated = getInterpolatedClip(scrollProgress);
    return clipPathToShape(interpolated, 10, 10);
  }, [scrollProgress]);

  // useFrame(() => {
  //   const highlightStart = 0.3546;
  //   const highlightEnd = 0.5221;

  //   const blend = THREE.MathUtils.clamp(
  //     (scrollProgress - highlightStart) / (highlightEnd - highlightStart),
  //     0,
  //     1
  //   );

  //   windshieldObjects.current.forEach((mesh) => {
  //     const mat = mesh.material as THREE.MeshStandardMaterial;
  //     mat.transparent = true;
  //     mat.opacity = THREE.MathUtils.lerp(0, 1.0, blend);
  //     mat.color.lerp(new THREE.Color(0x00ffff), blend * 0.5);
  //     mat.needsUpdate = true;
  //   });
  // });
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
        <mesh position={displayMountRef.current.getWorldPosition(new THREE.Vector3())} visible={true}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={imageTextureRef.current} toneMapped={false} color="red" />
        </mesh>
      )}

      {/* DEBUG: HTML overlay showing positions */}
      {/* <Html position={[0, 3, 0]}>
        <div
          style={{
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "12px",
            whiteSpace: "pre-wrap",
          }}
        >
          {`Camera: ${scrollProgress.toFixed(3)}
 DISPLAY World: ${
   displayMountRef.current
     ? displayMountRef.current
         .getWorldPosition(new THREE.Vector3())
         .toArray()
         .map((v) => v.toFixed(3))
         .join(", ")
     : "N/A"
 }
 Plane World: ${
   imagePlaneRef.current
     ? imagePlaneRef.current
         .getWorldPosition(new THREE.Vector3())
         .toArray()
         .map((v) => v.toFixed(3))
         .join(", ")
     : "N/A"
 }
 Dashcam World: ${
   dashcamGroupRef.current
     ? dashcamGroupRef.current
         .getWorldPosition(new THREE.Vector3())
         .toArray()
         .map((v) => v.toFixed(3))
         .join(", ")
     : "N/A"
 }
     LookAt Active: ${scrollProgress >= 0.0417 && scrollProgress <= 0.0833 ? "YES" : "NO"}`}
        </div>
      </Html> */}
      {/* ✅ White platform under car model */}
      {scrollProgress >= 0.7833 && scrollProgress <= 0.8879 && (
        <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, Math.PI / 1]} position={[0, 0.1, 0]}>
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
        zIndex: 20,
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
      <Typography variant="hero-section-headingg" className=" text-2xl md:text-6xl  font-bold text-white text-center px-4 ">
        When Detail Matters the Most
      </Typography>
      <p className="text-[18px] md:text-[26px] text-[#ABABAB] mt-2 max-w-3xl">VREC‑H520DC captures sharp 2K video, even in low light and on the move.</p>
      <button className="bg-[#262626] px-2 pl-4 py-2 rounded-full text-white mt-12 flex text-[16px] font-medium items-center mx-auto">
        Scroll to explore
        <img src="/icons/chevDownCircle.svg" width={24} height={24} alt="Arrow Down" className="ml-3" />
      </button>
    </div>
  );
}

function DummyBlack({
  scrollProgress,
  fadeInStart = 0,
  fadeInEnd = 0.0185,
  fadeOutStart = 0.03,
  fadeOutEnd = 0.08,
}: {
  scrollProgress: number;
  fadeInStart?: number;
  fadeInEnd?: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
}) {
  // Scale from 1 → 2.6 over first 0.08 of scroll (you can adjust)
  const scaleProgress = THREE.MathUtils.clamp(scrollProgress / 0.08, 0, 1);
  const scale = THREE.MathUtils.lerp(1, 2.6, scaleProgress);

  // Opacity: fade in, hold, fade out
  let opacity = 0;

  if (scrollProgress <= fadeInStart) {
    opacity = 0;
  } else if (scrollProgress <= fadeInEnd) {
    // fade in
    const t = THREE.MathUtils.clamp((scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart), 0, 1);
    opacity = THREE.MathUtils.lerp(0, 1, t);
  } else if (scrollProgress < fadeOutStart) {
    // hold full
    opacity = 1;
  } else if (scrollProgress <= fadeOutEnd) {
    // fade out
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
        opacity,
        transition: "none", // disable CSS transition to keep scroll-driven immediate response
      }}
    />
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
  dashcamGroupRef: React.RefObject<THREE.Group>;
  dashcamOffsetGroupRef: React.RefObject<THREE.Group>;
  setLensAnimation: (isAnimating: boolean) => void;
}) {
  useCameraAnimationSync(scrollProgress, carScene, dashcamGroupRef, dashcamOffsetGroupRef, setLensAnimation);
  return null;
}

// Timeline Component
function Timeline({ scrollProgress }: { scrollProgress: number }) {
  // Use the same calculation as the interpolation function
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
        // Use the same logic as interpolation function
        const isActive = index === frame1;

        // Calculate the actual time range this keyframe represents
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

      {/* Current Progress Indicator */}
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

      {/* Debug Info */}
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

      {/* Problematic Range Indicator */}
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
import { Color } from "three";
import { Typography } from "@/components/CommonComponents/Typography/page";
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
export default function Blender2JSPageModel() {
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [lensAnimation, setLensAnimation] = useState(false);
  const dashcamGroupRef = useRef<THREE.Group>(null);
  const containerRef = useRef(null);
  const dashcamOffsetGroupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cleanup;
    let targetProgress = 0;
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        gsap.timeline({
          scrollTrigger: {
            trigger: "#blender2js-scroll-container",
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

        cleanup = () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      } catch (err) {
        console.error("Failed to load GSAP:", err);
      }
    };

    initGSAP();
    return () => cleanup?.();
  }, []);

  return (
    <div id="blender2js-scroll-container" ref={containerRef} style={{ height: "2500vh", scrollBehavior: "smooth" }}>
      {/* Timeline Component - Outside Canvas */}
      {/* <Timeline scrollProgress={scrollProgress} /> */}
      <HeroTextFade scrollProgress={scrollProgress} />
      {/* <DummyBlack scrollProgress={scrollProgress} /> */}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 20, near: 0.01, far: 1000 }}
        style={{ background: "#1a1a1a", width: "100vw", height: "100vh", position: "sticky", top: 0 }}
        shadows
        gl={{
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace, // ✅ Default in r155+
        }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color("#0D0D0D");
          gl.setClearColor("#0D0D0D");
          // No need to set colorSpace again here
        }}
      >
         <AdaptiveDpr pixelated />
         <BackgroundFade scrollProgress={scrollProgress} />
        <Suspense fallback={null}>
          <CameraMover />
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
        {/* <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} /> */}
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
