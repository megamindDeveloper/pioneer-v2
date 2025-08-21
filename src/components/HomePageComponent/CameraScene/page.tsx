"use client";

import React, { Suspense, useRef, useLayoutEffect, useState, forwardRef, memo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, Html, useProgress } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { Typography } from "@/components/CommonComponents/Typography/page";
import { useBreakpoint } from "@/app/hooks/useBreakPoints";
import FadeLoader from "@/components/CommonComponents/Loader/page";

// --- Type Definitions for Clarity and Safety ---
type Breakpoint = "sm" | "md" | "lg" | "lg2" | "xl" | "2xl";
type ModelTransform = { scale: number; position: [number, number, number]; rotationZ?: number };

// --- Constants and Helpers ---
const MODEL_PATH = "/models/VREC-Z820DC-2.glb";
useGLTF.preload(MODEL_PATH); // Preloading for faster initial appearance

const getModelTransformByBreakpoint = (bp: Breakpoint): ModelTransform => {
  switch (bp) {
    case "sm":  return { scale: 55, position: [0.3, 0.3, 0.7], rotationZ: -20 };
    case "md":  return { scale: 50, position: [-1.3, -1.8, 0.6] };
    case "lg":  return { scale: 100, position: [-0.5, -2.85, 0.5] };
    case "lg2": return { scale: 100, position: [-1, -1.9, 0.5] };
    case "xl":  return { scale: 110, position: [-0.8, -1.95, 0.4] };
    case "2xl": return { scale: 120, position: [-0.6, -2, 0.3] };
    default:    return { scale: 100, position: [-1, -1.9, 0.5] };
  }
};

// --- Child Component: CameraModel (No changes needed here) ---
const CameraModel = memo(forwardRef<THREE.Group>((props, ref) => {
  const { scene } = useGLTF(MODEL_PATH);
  useLayoutEffect(() => {
    scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.material.side = THREE.DoubleSide;
      }
    });
  }, [scene]);
  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}));
CameraModel.displayName = "CameraModel";

// --- Main Scene Component ---
export default function CameraScene() {
  const breakpoint = useBreakpoint() as Breakpoint;
  const [canScroll, setCanScroll] = useState(false);
  const { active, progress } = useProgress(); // Get loading progress

  // --- Refs for Animation Targets ---
  const modelRef = useRef<THREE.Group>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // --- Effect to Fade Out Loader ---
  useEffect(() => {
    // When loading is finished (active becomes false), fade out the loader
    if (!active) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          // Optional: hide it completely after fading
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
        },
      });
    }
  }, [active]);

  // --- Unified Animation Timeline ---
  useLayoutEffect(() => {
    if (!modelRef.current || active) return; // Don't start animation until loading is done

    const { scale, position, rotationZ = 0 } = getModelTransformByBreakpoint(breakpoint);
    
    // Setup model's initial state
    modelRef.current.position.set(-2.88, -2.2, 12);
    modelRef.current.scale.setScalar(100);
    modelRef.current.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    
    const masterTl = gsap.timeline(); // Master timeline for the entire intro sequence

    // Animate the 3D model and UI elements
    masterTl.to(modelRef.current.position, { x: position[0], y: position[1], z: position[2], duration: 4, ease: "power3.inOut" }, 0)
    .to(modelRef.current.scale, { x: scale, y: scale, z: scale, duration: 4, ease: "power3.inOut" }, 0)
    .to(modelRef.current.rotation, { x: THREE.MathUtils.degToRad(-15), y: THREE.MathUtils.degToRad(-30), z: THREE.MathUtils.degToRad(rotationZ), duration: 4, ease: "power3.inOut" }, 0)
    .call(() => setCanScroll(true), [], 1.5)
    .fromTo(canvasContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0)
    .fromTo(navbarRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0.5)
    .fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 2.5, ease: "power2.out" }, 1.2)
    .fromTo(subheadingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "<0.5");

    return () => {
      masterTl.kill(); // Cleanup timeline
    };
  }, [breakpoint, active]); // Run effect when breakpoint changes or when loading completes

  // --- Simplified Scroll Lock Effect ---
  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (!canScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [canScroll]);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-t from-[#0D0D0D] to-[#1a1a1a]">
       <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-300">
          <FadeLoader progress={progress} />
       </div>

      <div ref={navbarRef} className="opacity-0">
        {/* <Navbar /> */}
      </div>

      <div className="absolute w-full text-center mt-20 lg:mt-24 xl:mt-36 z-10 pointer-events-none flex justify-center flex-col">
        <Typography variant="hero-section-heading" ref={headingRef} className="!text-white font-medium mx-4 md:mx-auto opacity-0">
          See Everything. Miss Nothing.
        </Typography>
        <Typography variant="hero-body" ref={subheadingRef} className="text-[#ABABAB] pt-[0.8em] !font-normal opacity-0">
          Engineered for clarity, built for safety.
        </Typography>
      </div>

      <div ref={canvasContainerRef} className="absolute top-0 left-0 w-full h-full opacity-0">
        <Canvas camera={{ position: [0, 1, 18], fov: 40 }} shadows>
          <Suspense fallback={null}>
            <CameraModel ref={modelRef} />
            <Environment files="/hdri/07.hdr" />
            <Html fullscreen>
              <div className="pointer-events-none w-full h-full bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
            </Html>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}