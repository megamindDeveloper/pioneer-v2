type GpsLoggerProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
  description: string;
};

export default function GpsLogger({ highlightedText, heading, subheading, description }: GpsLoggerProps) {
  return (
    <>
<main className="flex flex-col justify-between w-sm md:w-xl min-h-screen px-4 text-center pt-10 sm:pt-0">
  {/* Top (Mobile: top center, Desktop: center) */}
  <div className="flex flex-col justify-start sm:justify-center items-center flex-grow space-y-4 sm:space-y-6">
    <p className="text-[#AD2239] font-bold tracking-wide text-sm sm:text-base md:text-lg">
      {highlightedText}
    </p>
    <h1 className="text-[#FFFFFF] font-medium text-3xl md:text-[50px] lg2:text-[50px] ">
      {heading}
      <span className="text-[#313131]">*</span>
    </h1>
    <p className="text-[#ABABAB]/80 max-w-lg mx-auto text-sm sm:text-base md:text-lg">
      {subheading}
    </p>
  </div>

  {/* Bottom Section (Always bottom) */}
  <div className="pb-8 sm:pb-12">
    <p className="text-[#313131] max-w-4xl mx-auto text-sm sm:text-base md:text-md">
      {description}
    </p>
  </div>
</main>

    </>
  );
}
