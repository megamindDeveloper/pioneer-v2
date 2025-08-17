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
<main className="relative w-full text-white translate-x-3 lg2:translate-x-0 xl:-translate-x-6">
  <div className="mx-auto h-full gap-72 xl:gap-96 flex items-center justify-center ">
    
    {/* Left Text */}
    <div className="w-fit">
      <p className="text-[#AD2239] font-bold text-sm sm:text-base md:text-lg mb-[8px] text-center ">
        {highlightedText}
      </p>
      <h1 className="lg2:min-w-[30rem] xl:min-w-max lg2:text-[56px] lg:text-[46px] leading-tight text-[32px]  text-white text-center  font-medium">
        {heading}
      </h1>
    </div>

    {/* Right Text */}
    <div className="  w-[350px] lg:w-[450px] xl:w-[500px] text-[#ABABAB]/80 text-center lg:text-lg  leading-snug">
      {subheading}
    </div>

  </div>
</main>

  );
}
