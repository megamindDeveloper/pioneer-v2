/// You can create a new file for this, e.g., TextOverlay.tsx

import DriveAlertH520 from "@/components/CommonComponents/TextComponents/DriveAlertH520";
import FourKVideo from "@/components/CommonComponents/TextComponents/FourKVideo";
import React from "react";
import * as THREE from "three";
import ReactDOM from "react-dom";
import SharpVision from "@/components/CommonComponents/TextComponents/SharpVision";
import DynamicContent from "@/components/CommonComponents/TextComponents/DynamicContent";
import FieldOfVision from "@/components/CommonComponents/TextComponents/FieldOfVision";
import OptionalParking from "@/components/CommonComponents/TextComponents/OptionalParking";
import GpsLogger from "@/components/CommonComponents/TextComponents/GpsLogger";
// Define the structure for each text "slide"
type TextSectionProps = {
  scrollProgress: number;
  start: number;
  end: number;
  title: string;
  subtitle: string;
  highlightedText: string;
  disclaimer?: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
  width?: string;
  padding?: string;
  descPostion?: string;
};

// This component handles the fade-in/fade-out logic for a single text block

type SectionProps = {
  scrollProgress: number;
  start: number;
  end: number;
  top?: string;
  left?: string;
  width?: string;
  content: JSX.Element;
};
// Section renderer with fade logic
function OverlaySection({
  scrollProgress,
  start,
  end,
  top = "50%",
  left = "50%",
  width = "auto",
  content,
}: SectionProps) {
  const fadeDuration = (end - start) * 0.2;
  const fadeInEnd = start + fadeDuration;
  const fadeOutStart = end - fadeDuration;

  let opacity = 0;
  if (scrollProgress >= start && scrollProgress <= end) {
    if (scrollProgress < fadeInEnd) {
      opacity = THREE.MathUtils.mapLinear(
        scrollProgress,
        start,
        fadeInEnd,
        0,
        1
      );
    } else if (scrollProgress > fadeOutStart) {
      opacity = THREE.MathUtils.mapLinear(
        scrollProgress,
        fadeOutStart,
        end,
        1,
        0
      );
    } else {
      opacity = 1;
    }
  }

  const isSpecialSection = start === 0.4635 && end === 0.5301;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        transform: "translate(-50%, -50%)",
        opacity,
        transition: "opacity 0.3s ease-out",
        pointerEvents: "none",
      }}
    >
      {content}
    </div>
  );
}

