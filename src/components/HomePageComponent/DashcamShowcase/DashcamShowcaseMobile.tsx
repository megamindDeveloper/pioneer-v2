"use client";

import { Typography } from "@/components/CommonComponents/Typography/page";
import DashcamCardMobile from "./DashcamMobileShowCase";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function DashcamShowcaseMobile() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10px", once: false });

  // Individual refs for each card
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const inViewStates = cardRefs.map((ref) =>
    useInView(ref, { margin: "-40% 0px -40% 0px", once: false })
  );

  const models = [
    { model: "VREC-Z820DC", link: "/models/vrec-z820dc" },
    { model: "VREC-H520DC", link: "/models/vrec-h520dc" },
    { model: "VREC-H320SC", link: "/models/vrec-h320sc" },
    { model: "VREC-H120SC", link: "/models/vrec-h120sc" },
  ];

  // Find which card is active (in view)
  const activeIndex = inViewStates.findIndex((state) => state);

  return (
    <section className="relative min-h-screen py-12 md:px-4 md:mt-32 mt-0">
      <Typography
        variant="section-heading"
        className="!font-medium text-white text-center px-6"
      >
        Explore the Pioneer lineup built for real driving
      </Typography>

      {/* Grid container */}
      <div className="relative max-w-7xl xl:max-w-[90%] mx-auto h-auto md:h-[100vh]">
        {/* Vertical + Horizontal Lines */}
        <div className="pointer-events-none hidden md:absolute left-1/2 top-0 w-px h-full bg-white opacity-30 z-10 -translate-x-1/2" />
        <div className="pointer-events-none hidden md:absolute top-1/2 left-0 h-px w-full bg-white opacity-30 z-10 -translate-y-1/2" />

        {/* Cards Grid */}
        <div
          className="relative z-20 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-0 w-full h-full"
          ref={sectionRef}
        >
          <div ref={cardRefs[0]}>
            <DashcamCardMobile
              cardIndex={0}
              title="VREC-Z820DC"
              link="/models/vrec-z820dc"
              image="/modelImages/VREC-Z820DC/main.png"
              imageClassName="!w-[90%] mx-auto !h-60"
              description={`4K Flagship Dual Channel
      Dash Cam with Night Vision AI`}
              features={[
                "4K Resolution\nFront Camera",
                "Full HD\nRear Camera",
                "Intelligent\nNight Vision AI",
                "WDR & HDR\nRecording",
                "ADAS\nAlerts",
              ]}
              featureIcons={[
                "/homePageImages/dashboardShowcaseIcons/4kicon.svg",
                "/homePageImages/dashboardShowcaseIcons/fullHd.svg",
                "/homePageImages/dashboardShowcaseIcons/aivision.svg",
                "/homePageImages/dashboardShowcaseIcons/wdrhdr.svg",
                "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
              ]}
            />
          </div>
          <div ref={cardRefs[1]}>
            <DashcamCardMobile
              cardIndex={1}
              title="VREC-H520DC"
              link="/models/vrec-h520dc"
              image="/modelImages/VREC-H520DC/main.png"
              imageClassName="!w-[90%] mx-auto !h-56 mt-4"
              description={`2K Dual Channel Dash Cam with
      ADAS Alerts`}
              features={[
                "2K Quad HD\nFront Camera",
                "Full HD\nRear Camera",
                "Enhanced\nNight Vision",
                "HDR\nRecording",
                "ADAS\nAlerts",
              ]}
              featureIcons={[
                "/homePageImages/dashboardShowcaseIcons/2kicon.svg",
                "/homePageImages/dashboardShowcaseIcons/fullHd.svg",
                "/homePageImages/dashboardShowcaseIcons/enhanced.svg",
                "/homePageImages/dashboardShowcaseIcons/hdr.svg",
                "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
              ]}
            />
          </div>
          <div ref={cardRefs[2]}>
            <DashcamCardMobile
              cardIndex={2}
              title="VREC-H320SC"
              link="/models/vrec-h320sc"
              image="/modelImages/VREC-H320SC/main.png"
              imageClassName="!w-[80%] mx-auto !h-52 mt-4"
              description={`Full HD Dash Cam`}
              features={[
                "2 MP 1080P\nFront Camera",
                "WDR\nRecording",
                "In-built\nGPS Logger",
                "ADAS\nAlerts",
              ]}
              featureIcons={[
                "/homePageImages/dashboardShowcaseIcons/2kicon.svg",
                "/homePageImages/dashboardShowcaseIcons/wdr.svg",
                "/homePageImages/dashboardShowcaseIcons/inBuildGps.svg",
                "/homePageImages/dashboardShowcaseIcons/adasAlert.svg",
              ]}
            />
          </div>
          <div ref={cardRefs[3]}>
            <DashcamCardMobile
              cardIndex={3}
              title="VREC-H120SC"
              link="/models/vrec-h120sc"
              image="/modelImages/VREC-H120SC/main.png"
              imageClassName="!w-[50%] mx-auto !h-52 mt-4"
              description={`Ultra Compact 1.5K Dash Cam`}
              features={[
                "1.5K Resolution\nFront Camera",
                "Super\nCompact",
                "Emergency\nRecording",
                "Wide Field\nView",
                "In-built\nG-Sensor",
              ]}
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
      </div>

      {/* Floating CTA (like ProductDetails) */}
      <AnimatePresence>
        {activeIndex !== -1 && (
          <Link
            href={models[activeIndex].link}
            className="whitespace-nowrap w-fit"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed bottom-8 left-1/2 md:w-auto px-auto flex items-center gap-5 transform -translate-x-1/2 z-50 bg-[#262626] text-white font-medium pl-[24px] pr-4 py-[15px] rounded-full shadow-xl transition-all text-[12px] md:text-base lg:text-[14px] xl:text-[17px]"
            >
              Explore the {models[activeIndex].model} Now
              <svg
                width="30"
                height="30"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.1875"
                  y="0.317383"
                  width="42.6269"
                  height="42.4082"
                  rx="21.2041"
                  fill="#4F4C4C"
                />
                <path
                  d="M19.1875 26.7256L23.8145 21.5215L19.1875 16.3174"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </Link>
        )}
      </AnimatePresence>
    </section>
  );
}
