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
function TextSection({
  scrollProgress,
  start,
  end,
  title,
  subtitle,
  highlightedText,
  disclaimer,
  icon3,
  icon2,
  icon1,
  padding,
  width = "300px",
  top = "0%",
  left = "0%",
  bottom = "0%",
  right = "0%",
  descPostion,
}: TextSectionProps) {
  // Define a fade margin (e.g., 20% of the section's duration)
  const fadeDuration = (end - start) * 0.2;
  const fadeInEnd = start + fadeDuration;
  const fadeOutStart = end - fadeDuration;

  let opacity = 0;

  if (scrollProgress >= start && scrollProgress <= end) {
    if (scrollProgress < fadeInEnd) {
      // Fade In
      opacity = THREE.MathUtils.mapLinear(
        scrollProgress,
        start,
        fadeInEnd,
        0,
        1
      );
    } else if (scrollProgress > fadeOutStart) {
      // Fade Out
      opacity = THREE.MathUtils.mapLinear(
        scrollProgress,
        fadeOutStart,
        end,
        1,
        0
      );
    } else {
      // Fully visible
      opacity = 1;
    }
  }

  return (
    <div
      style={{
        opacity,
        position: "absolute",
        top, // Position the text block
        left,
        bottom,
        right,
        width,
        transform: `translateY(-50%)`,
        transition: "opacity 0.3s ease-out",
      }}
      className={`${padding}`}
    >
      <p className="mt-4 text-sm xl:text-xl text-center font-bold text-[#760000]">
        {highlightedText}
      </p>
      <h2 className="text-3xl xl:text-5xl mt-4 text-center font-semibold text-white">
        {title}
      </h2>
      <p
        className={`mt-4 text-sm xl:text-lg ${padding}  text-center text-[#7f7a7a]`}
      >
        {subtitle}
      </p>
      <p
        className={`mt-4 text-sm   text-center absolute ${descPostion} text-[#484848]`}
      >
        {disclaimer}
      </p>
    </div>
  );
}

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
export default function TextOverlay({
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
        <FourKVideo
          highlightedText="See the Road in High Definition"
          heading="2K Video Resolution"
          subheading=" From morning commutes to late-night returns, the front camera records in sharp 2K while the rear captures in Full HD. Whether it’s a close call or a scenic stretch, you’ll have a clear, reliable record from both angles."
        />
      ),
    },
    {
      start: 0.122, // When the camera is high above the car
      end: 0.157,
      top: "30%",
      left: "70%",
      content: (
        <SharpVision
          highlightedText="STARVIS 2 Sensor"
          heading="Sharp Vision in Every Frame"
          subheading="Equipped with Sony’s STARVIS 2 sensor, the VREC-H520DC delivers clear, balanced video with improved contrast and visibility, especially in challenging lighting."
        />
      ),
    },
    {
      start: 0.159, // When the camera is high above the car
      end: 0.185,
      top: "50%",
      left: "70%",

      content: (
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Automatic Event Recording"
          heading="Built-in G-Sensor"
          subheading="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      ),
    },
    //   {
    //     start: 0.3506, // When the camera is high above the car
    //     end: 0.3867,
    //     top: "82%",
    //     left: "6%",
    //     highlightedText: "Sharp On-Screen Clarity",
    //     title: '3.2" IPS Display',
    //     subtitle: "The 8.1 cm built-in screen lets you review footage and adjust settings with sharp detail, all without taking up space on your dash.",
    //  width:"350px"
    //   },
    {
      start: 0.245, // When the camera is high above the car
      end: 0.3034,
      top: "50%",
      left: "23%",
      content: (
        <DynamicContent
          style="flex-col items-center justify-end sm:items-start sm:justify-center"
          highlightedText="Consistent Clarity in Any Light"
          heading="High Dynamic Range"
          subheading="HDR keeps exposure balanced so footage stays sharp and detailed whether you're driving under bright sunlight, through shadows or into low-light conditions."
        />
      ),
    },
    {
      start: 0.373, // When the camera is high above the car
      end: 0.3875,
      top: "80%",
      left: "50%",
      content: (
        <>
          <p className="text-[#AD2239] text-xl font-bold text-center">
            Clear Control with a Wider Screen
          </p>
          <h2 className="lg:text-[32px] lg2:text-[50px] text-white text-center font-medium">
            3" IPS Display
          </h2>
          <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
            The built-in screen measures 7.6 cm across and offers a clear,
            responsive view for checking footage, adjusting settings or
            navigating menus without needing your phone.
          </p>
        </>
      ),
    },

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
        />
      ),
      start: 0.389, // When the camera is high above the car
      end: 0.4365,
    },
    {
      start: 0.624, // When the camera is high above the car
      end: 0.6569,
      top: "15%",
      left: "50%",
      content: (
        <>
          <p className="text-[#AD2239] text-xl font-bold text-center">
            Dual Camera Setup
          </p>
          <h2 className="lg2:text-[56px] text-[32px] text-white text-center font-medium">
            Front and Rear in Focus
          </h2>
          <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
            The VREC‑H520DC captures your journey from both ends with 2K clarity
            in front and Full HD behind, giving you balanced, high-quality
            footage wherever the road takes you.
          </p>
        </>
      ),
    },
    {
      start: 0.75, // When the camera is high above the car
      end: 0.882,
      content: (
        <div className="">
          <FieldOfVision
            highlightedText="Wide Angle View"
            heading="140° Field of Vision"
            subheading="The lens captures more of what’s around you including lanes, nearby vehicles and surroundings so you get a complete view of every drive."
          />
        </div>
      ),
    },
    {
      start: 0.9375, // When the camera is high above the car
      end: 0.9468,
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
      start: 0.9815, // When the camera is high above the car
      end: 0.999,
      top: "50%",
      left: "20%",
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
