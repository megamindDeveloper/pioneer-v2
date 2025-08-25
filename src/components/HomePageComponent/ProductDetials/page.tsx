"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkBanner from "@/components/CommonComponents/DarkBanner/DarkBanner";
import { OverlayCard } from "@/components/CommonComponents/OverlayCard/OverlayCard";
import { SideImageCard } from "@/components/CommonComponents/SideImageCard/SideImageCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";

import model1Image1 from "../../../../public/homePageImages/productDetailsImage/z820dcImages/image4.webp";
import model1Image2 from "../../../../public/homePageImages/productDetailsImage/h520dcImages/image1.webp";
import model1Image3 from "../../../../public/homePageImages/productDetailsImage/h320scImages/image1.webp";
import model1Image4 from "../../../../public/homePageImages/productDetailsImage/h120scImages/image1.webp";
import Link from "next/link";
import { Typography } from "@/components/CommonComponents/Typography/page";
gsap.registerPlugin(ScrollTrigger);
type Tab = {
  id: string;
  label: string;
  model?: string;
};

const tabs: Tab[] = [
  { id: "capture", label: "Power Users", model: "VREC-Z820DC" },
  { id: "display", label: "Experienced Users", model: "VREC-H520DC" },
  { id: "gps", label: "Practical Users", model: "VREC-H320SC" },
  { id: "compact", label: "First-Time Users", model: "VREC-H120SC" },
];

