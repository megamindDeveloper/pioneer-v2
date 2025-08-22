"use client";

import Image from "next/image";
import Link from "next/link";

export default function ZenVue() {
  return (
    <section className="relative w-full min-h-screen  text-white mt-32 ">
      <div className="zen-vue-bg-grad absolute top-0 left-0 h-full w-full" />
      {/* Main Content */}
      <div className="relative z-10 max-w-[screen] mx-auto px-6 md:px-[5rem] py-12 md:py-20 lg:py-56 flex flex-col lg:flex-row justify-center gap-20 lg:gap-80 items-center lg:items-start">
        {/* Mobile Header */}
        <div className="block lg:hidden text-center w-full mt-6">
          <p className="text-[16px] text-white/70">Control at Your Fingertips</p>
        </div>

        {/* ZenVue Heading (Mobile) */}
        <div className="block lg:hidden w-full text-center mt-[-4rem] xl:mt-[-4rem]">
          <h1 className="text-[70px] xs:text-[48px] sm:text-[60px] leading-[1.1] font-bold">ZenVue</h1>
        </div>

        {/* App Description (Mobile) */}
        <p className="block lg:hidden text-white/80 text-[14px] sm:text-[14px] max-w-md mx-auto text-center mt-[-3rem] ">
          The Pioneer ZenVue Dash Camera App gives you instant access to your recordings, making it easy to view, download, and share footage on the
          go. With its intuitive, user-friendly interface, the experience is seamless from start to finish.
        </p>

        {/* Mobile Image */}
        <div className="block lg:hidden   justify-center mt-[-5rem]">
          <div className="w-[390px]  sm:w-[300px] md:w-[500px] h-auto">
            <Image
              src="/homePageImages/featureAccordionImages/test.png"
              alt="Mobile Device"
              width={1200}
              height={1200}
              className="w-full h-auto object-contain drop-shadow-7xl"
            />
          </div>
        </div>

        {/* Mobile "Available on" + Logos */}
        <div className="block lg:hidden text-center absolute bottom-6 ">
          <p className="text-[15px] text-white/70 mb-3 ">Available on</p>
          <div className="flex justify-center gap-6">
            <Link href="https://play.google.com/store/apps/details?id=com.pioneer.pioneer_dashcamconnect&pcampaignid=web_share" target="_blank">
              <Image src="/productPageImages/zenVueImages/googlePlay.png" alt="Google Play" width={130} height={40} className="object-contain" />
            </Link>
            <Link href=" https://apps.apple.com/app/zenvue-pioneer-dash-cameras/id6502138535" target="_blank">
              <Image src="/productPageImages/zenVueImages/appStore.png" alt="App Store" width={130} height={40} className="object-contain" />
            </Link>
          </div>
        </div>

        {/* Left Content (Desktop) */}
        <div className=" space-y-6 text-center lg:text-left order-3 lg:order-none hidden lg:block">
          <p className="text-[16px] text-white/70 lg:mx-8">Control at Your Fingertips</p>
          <h1 className="tracking-wider text-[160px] lg2:text-[180px] leading-none mt-[-14px] ms-5 pl-2 font-bold text-white">Zen</h1>
          <p className="text-white/80 text-[12px] max-w-[21rem] mx-auto lg:ml-9 mr-12 ">
            The Pioneer ZenVue Dash Camera App gives you instant access to your recordings, making it easy to view, download, and share footage on the
            go. With its intuitive, user-friendly interface, the experience is seamless from start to finish.
          </p>
        </div>

        {/* Center Image for Desktop */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[52%] z-20 w-auto h-[700px] items-center justify-center">
          <Image
            src="/homePageImages/featureAccordionImages/test.png"
            alt="Mobile Device"
            width={1000}
            height={1000}
            className="drop-shadow-3xl w-full h-full object-cover"
          />
        </div>

        {/* Right Title & Store Buttons (Desktop) */}
        <div className="hidden lg:flex flex-col items-end mt-[-3.5rem]  text-right space-y-4">
          <h1 className="text-[160px] lg2:text-[180px] tracking-wider ml-5 mt-[5.3rem] leading-none font-bold text-white">Vue</h1>
          <p className="text-sm text-white/70 mr-6">Available on</p>
          <div className="flex gap-3 space-x-2 mt-0 mr-6">
            <Link href="https://play.google.com/store/apps/details?id=com.pioneer.pioneer_dashcamconnect&pcampaignid=web_share" target="_blank">
              <Image src="/productPageImages/zenVueImages/googlePlay.png" alt="Google Play" width={140} height={45} className="object-contain" />
            </Link>
           
            <Link href=" https://apps.apple.com/app/zenvue-pioneer-dash-cameras/id6502138535" target="_blank">
              <Image src="/productPageImages/zenVueImages/appStore.png" alt="App Store" width={120} height={45} className="object-contain" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
