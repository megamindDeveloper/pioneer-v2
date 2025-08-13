'use client';

type FieldOfVisionProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FieldOfVision({
  highlightedText,
  heading,
  subheading,
}: FieldOfVisionProps) {
  return (
<main className="relative w-full h-screen text-white">
  <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-[80px]">
    
    {/* Left Text */}
    <div className="flex flex-col  text-center items-start max-w-[320px]">
      <p className="text-[#AD2239] min-w-md font-bold text-[14px] leading-[18px] mb-[8px]">
        {highlightedText}
      </p>
      <h1 className="text-white  text-center min-w-md font-medium text-[50px]   leading-[44px]">
        {heading}
      </h1>
    </div>

    {/* Center Main Image (Three.js canvas or <img>) */}
    <div className="flex-shrink-0 w-[500px] h-[500px]"></div>

    {/* Right Text */}
    <div className="  min-w-md max-w-[600px] text-center text-[#ABABAB] text-[18px] leading-[22px]">
      {subheading}
    </div>

  </div>
</main>

  );
}
