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
      <main className={`min-h-screen  text-white relative ${style} text-center sm:text-left`}>
        {/* Top Content Block */}
        <div className="w-full max-w-[400px] sm:mt-1 mt-[-28rem] text-center sm:max-w-[600px] sm:ml-[6%]">
          {/* Red Label */}
          <Typography variant="slider-heading" className="text-[#AD2239]  font-bold">
            {highlightedText}
          </Typography>

          {/* Heading */}
          {/* <h1 className="lg2:text-[56px] lg:text-[46px] leading-tight text-[32px]   text-white text-center font-medium mt-2  max-w-[300px] mx-auto left-full lg:max-w-[400px] lg2:max-w-[500px] mb-4">
            {heading}
            
          </h1> */}
          <Typography variant="section-heading" className="font-medium  text-center text-white px-12 md:px-8">
            {heading} <span className="text-[#313131]">*</span>
          </Typography>
          {/* Subheading */}
          <p className="text-[#ABABAB]/80 w-[450px] ms-5 text-[14px] leading-snug max-w-[90%] sm:max-w-[500px] mx-auto sm:mx-0">{subheading}</p>
        </div>

        {/* Disclaimer (Bottom Center on all screens) */}
        <p className="absolute bottom-6 sm:bottom-14 ms-6 text-[13px] text-[#313131] max-w-[320px] sm:max-w-[800px] text-center px-4">
          {description}
        </p>
      </main>
    </>
  );
}
