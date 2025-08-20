"use client";

import { Typography } from "../Typography/page";

type FieldOfVisionProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FieldOfVision({ highlightedText, heading, subheading }: FieldOfVisionProps) {
  return (
    <main className="relative !w-[100%] text-white translate-x-3 ">
      <div className="mx-auto h-full gap-72 xl:gap-96 flex items-center justify-center ">
        {/* Left Text */}
        <div className="w-fit">
        <Typography variant="slider-heading" className="text-[#AD2239] text-center  font-bold">{highlightedText}</Typography>
        <Typography variant="section-heading" className="font-medium  text-center text-white px-12 md:px-8">
            {heading}
            </Typography>
        </div>

        {/* Right Text */}
        <div className="  w-[350px] lg:w-[450px] xl:w-[500px] text-[#ABABAB]/80 text-center leading-snug lg:mr-12 xl:mr-0">
        <Typography variant="section-card-body" className=" text-[#ABABAB]/80 mx-auto">{subheading}</Typography>
        </div>
      </div>
    </main>
  );
}
