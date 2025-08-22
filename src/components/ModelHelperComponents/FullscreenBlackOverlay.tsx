import React from 'react';
import * as THREE from 'three';

interface FullscreenBlackOverlayProps {
  scrollProgress: number;
  fadeInStart?: number;
  fadeInEnd?: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
}

const FullscreenBlackOverlay: React.FC<FullscreenBlackOverlayProps> = ({
  scrollProgress,
  fadeInStart = 0,
  fadeInEnd = 0,
  fadeOutStart = 0.02,
  fadeOutEnd = 0.065,
}) => {
  const scaleProgress = THREE.MathUtils.clamp(scrollProgress / 0.08, 0, 1);
  const scale = THREE.MathUtils.lerp(1, 2.6, scaleProgress);
  let opacity = 0;

  if (scrollProgress <= fadeInStart) {
    opacity = 0;
  } else if (scrollProgress <= fadeInEnd) {
    const t = THREE.MathUtils.clamp((scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart), 0, 1);
    opacity = THREE.MathUtils.lerp(0, 1, t);
  } else if (scrollProgress < fadeOutStart) {
    opacity = 1;
  } else if (scrollProgress <= fadeOutEnd) {
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
        opacity: opacity * 0.65,
        transition: "none",
      }}
    />
  );
};

export default FullscreenBlackOverlay;
