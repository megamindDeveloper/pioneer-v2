"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DriveAlert from "@/components/CommonComponents/TextComponents/DriveAlert";
import OptionalParking from "@/components/CommonComponents/TextComponents/OptionalParking";
import GpsLogger from "@/components/CommonComponents/TextComponents/GpsLogger";
import FourKVideo from "@/components/CommonComponents/TextComponents/FourKVideo";
import SharpVision from "@/components/CommonComponents/TextComponents/SharpVision";
import DynamicContent from "@/components/CommonComponents/TextComponents/DynamicContent";
import FieldOfVision from "@/components/CommonComponents/TextComponents/FieldOfVision";
import RightFieldOfVision from "@/components/CommonComponents/TextComponents/RightFieldOfVision";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define stage type for TypeScript
type Stage = "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10" | null;

export default function Model4TextOverlay() {
  // State to track the current stage
  const [stage, setStage] = useState<Stage>(null);
  // Reference to the overlay element
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Set up ScrollTrigger to update stages based on scroll progress
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#blender2js-scroll-container-model4",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          console.log("Scroll Progress:", p.toFixed(3));

          // Map scroll progress to stages
          if (p === 0) setStage(null);
          else if (p >= 0.035 && p < 0.1) setStage("s1");
          else if (p >= 0.0638 && p < 0.1554) setStage("s2");
          else if (p >= 0.262 && p < 0.3079) setStage("s3");
          else if (p >= 0.3547 && p < 0.4079) setStage("s4");
          else if (p >= 0.5845 && p < 0.6901) setStage("s5");
          else if (p >= 0.7544 && p < 0.8232) setStage("s7");
          else if (p >= 0.8571 && p < 0.9293) setStage("s8");
          else if (p >= 0.9776 && p < 1) setStage("s9");
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
    // s1: (
    //   <div>
    //     <FourKVideo
    //       highlightedText="Sharp Footage in Low Light"
    //       heading="AI Powered Night Vision"
    //       subheading="An 8MP sensor that captures sharp, detailed video with high sensitivity, preserving image quality even during night drives and low-light conditions."
    //     />
    //   </div>
    // ),
    s2: (
      <div>
        <FourKVideo
          highlightedText="Sharper Footage in Any Light"
          heading="1.5K Recording with WDR  "
          subheading="The VREC-H120SC captures clear, steady video in all kinds of light, combining 1.5K resolution with smart brightness control for better visibility day and night.(Resolution can be enabled through the ZenVue app.)"
        />
      </div>
    ),
    s3: (
      <div className="">
        <SharpVision
          highlightedText="Made to Fit Effortlessly"
          heading="Compact By Design"
          subheading="With its streamlined design, the VREC-H120SC fits neatly behind your rear-view mirror, keeping your dash tidy while capturing the road ahead with clarity."
        />
      </div>
    ),
    // s4: (
    //   <div>
    //     <DynamicContent
    //       style="flex-col items-center justify-end sm:items-start sm:justify-center"
    //       highlightedText="Sharp On-Screen Clarity"
    //       heading='3.2" IPS Display'
    //       subheading="The 8.1 cm built-in screen lets you review footage and adjust settings with sharp detail, all without taking up space on your dash."
    //     />
    //   </div>
    // ),
    s5: (
      <div className="w-[100%] z-[-1]">
        <RightFieldOfVision
          highlightedText="A minimal build that delivers maximum road coverage"
          heading="120° Field of View"
          subheading="Whether a bike cuts in from the side or something happens just outside your lane, this lens captures it. Designed to record the bigger picture without needing a bulky setup."
        />
      </div>
    ),
    // s6: (
    //   <div>
    //     <DriveAlert
    //       highlightedText="Timely Warnings When It Matters"
    //       heading="ADAS Alerts"
    //       subheading="Get audio cues for lane departure and forward collision so you can stay aware, avoid surprises and respond faster on busy roads."
    //       alert1Image="/Images/svgs/laneIcon.svg"
    //       alert2Image="/Images/svgs/collisionIcon.svg"
    //       alert3Image="/Images/svgs/stopnGoIcon.svg"
    //       alert1="Lane Departure Alert"
    //       alert2="Forward Collision Alert"
    //       alert3="Stop & Go Alert"
    //     />
    //   </div>
    // ),
    s7: (
      <div className="w-[300px] md:w-500px">
        <p className="text-[#AD2239] text-lg sm:text-xl md:text-lg font-bold text-center">Store More Footage with Ease</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-medium">Supports up to 128GB microSD</h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto text-sm sm:text-base md:text-md">
          Gives you the space to record and save more of your drives without worrying about running out of memory.
        </p>
      </div>
    ),
    s8: (
      <div>
        <SharpVision
          highlightedText="Automatic Event Recording"
          heading="Built-in G-Sensor"
          subheading="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      </div>
    ),
    s9: (
      <div className="w-md md:w-[100%] z-[-1]">
        {/* <FieldOfVision
          highlightedText="Stay Secure While Parked"
          heading="Optional Parking Mode"
          subheading="When hardwired, the VREC‑H120SC stays on standby and begins recording the moment it detects an impact, giving you subtle protection even when you’re away."
        /> */}
         <OptionalParking
          style="flex flex-col items-center sm:items-start justify-center sm:justify-center"
          highlightedText="Stay Secure While Parked"
          heading="Optional Parking Mode"
          subheading="When hardwired, the VREC‑H120SC stays on standby and begins recording the moment it detects an impact, giving you subtle protection even when you’re away."
          description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        />
      </div>
    ),
    // s10: (
    //   <div>
    //     <GpsLogger
    //       highlightedText="Every Trip Logged"
    //       heading="GPS Logger"
    //       subheading="Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed."
    //       description="*Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map."
    //     />
    //   </div>
    // ),
  };

  // Define overlay positions for each stage
  const overlayPosition: Record<NonNullable<Stage> | "default", string> = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s1: "inset-0 flex  items-center justify-center z-[100] w-[100vw] h-[100%]",
    s2: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "md:bottom-[18rem] md:right-32 bottom-[2rem] right-[-4rem] z-[100]",
    s4: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s5: "md:top-1/2 md:right-1 top-1/2 right-[-13rem] z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s7: "md:top-1/2 md:left-1/5 bottom-1 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s8: "  left-1/2 top-[200px] z-[100] -translate-x-1/2 -translate-y-1/2",
    s9: "md:top-1/2 md:left-[72vw] bottom-1 left-[49vw] z-[100] -translate-x-1/2 -translate-y-1/2",
    s10: "top-1 right-1 z-[100] -translate-x-1/2 -translate-y-1/2",
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
        <div ref={overlayRef} className={`fixed ${overlayPosition[stage || "default"]} pointer-events-none`}>
          {currentOverlay}
        </div>
      )}
    </>,
    document.body
  );
}
