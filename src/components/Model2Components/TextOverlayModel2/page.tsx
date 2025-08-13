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
  bottom?:string;
  right?:string;
  left?: string;
  icon1?:string;
  icon2?:string;
  icon3?:string;
  width?:string;
  padding?:string;
  descPostion?:string
  
};

// This component handles the fade-in/fade-out logic for a single text block
function TextSection({ scrollProgress, start, end, title, subtitle, highlightedText, disclaimer,icon3,icon2,icon1, padding, width="300px", top = '0%', left = '0%',bottom="0%",right="0%",descPostion }: TextSectionProps) {
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
        bottom,
        right,
        width,
        transform: `translateY(-50%)`,
        transition: 'opacity 0.3s ease-out',
        
      }}
      className={`${padding}`}
    >
      <p className="mt-4 text-sm  text-center font-bold text-[#760000]">{highlightedText}</p>
      <h2 className="text-3xl  text-center font-bold text-white">{title}</h2>
      <p className={`mt-4 text-sm ${padding}  text-center text-[#7f7a7a]`}>{subtitle}</p>
      <p className={`mt-4 text-sm   text-center absolute ${descPostion} text-[#484848]`}>{disclaimer}</p>
    </div>
  );
}

// This is the main overlay component that holds all the sections
export default function TextOverlay({ scrollProgress }: { scrollProgress: number }) {
  // Define your text content and scroll ranges here
  const textSections = [
    {
      start: 0.0887, // When the camera is looking at the dashcam
      end: 0.1169,
      top: "62%",
      left: "29%",
      highlightedText: "2K Video Resolution",
      title: "AI Powerw23w2ed Night Vision",
      subtitle: " From morning commutes to late-night returns, the front camera records in sharp 2K while the rear captures in Full HD. Whether it’s a close call or a scenic stretch, you’ll have a clear, reliable record from both angles.",
     width:"600px"  ,
     padding:"px-6"
    },
    {
      start: 0.1774, // When the camera is high above the car
      end: 0.1972,
     top: "75%",
      left: "60%",
      highlightedText: "STARVIS 2 Sensor + HDR",
      title: "Sharp Vision in Every Frame",
     subtitle: "Equipped with Sony’s STARVIS 2 sensor and HDR processing, the VREC-H520DC delivers clear, balanced video with improved contrast and visibility, especially in challenging lighting.",
     width:"500px"  ,
     padding:"px-6"

    },
    {
      start: 0.2946, // When the camera is high above the car
      end: 0.3475,
      top: "55%",
      left: "10%",
      highlightedText: "Consistent Clarity in Any Light",
      title: "High Dynamic Range",
      subtitle: "HDR keeps exposure balanced so footage stays sharp and detailed whether you're driving under bright sunlight, through shadows or into low-light conditions.",
    width:"500px" , 
    padding:"px-8.5"
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
      start: 0.1975, // When the camera is high above the car
      end: 0.2374,
      top: "55%",
      left: "60%",
      highlightedText: "Automatic Event Recording",
      title: "Built-in G-Sensor",
      subtitle: "Stay protected with built-in G-sensor technology that automatically locks important footage during emergencies.",
   width:"550px"  ,
       padding:"px-8.5"

    },
    {
      width:"500px",
      start: 0.4147, // When the camera is high above the car
      end: 0.4513,
            top: "75%",
      left: "34%",
      highlightedText: "Clear Control with a Wider Screen",
      title: `3" IPS Display`,
      subtitle: "The built-in screen measures 7.6 cm across and offers a clear, responsive view for checking footage, adjusting settings or navigating menus without needing your phone.",
    },

    {
      width:"500px",
      start: 0.4515, // When the camera is high above the car
      end: 0.4836,
            top: "75%",
      left: "35%",
      highlightedText: "ADAS Enabled",
      title: "Smart Alerts for Safer Driving",
      subtitle: "Smart Alerts for Safer Driving Get audio alerts for lane departure, forward collision and stop-and-go alert so you stay aware of your surroundings and respond faster to sudden changes on the road.",
    },
    {
      width:"500px",
      start: 0.6489, // When the camera is high above the car
      end: 0.6569,
            top: "35%",
       left: "33%",
      highlightedText: "Dual Camera Setup",
      title: "Front and Rear in Focus",
      subtitle: "The VREC‑H520DC captures your journey from both ends with 2K clarity in front and Full HD behind, giving you balanced, high-quality footage wherever the road takes you.",
    },
    {
      width:"200%",
      descPostion:"top-[8%] w-[13%] left-[70%]",
      start: 0.7899, // When the camera is high above the car
      end: 0.8820,
            top: "65%",
      left: "-74%",
      highlightedText: "Wide Angle View",
      title: "140° Field of Vision",
      subtitle: "",
      disclaimer:" The lens captures more of what’s around you including lanes, nearby vehicles and surroundings so you get a complete view of every drive."    
    },
        {
          width:"350px",
          descPostion:"top-[90%] ",
      start: 0.9420, // When the camera is high above the car
      end: 0.9468,
            top: "58%",
      left: "18%",
      highlightedText: "Stay Secure While Parked",
      title: "Optional Parking Mode",
      subtitle: "Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery.",
       disclaimer:" *Disclaimer: Parking mode requires additional installation of an external Hardwire Kit, which enables power supply to the Dash Camera directly from the vehicle battery."    
    },
      {
        descPostion:"top-[90%] ",
        disclaimer:"Disclaimer: Route tracking is available only for footage downloaded to the user’s mobile device via the app. An active internet connection is required to display route details on the map.",
        width:"450px",
      start: 0.9835, // When the camera is high above the car
      end: 0.9999,
            top: "50%",
      left: "38%",
      highlightedText: "Every Trip Logged",
      title: "GPS Logger",
      subtitle: "Automatically record your driving routes with GPS logging, making it easy to revisit past trips whenever needed.",
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
          descPostion={section.descPostion}
          

        />
      ))}
    </div>
  );
}