// components/PlayIcon/PlayIcon.tsx

import React from "react";
import * as THREE from "three";

export default function DangerIcon({ scrollProgress }: { scrollProgress: number }) {
  // --- TIMING CONSTANTS ---
  // These values are synchronized with your video's animation
  const ICON_FADE_IN_START = 0.2625; // 🎬 Video starts fading in
  const ICON_FADE_IN_END = 0.27;    // 🎬 Video is fully visible
  const ICON_FADE_OUT_START = 0.35;   // 💨 Icon begins to fade out
  const ICON_FADE_OUT_END = 0.38;     // 💨 Icon is fully gone

  let opacity = 0;

  // --- LOGIC ---
  if (scrollProgress >= ICON_FADE_IN_START && scrollProgress < ICON_FADE_IN_END) {
    // Fading In
    const progress = (scrollProgress - ICON_FADE_IN_START) / (ICON_FADE_IN_END - ICON_FADE_IN_START);
    opacity = THREE.MathUtils.lerp(0, 1, progress);
  } else if (scrollProgress >= ICON_FADE_IN_END && scrollProgress < ICON_FADE_OUT_START) {
    // Fully Visible
    opacity = 1;
  } else if (scrollProgress >= ICON_FADE_OUT_START && scrollProgress < ICON_FADE_OUT_END) {
    // Fading Out
    const progress = (scrollProgress - ICON_FADE_OUT_START) / (ICON_FADE_OUT_END - ICON_FADE_OUT_START);
    opacity = THREE.MathUtils.lerp(1, 0, progress);
  }

  // If the icon shouldn't be visible, don't render it at all
  if (opacity === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // This centers the icon
        width: "80px",
        height: "80px",
        zIndex: 50, // Ensures it's on top of other content
        pointerEvents: "none", // Allows clicking through the icon
        opacity: opacity, // Controls the fade
        transition: "opacity 0.1s linear", // A quick, snappy transition
      }}
    >
     dabvtfve <img src="/icons/play-button.svg" alt="Play Icon" style={{ width: "100%", height: "100%" }} />
    </div>
  );
}