"use client";

import React from "react";
import * as THREE from "three";
import { Typography } from "@/components/CommonComponents/Typography/page";
import Lottie from "lottie-react";

import handScroll from "../../../public/animations/scrollHand.json";

interface FadingHeroContentProps {
  scrollProgress: number;
  heading: string;
  subtitle: string;
  buttonText?: string;
  buttonIconSrc?: string;
  animationEndProgress?: number;
}

const FadingHeroContent: React.FC<FadingHeroContentProps> = ({
  scrollProgress,
  heading,
  subtitle,
  buttonText,
  buttonIconSrc = "/icons/chevDownCircle.svg",
  animationEndProgress = 0.028,
}) => {
  // --- Animation Logic ---
  const progress = THREE.MathUtils.clamp(
    scrollProgress / animationEndProgress,
    0,
    1
  );
  const scale = THREE.MathUtils.lerp(1, 2.6, progress);
  const opacity = THREE.MathUtils.lerp(1, 0, progress);

  // Show hand scroll only after animation is finished
  const showHandScroll = progress >= 1;

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
      {/* --- Built-in Content Structure --- */}

      {/* 1. Heading */}
      <Typography
        variant="hero-section-heading"
        className="!text-white  font-medium mx-4 md:mx-auto"
      >
        {heading}
      </Typography>

      {/* 2. Subtitle */}
      <Typography
        variant="hero-body"
        className="text-[#ABABAB] pt-[0.8em] px-14 !font-normal "
      >
        {subtitle}
      </Typography>

      {/* 3. Hand Scroll (only after animation finishes) */}
     
        <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2">
          {/* Desktop Scroll Indicator */}
          <div className="hidden md:flex w-8.5 h-14 border-2 border-white rounded-full items-start justify-center relative">
            <div className="w-1 h-3.5 bg-white rounded-full animate-scroll"></div>
          </div>

          {/* Mobile Lottie Animation */}

          {showHandScroll &&(
            <div className="flex md:hidden justify-center items-center mt-6">
            <Lottie
              animationData={handScroll}
              loop={true}
              autoplay={true}
              style={{ width: 80, height: 80 }}
            />
          </div>
          )}
          
        </div>
      

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(6px);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(6px);
            opacity: 1;
          }
        }
        .animate-scroll {
          animation: scroll 1.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FadingHeroContent;
