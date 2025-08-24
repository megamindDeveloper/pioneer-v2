/// You can create a new file for this, e.g., TextOverlay.tsx

import React, { JSX } from "react";
import * as THREE from "three";
import ReactDOM from "react-dom";
import { cn } from "@/app/lib/utils";
import OptionalParking from "@/components/CommonComponents/TextComponents/OptionalParking";

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
      style={{
        position: "absolute",
        width,
        opacity,
        transition: "opacity 0.3s ease-out",
        pointerEvents: "none",
      }}
      className={position}
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
  const middle = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
  const bottom = "left-1/2 transform -translate-x-1/2 bottom-[60px]";
  const top = "top-[60px] left-[50%] transform -translate-x-1/2";
  const textSections = [
    {
      start: 0.0447, // When the camera is looking at the dashcam
      end: 0.0872,
      position: middle,
      content: (
        <TextDisplay
          superScript="Sharper Footage in Any Light"
          title="1.5K Recording with WDR"
          description="The VREC-H120SC captures clear, steady video in all kinds of light, combining 1.5K resolution with smart brightness control for better visibility day and night.(Resolution can be enabled through the ZenVue app.)"
        />
      ),
    },

    {
      start: 0.1946, // When the camera is high above the car
      end: 0.2127,
      position: bottom,
      content: (
        <TextDisplay
          superScript="Made to Fit Effortlessly"
          title="Compact By Design"
          description="With its streamlined design, the VREC-H120SC fits neatly behind your rear-view mirror, keeping your dash tidy while capturing the road ahead with clarity."
        />
      ),
    },
    {
      start: 0.325, // When the camera is high above the car
      end: 0.3494,
      position: bottom,
      content: (
        <TextDisplay
          superScript="A minimal build that delivers maximum road coverage"
          title="120° Field of View"
          description="Whether a bike cuts in from the side or something happens just outside your lane, this lens captures it. Designed to record the bigger picture without needing a bulky setup."
        />
      ),
    },

    {
      start: 0.536, // When the camera is high above the car
      end: 0.5561,
      position: bottom,
      content: (
        <TextDisplay
          superScript="Store More Footage with Ease"
          title="Supports up to 128GB microSD"
          description="Gives you the space to record and save more of your drives without worrying about running out of memory."
        />
      ),
    },
    {
      start: 0.7239, // When the camera is high above the car
      end: 0.7817,
      position: bottom,
      content: (
        <TextDisplay
          superScript="Automatic Event Recording"
          title="Built-in G-Sensor"
          description="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      ),
    },



    {
      start: 0.80, // When the camera is high above the car
      end: 0.8676,
      position: bottom,
      
      content: (
        <TextDisplay
          superScript="Stay Secure While Parked"
          title="Optional Parking Mode"
          description="When hardwired, the VREC‑H120SC stays on standby and begins recording the moment it detects an impact, giving you subtle protection even when you’re away."
          disclaimer="*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."
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
  disclaimer,
  descriptionWidth = "max-w-[22rem]",
  titleMinWidth = "min-w-[22rem]",
  className = "",
}: {
  superScript: string;
  title: string;
  description: string;
  disclaimer?: string;
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
      <p
        className={cn(
          "text-[#313131] text-xs  text-center lg:text-lg mx-auto mt-2 leading-snug",
          descriptionWidth
        )}
      >
        {disclaimer}
      </p>
    </div>
  );
}
