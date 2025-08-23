/// You can create a new file for this, e.g., TextOverlay.tsx

import { cn } from "@/app/lib/utils";
import React, { JSX } from "react";
import * as THREE from "three";
import ReactDOM from "react-dom";
import DriveAlertH520 from "@/components/CommonComponents/TextComponents/DriveAlertH520";
import DriveAlertH820 from "@/components/CommonComponents/TextComponents/DriveAlertH820";
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
  left?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
  icon4?: string;
  width?: string;
  padding?: string;
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
  icon4,
  padding,
  width = "300px",
  top = "50%",
  left = "12%",
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
  const isSpecialSection = start === 0.4635 && end === 0.5301;
  return (
    <div
      style={{
        opacity,
        position: "absolute",
        top,
        left,
        width,
        transform: `translateY(-50%)`,
        transition: "opacity 0.3s ease-out",
      }}
      className={`${padding}`}
    >
      {isSpecialSection ? (
        /* Special Layout with 3 icons */
        <div className="flex flex-col items-center px-6  text-white ">
          {/* Danger Icon */}
          <div className="animate-fastpulse mb-23 mt-11">
            <img src={icon4} alt="Warning Icon" className="w-[60px] h-[60px]" />
          </div>

          {/* Highlighted Text */}
          <p className="text-sm  tracking-wide font-bold text-[#AD2239] mb-2">
            {highlightedText}
          </p>

          {/* Title */}
          <h2 className="text-[28px] leading-tight text-center font-bold text-white mb-3">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-sm max-w-[320px] text-center text-[#7f7a7a] mb-1">
            {subtitle}
          </p>

          {/* Feature Icons Row */}
          <div className="flex gap-[50px]">
            <div className="flex flex-col items-center">
              <img
                src={icon1}
                alt="Lane Departure"
                className="w-[40px] h-[40px] mb-2"
              />
              <span className="text-[12px] text-center">
                Lane Departure Alert
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={icon2}
                alt="Forward Collision"
                className="w-[40px] h-[40px] mb-2"
              />
              <span className="text-[12px] text-center">
                Forward Collision Alert
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={icon3}
                alt="Stop & Go"
                className="w-[40px] h-[40px] mb-2"
              />
              <span className="text-[12px] text-center">Stop & Go Alert</span>
            </div>
          </div>
        </div>
      ) : (
        /* Default Layout */
        <>
          <p className="mt-4 text-sm text-center font-bold text-[#AD2239]">
            {highlightedText}
          </p>
          <h2 className="text-[26px] text-center font-bold text-white">
            {title}
          </h2>
          <p className={`mt-4 text-sm ${padding} text-center text-[#7f7a7a]`}>
            {subtitle}
          </p>
          {disclaimer && (
            <p className="mt-4 text-sm text-center text-[#484848] absolute top-135">
              {disclaimer}
            </p>
          )}
        </>
      )}
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
  const middle = "top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2";
  const bottom = "left-1/2 transform -translate-x-1/2 bottom-[60px]";
  const top = "top-[60px] left-[50%] transform -translate-x-1/2";
  const textSections = [
    {
      start: 0.0270, // When the camera is looking at the dashcam
      end: 0.0415,
      position: middle,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[20rem]"
          className=""
          superScript="Sharp Footage in Low Light"
          title="AI Powered Night Vision"
          descriptionWidth="max-w-[19rem]"
          description="An 8MP sensor that captures sharp, detailed video with high sensitivity, preserving image quality even during night drives and low-light conditions."
        />
      ),
    },
    { 
      start: 0.0418, // When the camera is high above the car
      end: 0.0607,
      position: middle,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[20rem]"
          className=""
          superScript="Details Stay Intact"
          title="4K Video Resolution"
          descriptionWidth="max-w-[20rem]"
          description="The VREC-Z820DC records in true 4K, producing sharp video that makes plates, signs, and unexpected moments easy to identify when needed."
        />
      ),

    },
    {
      start: 0.1192, // When the camera is high above the car
      end: 0.1448,
      position: bottom,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[22rem]"
          className=""
          superScript="Clarity That Goes Further"
          title="High-Performance Imaging"
          descriptionWidth="max-w-[24rem]"
          description="The VREC-Z820DC uses a Sony STARVIS IMX415 sensor, an f/1.8 aperture, and a 7-layer glass lens. Together, they capture sharp, bright footage with accurate detail even in low or uneven lighting."
        />
      ),
    },
    {
      start: 0.2136, // When the camera is high above the car
      end: 0.2384,
      position: bottom,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[20rem]"
          className=""
          superScript="Sharp On-Screen Clarity"
          title='3.2" IPS Display'
          descriptionWidth="max-w-[20rem]"
          description="The 8.1 cm built-in screen lets you review footage and adjust settings with sharp detail, all without taking up space on your dash."
        />
      ),
    },
    {
      start: 0.2612, // When the camera is high above the car
      end: 0.3064,
      position: bottom,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[20rem]"
          className=""
          superScript="Adapts to Any Light"
          title="WDR & HDR Recording"
          descriptionWidth="max-w-[20rem]"
          description="It adjusts exposure in real time, preserving visibility and fine detail, so footage stays clear in both bright and low-light conditions."
        />
      ),
    },
    {
      start: 0.3069, // When the camera is high above the car
      end: 0.3184,
      position: "top-[70%] mx-auto     -translate-y-[70%] !w-[100%]",
      content: (
        <DriveAlertH820 
        
          highlightedText="Built to Notice Before You Do "
          heading="ADAS  Alerts"
          subheading="The VREC-Z820DC monitors lane position, vehicle distance and traffic flow to deliver timely alerts and help you stay in control."
          alert1Image="/productPageImages/driveAlertIcons/laneIcon.svg"
          alert2Image="/productPageImages/driveAlertIcons/stopnGoIcon.svg"
          alert3Image="/productPageImages/driveAlertIcons/collisionIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"
        />
      ),
    },

    {
      start: 0.594, // When the camera is high above the car
      end: 0.604,
      position: top,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[20rem]"
          className=""
          descriptionWidth="max-w-[20rem]"
          superScript="Every Angle Matters"
          title="Dual Camera Set-up"
          description="The VREC-Z820DC pairs a 4K front and HD rear camera to record both directions at once, delivering clearer evidence and wider coverage."
        />
      ),
    },
    {
      start: 0.755, // When the camera is high above the car
      end: 0.7952,
      position: top,
      content: (
        <TextDisplay
          titleMinWidth="min-w-[20rem]"
          className=""
          superScript="Comprehensive Coverage"
          title="137° Wide-Angle Lens"
          descriptionWidth="max-w-[20rem]"
          description="Gives you a broader view of the road, capturing side lanes, nearby traffic, and details that narrower lenses might miss"
        />
      ),
    },
    {
      start: 0.8785, // When the camera is high above the car
      end: 0.8916,
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
      start: 0.9750, // When the camera is high above the car
      end: 0.9987,
      position:
        "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[55%]",
      content: (
        <GpsLogger
          style="flex flex-col items-center sm:items-start justify-center sm:justify-center max-w-[20rem]"
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

function TextDisplay({
  superScript,
  title,
  description,
  descriptionWidth = "max-w-xl",
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
          "lg2:text-[56px] lg:text-[46px] leading-tight text-[24px]  lg2:min-w-max text-white text-center font-medium mt-2 ",
          titleMinWidth
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-[#ABABAB]/80 text-center lg:text-lg mx-auto mt-2 text-[12px] leading-snug",
          descriptionWidth
        )}
      >
        {description}
      </p>
    </div>
  );
}
