import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../Typography/page";


interface DarkBannerProps {
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt?: string;
  buttonLabel: string;
  buttonLink: string;
  className?: string;
  imageClassName?: string;
  imageWidth?: number;
}

const DarkBanner: React.FC<DarkBannerProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = "Banner Image",
  buttonLabel,
  buttonLink,
  className,
  imageWidth = 800,
  imageClassName = "w-[100%]",
}) => {
  return (
    <section className="w-full relative flex items-end overflow-clip h-[430px] lg:h-[350px] lg2:h-[500px]">
      <div
        className={`relative z-10 grid grid-cols-1 md:grid-cols-2 items-center w-full bg-black text-white rounded-xl py-8 lg2:py-12 xl:py-16 px-8 xl:px-16 gap-8
 lg2:h-[380px] h-[250px]  ${className}`}
      >
        {/* Left: Content */}

        <motion.div
          key={title + description}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="z-20 h-full hidden md:flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[20px] md:text-2xl lg2:text-3xl !font-semibold xl:text-4xl mb-3 whitespace-pre-line">{title}</h3>

            <Typography variant="section-card-body">{description}</Typography>
          </div>

          <Link href={buttonLink}>
            <p className="bg-white md:inline-block hidden text-black text-[12px] lg2:text-sm font-bold px-4 py-2 mt-10 rounded hover:bg-gray-200 transition  w-fit">
              Learn More
            </p>
          </Link>
        </motion.div>

        {/* Right: Empty space for visual balance (optional) */}

        <div className="relative" />
        <div className="md:hidden flex">

        <motion.div
          key={title + description}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="z-20 h-full flex md:hidden flex-col justify-end"
        >
          <div>
            <h3 className="text-[20px] md:text-2xl lg2:text-3xl !font-medium xl:text-4xl mb-3 whitespace-pre-line leading-[23px] md:leading-auto">
              {title}
            </h3>

            <Typography variant="section-card-body">{description}</Typography>
          </div>

          <Link href={buttonLink}>
            <p className="bg-white md:inline-block hidden text-black text-[12px] lg2:text-sm font-bold px-4 py-2 mt-10 rounded hover:bg-gray-200 transition  w-fit">
              Learn More
            </p>
          </Link>
        </motion.div>
        </div>
      </div>

      {/* Absolute Image Outside */}

      <motion.div
        key={title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="absolute md:-bottom-14 top-0 flex justify-center  z-20 md:left-[50%] "
      >
        <Image src={imageSrc} alt={imageAlt} className={`object-co h-full mx md:w-[100%] w-[100%]`} />
      </motion.div>
    </section>
  );
};

export default DarkBanner;
