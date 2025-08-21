"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import image from '../../../../public/logo/image.png';

// Define the component's props for TypeScript
interface FadeLoaderProps {
  progress: number;
  active: boolean;
}

export default function FadeLoader({ progress, active }: FadeLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<"loading" | "contentOut" | "fadeOut">("loading");

  // Entrance animation - No changes needed here
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(centerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 });
    tl.fromTo(cornersRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
    tl.fromTo(cornerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
    return () => tl.kill();
  }, []);

  // ✅ CORRECTED: Fade out when loading is finished
  useEffect(() => {
    // The `active` prop is false when all assets are loaded.
    if (!active && stage === "loading") {
      setStage("contentOut");

      const tl = gsap.timeline();
      tl.to(contentGroupRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setStage("fadeOut");
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => setVisible(false),
          });
        },
      });
    }
  }, [active, stage]); // Dependency array is now correct

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0D0D0D] z-50 flex items-center justify-center text-white font-mono select-none transition-opacity"
    >
      <div ref={contentGroupRef} className="relative w-full h-full">
        <div className="absolute top-16 left-16 text-gray-400 leading-tight">
         <Image src={image} alt="logo" className="w-32"/>
        </div>

        {/* Border Corners */}
        <div ref={cornersRef} className="absolute inset-0 pointer-events-none opacity-100">
          <div className="absolute top-8 left-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute top-8 left-8 h-10 w-px bg-[#AD2239]" />
          <div className="absolute top-8 right-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute top-8 right-8 h-10 w-px bg-[#AD2239]" />
          <div className="absolute bottom-8 left-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute bottom-8 left-8 h-10 w-px bg-[#AD2239]" />
          <div className="absolute bottom-8 right-8 w-10 h-px bg-[#AD2239]" />
          <div className="absolute bottom-8 right-8 h-10 w-px bg-[#AD2239]" />
        </div>

        {/* Center Loading % */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={centerRef} className="text-[20px] tracking-widest opacity-100 p-20">
            {Math.round(progress)}%
          </div>

          <div ref={cornerRef} className="absolute inset-0 pointer-events-none opacity-0">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#AD2239]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#AD2239]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#AD2239]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#AD2239]" />
          </div>
        </div>
      </div>
    </div>
  );
}