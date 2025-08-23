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
    <Typography variant="slider-heading" className="text-[#AD2239]  font-semibold mb-2">
      {highlightedText}
    </Typography>

    {/* Heading */}
    <Typography variant="section-heading" className="text-white  font-medium mb-4">
     {heading}<span className="text-[#313131]">*</span>
    </Typography>

    {/* Subheading */}
    <Typography variant="section-card-body" className="text-[#ABABAB]/80  leading-snug w-[320px] lg:w-[480px] mx-auto">
     {subheading}
    </Typography>
  </div>

  {/* Disclaimer - fixed at bottom */}
  <Typography variant="section-card-body" className="absolute bottom-[8rem] sm:bottom-[6rem]  text-[#313131] text-center w-[320px] lg:w-[860px] px-6">
 {description}
  </Typography>
</main>

    </>
  );
}
