import Image from "next/image";

type DriveAlertH820Props = {
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
};

export default function DriveAlertH820({
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
}: DriveAlertH820Props) {
  return (
<section className="relative min-h-screen text-white flex flex-col justify-between py-12 text-center overflow-hidden">
    {/* Full Page Gradient (bottom → top) */}
  <div className="absolute bottom-0   inset-x-0  h-[40%]  w-full   bg-gradient-to-t from-[#000000] via-black/80 to-transparent pointer-events-none" />

  {/* Top Icon */}
  <div className="absolute top-[33%] left-1/2 -translate-x-1/2 animate-fastpulse z-10">
    <Image
      src="/productPageImages/driveAlertIcons/dangerIcon.svg"
      alt="Warning Icon"
      width={80}
      height={80}
      className="sm:w-[100px] sm:h-[130px]"
    />
  </div>

  {/* Bottom Content */}
  <div className="flex flex-col w-full px-3 md:w-3xl items-center space-y-12 sm:space-y-4 mt-[26rem] relative z-10">
    {/* Headings */}
    <div>
      <p className="text-[#AD2239] font-bold mb-2 text-sm sm:text-base md:text-lg">
        {highlightedText}
      </p>
      <h2 className="font-medium leading-tight sm:leading-none mb-2 text-3xl sm:text-4xl md:text-[42px]">
        {heading}
      </h2>
      <p className="text-[#ABABAB] mx-auto leading-snug sm:leading-relaxed text-sm sm:text-base md:text-md">
        {subheading}
      </p>
    </div>

    {/* Alert Features */}
    <div className="flex flex-row justify-center items-center gap-8 sm:gap-23 py-6">
      {/* Lane Departure Alert */}
      <div className="flex flex-col items-center space-y-2">
        <Image
          src={alert1Image}
          alt="Lane Departure"
          width={40}
          height={40}
          className="sm:w-[60px] sm:h-[60px]"
        />
        <p className="text-white font-medium text-[10px] sm:text-sm md:text-base">
          {alert1}
        </p>
      </div>

      {/* Forward Collision Alert */}
      <div className="flex  flex-col items-center space-y-2">
        <Image
          src={alert2Image}
          alt="Forward Collision"
          width={40}
          height={40}
          className="sm:w-[60px] sm:h-[60px]"
        />
        <p className="text-white font-medium text-[10px] sm:text-sm md:text-base">
          {alert2}
        </p>
      </div>

      {/* Stop & Go Alert */}
      <div className="flex flex-col items-center space-y-2">
        <Image
          src={alert3Image}
          alt="Stop and Go"
          width={40}
          height={40}
          className="sm:w-[60px] sm:h-[60px]"
        />
        <p className="text-white font-medium text-[10px] sm:text-sm md:text-base">
          {alert3}
        </p>
      </div>
    </div>
  </div>
</section>

  );
}
