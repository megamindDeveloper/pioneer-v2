"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";

import * as THREE from "three";
import { SRGBColorSpace } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ModelAnimationConfig } from '@/features/Animation/configs/animationConfigTypes';


// UI & Helper Components
import FadeLoader from "@/components/CommonComponents/Loader/page";
import FadingHeroContent from "@/components/ModelHelperComponents/ScrollFadeAndScale";
import FullscreenBlackOverlay from "@/components/ModelHelperComponents/FullscreenBlackOverlay";
// import ReusableTextOverlay from "./ReusableTextOverlay";

// Animation Components
import Scene from "./Scene";

import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Environment, PerformanceMonitor } from "@react-three/drei";
import { getAdjustedProgress } from "@/features/Animation/utils/modelOneAnimationUtils";
import IntroImageAnimation from "./IntroImageAnimation";
import { Color } from "three";
import CameraAnimation from "./CameraAnimation";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  config: ModelAnimationConfig;
}
function BackgroundFade({ scrollProgress }: { scrollProgress: number }) {
    const { scene } = useThree();
  
    useEffect(() => {
      const start = 0; // fade start
      const end = 0.1; // fade end
      let t = 0;
  
      if (scrollProgress < start) {
        t = 0;
      } else if (scrollProgress > end) {
        t = 1;
      } else {
        t = (scrollProgress - start) / (end - start);
      }
  
      // Start color #0D0D0D
      const startColor = new Color("#0D0D0D");
      const endColor = new Color("#000000");
  
      const mixed = startColor.clone().lerp(endColor, t);
      scene.background = mixed;
    }, [scrollProgress, scene]);
  
    return null;
  }
  
/**
 * This is the main orchestrator. It accepts a configuration object and builds the
 * entire scroll-based 3D animation, passing the config data down to all its children.
 */
export default function ScrollDriven3DExperience({ config }: Props) {
  const [modelIsReady, setModelIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carScene, setCarScene] = useState<THREE.Group | null>(null);
  const [isLensAnimating, setIsLensAnimating] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const dashcamGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    document.body.style.overflow = modelIsReady ? "auto" : "hidden";
  }, [modelIsReady]);

  useEffect(() => {
    if (!modelIsReady) return;
    const targetProgress = { value: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
        onUpdate: (self) => {
          targetProgress.value = getAdjustedProgress(self.progress, config.stickyZones);
        },
      },
    });
    const ticker = () => setScrollProgress(prev => gsap.utils.lerp(prev, targetProgress.value, 0.1));
    gsap.ticker.add(ticker);
    return () => {
      tl.kill();
      gsap.ticker.remove(ticker);
    };
  }, [modelIsReady, config.stickyZones]);

  return (
    <div id="scroll-container" style={{ height: "2000vh", width: "100%", background: "#0D0D0D" }}>
      {!modelIsReady && <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"><FadeLoader isModelReady={false} /></div>}

      {modelIsReady && (
        <>
          <FadingHeroContent
            scrollProgress={scrollProgress}
            heading={config.textContent.hero.heading}
            subtitle={config.textContent.hero.subtitle}
            buttonText="Scroll to explore"
          />
          {/* <ReusableTextOverlay scrollProgress={scrollProgress} overlays={config.textContent.overlays} /> */}
          <FullscreenBlackOverlay
            scrollProgress={scrollProgress}
            fadeOutStart={config.scrollTriggers.blackOverlayFadeOut[0]}
            fadeOutEnd={config.scrollTriggers.blackOverlayFadeOut[1]}
          />
        </>
      )}

      <Canvas
        camera={{ position: [0, 5, 15], fov: 20, near: 0.01, far: 1000 }}
        style={{ height: "100vh", position: "sticky", top: 0 }}
        shadows
        gl={{ outputColorSpace: SRGBColorSpace }}
        dpr={dpr}
        frameloop={modelIsReady ? "always" : "demand"}
      >
        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />
        <AdaptiveDpr pixelated />
        <BackgroundFade scrollProgress={scrollProgress} />
        
        <Suspense fallback={null}>
          <Environment files={config.assetPaths.hdri} />
          <IntroImageAnimation scrollProgress={scrollProgress} imagePath={config.assetPaths.introImage} triggers={config.scrollTriggers} />
          <Scene
            scrollProgress={scrollProgress}
            onLoadComplete={() => setModelIsReady(true)}
            setCarSceneRef={setCarScene}
            dashcamGroupRef={dashcamGroupRef}
            config={config}
          />
          <LensAnimation isAnimating={isLensAnimating} dashcamGroupRef={dashcamGroupRef} />
        </Suspense>

        {carScene && (
          <CameraAnimation
            scrollProgress={scrollProgress}
            carScene={carScene}
            dashcamGroupRef={dashcamGroupRef}
            setLensAnimation={setIsLensAnimating}
            cameraAnimationData={config.cameraAnimationData}
            triggers={config.scrollTriggers}
          />
        )}
      </Canvas>
    </div>
  );
}

// NOTE: You will need to add the other animation components (CameraAnimation, BackgroundFade, LensAnimation)
// to the `animations` folder. They remain largely unchanged from the previous refactoring,
// but ensure any hardcoded values are replaced by props if necessary.