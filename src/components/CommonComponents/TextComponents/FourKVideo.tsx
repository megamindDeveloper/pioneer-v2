import { Typography } from "../Typography/page";

type FourKVideoProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FourKVideo({ highlightedText, heading, subheading }: FourKVideoProps) {
  return (
    <>
   <section className="relative min-h-screen text-white flex items-center justify-center px-12 md:px-12">
  <div className="text-center min-w-md max-w-2xl lg:max-w-lg  lg:min-w-4xl px-32 md:px-22 sm:mt-1 mt-16  ">
    {/* Red Subheading */}
    <Typography variant="ovelay-higlighted-text"  className="text-[#AD2239] min-w-xs md:min-w-xl font-bold text-sm sm:text-base md:text-lg mb-3 ">
      {highlightedText}
    </Typography>

    {/* Main Heading */}
    <Typography variant="overlay-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl min-w-xs md:min-w-xl font-semibold  leading-tight mb-1    ">
      {heading}
    </Typography>

    {/* Description */}
    <Typography variant="overlay-subheading" className="text-[#ABABAB] text-sm sm:text-base md:text-md leading-relaxed min-w-sm md:min-w-xl">
      {subheading}
    </Typography>
  </div>
</section>

    </>
  );
}
