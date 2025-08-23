import { cn } from "@/app/lib/utils";
import { Typography } from "../Typography/page";

type GpsLoggerProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
  description: string;
  style?: string;
};

export default function GpsLogger({ highlightedText, heading, subheading, description, style = "" }: GpsLoggerProps) {
  return (
    <>
   <main className="min-h-screen  text-white flex flex-col items-center justify-center relative text-center">
  {/* Content */}
  <div className="w-full md:max-w-[660px] flex flex-col items-center  px-6justify-center">
    {/* Red Label */}
    <Typography variant="slider-heading" className="text-[#AD2239]  font-bold pr-5">
      {highlightedText}
    </Typography>

    {/* Heading */}
    <Typography variant="section-heading" className={cn("font-medium  text-center text-white px-12 md:px")}>
     {heading} <span className="text-[#313131]">*</span>
    </Typography>

    {/* Subheading */}
    <Typography variant="section-card-body" className={cn(" text-[#ABABAB]/80 mx-auto")}>
     {subheading}
    </Typography>
  </div>

  {/* Disclaimer - fixed at bottom */}
  <p className="absolute bottom-[8rem] sm:bottom-[6rem] text-[12px] text-[#313131] text-center w-[350px] lg:w-[860px] px-6">
 {description}
  </p>
</main>

    </>
  );
}
