import Image from "next/image";

type DriveAlertH520Props = {
  highlightedText?: string;
  heading: string;
  subheading: string;
  alert1Image: string;
  alert2Image: string;
  alert3Image: string;
  alert1?: string;
  alert2?: string;
  alert3?: string;
  model?: string;
  subheadingwidth?: string;
};

export default function DriveAlertH520({
  highlightedText,
  heading,
  subheading,
  alert1,
  alert2,
  alert3,
  alert1Image,
  alert2Image,
  alert3Image,
  model,
  subheadingwidth,
}: DriveAlertH520Props) {
  return (
    <section className="relative min-h-screen text-white flex flex-col justify-between py-12 text-center overflow-hidden">
      {/* Full Page Gradient (bottom → top) */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* Top Icon */}
      <div className="pt-30 sm:pt-38 mb-[4rem] md:mb-[6rem] animate-fastpulse relative z-10">
        <Image
          src="/productPageImages/driveAlertIcons/dangerIcon.svg"
          alt="Warning Icon"
          width={40}
          height={40}
          className="mx-auto w-[80px] h-[80px] sm:w-[200px] sm:h-[150px]"
        />
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col w-full md:w-3xl items-center space-y-14 px-12  pb-8 relative z-10">
        {/* Headings */}
        <div>
          <p className="text-[#AD2239] font-bold w-2xl mb-2  text-sm sm:text-base md:text-lg">{highlightedText}</p>
          <h2 className="font-medium leading-tight w-2xl text-ce sm:leading-none mb-4 text-[26px] sm:text-4xl md:text-[38px]">{heading}</h2>
          <p className={`text-[#ABABAB] mx-auto w-2xl px-3.5 ling-snug  sm:leading-relaxed text-[14px] sm:text-base md:text-md`}>{subheading}</p>
        </div>

        {/* Alert Features */}
        <div className="flex flex-row justify-center items-center gap-8 sm:gap-23 mt-6 sm:mt-0">
          {/* Lane Departure Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image src={alert1Image} alt="Lane Departure" width={40} height={40} className="sm:w-[60px] sm:h-[60px]" />
            <p className="text-white font-medium text-[10px] sm:text-sm md:text-base">{alert1}</p>
          </div>

          {/* Forward Collision Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image src={alert2Image} alt="Forward Collision" width={40} height={40} className="sm:w-[60px] sm:h-[60px] " />
            <p className="text-white font-medium text-[10px] sm:text-sm md:text-base">{alert2}</p>
          </div>

          {/* Stop & Go Alert */}
          <div className="flex flex-col items-center ">
            <Image src={alert3Image} alt="Stop and Go" width={40} height={40} className="sm:w-[70px] sm:h-[70px]" />
            <p className="text-white font-medium text-[10px] sm:text-sm md:text-base">{alert3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
