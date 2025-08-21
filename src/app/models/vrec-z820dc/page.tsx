"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { faqData } from "@/app/utils/FaqData/FaqData";
import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import { Compare } from "@/components/CommonComponents/Compare/page";
import DriveSmarter from "@/components/CommonComponents/DriveSmarter/page";
import EverythingNeedToKnow from "@/components/CommonComponents/EverythingNeedToKnow/page";
import Footer from "@/components/CommonComponents/Footer/page";
import HomeButton from "@/components/CommonComponents/HomeButton/page";
import ProductFeatureTable from "@/components/CommonComponents/ProductFeatureTable/page";
import ZenVue from "@/components/CommonComponents/ZenVue/page";
import Blender2JSPageModel1Mobile from "@/components/Model1Components/Blender2JsMobile/page";
import Blender2JSPageModel1 from "@/components/Model1Components/Blender2JSPageModel1/page";

import Model1TextOverlay from "@/components/Model1Components/TextOverlayModel1/page";
import React, { useState } from "react";

const page = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  // --- ADD THIS NEW CALLBACK FUNCTION ---
  const handleAnimationStartReverse = () => {
    setIsAnimationComplete(false);
  };
console.log(isAnimationComplete)

  return (
    <div className="bg-black">
      <HomeButton />
      {isDesktop && <Blender2JSPageModel1 onAnimationComplete={handleAnimationComplete}
          onAnimationStartReverse={handleAnimationStartReverse}
 />}
      {!isDesktop && <Blender2JSPageModel1Mobile />}
      {isAnimationComplete && (
        <>
          <Compare
            tabs={[
              {
                heading: "See What Most Cameras Miss",
                subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
                compareHeading: "Designed for the Details",
                compareSubheading:
                  "Most dashcams blur the truth at night. The Z820DC, equipped with night vision AI and a STARVIS sensor, captures license plates, movements and moments even in low light.",
                tabtitle: "Drive Late?",
                image1: "/productPageImages/comparisionImages/z820dc/GLOW_BEFORE.webp",
                image2: "/productPageImages/comparisionImages/z820dc/GLOW_AFTER.webp",
                beforeImageText: "Normal Dashcams",
                afterImageText: "With Night Vision AI & STARVIS image sensor",
                compare: true,
              },
              {
                heading: "See What Most Cameras Miss",
                subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
                compareHeading: "Clarity That Keeps Up With Your Commute ",
                compareSubheading:
                  "From sharp sunlight to shadowy underpasses, the Sony STARVIS sensor adapts in real time — handling glare, contrast and light shifts with ease for clear and consistent footage in every driving condition.",
                tabtitle: "On The Road Daily?",
                image1: "/productPageImages/comparisionImages/z820dc/820_before.webp",
                image2: "/productPageImages/comparisionImages/z820dc/820_After.webp",
                beforeImageText: "Normal Dashcams",
                afterImageText: "With STARVIS image sensor",
                compare: true,
              },
              {
                heading: "See What Most Cameras Miss",
                subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
                compareHeading: "Coverage That Keeps Both Ends Clear",
                compareSubheading:
                  "The VREC-Z820DC captures ultra-sharp 4K footage from the front and Full HD from the rear. With dual cameras work ing together, you get full-scene clarity, whether you're on the move or parked.",
                tabtitle: "Prefer 4k Coverage?",
                image2: "/productPageImages/comparisionImages/z820dc/820-3rd.webp",
                image1: "/productPageImages/comparisionImages/z820dc/820-3rd.webp",
              },
            ]}
          />

          <ZenVue />
          <section className="bg-black">
            <ProductFeatureTable products={defaultProducts} priorityProductIndex={0} />
          </section>

          <EverythingNeedToKnow faqData={faqData.set1} />
          <DriveSmarter
            subText="Drive with confidence, capture every moment, & stay protected. Explore what the Z820DC brings to every drive."
            image="/productPageImages/driveSmarterImages/z820dc.webp"
            amazonLink="https://www.amazon.ae/Pioneer-Camera-VREC-Z820DC-STARVIS-Logging/dp/B0FFGT6W64/?_encoding=UTF8&pd_rd_w=Y0Sho&content-id=amzn1.sym.f3dfb22d-d9f5-4e81-84a1-ea09e77060d5%3Aamzn1.symc.fc11ad14-99c1-406b-aa77-051d0ba1aade&pf_rd_p=f3dfb22d-d9f5-4e81-84a1-ea09e77060d5&pf_rd_r=2Y171QKMH2AW1QDSCDXM&pd_rd_wg=cOfd6&pd_rd_r=76773a37-41c7-45cd-a58f-22179c9bb919&ref_=pd_hp_d_atf_ci_mcx_mr_ca_hp_atf_d"
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default page;
