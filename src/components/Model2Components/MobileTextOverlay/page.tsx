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
import { cn } from "@/app/lib/utils";
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
  position?: string; // This can be used to set the position of the section
};
// Section renderer with fade logic
function OverlaySection({
  scrollProgress,
  start,
  end,
  width = "auto",
  content,
  position,
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
      className={cn(position)}
      style={{
        position: "absolute",
        width,
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
export default function TextOverlayMobile({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const middle = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
  const textSections = [
    {
      start: 0.032, // When the camera is looking at the dashcam
      end: 0.06,
      position: middle,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[20rem]"
          className=""
          superScript="See the Road in High Definition"
          title="2K Video Resolution"
          descriptionWidth="max-w-[19rem]"
          description=" From morning commutes to late-night returns, the front camera records in sharp 2K while the rear captures in Full HD. Whether it’s a close call or a scenic stretch, you’ll have a clear, reliable record from both angles."
        />
      ),
    },
    {
      start: 0.1300, // When the camera is high above the car
      end: 0.1402,
      position: "left-1/2 transform -translate-x-1/2 bottom-[60px]",
      content: (
        <TextDisplay
          descriptionWidth="max-w-[22rem]"
          titleMinWidth="min-w-[23.5rem]"
          superScript="STARVIS 2 Sensor"
          title="Sharp Vision in Every Frame"
          description="Equipped with Sony’s STARVIS 2 sensor, the VREC-H520DC delivers clear, balanced video with improved contrast and visibility, especially in challenging lighting."
        />
      ),
    },
    {
      start: 0.1725, // When the camera is high above the car
      end: 0.2060,
      position: " transform -translate-x-1/2 left-1/2 bottom-[60px]",
      content: (
        <TextDisplay
          descriptionWidth="max-w-[20rem]"
          titleMinWidth="min-w-[20rem]"
          superScript="Automatic Event Recording"
          title="Built-in G-Sensor"
          description="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
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
      start: 0.2678, // When the camera is high above the car
      end: 0.3085,
      position: "left-1/2 transform -translate-x-1/2 bottom-[60px]",
      content: (
        <TextDisplay
          descriptionWidth="max-w-[20rem]"
          titleMinWidth="min-w-[20rem]"
          superScript="Consistent Clarity in Any Light"
          title="High Dynamic Range"
          description="HDR keeps exposure balanced so footage stays sharp and detailed whether you're driving under bright sunlight, through shadows or into low-light conditions."
        />
      ),
    },
    {
      start: 0.2482, // When the camera is high above the car
      end: 0.2615,
      position: "bottom-[60px] left-1/2 transform -translate-x-1/2 ",
      content: (
        <TextDisplay
          descriptionWidth="max-w-[20rem]"
          titleMinWidth="min-w-[20rem]"
          superScript="Clear Control with a Wider Screen"
          title={`3" IPS Display`}
          description="The built-in screen measures 7.6 cm across and offers a clear, responsive view for checking footage, adjusting settings or navigating menus without needing your phone."
        />
      ),
    },

    {
      position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-[100%]',
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
      start: 0.3083, // When the camera is high above the car
      end: 0.3161,
    },
    {
      start: 0.5074, // When the camera is high above the car
      end: 0.5871,
      position: "top-[60px] left-[50%] transform -translate-x-1/2 ",
      content: (
        <TextDisplay
          descriptionWidth="max-w-[20rem]"
          titleMinWidth="min-w-[20rem]"
          superScript="Dual Camera Setup"
          title="Front and Rear in Focus"
          description="The VREC‑H520DC captures your journey from both ends with 2K clarity in front and Full HD behind, giving you balanced, high-quality footage wherever the road takes you."
        />
      ),
    },
    {
      start: 0.7356, // When the camera is high above the car
      end: 0.7936,
      position:
        "left-1/2 transform -translate-x-1/2 top-[60px]",
      content: (
        <TextDisplay
          descriptionWidth="max-w-[20rem]"
          titleMinWidth="min-w-[20rem]"
          superScript="Wide Angle View"
          title="140° Field of Vision"
          description="The lens captures more of what’s around you including lanes, nearby vehicles and surroundings so you get a complete view of every drive."
        />
      ),
    },
    {
      start: 0.858, // When the camera is high above the car
      end: 0.883,
      position:
      "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[50%] !w-[100%]",
      content: (
        <OptionalParking
          style="flex flex-col items-center sm:items-start justify-center sm:justify-center !w-[100%]"
          highlightedText="Stay Secure While Parked"
          heading="Optional Parking Mode"
          subheading="Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
          description="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
        />
      ),
    },
    {
      start: 0.9776, // When the camera is high above the car
      end: 0.999,
       position:
        "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[55%]",
      content: (
        <GpsLogger
          style="flex flex-col items-center sm:items-start justify-center sm:justify-center"
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
          width={sec.width}
          content={sec.content}
          position={sec.position}
        />
      ))}
    </div>,
    document.body
  );
}

function TextDisplay({
  superScript,
  title,
  description,
  descriptionWidth = "max-w-2xl",
  titleMinWidth = "",
  className = "",
}: {
  superScript: string;
  title: string;
  description: string;
  descriptionWidth?: string;
  className?: string;
  titleMinWidth?: string;
}) {
  return (
    <div className={cn("text-center ", className)}>
      <p className="text-[#AD2239] font-bold text-sm sm:text-base md:text-lg ">
        {superScript}
      </p>
      <h2
        className={cn(
          "lg2:text-[56px] lg:text-[46px] leading-tight text-[28px]  lg2:min-w-max text-white text-center font-medium mt-2 ",
          titleMinWidth
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-[#ABABAB]/80 text-sm text-center lg:text-lg mx-auto mt-2 leading-snug",
          descriptionWidth
        )}
      >
        {description}
      </p>
    </div>
  );
}
