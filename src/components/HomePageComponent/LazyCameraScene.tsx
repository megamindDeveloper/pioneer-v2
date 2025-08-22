// Create a new component, e.g., LazyCameraScene.js

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import CameraScene from './CameraScene/page';


// This component will act as the gatekeeper for your expensive scene
export default function LazyCameraScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,  // <-- Important option!
    margin: "0px 0px -100px 0px" // Optional: trigger when 100px from the bottom
  });

  return (
    // This div is the placeholder and the element we track
    <div ref={ref} className="relative h-screen w-full">
      {isInView ? (
        // If it's in view, render the actual scene
        <CameraScene />
      ) : (
        // Otherwise, render nothing or a lightweight placeholder
        null 
      )}
    </div>
  );
}