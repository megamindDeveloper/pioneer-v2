"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, useProgress } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { Typography } from "@/components/CommonComponents/Typography/page";
import { useBreakpoint } from "@/app/hooks/useBreakPoints";

const degToRad = (deg: number) => deg * (Math.PI / 180);

function CameraModel({ onModelReady, onIntroComplete }: { onModelReady: () => void; onIntroComplete: () => void }) {
  const { scene } = useGLTF("/models/VREC-Z820DC-2.glb");
  const groupRef = useRef<THREE.Group>(null);
  const breakpoint = useBreakpoint();
  const hasPlayedRef = useRef<boolean>(false);
  const [visible, setVisible] = useState(false);
  const getModelTransformByBreakpoint = (bp: string) => {
    switch (bp) {
      case "sm":
        return { scale: 55, position: [0.3, 0.3, 0.7] as [number, number, number] };
      case "md":
        return { scale: 50, position: [-1.3, -1.8, 0.6] as [number, number, number] };
      case "lg":
        return { scale: 100, position: [-0.5, -2.85, 0.5] as [number, number, number] };
      case "lg2":
        return { scale: 100, position: [-1, -1.9, 0.5] as [number, number, number] };
      case "xl":
        return { scale: 110, position: [-0.8, -1.95, 0.4] as [number, number, number] };
      case "2xl":
        return { scale: 120, position: [-0.6, -2, 0.3] as [number, number, number] };
      default:
        return { scale: 100, position: [-1, -1.9, 0.5] as [number, number, number] };
    }
  };

  useEffect(() => {
    if (!scene || !groupRef.current) return;
    if (hasPlayedRef.current) return; // prevent re-run after first play
    setVisible(true);

    groupRef.current.visible = true;

    scene.traverse((node: any) => {
      if (node.isMesh) {
        node.material.side = THREE.DoubleSide;
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    groupRef.current.position.set(-2.88, -2.2, 12);
    groupRef.current.scale.set(100, 100, 100);
    groupRef.current.rotation.set(degToRad(-90), 0, 0);

    onModelReady();

    let tl: gsap.core.Timeline | null = null;
    const timer = setTimeout(() => {
      if (!groupRef.current) return;
      if (hasPlayedRef.current) return;
      const { scale, position } = getModelTransformByBreakpoint(breakpoint);
    
      tl = gsap.timeline({
        defaults: { duration: 6, ease: "slow(0.7, 0.7, false)" },
        onComplete: onIntroComplete,
        onUpdate: () => {
          const progress = tl?.progress() ?? 0;
          // When animation reaches >= 50%, unlock scroll
          if (progress >= 0.3) {
            window.dispatchEvent(new Event("introHalfComplete"));
          }
        }
      });
    
      tl.to(groupRef.current!.position, { x: position[0], y: position[1], z: position[2] }, 0)
        .to(groupRef.current!.scale, { x: scale, y: scale, z: scale }, 0)
        .to(
          groupRef.current!.rotation,
          {
            x: degToRad(-15),
            y: degToRad(-30),
            z: breakpoint === "sm" ? degToRad(-20) : degToRad(0),
          },
          0
        );
    
      hasPlayedRef.current = true;
    }, 1800);
    

    return () => {
      clearTimeout(timer);
      if (tl) tl.kill();
    };
  }, [scene, onModelReady, onIntroComplete, breakpoint]);

  return (
    <group ref={groupRef} visible={visible}>
      <primitive object={scene} />
    </group>
  );
}

export default function CameraScene({ onModelReady }: { onModelReady: () => void }) {
  const [isModelReady, setIsModelReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { active } = useProgress();

  // Lock page scroll until intro animation completes
  useEffect(() => {
    const section = document.getElementById("scroll-container");
    const previous = document.body.style.overflow;
    let halfComplete = false;
  
    function updateScrollLock() {
      const rect = section?.getBoundingClientRect();
      // Consider the section "visible" only if some part of its UPPER half is in the viewport.
      // This means the top of the section is above the viewport bottom
      // AND the midpoint of the section has not yet scrolled past the top of the viewport.
      const isVisible =
        !!rect &&
        rect.top < window.innerHeight &&
        rect.top + rect.height / 2 > 0;
  
      // Lock only if intro is not at least half complete
      if (isVisible && !introComplete && !halfComplete) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = previous;
      }
    }
  
    function handleHalfComplete() {
      halfComplete = true;
      updateScrollLock();
    }
  
    // Check on load and scroll
    updateScrollLock();
    window.addEventListener("scroll", updateScrollLock);
    window.addEventListener("introHalfComplete", handleHalfComplete);
  
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("scroll", updateScrollLock);
      window.removeEventListener("introHalfComplete", handleHalfComplete);
    };
  }, [introComplete]);
  
  

  useEffect(() => {
    if (isModelReady) {
      onModelReady();

      const tl = gsap.timeline({ delay: 2.5 });
      tl.fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" }).fromTo(
        subheadingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1.8"
      );
    }
  }, [isModelReady, onModelReady]);

  useEffect(() => {
    if (isModelReady && canvasRef.current) {
      gsap.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" });
    }
  }, [isModelReady]);

  useEffect(() => {
    if (isModelReady && navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, [isModelReady]);

  return (
    <div id="scroll-container" className="relative overflow-hidden bg-gradient-to-t">
      <div ref={navbarRef} className="opacity-0">
        {/* <Navbar /> */}
      </div>

      <div className="absolute w-full text-center mt-20 lg:mt-24 xl:mt-36 z-10 pointer-events-none flex justify-center flex-col">
        <Typography variant="hero-section-heading" ref={headingRef} className="!text-white  font-medium mx-4 md:mx-auto">
          See Everything. Miss Nothing.
        </Typography>
        <Typography variant="hero-body" ref={subheadingRef} className="text-[#ABABAB] pt-[0.8em]  !font-normal ">
          Engineered for clarity, built for safety.
        </Typography>
      </div>

      <div ref={canvasRef} className="opacity-0 transition-opacity">
        <div className="w-screen sticky top-0 md:h-[100vh] sm:h-[60vh] ">
          <Canvas
            onCreated={({ gl, scene }) => {
              gl.setClearColor("#fffffff"); // or any hex color
              // Or use: scene.background = new THREE.Color("#ffffff");
            }}
            camera={{ position: [0, 1, 18], fov: 40 }}
            style={{ width: "100vw", height: "100vh", position: "sticky", top: 0 }}
            shadows
          >
            <Suspense fallback={false}>
              <CameraModel onModelReady={() => setIsModelReady(true)} onIntroComplete={() => setIntroComplete(true)} />
              <Environment files="/hdri/07.hdr" background={false} />
              <Html fullscreen>
                <div className="pointer-events-none w-full h-full bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              </Html>
            </Suspense>
          </Canvas>
        </div>
      </div>
      {/* <div className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" /> */}
    </div>
  );
}

useGLTF.preload("/models/VREC-Z820DC-2.glb");