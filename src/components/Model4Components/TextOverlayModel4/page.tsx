/// You can create a new file for this, e.g., TextOverlay.tsx

import { cn } from "@/app/lib/utils";
import { style } from "framer-motion/client";
import React, { JSX } from "react";
import * as THREE from "three";
import ReactDOM from "react-dom";
import OptionalParking from "@/components/CommonComponents/TextComponents/OptionalParking";
import { Typography } from "@/components/CommonComponents/Typography/page";

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
export default function TextOverlay({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  // Define your text content and scroll ranges here
  const middle = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
  const textSections = [
    {
      start: 0.0458, // When the camera is looking at the dashcam
      end: 0.1209,
      position: middle,
      content: (
        <TextDisplay
          superScript="Sharper Footage in Any Light "
          title="1.5K Recording with WDR"
          description="The VREC-H120SC captures clear, steady video in all kinds of light, combining 1.5K resolution with smart brightness control for better visibility day and night.(Resolution can be enabled through the ZenVue app.)"
        />
      ),
    },
    {
      start: 0.35, // When the camera is high above the car
      end: 0.4918,
      position:
        "top-1/2 transform -translate-y-1/2 right-[60px] lg:right-[120px] xl:right-[220px]",
      content: (
        <TextDisplay
          superScript="Made to Fit Effortlessly"
          title="Compact By Design"
          description="With its streamlined design, the VREC-H120SC fits neatly behind your rear-view mirror, keeping your dash tidy while capturing the road ahead with clarity."
        />
      ),
      padding: "px-3",
      style: "w-xl",
    },
    {
      start: 0.5865, // When the camera is high above the car
      end: 0.6895,
      position:
        "top-1/2 transform -translate-y-1/2 right-[60px] lg:right-[120px] xl:right-[220px]",
      content: (
        <TextDisplay
          superScript="A minimal build that delivers maximum road coverage"
          title={`120° Field of View`}
          description={
            "Whether a bike cuts in from the side or something happens just outside your lane, this lens captures it. Designed to record the bigger picture without needing a bulky setup."
          }
        />
      ),
      width: "500px",
      padding: "px-3",
    },
    {
<<<<<<< HEAD
      start: 0.781, // When the camera is high above the car
      end: 0.801,
=======
      start: 0.78, // When the camera is high above the car
      end: 0.8104,
>>>>>>> main
      position:
        "top-1/2 left-[20px] lg:left-[40px] lg2:left-[100px] xl:left-[128px] transform -translate-y-1/2",
      content: (
        <TextDisplay
          titleMinWidth="w-[20rem] lg:w-[25rem] lg2:w-[34rem] mx-auto"
          superScript="Store More Footage with Ease"
          title="Supports up to 128GB microSD"
          description="Gives you the space to record and save more of your drives without worrying about running out of memory."
        />
      ),
    },
    {
      start: 0.8909, // When the camera is high above the car
      end: 0.9033,
      position: "bottom-[70px] left-1/2 transform -translate-x-1/2 ",
      content: (
        <TextDisplay
          superScript="Automatic Event Recording"
          title="Built-in G-Sensor"
          description="Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies."
        />
      ),
    },
    {
      start: 0.968, // When the camera is high above the car
      end: 0.9932,
      position:
        "top-[50%] right-[40px] lg2:right-[180px] transform  -translate-y-[55%]",
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
  titleMinWidth = "min-w-lg lg2:min-w-max",
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
       <Typography variant="slider-heading" className="text-[#AD2239]  font-bold">
        {superScript}
      </Typography>
      <Typography variant="section-heading" className={cn("font-medium  text-center text-white px-12 md:px-8", titleMinWidth)}>
        {title}
      </Typography>
      <Typography variant="section-card-body" className={cn(" text-[#ABABAB]/80 mx-auto", descriptionWidth)}>
        {description}
      </Typography>
    </div>
  );
}
