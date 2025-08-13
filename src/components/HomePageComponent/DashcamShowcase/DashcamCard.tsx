"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, JSX } from "react";
import { ObjectLoader, Group, Vector3, Euler } from "three";
import { motion } from "framer-motion";
import { Environment } from "@react-three/drei";
import { SceneLights } from "./SceneLights";
import { DirectionalLightConfig } from "@/app/types/lights";
import { Typography } from "@/components/CommonComponents/Typography/page";
import { useRouter } from "next/navigation";


// ✅ 3D Group wrapper to use useFrame inside Canvas
const AnimatedModel = ({
  hovered,
  children,
  defaultScale,
  hoveredScale,
  defaultPosition,
  hoveredPosition,
  defaultRotation,
  hoveredRotation,
  directionalLights = [],
}: {
  hovered: boolean;
  children: JSX.Element;
  defaultScale: [number, number, number];
  hoveredScale: [number, number, number];
  defaultPosition: [number, number, number];
  hoveredPosition: [number, number, number];
  defaultRotation: [number, number, number];
  hoveredRotation: [number, number, number];
  directionalLights?: DirectionalLightConfig[];
}) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetScale = hovered ? new Vector3(...hoveredScale) : new Vector3(...defaultScale);
    const targetPosition = hovered ? new Vector3(...hoveredPosition) : new Vector3(...defaultPosition);
    const targetRotation = hovered ? new Euler(...hoveredRotation) : new Euler(...defaultRotation);

    groupRef.current.scale.lerp(targetScale, 0.1);
    groupRef.current.position.lerp(targetPosition, 0.1);
    groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.z += (targetRotation.z - groupRef.current.rotation.z) * 0.1;
  });

  return <group ref={groupRef}>{children}</group>;
};

