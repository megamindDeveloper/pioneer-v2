import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Typography } from "../Typography/page";

interface SideImageCardProps {
  image: string;
  title: string;
  description: string;
  imageClassName?: string;
}

export const SideImageCard: React.FC<SideImageCardProps> = ({ image, title, description, imageClassName = " w-[100%]  h-[100%]" }) => {
  return (
    <motion.div
      key={image + title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-black rounded-xl overflow-hidden shadow-2xl xl:h-[380px] h-[300px] flex"
    >
      <div className="flex items-center">
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h3 className="text-[20px] md:text-2xl lg2:text-3xl !font-medium xl:text-4xl mb-3 whitespace-pre-line leading-[23px] md:leading-none">
            {title}
          </h3>
          <Typography variant="section-card-body" className="text-[#DFDFDF]">
            {description}
          </Typography>
        </div>

        <div className="flex-1 relative flex justify-center items-center">
          <Image src={image} alt={title} width={800} height={500} className={imageClassName} />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/40 z-10" /> */}
        </div>
      </div>
    </motion.div>
  );
};
