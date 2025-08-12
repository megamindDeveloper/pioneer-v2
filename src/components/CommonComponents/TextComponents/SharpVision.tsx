type SharpVisionProps = {
  highlightedText?: string;
  heading: string;
  subheading?: string;
};

export default function SharpVision({ highlightedText, heading, subheading }: SharpVisionProps) {
  return (
    <>
      <section className="flex min-h-screen flex-col justify-end sm:justify-end items-center px-4 py-12 sm:p-1">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-xl">
          {/* Subtitle */}
          <p className="text-[#AD2239] font-bold text-sm sm:text-base md:text-lg">{highlightedText}</p>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg2:text-5xl text-white font-medium whitespace-nowrap leading-tight">{heading}</h1>

          {/* Description */}
          <div className="max-w-xl text-[#ABABAB] text-sm sm:text-base md:text-md leading-relaxed w-lg md:px-2 px-15 sm:px-0">
            <p>{subheading}</p>
          </div>
        </div>
      </section>
    </>
  );
}
