"use client";
import { useMediaQuery } from '@/app/hooks/useMediaQuery'
import { faqData } from '@/app/utils/FaqData/FaqData'
import { defaultProducts } from '@/app/utils/ProductData/ProductData'
import { Compare } from '@/components/CommonComponents/Compare/page'
import DriveSmarter from '@/components/CommonComponents/DriveSmarter/page'
import EverythingNeedToKnow from '@/components/CommonComponents/EverythingNeedToKnow/page'
import Footer from '@/components/CommonComponents/Footer/page'
import ProductFeatureTable from '@/components/CommonComponents/ProductFeatureTable/page'
import ZenVue from '@/components/CommonComponents/ZenVue/page'
import Blender2JSPageModel3Mobile from '@/components/Model3Compontnts/Blender2jsPageMode3Mobile/page';
import Blender2JSPageModel3 from '@/components/Model3Compontnts/Blender3JSPageModel3/page'
import Model3textOverlay from '@/components/Model3Compontnts/TextOverlayModel3/page'
import React from 'react'


const page = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div className='bg-black'>
        
        {isDesktop && <Blender2JSPageModel3 />}
      {!isDesktop && <Blender2JSPageModel3Mobile />}

      {/* <Model3textOverlay /> */}
      <Compare
        tabs={[
          {
            tabtitle: "Want Driving Alerts?",

            heading: "Get More from Your Daily Drive",
            subheading: "The VREC-H320SC adds smart driving support, automatic event recording and clear video built for real road conditions.",
            compareHeading: "Helps You Focus on the Drive",
            compareSubheading: "Built-in alerts respond to sudden shifts and lane drifts, giving you a second set of eyes when the road gets busy.",
            image1: "/productPageImages/comparisionImages/h320sc/320-WD.webp",
            image2: "/productPageImages/comparisionImages/h320sc/320-WD.webp",
          },
          {
            tabtitle: "Prefer Auto Recording?",

            heading: "Get More from Your Daily Drive",
            subheading: "The VREC-H320SC adds smart driving support, automatic event recording and clear video built for real road conditions.",
            compareHeading: "Always Ready to Record",
            compareSubheading:
              "When motion or impact is detected, the VREC-320SC begins recording automatically. With parking mode enabled, it helps to capture unexpected incidents even while your car is parked.",
            image1: "/productPageImages/comparisionImages/h320sc/320-PAR.webp",
            image2: "/productPageImages/comparisionImages/h320sc/320-PAR.webp",
          },
          {
            tabtitle: "Need Clear Footage?  ",
            heading: "Get More from Your Daily Drive",
            subheading: "The VREC-H320SC adds smart driving support, automatic event recording and clear video built for real road conditions.",
            compareHeading: "Built for Shifting Light Conditions",
            compareSubheading: "From harsh sunlight to shaded corners, WDR and Full HD work together to keep your video balanced and clear.",
            image2: "/productPageImages/comparisionImages/h320sc/320_BEFORE.webp",
            image1: "/productPageImages/comparisionImages/h320sc/320 AFTER.webp",
            compare:true,
          },
        ]}
      />
      <ZenVue />
      <ProductFeatureTable
      //  products={defaultProducts} 
      priorityProductIndex={2} />
      <EverythingNeedToKnow   collectionName="faq_detailed_specs_H320SC" />
      <div className='bg-black'>

      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the H320SC brings to every drive."
               image="/productPageImages/driveSmarterImages/h320sc.webp"
      />
      </div>
      <Footer />

    </div>
  )
}

export default page
