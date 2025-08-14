/// You can create a new file for this, e.g., TextOverlay.tsx

import React from "react";
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
  left?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
  icon4?: string;
  width?: string;
  padding?: string;
  centerPadding?:string
  disclaimercss?:string
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
  disclaimercss,
  centerPadding="0px",
  layoutType = "absolute" // default
}: TextSectionProps & { layoutType?: "absolute" | "center" }) {

  const fadeDuration = (end - start) * 0.2;
  const fadeInEnd = start + fadeDuration;
  const fadeOutStart = end - fadeDuration;
  let opacity = 0;

  if (scrollProgress >= start && scrollProgress <= end) {
    if (scrollProgress < fadeInEnd) {
      opacity = THREE.MathUtils.mapLinear(scrollProgress, start, fadeInEnd, 0, 1);
    } else if (scrollProgress > fadeOutStart) {
      opacity = THREE.MathUtils.mapLinear(scrollProgress, fadeOutStart, end, 1, 0);
    } else {
      opacity = 1;
    }
  }

  const isSpecialSection = start === 0.4635 && end === 0.5301;

  return (
    <div
      style={{
        opacity,
        ...(layoutType === "absolute"
          ? {
              position: "absolute",
              top,
              left,
              width,
              transform: `translateY(-50%)`
            }
          : {
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection:"column",
              justifyContent: "center",
              alignItems: "center",
              paddingRight:centerPadding,
              paddingLeft:centerPadding
            }),
        transition: "opacity 0.3s ease-out"
      }}
      className={`${padding}`}
    >
      {isSpecialSection ? (
        /* Special Layout */
        <div className="flex flex-col items-center px-6 text-white">
          <div className="animate-fastpulse mb-23 mt-11">
            <img src={icon4} alt="Warning Icon" className="w-[60px] h-[60px]" />
          </div>
          <p className="text-sm tracking-wide font-bold text-[#AD2239] mb-2">{highlightedText}</p>
          <h2 className="text-[28px] leading-tight text-center font-bold text-white mb-3">{title}</h2>
          <p className="text-sm max-w-[320px] text-center text-[#7f7a7a] mb-1">{subtitle}</p>
          <div className="flex gap-[50px]">
            <div className="flex flex-col items-center">
              <img src={icon1} alt="Lane Departure" className="w-[40px] h-[40px] mb-2" />
              <span className="text-[12px] text-center">Lane Departure Alert</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={icon2} alt="Forward Collision" className="w-[40px] h-[40px] mb-2" />
              <span className="text-[12px] text-center">Forward Collision Alert</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={icon3} alt="Stop & Go" className="w-[40px] h-[40px] mb-2" />
              <span className="text-[12px] text-center">Stop & Go Alert</span>
            </div>
          </div>
        </div>
      ) : (
        /* Default Layout */
        <>
          <p className="mt-4 text-sm text-center font-bold text-[#AD2239]">{highlightedText}</p>
          <h2 className="text-[26px] text-center font-bold text-white">{title}</h2>
          <p className={`mt-4 text-sm ${padding} text-center text-[#7f7a7a]`}>{subtitle}</p>
          {disclaimer && (
            <p className={`mt-4 text-sm text-center absolute ${disclaimercss} text-[#484848]  `}>{disclaimer}</p>
          )}
        </>
      )}
    </div>
  );
}



// This is the main overlay component that holds all the sections
export default function TextOverlay({ scrollProgress }: { scrollProgress: number }) {
  // Define your text content and scroll ranges here
  const textSections = [
    {
      width:"10px",
      start: 0.0887, // When the camera is looking at the dashcam
      end: 0.1209,
      top: "50%",
      left: "0%",
      centerPadding:"460px",
      highlightedText: "Sharper Footage in Any Light",
      title: "1.5K Recording with WDR",
      subtitle:
        "The VREC-H120SC captures clear, steady video in all kinds of light, combining 1.5K resolution with smart brightness control for better visibility day and night.(Resolution can be enabled through the ZenVue app.)",
     
      padding: "px-3",
         layoutType: "center" as const,
         
    },
    {
      start: 0.4555, // When the camera is high above the car
      end: 0.4918,
      top: "50%",
      left: "60%",
      highlightedText: "Made to Fit Effortlessly",
      title: "Compact By Design",
      subtitle:
        "With its streamlined design, the VREC-H120SC fits neatly behind your rear-view mirror, keeping your dash tidy while capturing the road ahead with clarity.",
      width: "450px",
      padding: "px-3",
    },
    {
      start: 0.6208, // When the camera is high above the car
      end: 0.6410,
      top: "50%",
      left: "55%",
      highlightedText: "A minimal build that delivers maximum road coverage",
      title: `120° Field of View`,
      subtitle:
        "Whether a bike cuts in from the side or something happens just outside your lane, this lens captures it. Designed to record the bigger picture without needing a bulky setup.",
      width: "500px",
      padding: "px-3",
    },
    {
      start: 0.7740, // When the camera is high above the car
      end: 0.7942,
      top: "40%",
      left: "10%",
      highlightedText: "Store More Footage with Ease",
      title: 'Supports up to 128GB microSD',
      subtitle: "Gives you the space to record and save more of your drives without worrying about running out of memory.",
      width: "400px",
      padding: "px-3",
    },
    {
      start: 0.8909, // When the camera is high above the car
      end: 0.8990,
      top: "75%",
      left: "33%",
      highlightedText: "Automatic Event Recording",
      title: "Built-in G-Sensor",
      subtitle:
        "Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies.",
      width: "500px",
      padding: "px-3",
    },
    {
      start: 0.9796, // When the camera is high above the car
      end: 0.9900,
      top: "34%",
      left: "64%",
      highlightedText: "Stay Secure While Parked",
      title: "Optional Parking Mode",
      subtitle: "When hardwired, the VREC‑H120SC stays on standby and begins recording the moment it detects an impact, giving you subtle protection even when you’re away.",
      icon1: "/productPageImages/driveAlertIcons/laneIcon.svg",
      icon2: "/productPageImages/driveAlertIcons/stopnGoIcon.svg",
      icon3: "/productPageImages/driveAlertIcons/collisionIcon.svg",
      icon4: "/productPageImages/driveAlertIcons/dangerIcon.svg",
      width: "500px",
      disclaimer:"*Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery.",
      padding:"px-3",
      disclaimercss:"top-[240%] "
    },


    // Add as many sections as you need
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 40, // Ensure it's above the canvas but below any top-level UI
        pointerEvents: "none", // Allows clicking/scrolling "through" the overlay
      }}
    >
      {textSections.map((section, index) => (
        <TextSection
          key={index}
          scrollProgress={scrollProgress}
          start={section.start}
          end={section.end}
          highlightedText={section.highlightedText}
          title={section.title}
          subtitle={section.subtitle}
          disclaimer={section.disclaimer}
          top={section.top}
          left={section.left}
          width={section.width}
          padding={section.padding}
          icon1={section.icon1}
          icon2={section.icon2}
          icon3={section.icon3}
          icon4={section.icon4}
          layoutType={section.layoutType} 
          centerPadding={section.centerPadding}
          disclaimercss={section.disclaimercss}
        />
      ))}
    </div>
  );
}
