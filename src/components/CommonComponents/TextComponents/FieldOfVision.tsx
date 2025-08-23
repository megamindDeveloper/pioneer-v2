"use client";

import { Typography } from "../Typography/page";

type FieldOfVisionProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FieldOfVision({ highlightedText, heading, subheading }: FieldOfVisionProps) {
  return (
    <main className="relative w-full text-white">
      <div className="mx-auto h-full flex items-center justify-between px-8 lg:px-16 xl:px-26 xl:mx-12">
        
        {/* Left Text */}
        <div className="w-fit flex flex-col items-center xl:l-12">
          <Typography
            variant="slider-heading"
            className="text-[#AD2239] font-bold"
          >
            {highlightedText}
          </Typography>
          <Typography
            variant="section-heading"
            className="font-medium max-w-xl text-white"
          >
            {heading}
          </Typography>
        </div>

        {/* Right Text */}
        <div className="w-[350px] lg:w-[450px] text-center xl:w-[500px] text-[#ABABAB]/80  leading-snug ">
          <Typography
            variant="section-card-body"
            className="text-[#ABABAB]/80"
          >
            {subheading}
          </Typography>
        </div>
      </div>
    </main>
  );
}
