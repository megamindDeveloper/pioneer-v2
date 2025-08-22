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
  <div className="w-full max-w-[660px] flex flex-col items-center  px-6justify-center">
    {/* Red Label */}
    <p className="text-[#AD2239] text-[14px] font-semibold mb-2">
      {highlightedText}
    </p>

    {/* Heading */}
    <h1 className="text-white text-[32px] sm:text-[42px] md:text-[48px] lg:text-[56px] font-medium mb-4">
     {heading}<span className="text-[#313131]">*</span>
    </h1>

    {/* Subheading */}
    <p className="text-[#ABABAB]/80 text-[14px] leading-snug w-[320px] lg:w-[480px] mx-auto">
     {subheading}
    </p>
  </div>

  {/* Disclaimer - fixed at bottom */}
  <p className="absolute bottom-[8rem] sm:bottom-[6rem] text-[12px] text-[#313131] text-center w-[350px] lg:w-[860px] px-6">
 {description}
  </p>
</main>

    </>
  );
}
