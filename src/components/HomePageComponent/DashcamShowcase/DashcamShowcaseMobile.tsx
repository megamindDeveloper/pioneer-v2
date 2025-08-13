"use client";

import { Typography } from "@/components/CommonComponents/Typography/page";
import DashcamCardMobile from "./DashcamMobileShowCase";
export default function DashcamShowcaseMobile() {
  // Memoize scale arrays

  return (
    <section className="relative min-h-screen py-12 md:px-4 md:mt-32 mt-0">
      <Typography variant="section-heading" className="!font-medium   text-white text-center mb-20 px-12">
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
          {" "}
          <DashcamCardMobile
            cardIndex={0}
            title="VREC-Z820DC"
            image="/modelImages/VREC-Z820DC/main.png"
            imageClassName="!w-[90%] mx-auto !h-60"
            description={`4K Flagship Dual Channel
      Dash Cam with Night Vision AI`}
            features={["4K Resolution\nFront Camera", "Full HD\nRear Camera", "Intelligent\nNight Vision AI", "WDR & HDR\nRecording", "ADAS\nAlerts"]}
            featureIcons={[
              "/homePageImages/dashboardShowcaseIcons/4kicon.svg",
              "/homePageImages/dashboardShowcaseIcons/fullHd.svg",
              "/homePageImages/dashboardShowcaseIcons/aivision.svg",
              "/homePageImages/dashboardShowcaseIcons/wdrhdr.svg",
              "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
            ]}
          />
          <DashcamCardMobile
            cardIndex={1}
            title="VREC-H520DC"
            image="/modelImages/VREC-H520DC/main.png"
            imageClassName=" !w-[90%] mx-auto !h-56  mt-4"
            description={`2K Dual Channel Dash Cam with
      ADAS Alerts`}
            features={["2K Quad HD\nFront Camera", "Full HD\nRear Camera", "Enhanced\nNight Vision", "HDR\nRecording", "ADAS\nAlerts"]}
            featureIcons={[
              "/homePageImages/dashboardShowcaseIcons/2kicon.svg",
              "/homePageImages/dashboardShowcaseIcons/fullHd.svg",
              "/homePageImages/dashboardShowcaseIcons/enhanced.svg",
              "/homePageImages/dashboardShowcaseIcons/hdr.svg",
              "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
            ]}
          />
          <DashcamCardMobile
            cardIndex={2}
            title="VREC-H320SC"
            description={`Full HD Dash Cam
      `}
            features={["2 MP 1080P\nFront Camera", "WDR\nRecording", "In-built\nGPS Logger", "ADAS\nAlerts"]}
            image="/modelImages/VREC-H320SC/main.png"
            imageClassName=" !w-[80%] mx-auto !h-52  mt-4"
            featureIcons={[
              "/homePageImages/dashboardShowcaseIcons/2kicon.svg",
              "/homePageImages/dashboardShowcaseIcons/wdr.svg",
              "/homePageImages/dashboardShowcaseIcons/inBuildGps.svg",
              "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
            ]}
          />
          <DashcamCardMobile
            cardIndex={3}
            title="VREC-H120SC"
            description={`Ultra Compact 1.5K Dash Cam`}
            features={["1.5K Resolution\nFront Camera", "Super\nCompact", "Emergency\nRecording", "Wide Field\nView", "In-built\nG-Sensor"]}
            image="/modelImages/VREC-H120SC/main.png"
            imageClassName=" !w-[50%] mx-auto !h-52 mt-4"
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
