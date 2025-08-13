"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import DriveAlert from "@/components/CommonComponents/TextComponents/DriveAlert";
import OptionalParking from "@/components/CommonComponents/TextComponents/OptionalParking";
import GpsLogger from "@/components/CommonComponents/TextComponents/GpsLogger";
import FourKVideo from "@/components/CommonComponents/TextComponents/FourKVideo";
import SharpVision from "@/components/CommonComponents/TextComponents/SharpVision";
import DynamicContent from "@/components/CommonComponents/TextComponents/DynamicContent";
import FieldOfVision from "@/components/CommonComponents/TextComponents/FieldOfVision";
import DriveAlertH520 from "@/components/CommonComponents/TextComponents/DriveAlertH520";

gsap.registerPlugin(ScrollTrigger);

type Stage = "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "s10" | "s11" | "s12" | "s13" | null;

export default function Model2textOverlay() {
  const [stage, setStage] = useState<Stage>(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#blender2js-scroll-container-model2",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          console.log("Scroll Progress:", p.toFixed(3));

          if (p === 0) setStage(null);

          else if (p >= 0.0365 && p < 0.1113) setStage("s3");
          else if (p >= 0.1741 && p < 0.2432) setStage("s4");
          else if (p >= 0.2433 && p < 0.2633) setStage("s13");
          else if (p >= 0.2941 && p < 0.3506) setStage("s5");
          else if (p >= 0.4118 && p < 0.4490) setStage("s6");
          else if (p >= 0.4534 && p < 0.4838) setStage("s7");
          else if (p >= 0.6413 && p < 0.6666) setStage("s8");
          else if (p >= 0.7833 && p < 0.8879) setStage("s9");
          else if (p >= 0.9508 && p < 0.9529) setStage("s10");
          else if (p >= 0.8824 && p < 0.9529) setStage("s12");
          else if (p >= 0.9712 && p < 1) setStage("s11");
          else setStage(null);
        },
      });
    });
    // gsap.to(overlayRef.current, {
    //   opacity: 0,
    //   y: -100,
    //   scrollTrigger: {
    //     trigger: "#model-scroll-container",
    //     start: "center center",
    //     end: "bottom top",
    //     scrub: true,
    //   },
    //   ease: "power2.in",
    // });

    return () => ctx.revert();
  }, []);

  if (typeof window === "undefined") return null;

  // Custom overlay divs
  const overlays = {
    s2: (
      <div>
        {/* <FourKVideo
          highlightedText="Sharp Footage in Low Light"
          heading="AI Powered Night Vision"
          subheading="An 8MP sensor that captures sharp, detailed video with high sensitivity, preserving image quality even during night drives and low-light conditions."
        /> */}
      </div>
    ),
    s3: (
      <div>
        <FourKVideo
          highlightedText="See the Road in High Definition"
          heading="2K Video Resolution"
          subheading=" From morning commutes to late-night returns, the front camera records in sharp 2K while the rear captures in Full HD. Whether it’s a close call or a scenic stretch, you’ll have a clear, reliable record from both angles."
        />
      </div>
    ),
    s4: (
      <div>
        <SharpVision
          highlightedText="STARVIS 2 Sensor"
          heading="Sharp Vision in Every Frame"
          subheading="Equipped with Sony’s STARVIS 2 sensor, the VREC-H520DC delivers clear, balanced video with improved contrast and visibility, especially in challenging lighting."
        />
      </div>
    ),
    s13: (
      <div>
        <SharpVision
          highlightedText="Automatic Event Recording"
          heading="Built-in G-Sensor"
          subheading="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      </div>
    ),
    s5: (
      <div>
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Consistent Clarity in Any Light"
          heading="High Dynamic Range"
          subheading="HDR keeps exposure balanced so footage stays sharp and detailed whether you're driving under bright sunlight, through shadows or into low-light conditions."
        />
      </div>
    ),
    s6: (
      <div className="w-sm md:w-lg space-y-4">
        <p className="text-cherryRed font-bold text-center text-lg sm:text-xl md:text-md">
          Clear Control with a Wider Screen
        </p>

        <h2 className="text-white text-center font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          3" IPS Display
        </h2>

        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto text-sm sm:text-base md:text-md">
          The built-in screen measures 7.6 cm across and offers a clear, responsive view for checking footage, adjusting settings or navigating menus
          without needing your phone.
        </p>
      </div>

    ),
    s7: (
      <div>
        <DriveAlertH520
          highlightedText="ADAS Enabled"
          heading="Smart Alerts for Safer Driving"
          subheading="Get audio alerts for lane departure, forward collision and stop-and-go alert so you stay aware of your surroundings and respond faster to sudden changes on the road."
          alert1Image="/productPageImages/driveAlertIcons/laneIcon.svg"
          alert2Image="/productPageImages/driveAlertIcons/collisionIcon.svg"
          alert3Image="/productPageImages/driveAlertIcons/stopnGoIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"
        />
      </div>
    ),
    s8: (
      <div className="w-sm md:w-xl">
        <p className="text-cherryRed font-bold text-center text-sm sm:text-base md:text-lg">
          Dual Camera Setup
        </p>
        <h2 className="text-white text-center font-medium text-3xl sm:text-4xl md:text-[50px]">
          Front and Rear in Focus
        </h2>
        <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto text-sm sm:text-base md:text-md">
          The VREC-H520DC captures your journey from both ends with 2K clarity in front and Full HD behind, giving you balanced, high-quality footage
          wherever the road takes you.
        </p>
      </div>
    ),
    s9: (
      // <div>asas</div>

      <div className="w-[100%]">
        <FieldOfVision
          highlightedText="Wide Angle View"
          heading="140° Field of Vision"
          subheading="The lens captures more of what’s around you including lanes, nearby vehicles and surroundings so you get a complete view of every drive."
        />
      </div>
    ),

    s12: (
      <OptionalParking
        style="flex flex-col items-center sm:items-start justify-center sm:justify-center "
        highlightedText="Stay Secure While Parked"
        heading="Optional Parking Mode"
        subheading="Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
      />
    ),

    s11: (
      <GpsLogger
        highlightedText="Every Trip Logged"
        heading="GPS Logger"
        subheading="Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed."
        description="*Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map."
      />
    ),
  };

  // Custom overlay divs
  const overlayPosition = {
    default: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s2: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s3: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s4: " sm:bottom-32 sm:left-[50rem]   bottom-12 left-[-70px] z-[100]",
    s5: "    md:top-1/2 md:left-1/4  top-98 left-[205px] z-[100] -translate-x-1/2 -translate-y-1/2",
    s6: "bottom-1 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s7: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s8: "top-32 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s9: " z-[100] flex inset-0 w-[100%] !h-[100vh]",
    s10: "top-1/2 left-1/4 z-[100] -translate-x-1/2 -translate-y-1/2",
    s11: "top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2",
    s13: "sm:top-0 sm:left-2/3 z-[100]  top-98 left-[205px]   -translate-x-1/2 -translate-y-1/2",
    s12: "sm:top-1/2 sm:left-1/4 z-[100] top-98 left-[205px]  -translate-x-1/2 -translate-y-1/2",
  };

  const currentOverlay = stage ? overlays[stage] : null;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {currentOverlay && stage !== "s9" && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }} // easeOutCubic
          className={`fixed transition-all ${overlayPosition[stage || "default"]} pointer-events-none`}
        >
          {currentOverlay}
        </motion.div>
      )}

      {stage === "s9" && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className={`fixed transition-all ease-in-out duration-300 w-full ${overlayPosition[stage || "default"]} pointer-events-none`}
        >
          {overlays.s9}
        </motion.div>
      )}
    </AnimatePresence>,

    document.body
  );
}
