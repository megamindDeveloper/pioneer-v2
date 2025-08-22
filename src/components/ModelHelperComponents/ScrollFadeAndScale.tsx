"use client";

import React from "react";
import * as THREE from "three";
// Make sure to import the Typography component used for the heading
import { Typography } from "@/components/CommonComponents/Typography/page";
import Lottie from "lottie-react";

import handScroll from '../../../public/animations/scrollHand.json'

// Define the props for this specific hero component
interface FadingHeroContentProps {
  /** The current scroll progress, typically a value between 0 and 1. */
  scrollProgress: number;
  /** The main heading text. */
  heading: string;
  /** The subtitle text appearing below the heading. */
  subtitle: string;
  /** (Optional) The text for the button. If not provided, the button will not be rendered. */
  buttonText?: string;
  /** (Optional) The src path for the icon inside the button. */
  buttonIconSrc?: string;
  /** (Optional) The scroll progress value at which the animation should complete. */
  animationEndProgress?: number;
}

/**
 * A specialized component that renders a specific hero layout (heading, subtitle, button)
 * and animates it with a fade and scale effect based on scroll progress.
 */
const FadingHeroContent: React.FC<FadingHeroContentProps> = ({
  scrollProgress,
  heading,
  subtitle,
  buttonText,
  buttonIconSrc = "/icons/chevDownCircle.svg", // Provide a default icon
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
      <Typography variant="hero-body" className="text-[#ABABAB] pt-[0.8em] px-14 !font-normal ">
        {subtitle}
      </Typography>

      {/* 3. Button (conditionally rendered) */}
   <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2">
  {/* Desktop Scroll Indicator */}
  <div className="hidden md:flex w-8.5 h-14 border-2 border-white rounded-full items-start justify-center relative">
    <div className="w-1 h-3.5 bg-white rounded-full animate-scroll"></div>
  </div>

  {/* Mobile Lottie Animation */}
  <div className="flex md:hidden justify-center items-center mt-6">
    <Lottie
      animationData={handScroll}
      loop={true}
      autoplay={true}
      style={{ width: 80, height: 80 }}
    />
  </div>
</div>




<style jsx>{`
  @keyframes scroll {
    0% { transform: translateY(6px); opacity: 1; }
    50% { transform: translateY(12px); opacity: 0.5; }
    100% { transform: translateY(6px); opacity: 1; }
  }
  .animate-scroll {
    animation: scroll 1.3s ease-in-out infinite;
  }
`}</style>
    </div>
  );
};

export default FadingHeroContent;