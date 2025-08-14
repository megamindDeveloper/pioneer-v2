"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { faqData } from "@/app/utils/FaqData/FaqData";
import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import { Compare } from "@/components/CommonComponents/Compare/page";
import DriveSmarter from "@/components/CommonComponents/DriveSmarter/page";
import EverythingNeedToKnow from "@/components/CommonComponents/EverythingNeedToKnow/page";
import Footer from "@/components/CommonComponents/Footer/page";
import ProductFeatureTable from "@/components/CommonComponents/ProductFeatureTable/page";
import ZenVue from "@/components/CommonComponents/ZenVue/page";
import Blender2JSPageModel1Mobile from "@/components/Model1Components/Blender2JsMobile/page";
import Blender2JSPageModel1 from "@/components/Model1Components/Blender2JSPageModel1/page";


import Model1TextOverlay from "@/components/Model1Components/TextOverlayModel1/page";
import React from "react";

const page = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div className="bg-black">
      
      {isDesktop && <Blender2JSPageModel1 />}
      {!isDesktop && <Blender2JSPageModel1Mobile />}
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
        <ProductFeatureTable 
        // products={defaultProducts}
         priorityProductIndex={0} />
      </section>
       
      <EverythingNeedToKnow   collectionName="faq_detailed_specs_Z820DC" />
     <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the Z820DC brings to every drive."
        image="/productPageImages/driveSmarterImages/z820dc.webp"
      />
      <Footer /> 
    </div>
  );
};

export default page;
