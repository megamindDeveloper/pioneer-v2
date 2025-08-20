"use client";

import React from "react";
import * as THREE from "three";
// Make sure to import the Typography component used for the heading
import { Typography } from "@/components/CommonComponents/Typography/page";

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
      {buttonText && (
        <button className="bg-[#262626] px-2 pl-4 py-2 rounded-full text-white mt-8 flex lg:text-xl xl:text-[24px] font-medium items-center mx-auto">
          {buttonText}
          {buttonIconSrc && (
            <img
              src={buttonIconSrc}
              width={24}
              height={24}
              alt="" // Decorative icon
              className="ml-3"
            />
          )}
        </button>
      )}
    </div>
  );
};

export default FadingHeroContent;