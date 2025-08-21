"use client";

import Image from "next/image";
import amazonLogo from "../../../../public/svgs/amazon.svg"; // replace with your path
import noonLogo from "../../../../public/svgs/noon.svg"; // replace with your path
import productImage from "../../../../public/Images/dashCamLogo.png"; // replace with your path
import Link from "next/link";

type DriveSmarterProps = {
  subText?: string;
  image: string;
  amazonLink?: string;
  noonLink?: string;
};

export default function DriveSmarter({ subText, image, amazonLink, noonLink }: DriveSmarterProps) {
  return (
    <section className="bg-black text-white px-4 md:px-16 lg:px-32 py-12 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-[#E2E2E2]">Drive Smarter, Safer & Sharper</h2>
          <p className="text-[#ABABAB] text-base md:text-lg max-w-md">{subText}</p>

          <div className="flex space-x-6 items-center">
            {amazonLink && (
              <Link href={amazonLink} target="_blank">
                <Image src={amazonLogo} alt="Amazon" className="h-8 w-auto md:h-10" />
              </Link>
            )}
            {/* <Image src={noonLogo} alt="Noon" className="h-8 w-auto md:h-10 mt-[-12px]" /> */}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex justify-center md:justify-end">
          <Image width={500} height={500} src={image} alt="Pioneer Dashcam" className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain" />
        </div>
      </div>
    </section>
  );
}
