type FourKVideoProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FourKVideo({ highlightedText, heading, subheading }: FourKVideoProps) {
  return (
    <>
   <section className="relative min-h-screen text-white flex items-center justify-center px-12">
  <div className="text-center min-w-xl  sm:min-w-3xl px-22 sm:mt-1 mt-16 ">
    {/* Red Subheading */}
    <p className="text-[#AD2239] font-bold text-sm sm:text-base md:text-lg mb-3">
      {highlightedText}
    </p>

    {/* Main Heading */}
    <h2 className="text-2xl sm:text-3xl md:text-[60px] lg:text-[50px] font-medium leading-tight mb-2">
      {heading}
    </h2>

    {/* Description */}
    <p className="text-[#ABABAB] text-sm sm:text-base md:text-md max-w-xl  leading-relaxed">
      {subheading}
    </p>
  </div>
</section>

    </>
  );
}
