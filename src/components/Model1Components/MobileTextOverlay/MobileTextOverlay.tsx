// You can create a new file for this, e.g., TextOverlay.tsx

import React from "react";
import * as THREE from "three";

// Define the structure for each text "slide"
type TextSectionProps = {
  scrollProgress: number;
  start: number;
  end: number;
  title: string;
  subtitle: string;
};

// This component handles the fade-in/fade-out logic for a single text block
function TextSection({ scrollProgress, start, end, title, subtitle }: TextSectionProps) {
  // Define a fade margin (e.g., 20% of the section's duration)
  const fadeDuration = (end - start) * 0.2;
  const fadeInEnd = start + fadeDuration;
  const fadeOutStart = end - fadeDuration;
  
  let opacity = 0;

  if (scrollProgress >= start && scrollProgress <= end) {
    if (scrollProgress < fadeInEnd) {
      // Fade In
      opacity = THREE.MathUtils.mapLinear(scrollProgress, start, fadeInEnd, 0, 1);
    } else if (scrollProgress > fadeOutStart) {
      // Fade Out
      opacity = THREE.MathUtils.mapLinear(scrollProgress, fadeOutStart, end, 1, 0);
    } else {
      // Fully visible
      opacity = 1;
    }
  }

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        top: '30%', // Position the text block
        left: '5%',
        width: '300px',
        transform: `translateY(-50%)`,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      <p className="mt-4 text-lg text-gray-300">{subtitle}</p>
    </div>
  );
}

// This is the main overlay component that holds all the sections
export default function TextOverlay({ scrollProgress }: { scrollProgress: number }) {
  // Define your text content and scroll ranges here
  const textSections = [
    {
      start: 0.18, // When the camera is looking at the dashcam
      end: 0.28,
      title: "Crystal Clear 4K",
      subtitle: "Capture every detail with stunning 4K resolution, ensuring clarity day or night.",
    },
    {
      start: 0.35, // When the camera is high above the car
      end: 0.45,
      title: "AI-Powered Assistance",
      subtitle: "Advanced driver-assistance systems provide real-time alerts for a safer journey.",
    },
    // Add as many sections as you need
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 40, // Ensure it's above the canvas but below any top-level UI
        pointerEvents: "none", // Allows clicking/scrolling "through" the overlay
      }}
    >
      {textSections.map((section, index) => (
        <TextSection
          key={index}
          scrollProgress={scrollProgress}
          start={section.start}
          end={section.end}
          title={section.title}
          subtitle={section.subtitle}
        />
      ))}
    </div>
  );
}







