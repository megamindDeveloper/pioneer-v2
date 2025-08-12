'use client';

type RightFieldOfVisionProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function RightFieldOfVision({
  highlightedText,
  heading,
  subheading,
}: RightFieldOfVisionProps) {
  return (
 <main className="relative h-full w-full overflow-hidden text-white px-4 flex items-center justify-center bg-none">
  <div className="text-center max-w-sm md:max-w-2xl ">
    {/* Top Red Text */}
    {highlightedText && (
      <p className="text-[#AD2239] font-medium text-sm sm:text-base md:text-lg leading-snug mb-2">
        {highlightedText}
      </p>
    )}

    {/* Main Heading */}
    <h1 className="font-medium text-white leading-tight text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] mb-4">
      {heading}
    </h1>

    {/* Subheading */}
    <p className="text-[#ABABAB] text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
      {subheading}
    </p>
  </div>
</main>


  );
}