const contentMap = {
  capture: {
    banner: {
      title: "Hard to see on unlit roads?",
      description: `Ever missed something on a dark road or under harsh headlights?\nThe AI night vision picks up details clearly, even in low light or \nrainy evening drives.`,
      imageSrc: model1Image1,
      buttonLabel: "Learn More",
      buttonLink: "/models/vrec-z820dc",
      imageWidth: 700,
      imagePositionClass: "bottom-0 left-[45%]",
      imageClassName: "w-[60%] md:w-[100%] xl:w-[87%]",
    },
    overlay: {
      image: "/homePageImages/productDetailsImage/z820dcImages/image3.webp",
      mobileImage: "/homePageImages/productDetailsImage/z820dcImages/820.webp",
      title: `Blurry when \nspeeding?`,
      description: `Frustrated with blurry footage\nwhen it matters most?\nThis one records in true 4K, so\nnumber plates and road signs\nstay sharp, even when you're\ndriving fast.`,
    },
    sideCard: {
      image: "/homePageImages/productDetailsImage/z820dcImages/image3.png",
      title: `Glare ruining\nyour footage?`,
      description: `City lights, tunnels and glare can mess with\n footage. The STARVIS sensor handles all\n that smoothly, so your video always comes\n out clear.`,
    },
  },
  display: {
    banner: {
      title: `Struggling to catch fine \ndetails on the road?`,
      description: `Records in crisp 2K with HDR and ideal for\n capturing fine details like plates and street signs.`,
      imageSrc: model1Image2,
      buttonLabel: "Explore",
      buttonLink: "/models/vrec-h520dc",
      imagePositionClass: "bottom-0 left-[42%]",
      imageClassName: "md:w-[100%] xl:w-[87%]",
    },
    overlay: {
      image: "/homePageImages/productDetailsImage/h520dcImages/image2.png",
      title: `Feel like you're not\n seeing enough?`,
      mobileImage: "/homePageImages/productDetailsImage/z820dcImages/820.webp",
      description: `A wider field of vision paired with a \nlarge screen makes it easy to see\n  more of everydrive.`,
    },
    sideCard: {
      image: "/homePageImages/productDetailsImage/h520dcImages/image3.png",
      title: `Can’t trust\n your cam after\n sunset?`,
      description: `Enhanced night vision with\n STARVIS 2 delivers clear\n footage even in low-light \nconditions.`,
    },
  },
  gps: {
    banner: {
      title: `Worried about missing \nthings in traffic?`,
      description: `ADAS alerts help you stay on track and aware of\n surroundings in city traffic or highways.`,
      imageSrc: model1Image3,
      buttonLabel: "See How",
      buttonLink: "/models/vrec-h320sc",
      imagePositionClass: "bottom-0 left-[42%]",
      imageClassName: "md:w-[100%] xl:w-[87%]",
    },
    overlay: {
      image: "/homePageImages/productDetailsImage/h320scImages/image2.png",
      title: `Dealing with\n sudden light\n changes while\n driving?`,
      description: `WDR automatically adjusts\n exposure in tunnels, shadows\n and bright sunlight.`,
      mobileImage: "/homePageImages/productDetailsImage/z820dcImages/820.webp",
    },
    sideCard: {
      image: "/homePageImages/productDetailsImage/h320scImages/image3.png",
      title: "Find tiny \n screens\n frustrating?",
      description: `The large display makes it easier to view\n footage and tweak settings without the\n squint.`,
    },
  },
  compact: {
    banner: {
      title: `Hate the bulky setups\n on your dash?`,
      description: `A sleek, minimal design that doesn’t take up\n space, perfect for discreet installs.`,
      imageSrc: model1Image4,
      buttonLabel: "Check It Out",
      buttonLink: "/models/vrec-h120sc",
      imagePositionClass: "bottom-0 left-[40%]",
      imageClassName: "md:w-[90%] xl:w-[77%]",
    },
    overlay: {
      image: "/homePageImages/productDetailsImage/h120scImages/0057 3 (3).png",
      title: `Not a tech \nperson?`,
      description: `Quick setup and app-based \ncontrol make it beginner-friendly \nfrom day one.`,
      imageClassName: "w-[100%]  h-[100%] mt-2",
    },
    sideCard: {
      image: "/homePageImages/productDetailsImage/h120scImages/image3.png",
      title: "Ever wish your \n footage looked\n sharper?",
      description: `1.5K recording gives you \nsharper footage without the bulk\n of bigger cams.`,
      imageClassName: "w-[90%]  h-[80%]",
    },
  },
};

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState("capture");
  const currentContent = contentMap[activeTab as keyof typeof contentMap];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10px", once: false });

  return (
    <section className="relative  min-h-screen py-12 md:px-4 text-white max-w-[90%] xl:max-w-[90%] md:mt-20  mx-auto">
      <Typography
        variant="section-heading"
        className="!font-medium  text-center text-white px-12 md:px-8"
      >
        What Matters Most When You Drive?
      </Typography>
      <Typography
        variant="section-body"
        className="text-[#ABABAB] lg:pt-[0.8em] xl:pt-0 text-center !font-normal mb-10"
      >
        Choose features for your drive
      </Typography>

      {/* Tabs */}
      <div className="max-w-7xl xl:max-w-[90%] w-full mx-auto mb-10 xl:mt-12">
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 items-center justify-between">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`md:px-6 py-4 font-medium transition-colors duration-300 border-b-2 border-transparent cursor-pointer relative ${
                activeTab === tab.id ? "text-white" : "text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center relative z-10">
                <div className="md:block hidden  font-bold">
                  {" "}
                  <Typography variant="slider-heading">{tab.label}</Typography>
                </div>
                <div
                  className={`md:hidden block text-[12px] px-2 text-center font-bold ${
                    activeTab === tab.id ? "text-white" : "text-[#ABABAB]/80"
                  }`}
                >
                  {tab.model}
                </div>

                <AnimatePresence mode="wait">
                  {tab.model && activeTab === tab.id && (
                    <motion.div
                      key="model"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-sm text-[#ABABAB]/80 xl:mt-1 mt-2 hidden md:block"
                    >
                      {tab.model}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Animated underline */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    duration: 0.4,
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="relative mx-auto ">
        <div ref={sectionRef}>
          <AnimatePresence mode="wait">
            <DarkBanner {...currentContent.banner} />
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {(() => {
            const currentModel = tabs.find((t) => t.id === activeTab)?.model;

            if (currentModel === "VREC-H520DC") {
              return (
                <>
                  <SideImageCard {...currentContent.sideCard} />
                  <OverlayCard {...currentContent.overlay} />
                </>
              );
            } else if (currentModel === "VREC-H120SC") {
              return (
                <>
                  <SideImageCard {...currentContent.overlay} />
                  <SideImageCard {...currentContent.sideCard} />
                </>
              );
            }

            return (
              <>
                <OverlayCard {...currentContent.overlay} />
                <SideImageCard {...currentContent.sideCard} />
              </>
            );
          })()}
        </div>
      </div>
      <AnimatePresence>
        {isInView && (
          <Link
            href={currentContent.banner.buttonLink}
            className="whitespace-nowrap w-fit"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed bottom-8 left-1/2 md:w-auto px-auto  flex items-center gap-5 transform -translate-x-1/2 z-50 bg-[#262626] text-white font-medium pl-[24px] pr-4 py-[15px] rounded-full shadow-xl  transition-all text-[12px] md:text-base lg:text-[14px] xl:text-[17px]"
            >
              Explore the {tabs.find((t) => t.id === activeTab)?.model} Now{" "}
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
