import Image from "next/image";
import { Typography } from "../Typography/page";

type DriveAlertProps = {
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

export default function DriveAlert({
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
}: DriveAlertProps) {
  return (
    <section className="min-h-screen  text-white flex flex-col justify-between px-4 sm:px-6 py-7 text-center">
      {/* Top Icon */}
      <div className="pt-28 lg:pt-40 xl:pt-40 x animate-pulse">
        <Image
          src="/productPageImages/driveAlertIcons/dangerIcon.svg"
          alt="Warning Icon"
          width={80} // smaller on mobile
          height={80}
          className="mx-auto sm:w-[130px] sm:h-[150px]"
        />
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col items-center lg2:space-y-7 ">
        {/* Headings */}
        <div>
          <p className="text-[#AD2239] text-[16px]  font-bold  ">{highlightedText}</p>
          <Typography variant="section-heading" className="font-medium  text-center text-white px-12 md:px-8">{heading}</Typography>
          <h2 className="lg2:text-[50px] text-[32px] font-medium  leading-tight sm:leading-none"></h2>
          <Typography variant="section-card-body" className=" text-[#ABABAB]/80 mx-auto lg2:max-w-xl ">{subheading}</Typography>
          
        </div>

        {/* Alert Features */}
        <div className="flex flex-row sm:flex-row justify-center items-center gap-8 sm:gap-23 mt-6 sm:mt-0">
          {/* Lane Departure Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image src={alert1Image} alt="Lane Departure" width={40} height={40} className="xl:w-[60px] xl:h-[60px]" />
            <p className="text-white font-medium text-[10px] sm:text-sm">{alert1}</p>
          </div>

          {/* Forward Collision Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image src={alert3Image} alt="Forward Collision" width={40} height={40} className="xl:w-[60px] xl:h-[60px]" />
            <p className="text-white font-medium text-[10px] sm:text-sm">{alert2}</p>
          </div>

          {/* Stop & Go Alert */}
          {model !== "model3" && (

            <div className="flex flex-col items-center space-y-2">
              <Image src={alert2Image} alt="Stop and Go" width={40} height={40} className="xl:w-[60px] xl:h-[60px]" />
              <p className="text-white font-medium text-[10px] sm:text-sm">{alert3}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
