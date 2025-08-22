/**
 * Defines the blueprint for a model's entire animation configuration.
 * This ensures every model's config file provides the necessary data.
 */
export interface ModelAnimationConfig {
    assetPaths: {
      mainModel: string;
      subModel: string;
      rearModel: string;
      hdri: string;
      introImage: string;
      screenImage: string;
      screenVideo: string;
    };
    introImageAnimation: {
        position: [number, number, number];
        planeSize: [number, number];
        scale: [number, number]; // [startScale, endScale]
        rotation: [number, number]; // [startRotation, endRotation] in radians
      };
    
    textContent: {
      hero: {
        heading: string;
        subtitle: string;
      };
      overlays: Array<{
        id: string;
        heading: string;
        body: string;
        scrollRange: [number, number]; // [start, end] progress
      }>;
    };
    cameraAnimationData: any; // Type this according to your animation data structure
    scrollTriggers: {
      // Defines start and end points for various scroll-based events
      cameraMoveStart: number;
      introImageFade: [number, number];
      dashcamFadeIn: [number, number];
      lensExplode: [number, number];
      screenImageFade: [number, number, number]; // [fadeIn, full, fadeOut]
      screenVideoFade: [number, number, number];
      carVisible: [number, number];
      windshieldHighlight: [number, number];
      clipMask: [number, number];
      blackOverlayFadeOut: [number, number];
      
    };
    stickyZones: Array<[number, number]>;
  }