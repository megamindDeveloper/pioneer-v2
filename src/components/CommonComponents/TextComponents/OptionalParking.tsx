import { Typography } from "../Typography/page";

type OptionalParkingProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
  description: string;
  style: string;
};

export default function OptionalParking({ highlightedText, heading, subheading, description, style }: OptionalParkingProps) {
  return (
    <>
      <main className={`min-h-screen  text-white relative ${style} text-center sm:text-left`}>
        {/* Top Content Block */}
        <div className="w-full sm:mt-1 mt-[-25rem] text-center sm:max-w-[550px]  max-w-[350px] sm:ml-[6%]">
          {/* Red Label */}

          <Typography variant="slider-heading" className="text-[#AD2239]  font-bold">
            {highlightedText}
          </Typography>
          {/* Heading */}
          {/* <h1 className="lg2:text-[56px] lg:text-[46px] leading-tight text-[32px]   text-white text-center font-medium mt-2  max-w-[300px] mx-auto left-full lg:max-w-[400px] lg2:max-w-[500px] mb-4">
            {heading}
            <span className="text-[#313131]">*</span>
          </h1> */}
          <Typography variant="section-heading" className="font-medium  text-center text-white px-12 md:px-8 sm:max-w-[550px]  max-w-[350px]">
            {heading}<span className="text-[#313131]">*</span>
          </Typography>
          {/* Subheading */}
          <p className="text-[#ABABAB]/80 text-[14px] sm:max-w-[550px]  max-w-[350px] leading-snug ">{subheading}</p>
        </div>

        {/* Disclaimer (Bottom Center on all screens) */}
        <div className=" lg:hidden block h-[110vh] absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none " />

        {/* <p className="absolute bottom-6 sm:max-w-[550px]  max-w-[400px] sm:bottom-10 ms-6 text-[13px] text-[#4B4B4B] text-center px-4">
          {description}
        </p> */}
         <Typography variant="section-card-body" className="absolute bottom-6 sm:max-w-[550px]  max-w-[350px] sm:bottom-10 ms-6 text-[13px] text-[#4B4B4B] text-center px-4">{description}</Typography>
      </main>
    </>
  );
}
