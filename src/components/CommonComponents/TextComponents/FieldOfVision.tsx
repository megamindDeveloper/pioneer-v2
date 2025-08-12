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
 <main className="relative h-[100%] w-[100%] overflow-hidden text-white px-4">
  {/* Background Layer */}
  <div className="absolute top-0 left-0 w-full h-full z-0" />

  {/* Content Wrapper */}
  <div className="relative z-20 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:items-center px-6 mt-[-1rem] md:mt-1 lg2:px-32 text-center lg:text-left">
    {/* Top / Left Section */}
    <div className="max-w-[300px] lg2:max-w-sm space-y-2 ">
      {highlightedText && (
        <p className="text-[#AD2239] font-bold text-sm sm:text-base md:text-md text-center">
          {highlightedText}
        </p>
      )}
      <h1 className="text-center font-medium leading-tight text-white text-2xl sm:text-3xl md:text-4xl lg2:text-5xl">
        {heading}
      </h1>
    </div>

    {/* Bottom / Right Section */}
    <div className="lg2:max-w-md max-w-[350px] text-center text-[#ABABAB] leading-relaxed text-sm sm:text-base md:text-md">
      <p>{subheading}</p>
    </div>
  </div>
</main>
  );
}
