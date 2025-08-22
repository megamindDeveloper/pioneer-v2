"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { SparklesCore } from "./Sparkles";
import { IconDotsVertical } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

type tabDataProps = {
  heading: string;
  subheading: string;
  compareHeading: string;
  compareSubheading: string;
  tabtitle: string;
  image1: string;
  image2: string;
  product?: string;
  compare?: true;
  beforeImageText?: string;
  afterImageText?: string;
};

export const Compare = ({ tabs }: { tabs: tabDataProps[] }) => {
  const [sliderXPercent, setSliderXPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  console.log(activeTab);

  const sliderRef = useRef<HTMLDivElement>(null);
  const currentTab = Array.isArray(tabs) && tabs.length > activeTab ? tabs[activeTab] : null;
  if (!currentTab) return null;

  const handleStart = (clientX: number) => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    requestAnimationFrame(() => {
      setSliderXPercent(Math.max(0, Math.min(100, percent)));
    });
  };

  const handleClick = (index: number) => {
    setActiveTab(index);
  };
  const isSliderNearBefore = sliderXPercent < 15; // Hide "Before" when slider is very close to left text
  const isSliderNearAfter = sliderXPercent > 79;
  return (
    <section className="w-full h-[120vh] md:h-auto xl:h-[100vh] text-white flex flex-col items-center py-16 px-4 opacity-100 z-1000">
      {/* Heading */}
      <div className="text-center max-w-[90%] mb-1">
        <h2 className="text-3xl sm:whitespace-nowrap md:text-4xl font-semibold mb-4 font-['Helvetica_Neue','Helvetica','Arial','sans-serif']">
          {tabs[activeTab].heading}
        </h2>
        <p className="text-[#ABABAB] cursor-pointer text-[13px] w-full md:text-base">{tabs[activeTab].subheading}</p>
      </div>

      {/* Comparison / Image Section */}
      <div className="w-full max-w-5xl xl:max-w-[80%] h-[500px] sm:h-[600px] md:h-[80vh] rounded-xl overflow-hidden relative mt-10">
        {/* Image Comparison Mode */}
        {tabs[activeTab].compare === true ? (
          <div
            ref={sliderRef}
            className="relative w-full h-full"
            style={{ cursor: "col-resize" }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseUp={handleEnd}
            onMouseMove={(e) => isDragging && handleMove(e.clientX)}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            <div
              className={cn(
                "absolute top-4 md:left-4 z-50  text-white px-3 py-1 rounded-md text-[10px] md:text-sm font-medium backdrop-blur-sm transition-opacity duration-200",
                isSliderNearBefore ? "opacity-0" : "opacity-100"
              )}
            >
              {currentTab.beforeImageText}
            </div>
            

            <div
              className={cn(
                "absolute top-4 max-w-[30%] right-0 md:right-4 z-50 b text-white px-3 py-1 rounded-md text-[10px] md:text-sm font-medium backdrop-blur-sm transition-opacity duration-200",
                isSliderNearAfter ? "opacity-0" : "opacity-100"
              )}
            >
              {currentTab.afterImageText}
            </div>
                        <div className="absolute top-0 hidden lg:block left-0 w-full h-[30%] bg-gradient-to-b from-[#000000] via-black/40 to-transparent z-30 pointer-events-none" />
                        <div className="absolute top-0  left-0 w-full h-[30%] bg-gradient-to-b from-[#000000] via-black/40 to-transparent z-30 pointer-events-none" />
              
            {/* Handlebar */}
            <motion.div
              className="h-full w-px absolute top-0 z-30 bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ left: `${sliderXPercent}%` }}
              transition={{ duration: 0 }}
            >
              <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-white/40 via-transparent to-transparent opacity-50" />
              <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-white/60 via-transparent to-transparent opacity-100" />
              <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
                <MemoizedSparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={800}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </div>
              <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-lg">
                <IconDotsVertical className="h-4 w-4 text-black" />
              </div>
            </motion.div>

            {/* Before Image */}
            <motion.div
              className="absolute inset-0 z-20 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)` }}
              transition={{ duration: 0 }}
            >
              <Image fill src={currentTab.image1} alt="Before" className="object-cover w-full h-full select-none" draggable={false} />
              {/* Before Image Text */}
              {/* {currentTab.beforeImageText && (
                <div
                  className="absolute top-4 left-4 z-30 text-white text-sm md:text-base font-semibold bg-black/50 px-2 py-1 rounded"
                >
                  {currentTab.beforeImageText}
                </div>
              )} */}
            </motion.div>

            {/* After Image */}
            <Image
              fill
              src={currentTab.image2}
              alt="After"
              className="absolute top-0 left-0 z-[19] object-cover w-full h-full select-none"
              draggable={false}
            />
            {/* After Image Text */}
            {/* {currentTab.afterImageText && (
              <div
                className="absolute top-4 right-4 z-30 text-white text-sm md:text-base  font-normal bg-black/50 px-2 py-1 rounded"
            
              >
                {currentTab.afterImageText}
              </div>
            )} */}

            {/* Gradient Overlay */}
            <div className="absolute hidden lg:block bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#000000] via-black/40 to-transparent z-30 pointer-events-none" />
            <div className="absolute hidden lg:block bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#000000] via-black/30 to-transparent z-30 pointer-events-none" />

            {/* Headline/Subtext over image for desktop only */}
            <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-100 px-4 w-[60%]">
              <h3 className="text-white text-2xl font-semibold">{currentTab.compareHeading}</h3>
              <p className="text-[#ABABAB] text-base mt-2">{currentTab.compareSubheading}</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image fill src={currentTab.image2} alt="Full" className="absolute top-0 left-0 w-full h-full object-cover z-10" draggable={false} />
            {/* Gradient Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-30 pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[black] via-black/40 to-transparent z-30 pointer-events-none" />

            <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-100 px-4 w-[90%]">
              <h3 className="text-white text-2xl font-semibold">{currentTab.compareHeading}</h3>
              <p className="text-[#ABABAB] text-base mt-2">{currentTab.compareSubheading}</p>
            </div>
          </div>
        )}
      </div>
   {/* Mobile-only subtext below tabs */}
      <div className="block md:hidden text-center mt-12 px-4 max-w-sm">
        <h3 className="text-white  text-base font-semibold">{currentTab.compareHeading}</h3>
        <p className="text-gray-300 text-xs mt-2">{currentTab.compareSubheading}</p>
      </div>
      {/* Tabs */}
      <div className="w-full flex justify-center mt-12">
 <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-10 max-w-full items-center justify-between">
  {tabs.map((tab, index) => (
    <button
      type="button"
      key={index}
      onClick={() => setActiveTab(index)}
      className={cn(
        "relative font-semibold text-[13px] cursor-pointer sm:text-sm md:text-[16px] md:px-5  transition-all duration-300 text-center",
        activeTab === index
          ? "text-white after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[-6px] after:w-[60px] sm:after:w-[100px] md:after:w-[120px] after:h-[2px] after:bg-white after:rounded-full"
          : "text-gray-400 hover:text-[#AD2239]"
      )}
    >
      <h4 className=" md:w-full">{tab.tabtitle}</h4>
    </button>
  ))}
</div>
      </div>

   
    </section>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
