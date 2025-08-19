/// You can create a new file for this, e.g., TextOverlay.tsx

import { cn } from "@/app/lib/utils";
import DriveAlertH320 from "@/components/CommonComponents/TextComponents/DriveAlertH320";
import FieldOfVision from "@/components/CommonComponents/TextComponents/FieldOfVision";
import GpsLogger from "@/components/CommonComponents/TextComponents/GpsLogger";
import OptionalParking from "@/components/CommonComponents/TextComponents/OptionalParking";
import ReactDOM from "react-dom";
import * as THREE from "three";
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
  position?: string;
};
// Section renderer with fade logic
function OverlaySection({
  scrollProgress,
  start,
  end,
  position,
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
      className={position}
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
export default function Model3textOverlay({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  // Define your text content and scroll ranges here
  const middle = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
  const textSections = [
    {
      start: 0.032, // When the camera is looking at the dashcam
      end: 0.06,
      position:
        "top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-[10%]",
      content: (
        <TextDisplay
          superScript="Precision in Motion"
          title="Full HD Recording"
          description=" The front camera records in crisp 1080p, giving you sharp visuals for everyday drives, traffic incidents or unexpected moments."
        />
      ),
    },
    // {
    //   start: 0.122, // When the camera is high above the car
    //   end: 0.157,
    //   top: "30%",
    //   left: "70%",
    //   content: (
    //     <SharpVision
    //       highlightedText="Automatic Event Recording"
    //       heading="Sharp Vision in Every Frame"
    //       subheading="Equipped with Sony’s STARVIS 2 sensor, the VREC-H520DC delivers clear, balanced video with improved contrast and visibility, especially in challenging lighting."
    //     />
    //   ),
    // },
    {
      start: 0.1397, // When the camera is high above the car
      end: 0.185,
      position:
        "top-1/2 transform -translate-y-1/2 right-[60px] lg:right-[120px] xl:right-[220px]",

      content: (
        <TextDisplay
          superScript="Automatic Event Recording"
          title="Built-in G-Sensor"
          description="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      ),
    },
    {
      start: 0.2, // When the camera is high above the car
      end: 0.2377,
      position:
        "top-1/2 left-[20px] lg:left-[40px] lg2:left-[100px] xl:left-[128px] transform  -translate-y-1/2",
      content: (
        <TextDisplay
          superScript="Clear View at a Glance"
          title="3″ IPS Display"
          description="The 7.6 cm screen lets you review footage, adjust settings, and see live video clearly right from the dash without needing your phone."
        />
      ),
    },
    {
      start: 0.2971, // When the camera is high above the car
      end: 0.3187,
      position: "bottom-[70px] left-1/2 transform -translate-x-1/2 ",
      content: (
        <TextDisplay
          superScript="Clarity in Changing Light"
          title="Wide Dynamic Range (WDR)"
          description="From tunnels to tree cover, WDR balances bright and dark areas in real time so your footage stays detailed and easy to review."
        />
      ),
    },
    // {
    //   start: 0.373, // When the camera is high above the car
    //   end: 0.3875,
    //   top: "80%",
    //   left: "50%",
    //   content: (
    //     <>
    //       <p className="text-[#AD2239] text-xl font-bold text-center">
    //         Clear Control with a Wider Screen
    //       </p>
    //       <h2 className="lg:text-[32px] lg2:text-[50px] text-white text-center font-medium">
    //         3" IPS Display
    //       </h2>
    //       <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
    //         The built-in screen measures 7.6 cm across and offers a clear,
    //         responsive view for checking footage, adjusting settings or
    //         navigating menus without needing your phone.
    //       </p>
    //     </>
    //   ),
    // },

    {
      position: middle,
      content: (
        <DriveAlertH320
          highlightedText="Timely Warnings When It Matters"
          heading="ADAS Alerts"
          subheading="Get audio cues for lane departure and forward collision so you can stay aware, avoid surprises and respond faster on busy roads."
          alert1Image="/productPageImages/driveAlertIcons/laneIcon.svg"
          alert2Image="/productPageImages/driveAlertIcons/stopnGoIcon.svg"
          alert3Image="/productPageImages/driveAlertIcons/collisionIcon.svg"
          alert1="Lane Departure Alert"
          alert2="Forward Collision Alert"
          alert3="Stop & Go Alert"
          model="model3"
        />
      ),
      start: 0.333, // When the camera is high above the car
      end: 0.3776,
    },
    // {
    //   start: 0.624, // When the camera is high above the car
    //   end: 0.6569,
    //   top: "15%",
    //   left: "50%",
    //   content: (
    //     <>
    //       <p className="text-[#AD2239] text-xl font-bold text-center">
    //         Dual Camera Setup
    //       </p>
    //       <h2 className="lg2:text-[56px] text-[32px] text-white text-center font-medium">
    //         Front and Rear in Focus
    //       </h2>
    //       <p className="text-pretty text-[#ABABAB] text-center max-w-xl mx-auto">
    //         The VREC‑H520DC captures your journey from both ends with 2K clarity
    //         in front and Full HD behind, giving you balanced, high-quality
    //         footage wherever the road takes you.
    //       </p>
    //     </>
    //   ),
    // },
    {
      start: 0.7062, // When the camera is high above the car
      end: 0.8422,
      position: middle,
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
      start: 0.9238, // When the camera is high above the car
      end: 0.9354,
      top: "50%",
      left: "20%",
      position:
        "top-[50%] left-[40px] lg2:left-[80px] transform  -translate-y-[55%]",
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
      start: 0.9542, // When the camera is high above the car
      end: 0.9929,
      position: middle,
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
          top={sec.top}
          left={sec.left}
          width={sec.width}
          position={sec.position}
          content={sec.content}
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
    <div className={cn("text-center", className)}>
      <p className="text-[#AD2239] font-bold text-sm sm:text-base md:text-lg ">
        {superScript}
      </p>
      <h2
        className={cn(
          "lg2:text-[56px] lg:text-[46px] leading-tight text-[32px] min-w-lg lg2:min-w-max text-white text-center font-medium mt-2",
          titleMinWidth
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-[#ABABAB]/80 text-center lg:text-lg mx-auto mt-2 leading-snug",
          descriptionWidth
        )}
      >
        {description}
      </p>
    </div>
  );
}
