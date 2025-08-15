"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Typography } from "@/components/CommonComponents/Typography/page";


const features = [
  {
    id: "innovation",
    title: "Trusted Innovation for Over  85 Years",
    content: `For over 85 years, Pioneer has been a leader in precision engineering and innovation in audio and video products — a commitment to quality and reliability we now extend to our Dash Cam range.`,
    image: "/homePageImages/featureAccordionImages/feature1.png",
    imageClass: "object-cover object-center w-", // 👈 custom class
  },
  {
    id: "control",
    title: "Control That Goes Beyond the Camera",
    content: `With the Pioneer ZenValue app, you can instantly view, download and share your footage, turning your smartphone into a seamless command center for your Dash Cam.`,
    image: "/homePageImages/featureAccordionImages/feature2.png",
    imageClass: "object-cover object-center", // 👈 different class
  },
  {
    id: "conditions",
    title: "Built for Real-World\n Conditions",
    content: `Our Dash Cams are designed to perform reliably in everyday driving. With clear video recording and a durable build, they are made to handle the demands of daily use in a variety of environments.`,
    image: "/homePageImages/featureAccordionImages/3.webp",
    imageClass: "object-contain object-center", // 👈 fallback class
  },
];

export default function FeatureAccordion() {
  const [activeId, setActiveId] = useState("innovation");

  const currentFeature = features.find((f) => f.id === activeId);

  return (
    <section className="relative bg-black text-white px-8 md:px-4 md:pl-20 py-12 md:py-16 rounded-3xl max-w-[90%] mx-auto xl:max-w-[90%]  mx-5  mt-20 mb-[10rem] overflow-hidden">
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Accordion Content */}
        <div className="relative z-20">
          {features.map((feature) => {
            const isActive = feature.id === activeId;
            return (
              <div
                key={feature.id}
                className={`py-6 cursor-pointer ${feature.id !== "conditions" ? "border-b border-white/20" : ""}`}
                onClick={() => setActiveId(feature.id)}
              >
                <div className="flex justify-between items-center text-lg font-medium">
                  <Typography variant="section-card-heading" className="text-white font-bold w-[70%]">
                    {feature.title}
                  </Typography>
                  <span className="text-2xl">
                    {isActive ? (
                      <motion.span initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                        <svg width="31" height="4" viewBox="0 0 31 4" fill="none">
                          <g opacity="0.25">
                            <line x1="30.7559" y1="2.43555" x2="0.755859" y2="2.43554" stroke="#E2E2E2" strokeWidth="3" />
                          </g>
                        </svg>
                      </motion.span>
                    ) : (
                      <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
                        <line x1="15.8203" y1="0.380859" x2="15.8203" y2="30.3809" stroke="#E2E2E2" strokeWidth="3" />
                        <line x1="30.5703" y1="15.6309" x2="0.570312" y2="15.6309" stroke="#E2E2E2" strokeWidth="3" />
                      </svg>
                    )}
                  </span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="mt-4"
                    >
                      {/* Text */}
                      <p className="text-[#ABABAB] whitespace-pre-line !text-[14px] lg2:text-[16px]">{feature.content}</p>

                      {/* Small Image only on mobile */}
                      {/* Small Image only on mobile */}
                      <div className="mt-4 md:hidden relative">
                        <Image
                          src={
                            feature.id === "conditions"
                              ? "/homePageImages/featureAccordionImages/3.webp" // ✅ mobile-specific image
                              : feature.image || ""
                          }
                          alt={feature.title || ""}
                          width={400}
                          height={250}
                          className={
                            feature.id === "conditions" ? "w-full object-contain rounded-lg text-center  " : "w-full h-auto object-contain rounded-lg"
                          }
                        />

                        {/* Overlays for mobile */}
                        {feature.id === "innovation" && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none rounded-lg" />
                        )}
                        {feature.id === "control" && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent z-10 pointer-events-none rounded-lg" />
                        )}
                        {feature.id === "conditions" && (
                          <div className="absolute inset-0 bg-gradient-radial from-black/60 to-transparent z-10 pointer-events-none rounded-lg" />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Image Section with special logic */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 -mr-4 h-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute inset-0"
          >
            {/* ✅ Wrapper to support conditional desktop image layouts */}
            {currentFeature?.id === "innovation" && (
              <div className="relative w-full h-full ">
                <Image src={currentFeature?.image || ""} alt={currentFeature?.title || ""} fill className="object-contain object-center p-12" />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" /> */}
              </div>
            )}

            {currentFeature?.id === "control" && (
              <div className="relative w-full h-full">
                <Image src={currentFeature?.image || ""} alt={currentFeature?.title || ""} fill className={currentFeature?.imageClass} />

                {currentFeature?.id === "control" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent z-10 pointer-events-none" />
                )}
              </div>
            )}
            {currentFeature?.id === "conditions" && (
              <div className="w-[100%] h-full flex  flex-row-reverse">
                <div className="relative w-[100%] h-full overflow-hidden">
                  <Image  src={currentFeature?.image || ""} alt={currentFeature?.title || ""} fill className="object-cover md:!h-80 md:!w-80 xl:!w-[90%] xl:!h-[100%] md:my-auto md:ml-auto object-left" />
                  <div className="absolute inset-0 bg-gradient-radial from-black/60 to-transparent z-10 pointer-events-none" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
