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
}: DriveAlertH520Props) {
  return (
    <section className="min-h-screen text-white flex flex-col justify-between px-4 sm:px-6 py-12 text-center">
      {/* Top Icon */}
      <div className="pt-64 sm:pt-52    animate-fastpulse">
        <Image
          src="/productPageImages/driveAlertIcons/dangerIcon.svg"
          alt="Warning Icon"
          width={40}
          height={40}
          className="mx-auto sm:w-[100px] sm:h-[100px]"
        />
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col w-[20rem] md:w-3xl items-center space-y-12 sm:space-y-4 mt-[8rem] pb-8">
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
        <div className="flex flex-row sm:flex-row justify-center items-center gap-8 sm:gap-23 mt-2 sm:mt-0">
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
          <div className="flex flex-col items-center space-y-2">
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
              <Image src={alert3Image} alt="Stop and Go" width={40} height={40} className="sm:w-[60px] sm:h-[60px]" />
              <p className="text-white font-medium text-[10px] sm:text-sm md:text-base">{alert3}</p>
            </div>
        </div>
      </div>
    </section>
  );
}