// This is the main overlay component that holds all the sections
export default function Model3textOverlayMobile({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  // Define your text content and scroll ranges here
  const textSections = [
    {
      start: 0.032, // When the camera is looking at the dashcam
      end: 0.06,
      content: (
        <section className="relative min-h-screen text-white flex items-center justify-center px-12">
          <div className="text-center min-w-xl  sm:min-w-3xl px-22 sm:mt-1 mt-16  space-y-3">
            {/* Red Subheading */}
            <p className="text-[#AD2239] font-bold text-[14px] sm:text-base md:text-lg mb-3">
              Precision in Motion
            </p>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-3xl md:text-[60px] lg:text-[50px] font-semibold leading-tight mb-1">
              Full HD Recording
            </h2>

            {/* Description */}
            <p className="text-[#ABABAB] text-[16px] sm:text-base md:text-md max-w-xs mx-auto  leading-relaxed">
              The front camera records in crisp 1080p, giving you sharp visuals for everyday drives, traffic incidents or unexpected moments.
            </p>
          </div>
        </section>
      ),
    },
    // {
    //   start: 0.122, // When the camera is high above the car
    //   end: 0.157,
    //   top: "30%",
    //   left: "50%",
    //   content: (
    //     <SharpVision
    //       highlightedText="STARVIS 2 Sensor"
    //       heading="Sharp Vision in Every Frame"
    //       subheading="Equipped with Sony’s STARVIS 2 sensor, the VREC-H520DC delivers clear, balanced video with improved contrast and visibility, especially in challenging lighting."
    //     />
    //   ),
    // },
    {
      start: 0.1237,
      end: 0.185,



      content: (
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Automatic Event Recording"
          heading="Built-in G-Sensor"
          subheading="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      ),
    },
    {
      start: 0.2682, // When the camera is high above the car
      end: 0.3078,
      
      
     content: (
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Clear View at a Glance"
          heading='3" IPS Display'
          subheading="The 7.6 cm screen lets you review footage, adjust settings, and see live video clearly right from the dash without needing your phone."
        />
      ),
      
    },
    {
      start: 0.3410, // When the camera is high above the car
      end: 0.3599,
      
      content: (
        
        <DynamicContent
          style="flex-col  items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Clarity in Changing Light"
          heading="Wide Dynamic Range (WDR)"
          subheading="From tunnels to tree cover, WDR balances bright and dark areas in real time so your footage stays detailed and easy to review."
          Feat="WDR"
        />
      ),
    },
    // {
    //   start: 0.373, // When the camera is high above the car
    //   end: 0.3875,
    //   top: "80%",
    //   left: "50%",
    //   content: (
    //     <div className="space-y-2">
    //       <p className="text-[#AD2239] text-xl font-bold text-center min-w-xs">
    //         Clear Control with a Wider Screen
    //       </p>
    //       <h2 className="lg:text-[32px] lg2:text-[50px] text-white text-center font-medium">
    //         3" IPS Display
    //       </h2>
    //       <p className="text-pretty text-[#ABABAB] text-center min-w-[18rem] lg:max-w-xl mx-auto">
    //         The built-in screen measures 7.6 cm across and offers a clear,
    //         responsive view for checking footage, adjusting settings or
    //         navigating menus without needing your phone.
    //       </p>
    //     </div>
    //   ),
    // },

    {
      dynamic: true,
      content: (
        <DriveAlertH520
          highlightedText="ADAS Enabled"
          heading="Smart Alerts for Safer Driving"
          subheading="Get audio alerts for lane departure, forward collision and stop-and-go alert so you stay aware of your surroundings and respond faster to sudden changes on the road."
          alert1Image="/productPageImages/driveAlertIcons/laneIcon.svg"
          alert2Image="/productPageImages/driveAlertIcons/stopnGoIcon.svg"
          alert3Image="/productPageImages/driveAlertIcons/collisionIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"
          model="model3"
        />
      ),
      start: 0.3673, // When the camera is high above the car
      end: 0.4000,

    },
    // {
    //   start: 0.6792, // When the camera is high above the car
    //   end: 0.75,
    //   top: "20%",
    //   left: "50%",
    //   content: (
    //     <>
    //       <p className="text-[#AD2239] lg:text-xl font-bold text-center">
    //         Dual Camera Setup
    //       </p>
    //       <h2 className="lg2:text-[56px] text-[32px] text-white text-center font-medium">
    //         Front and Rear in Focus
    //       </h2>
    //       <p className="text-pretty text-[#ABABAB] text-center min-w-xs max-w-xl mx-auto">
    //         The VREC‑H520DC captures your journey from both ends with 2K clarity
    //         in front and Full HD behind, giving you balanced, high-quality
    //         footage wherever the road takes you.
    //       </p>
    //     </>
    //   ),
    // },
    {
      start: 0.7113, // When the camera is high above the car
      end: 0.7911,
      top: "20%",
      content: (
        <div className="">
          <p className="text-[#AD2239] lg:text-xl font-bold text-center">
            See More Than Just the Lane Ahead
          </p>
          <h2 className="lg2:text-[56px] text-[32px] text-white text-center font-medium">
            139° Wide-Angle Lens
          </h2>
          <p className="text-pretty text-[#ABABAB] text-center min-w-xs max-w-xl mx-auto">
            Captures multiple lanes and surrounding details, giving you a broader view of every situation on the road.
          </p>
        </div>
      ),
    },
    {
      start: 0.8419, // When the camera is high above the car
      end: 0.8626,
      top: "50%",
      left: "50%",
      content: (
        <OptionalParking
          style="flex flex-col items-center sm:items-start justify-center sm:justify-center"
          highlightedText="Stay Secure While Parked"
          heading="Optional Parking Mode"
          subheading="Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
          description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        />
      ),
    },
    {
      start: 0.9233, // When the camera is high above the car
      end: 0.9888,
      top: "50%",
      left: "50%",
      content: (
        <GpsLogger
          highlightedText="Every Trip Logged"
          heading="GPS Logger"
          subheading="Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed."
          description="*Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map."
        />
      ),
    },

    // Add as many sections as you need
  ];

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {textSections.map((sec, i) => (
        <OverlaySection
          key={i}
          scrollProgress={scrollProgress}
          start={sec.start}
          end={sec.end}
          top={sec.top}
          left={sec.left}
          width={sec.width}
          content={sec.content}
        />
      ))}
    </div>,
    document.body
  );
}
