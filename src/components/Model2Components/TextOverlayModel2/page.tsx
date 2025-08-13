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
  disclaimer?:string;
  top?: string;
  left?: string;
  icon1?:string;
  icon2?:string;
  icon3?:string;
  width?:string;
  padding?:string;
  
};

// This component handles the fade-in/fade-out logic for a single text block
function TextSection({ scrollProgress, start, end, title, subtitle, highlightedText, disclaimer,icon3,icon2,icon1, padding, width="300px", top = '50%', left = '12%' }: TextSectionProps) {
  // Define a fade margin (e.g., 20% of the section's duration)
  const fadeDuration = (end - start) * 0.2;
  const fadeInEnd = start + fadeDuration;
  const fadeOutStart = end - fadeDuration;

  let opacity = 0;

  if (scrollProgress >= start && scrollProgress <= end) {
    if (scrollProgress < fadeInEnd) {
      // Fade In
      opacity = THREE.MathUtils.mapLinear(scrollProgress, start, fadeInEnd, 0, 1);
    } else if (scrollProgress > fadeOutStart) {
      // Fade Out
      opacity = THREE.MathUtils.mapLinear(scrollProgress, fadeOutStart, end, 1, 0);
    } else {
      // Fully visible
      opacity = 1;
    }
  }

  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        top, // Position the text block
        left,
        width,
        transform: `translateY(-50%)`,
        transition: 'opacity 0.3s ease-out',
        
      }}
      className={`${padding}`}
    >
      <p className="mt-4 text-sm  text-center font-bold text-[#760000]">{highlightedText}</p>
      <h2 className="text-3xl  text-center font-bold text-white">{title}</h2>
      <p className={`mt-4 text-sm ${padding}  text-center text-[#7f7a7a]`}>{subtitle}</p>
      <p className={`mt-4 text-sm   text-center absolute top-135 text-[#484848]`}>{disclaimer}</p>
    </div>
  );
}

// This is the main overlay component that holds all the sections
export default function TextOverlay({ scrollProgress }: { scrollProgress: number }) {
  // Define your text content and scroll ranges here
  const textSections = [
    {
      start: 0.0685, // When the camera is looking at the dashcam
      end: 0.0870,
      top: "50%",
      left: "0%",
      highlightedText: "Sharp Footage in Low Light",
      title: "AI Powered Night Vision",
      subtitle: "An 8MP sensor that captures sharp, detailed video with high sensitivity, preserving image quality even during night drives and low-light conditions.",
     width:"400px"  ,
     padding:"px-6"
    },
    {
      start: 0.1168, // When the camera is high above the car
      end: 0.1509,
      top: "53%",
      left: "0%",
      highlightedText: "Details Stay Intact",
      title: "4K Video Resolution",
     subtitle: "The VREC-Z820DC records in true 4K, producing sharp video that makes plates, signs, and unexpected moments easy to identify when needed.",
     width:"400px"  ,
     padding:"px-6"

    },
    {
      start: 0.2468, // When the camera is high above the car
      end: 0.2958,
      top: "82%",
      left: "-13%",
      highlightedText: "Clarity That Goes Further",
      title: "High-Performance Imaging",
      subtitle: "The VREC-Z820DC uses a Sony STARVIS IMX415 sensor, an f/1.8 aperture, and a 7-layer glass lens. Together, they capture sharp, bright footage with accurate detail even in low or uneven lighting.",
    width:"500px" , 
    padding:"px-8.5"
    },
    {
      start: 0.3506, // When the camera is high above the car
      end: 0.3867,
      top: "82%",
      left: "6%",
      highlightedText: "Sharp On-Screen Clarity",
      title: '3.2" IPS Display',
      subtitle: "The 8.1 cm built-in screen lets you review footage and adjust settings with sharp detail, all without taking up space on your dash.",
   width:"350px"  
    },
    {
      start: 0.4387, // When the camera is high above the car
      end: 0.4678,
      top: "82%",
      left: "12%",
      highlightedText: "Adapts to Any Light",
      title: "WDR & HDR Recording",
      subtitle: "It adjusts exposure in real time, preserving visibility and fine detail, so footage stays clear in both bright and low-light conditions.",
   width:"550px"  ,
       padding:"px-8.5"

    },
    {
      start: 0.4635, // When the camera is high above the car
      end: 0.5301,
            top: "65%",
      left: "12%",
      highlightedText: "Built to Notice Before You Do",
      title: "Advanced Driving Alerts",
      subtitle: "The VREC-Z820DC monitors lane position, vehicle distance, and traffic flow to deliver timely alerts and help you stay in control.",
    },

    {
      start: 0.7229, // When the camera is high above the car
      end: 0.7652,
            top: "32%",
      left: "12%",
      highlightedText: "Every Angle Matters",
      title: "Dual Camera Set-up",
      subtitle: "The VREC-Z820DC pairs a 4K front and HD rear camera to record both directions at once, delivering clearer evidence and wider coverage.",
    },
    {
      start: 0.8692, // When the camera is high above the car
      end: 0.8909,
            top: "20%",
      left: "12%",
      highlightedText: "Comprehensive Coverage",
      title: "137° Wide-Angle Lens",
      subtitle: "Gives you a broader view of the road, capturing side lanes, nearby traffic, and details that narrower lenses might miss.",
    },
    {
      start: 0.9067, // When the camera is high above the car
      end: 0.9599,
            top: "22%",
      left: "12%",
      highlightedText: "Parked, Not Unwatched",
      title: "Parking Mode",
      subtitle: "The VREC-Z820DC stays active even when parked, recording any motion or impact to help keep your vehicle secure at all times.",
      disclaimer:" This feature is available only with additional setup and components, sold separately."    
    },
        {
      start: 0.9600, // When the camera is high above the car
      end: 0.9999,
            top: "62%",
      left: "12%",
      highlightedText: "Every Trip Logged",
      title: "Built-in GPS",
      subtitle: "Accurate location and speed data are added to every video so you know exactly where and how incidents happened.",
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

        />
      ))}
    </div>
  );
}