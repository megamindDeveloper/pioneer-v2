type DynamicContentProps = {
  highlightedText?: string;
  heading?: string;
  subheading?: string;
  style?: string;
  Feat?:string;
};

export default function DynamicContent({ highlightedText, heading, subheading, style,Feat }: DynamicContentProps) {
  return (
    <>
      <section className={`flex ${style} min-h-screen px-4 py-16  sm:py-20 items-end sm:items-center justify-center`}>
        <div className="flex flex-col  w-lg md:w-3xl items-center justify-center text-center px-12 md:px-4 pb-4 sm:pb-0">
          {/* Subtitle */}
          <p className="text-[#AD2239] font-bold text-sm sm:text-base md:text-lg">{highlightedText}</p>

          {/* Heading */}
          {/* <h1 className="text-3xl   sm:text-3xl md:text-4xl lg2:text-[50px]  text-white font-medium leading-tight">{heading}</h1> */}

{Feat === "WDR" ? (
            <h1 className="text-2xl   sm:text-3xl md:text-4xl lg2:text-[50px]  text-white font-medium leading-tight">{heading}</h1>
          ):
(          <h1 className="text-3xl   sm:text-3xl md:text-4xl lg2:text-[50px]  text-white font-medium leading-tight">{heading}</h1>
)}
          {/* Description */}
          <div className="w-full max-w-xs lg:max-w-xl text-[#ABABAB] text-sm sm:text-base md:px-16 lg2:px-0 lg2:text-lg leading-relaxed">
            <p>{subheading}</p>
          </div>
        </div>
      </section>
    </>
  );
}