const DashcamCard = ({
  title,
  cardIndex,
  Component,
  cameraPosition = [0, 1, 6],
  description,
  features,
  defaultScale = [0.6, 0.6, 0.6],
  hoveredScale = [0.8, 0.8, 0.8],
  defaultPosition = [0, 0.7, 0],
  hoveredPosition = [-0.3, 0, 0],
  defaultRotation = [-0.2, 0, 0],
  hoveredRotation = [-0.2, 0.75, 0],
  featureIcons,
  directionalLights = [],
  link= ""
}: {
  title: string;
  Component: JSX.Element;
  cameraPosition?: [number, number, number];
  description: string;
  features: string[];
  defaultScale?: [number, number, number];
  hoveredScale?: [number, number, number];
  defaultPosition?: [number, number, number];
  hoveredPosition?: [number, number, number];
  defaultRotation?: [number, number, number];
  hoveredRotation?: [number, number, number];
  featureIcons?: string[];
  link?:string;
  cardIndex: number;
  directionalLights?: DirectionalLightConfig[];
}) => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg: <1024px
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative ${hovered ? "bg-[#1a1a1a]" : ""} ${
        cardIndex === 0
          ? "md:border-r md:border-b md:border-[#3B3B3B]"
          : cardIndex === 1
          ? "md:border-b md:border-[#3B3B3B]"
          : cardIndex === 2
          ? "md:border-r md:border-[#3B3B3B]"
          : ""
      } overflow-hidden cursor-pointer  shadow-xl transition-all duration-300`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={() => {
        if (link) router.push(link);
      }}
    >
      {/* Corner borders - top left & top right only, visible on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        {/* Top Left */}
        <div className="absolute top-4 left-4 xl:top-6 xl:left-6 w-4 h-4 border-t-2 border-l-2 border-[#AD2239] rounded-tl-[4px] transition-all duration-300" />

        {/* Top Right */}
        <div className="absolute top-4 right-4 xl:top-6 xl:right-6 w-4 h-4 border-t-2 border-r-2 border-[#AD2239] rounded-tr-[4px] transition-all duration-300" />
        <div className="absolute bottom-4 left-4 xl:bottom-6 xl:left-6 w-4 h-4 border-b-2 border-l-2 border-[#AD2239] rounded-bl-[8px]" />

        {/* Bottom Right */}
        <div className="absolute bottom-4 right-4 xl:bottom-6 xl:right-6 w-4 h-4 border-b-2 border-r-2 border-[#AD2239] rounded-br-[8px]" />
      </motion.div>
      <div className="w-full  h-[400px] md:h-auto mx-auto aspect-[4/3]">
        <Canvas camera={{ position: cameraPosition, fov: 35 }} shadows>
          <SceneLights hovered={hovered} directionalLights={directionalLights || []} />

          <AnimatedModel
            hovered={hovered}
            defaultScale={[0.45, 0.45, 0.45]}
            hoveredScale={[0.45, 0.45, 0.45]}
            defaultPosition={defaultPosition}
            hoveredPosition={hoveredPosition}
            defaultRotation={defaultRotation}
            hoveredRotation={hoveredRotation}
          >
            {Component}
          </AnimatedModel>
        </Canvas>
      </div>
      {/* Hover UI */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 text-white p-4 grid grid-cols-2 items-center pointer-events-none"
      >
        {/* Right Side (content) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 text-white p-4 pb-10 grid grid-cols-2 items-center pointer-events-none"
        >
          <div className="flex flex-col justify-center items-center ">
            <motion.h3
              className="font-medium lg:text-[18px]  lg2:text-[28px] lg2:leading-auto xl:text-[26px] xl:leading-auto 2xl:text-[32.9px] 2xl:leading-auto font-['Helvetica_Neue','Helvetica','Arial','sans-serif']"
              initial={{ opacity: 0, y: 10 }}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className=" text-[#ABABAB]/60 text-center whitespace-pre-line font-['Helvetica_Neue','Helvetica','Arial','sans-serif'] lg2:text-[16px] lg:text-[12px]  lg:leading-auto xl:text-[20px] xl:leading-auto 2xl:text-[17.8px] 2xl:leading-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {description}
            </motion.p>
            <div className="w-full h-px bg-[#3B3B3B] mt-4 md:hidden block" />

            <br />
          </div>
          <div></div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute lg2:bottom-10 md:bottom-8 bottom-36  flex flex-col items-center justify-center w-full "
      >
        <Typography variant="grid-view-heading" className="text-white !font-medium text-base xl: text-center ">
          {title}
        </Typography>
        <Typography
          variant="grid-view-body"
          className=" pt-2 text-[#ABABAB]/60 hidden md:block  text-center font-['Helvetica_Neue','Helvetica','Arial','sans-serif']"
        >
          {description}
        </Typography>
      </motion.div>
      {cardIndex !== 3 && <div className="w-[90%] h-px bg-[#3B3B3B] mt-4 flex items-center justify-center mx-auto" />}

      {cardIndex !== 2 ? (
        <div
          className={`absolute bottom-10 md:bottom-6 left-1/2 -translate-x-1/2 w-full text-center md:gap-4 gap-0 text-[#ABABAB] md:px-12 grid px-2 ${
            features.length === 1 ? "grid-cols-1 place-items-center" : "md:grid-cols-5 grid-cols-4"
          }`}
        >
          {(isMobile ? features.slice(0, 4) : features).map((feature, index) => (
            <div key={index} className="flex flex-col justify-center items-center gap-2  transition-opacity duration-300">
              {/* 👇 Only show icon when hovered */}
              <motion.img
                src={featureIcons?.[index]}
                alt={`${feature} icon`}
                className="xl:w-7 xl:h-7 lg:w-5 lg:h-5 w-5 h-5"
                initial={{ opacity: 0, y: 5 }}
                animate={hovered || isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              />
              {/* 👇 Always visible text */}

              <motion.p
                className="text-[10px] lg2:text-[14px]  lg2:leading-auto xl:text-[12px] xl:leading-auto 2xl:text-[15.2px] 2xl:leading-auto text-[#ABABAB]/60 text-center whitespace-pre-line font-['Helvetica_Neue','Helvetica','Arial','sans-serif']"
                initial={{ opacity: 0, y: 10 }}
                animate={hovered || isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {feature}
              </motion.p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`absolute bottom-10 md:bottom-6 left-1/2 -translate-x-1/2 w-full text-center md:gap-4 gap-0 text-[#ABABAB] md:px-12 grid px-2 ${
            features.length === 1 ? "grid-cols-1 place-items-center" : "md:grid-cols-4 grid-cols-4"
          }`}
        >
          {(isMobile ? features.slice(0, 4) : features).map((feature, index) => (
            <div key={index} className="flex flex-col justify-center items-center gap-2  transition-opacity duration-300">
              {/* 👇 Only show icon when hovered */}
              <motion.img
                src={featureIcons?.[index]}
                alt={`${feature} icon`}
                className="xl:w-7 xl:h-7 lg:w-5 lg:h-5 w-5 h-5"
                initial={{ opacity: 0, y: 5 }}
                animate={hovered || isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              />
              {/* 👇 Always visible text */}

              <motion.p
                className="text-[12px] lg:text-[14px]  lg2:leading-auto xl:text-[12px] xl:leading-auto 2xl:text-[15.2px] 2xl:leading-auto text-[#ABABAB]/60 text-center whitespace-pre-line font-['Helvetica_Neue','Helvetica','Arial','sans-serif']"
                initial={{ opacity: 0, y: 10 }}
                animate={hovered || isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {feature}
              </motion.p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashcamCard;
