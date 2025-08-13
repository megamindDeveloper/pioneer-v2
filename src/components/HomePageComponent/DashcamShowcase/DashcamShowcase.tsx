"use client";
import VRECZ820DC from "@/components/models/VRECZ820DC";
import VRECH520DC from "@/components/models/VRECH520DC";
import VRECH320SC from "@/components/models/VRECH320SC";
import DashcamCard from "./DashcamCard";
import VRECH120SC from "@/components/models/VRECH120SC";
import { useEffect, useMemo, useState } from "react";
import { useResponsiveScale } from "@/app/hooks/useResponsiveScale";
import { useResponsivePosition } from "@/app/hooks/useResponsivePosition";
import { Typography } from "@/components/CommonComponents/Typography/page";

export default function DashcamShowcase() {
  // Memoize scale arrays
  const scaleZ820DC = useResponsiveScale(
    useMemo(() => [0.6, 0.6, 0.6], []), // xl
    useMemo(() => [0.6, 0.6, 0.6], []), // lg2
    useMemo(() => [0.6, 0.6, 0.6], []), // lg
    useMemo(() => [0.4, 0.4, 0.4], []), // md
    useMemo(() => [0.35, 0.35, 0.35], []), // sm
    useMemo(() => [0.45, 0.5, 0.45], []) // xs
  );
  const hoveredScaleZ820DC = useResponsiveScale(
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0, 0.3, 0.3], [])
  );
  const positionZ820DC = useResponsivePosition(
    useMemo(() => [0, 0.9, 0], []),
    useMemo(() => [0, 0.9, 0], []),
    useMemo(() => [0, 0.9, 0], []),
    useMemo(() => [0, 0.9, 0], []),
    useMemo(() => [0, 0.9, 0], []),
    useMemo(() => [0, 0.9, 0], [])
  );
  const hoveredPositionZ820DC = useResponsivePosition(
    useMemo(() => [0.9, 0.6, 0], []),
    useMemo(() => [0.9, 0.6, 0], []),
    useMemo(() => [0.75, 0.5, 0], []),
    useMemo(() => [0.6, 0.4, 0], []),
    useMemo(() => [0.45, 0.3, 0], []),
    useMemo(() => [0.35, 0.25, 0], [])
  );

  const scaleH520DC = useResponsiveScale(
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0.6, 0.6, 0.6], [])
  );
  const hoveredScaleH520DC = scaleH520DC;
  const positionH520DC = useResponsivePosition(
    useMemo(() => [0, 0.5, 0], []),
    useMemo(() => [0, 0.5, 0], []),
    useMemo(() => [0, 0.5, 0], []),
    useMemo(() => [0, 0.5, 0], []),
    useMemo(() => [0, 0.5, 0], []),
    useMemo(() => [0, 0.5, 0], [])
  );
  const hoveredPositionH520DC = useResponsivePosition(
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], [])
  );

  const scaleH320SC = useResponsiveScale(
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0.3, 0.3, 0.3], []),
    useMemo(() => [0.55, 0.55, 0.55], [])
  );
  const positionH320SC = useResponsivePosition(
    useMemo(() => [0, 0.5, 0], []),
    useMemo(() => [0, 0.6, 0], []),
    useMemo(() => [0, 0.6, 0], []),
    useMemo(() => [0, 0.6, 0], []),
    useMemo(() => [0, 0.6, 0], []),
    useMemo(() => [0, 0.6, 0], [])
  );
  const hoveredPositionH320SC = useResponsivePosition(
    useMemo(() => [0.8, 0.5, 0], []),
    useMemo(() => [0.8, 0.6, 0], []),
    useMemo(() => [0.8, 0.6, 0], []),
    useMemo(() => [0.8, 0.6, 0], []),
    useMemo(() => [0.8, 0.6, 0], []),
    useMemo(() => [0.8, 0.6, 0], [])
  );

  const scaleH120SC = useResponsiveScale(
    useMemo(() => [0.7, 0.7, 0.7], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0.9, 0.9, 0.9], [])
  );
  const hoveredScaleH120SC = useResponsiveScale(
    useMemo(() => [0.7, 0.7, 0.7], []),
    useMemo(() => [0.85, 0.85, 0.85], []),
    useMemo(() => [0.7, 0.7, 0.7], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.45, 0.45, 0.45], [])
  );
  const positionH120SC = useResponsivePosition(
    useMemo(() => [0, 0.45, 0], []),
    useMemo(() => [0, 0.45, 0], []),
    useMemo(() => [0, 0.45, 0], []),
    useMemo(() => [0, 0.45, 0], []),
    useMemo(() => [0, 0.45, 0], []),
    useMemo(() => [0, 0.45, 0], [])
  );
  const hoveredPositionH120SC = useResponsivePosition(
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], []),
    useMemo(() => [0.8, 0.45, 0], [])
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg: <1024px
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="relative min-h-screen py-12 md:px-4 md:mt-32 mt-0">
      <Typography variant="section-heading" className="!font-medium   text-white text-center mb-20 ">
        Explore the Pioneer lineup built for real driving
      </Typography>

      {/* Grid container with relative positioning */}
      <div className="relative max-w-7xl xl:max-w-[90%] mx-auto h-auto md:h-[100vh]">
        {/* Vertical Line */}
        <div className="pointer-events-none hidden md:absolute left-1/2 top-0 w-px h-full bg-white opacity-30 z-10 -translate-x-1/2" />

        {/* Horizontal Line */}
        <div className="pointer-events-none hidden md:absolute top-1/2 left-0 h-px w-full bg-white opacity-30 z-10 -translate-y-1/2" />

        {/* Cards Grid */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-0 w-full h-full">
          <DashcamCard
            cardIndex={0}
            title="VREC-Z820DC"
            Component={<VRECZ820DC />}
            directionalLights={[
              {
                position: [-0.24, 3.295, 10.316],
                hoveredPosition: [-22.58, 8.959, 15.017],
                intensity: 1,
                hoveredIntensity: 5,
                color: "#ffffff",
              },
              {
                position: [2.07, 8.164, 16.117],
                hoveredPosition: [-1.916, 5.069, 20.8],
                intensity: 1.5,
                hoveredIntensity: 5,
                color: "#ffffff",
              },
            ]}
            cameraPosition={[0, 1, 5]}
            description={`4K Flagship Dual Channel
              Dash Cam with Night Vision AI`}
            features={["4K Resolution\nFront Camera", "Full HD\nRear Camera", "Intelligent\nNight Vision AI", "WDR & HDR\nRecording", "ADAS\nAlerts"]}
            defaultScale={scaleZ820DC}
            hoveredScale={hoveredScaleZ820DC}
            defaultPosition={[0, 0.9, 0]}
            hoveredPosition={[0.9, 0.9, 0]}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.95, 0]}
            featureIcons={[
              "/homePageImages/dashboardShowcaseIcons/4kicon.svg",
              "/homePageImages/dashboardShowcaseIcons/fullHd.svg",
              "/homePageImages/dashboardShowcaseIcons/aivision.svg",
              "/homePageImages/dashboardShowcaseIcons/wdrhdr.svg",
              "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
            ]}
          />
          <DashcamCard
            directionalLights={[
              {
                position: [-5.477, 20.381, 18.049],
                hoveredPosition: [-23.118, 10.792, 4.712],
                intensity: 1.5,
                hoveredIntensity: 4,
                color: "#ffffff",
              },
              {
                position: [-2.758, 12.887, 34.355],
                hoveredPosition: [-16.192, 10.811, 33.857],
                intensity: 1.5,
                hoveredIntensity: 4,
                color: "#ffffff",
              },
            ]}
            cardIndex={1}
            title="VREC-H520DC"
            Component={<VRECH520DC />}
            cameraPosition={[0, 1, 5]}
            description={`2K Dual Channel Dash Cam with
              ADAS Alerts`}
            features={["2K Quad HD\nFront Camera", "Full HD\nRear Camera", "Enhanced\nNight Vision", "HDR\nRecording", "ADAS\nAlerts"]}
            defaultScale={scaleH520DC}
            hoveredScale={hoveredScaleH520DC}
            defaultPosition={positionH520DC}
            hoveredPosition={hoveredPositionH520DC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={[
              "/homePageImages/dashboardShowcaseIcons/2kicon.svg",
              "/homePageImages/dashboardShowcaseIcons/fullHd.svg",
              "/homePageImages/dashboardShowcaseIcons/enhanced.svg",
              "/homePageImages/dashboardShowcaseIcons/hdr.svg",
              "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
            ]}
          />
          <DashcamCard
            directionalLights={[
              {
                position: [5.477, 20.372, 18.051],
                hoveredPosition: [-4.537, 9.827, 17.011],
                intensity: 4,
                hoveredIntensity: 4,
                color: "#ffffff",
              },
              {
                position: [-8.356, 18.164, 33.03],
                hoveredPosition: [-12.588, 6.504, 5.122],
                intensity: 10.5,
                hoveredIntensity: 5,
                color: "#ffffff",
              },
            ]}
            cardIndex={2}
            title="VREC-H320SC"
            Component={<VRECH320SC />}
            cameraPosition={[0, 1, 5]}
            description={`Full HD Dash Cam
              `}
            features={["2 MP 1080P\nFront Camera", "WDR\nRecording", "In-built\nGPS Logger", "ADAS\nAlerts"]}
            defaultScale={scaleH320SC}
            hoveredScale={scaleH320SC}
            defaultPosition={positionH320SC}
            hoveredPosition={hoveredPositionH320SC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={[
              "/homePageImages/dashboardShowcaseIcons/2kicon.svg",
              "/homePageImages/dashboardShowcaseIcons/wdr.svg",
              "/homePageImages/dashboardShowcaseIcons/inBuildGps.svg",
              "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
            ]}
          />
          <DashcamCard
            directionalLights={[
              {
                position: [-1.241, 8.582, 17.441],
                hoveredPosition: [-1.673, 5.556, 25.09],
                intensity: 4,
                hoveredIntensity: 8,
                color: "#ffffff",
              },
              {
                position: [5.477, 20.372, 18.051],
                hoveredPosition: [-1.84, 17.216, 1.162],
                intensity: 10.5,
                hoveredIntensity: 6,
                color: "#ffffff",
              },
            ]}
            cardIndex={3}
            title="VREC-H120SC"
            Component={<VRECH120SC />}
            cameraPosition={[0, 1, 5]}
            description={`Ultra Compact 1.5K Dash Cam`}
            features={["1.5K Resolution\nFront Camera", "Super\nCompact", "Emergency\nRecording", "Wide Field\nView", "In-built\nG-Sensor"]}
            defaultScale={scaleH120SC}
            hoveredScale={hoveredScaleH120SC}
            defaultPosition={positionH120SC}
            hoveredPosition={hoveredPositionH120SC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={[
              "/homePageImages/dashboardShowcaseIcons/1.5k.svg",
              "/homePageImages/dashboardShowcaseIcons/compact.svg",
              "/homePageImages/dashboardShowcaseIcons/emergency.svg",
              "/homePageImages/dashboardShowcaseIcons/wideView.svg",
              "/homePageImages/dashboardShowcaseIcons/inbuidSensor.svg",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
