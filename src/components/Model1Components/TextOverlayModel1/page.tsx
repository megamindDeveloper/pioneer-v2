"use client";

import { JSX, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DriveAlert from "@/components/CommonComponents/TextComponents/DriveAlert";
import OptionalParking from "@/components/CommonComponents/TextComponents/OptionalParking";
import GpsLogger from "@/components/CommonComponents/TextComponents/GpsLogger";

import SharpVision from "@/components/CommonComponents/TextComponents/SharpVision";
import DynamicContent from "@/components/CommonComponents/TextComponents/DynamicContent";
import FieldOfVision from "@/components/CommonComponents/TextComponents/FieldOfVision";
import FourKVideo from "@/components/CommonComponents/TextComponents/FourKVideo";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define stage type for TypeScript
type Stage = "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10" | null;

export default function Model1TextOverlay() {
  // State to track the current stage
  const [stage, setStage] = useState<Stage>(null);
  // Reference to the overlay element
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Set up ScrollTrigger to update stages based on scroll progress
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#blender2js-scroll-container-model1",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          console.log("Scroll Progress:", p.toFixed(3));

          // Map scroll progress to stages
          if (p === 0) setStage(null);
          else if (p >= 0.0350 && p < 0.0725) setStage("s1");
          else if (p >= 0.0825 && p < 0.1310) setStage("s2");
          else if (p >= 0.1956 && p < 0.2286) setStage("s3");
          else if (p >= 0.2781 && p < 0.2987) setStage("s4");
          else if (p >= 0.3462 && p < 0.36) setStage("s5");
          else if (p >= 0.38 && p < 0.402
          ) setStage("s6");
          else if (p >= 0.5557 && p < 0.5859
          ) setStage("s7");
          else if (p >= 0.6674 && p < 0.8570) setStage("s8");
          else if (p >= 0.9068 && p < 0.9340) setStage("s9");
          else if (p >= 0.9528 && p < 1) setStage("s10");
          else setStage(null);
        },
      });
    });

    // Cleanup GSAP context on component unmount
    return () => ctx.revert();
  }, []);

  // Prevent server-side rendering
  if (typeof window === "undefined") return null;

  // Define overlay content for each stage
  const overlays: Record<NonNullable<Stage>, JSX.Element> = {
    s1: (
      <div>
        <FourKVideo
          highlightedText="Sharp Footage in Low Light"
          heading="AI Powered Night Vision"
          subheading="An 8MP sensor that captures sharp, detailed video with high sensitivity, preserving image quality even during night drives and low-light conditions."
        />
      </div>
    ),
    s2: (
      <div>
        <FourKVideo
          highlightedText="Details Stay Intact"
          heading="4K Video Resolution"
          subheading="The VREC-Z820DC records in true 4K, producing sharp video that makes plates, signs and unexpected moments easy to identify when needed."
        />
      </div>
    ),
    s3: (
      <div>
        <SharpVision
          highlightedText="Clarity That Goes Further"
          heading="High-Performance Imaging"
          subheading="The VREC-Z820DC uses a Sony STARVIS IMX415 sensor, an f/1.8 aperture and a 7-layer glass lens. Together, they capture sharp, bright footage with accurate detail even in low or uneven lighting."
        />
      </div>
    ),
    s4: (
      <div>
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Sharp On-Screen Clarity"
          heading='3.2" IPS Display'
          subheading="The 8.1 cm built-in screen lets you review footage and adjust settings with sharp detail, all without taking up space on your dash."
        />
      </div>
    ),
    s5: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">Adapts to Any Light</p>
        <h2 className="lg:text-[32px] lg2:text-[56px] text-white text-center font-medium">WDR & HDR Recording</h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
          It adjusts exposure in real time, preserving visibility and fine detail, so footage stays clear in both bright and low-light conditions.
        </p>
      </div>
    ),
    s6: (
      <div>
        <DriveAlert
          highlightedText="Timely Warnings When It Matters"
          heading="ADAS Alerts"
          subheading="Get audio cues for lane departure and forward collision so you can stay aware, avoid surprises and respond faster on busy roads."
          alert1Image="/productPageImages/driveAlertIcons/laneIcon.svg"
          alert2Image="/productPageImages/driveAlertIcons/collisionIcon.svg"
          alert3Image="/productPageImages/driveAlertIcons/stopnGoIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"
        />
      </div>
    ),
    s7: (
      <div>
        <p className="text-cherryRed text-xl font-bold text-center">Every Angle Matters</p>
        <h2 className="lg2:text-[56px] text-[32px] text-white text-center font-medium">Dual Camera setup</h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
          The VREC-Z820DC pairs a 4K front and HD rear camera to record both directions at once, delivering clearer evidence and wider coverage.
        </p>
      </div>
    ),
    s8: (
      <div className="w-[100%]">
        <FieldOfVision
          highlightedText="Comprehensive Coverage"
          heading="137° Wide-Angle View"
          subheading="Gives you a broader view of the road, capturing side lanes, nearby traffic and details that other cameras might miss."
        />
      </div>
    ),
    s9: (
      <div>
        <OptionalParking
          style="flex flex-col items-center sm:items-start justify-center sm:justify-center"
          highlightedText="Stay Secure While Parked"
          heading="Optional Parking Mode"
          subheading="Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
          description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        />
      </div>
    ),
    s10: (
      <div>
        <GpsLogger
          highlightedText="Every Trip Logged"
          heading="GPS Logger"
          subheading="Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed."
          description="*Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map."
        />
      </div>
    ),
  };

  // Define overlay positions for each stage
  const overlayPosition: Record<NonNullable<Stage> | "default", string> = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s1: "inset-0 flex  items-center justify-center z-[100] w-[100vw] h-[100%]",
    s2: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "lg2:bottom-32 bottom-16 lg2:right-32 right-16 z-[100]",
    s4: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s5: "bottom-1 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s7: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s8: " z-[100] flex inset-0 w-[100%] !h-[100vh]",
    s9: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s10: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
  };

  // Get the current overlay content based on stage
  const currentOverlay = stage ? overlays[stage] : null;

  // Use GSAP to animate overlay transitions with fade-in/fade-out
  useEffect(() => {
    if (overlayRef.current) {
      const tl = gsap.timeline();
      if (currentOverlay) {
        // Fade in new overlay at fixed position
      
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          }
        );
      } else {
        // Fade out when no overlay is active
        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        });
      }
    }
  }, [stage, currentOverlay]);

  // Render the overlay using React Portal
  return ReactDOM.createPortal(
    <>
      {currentOverlay && (
        <div
          ref={overlayRef}
          className={`fixed ${overlayPosition[stage || "default"]} pointer-events-none`}
        >
          {currentOverlay}
        </div>
      )}
    </>,
    document.body
  );
}