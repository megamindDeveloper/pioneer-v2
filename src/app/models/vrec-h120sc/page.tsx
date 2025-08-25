"use client";
import React from 'react'

import Blender2JSPageModel4 from '@/components/Model4Components/Blender4JSPageModel4/page';
import Model4TextOverlay from '@/components/Model4Components/TextOverlayModel4/page';
import { Compare } from '@/components/CommonComponents/Compare/page';
import ZenVue from '@/components/CommonComponents/ZenVue/page';
import ProductFeatureTable from '@/components/CommonComponents/ProductFeatureTable/page';
import { defaultProducts } from '@/app/utils/ProductData/ProductData';
import EverythingNeedToKnow from '@/components/CommonComponents/EverythingNeedToKnow/page';
import { faqData } from '@/app/utils/FaqData/FaqData';
import DriveSmarter from '@/components/CommonComponents/DriveSmarter/page';
import Footer from '@/components/CommonComponents/Footer/page';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import Blender2JSPageModel4Mobile from '@/components/Model4Components/Blender2JsPageMobile/page';
import HomeButton from '@/components/CommonComponents/HomeButton/page';



const page = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div className='bg-black'>
      <HomeButton/>
     {isDesktop && <Blender2JSPageModel4/>}
      {!isDesktop && <Blender2JSPageModel4Mobile />}

      <Compare
        tabs={[
          {
            heading: "Designed to Keep Things Simple ",
            subheading: "The VREC-H120SC is built for simplicity with a clean design, Full HD clarity and essential features that fit into any drive, without getting in the way.",
            compareHeading: "A Compact Fit for Every Drive",
            compareSubheading:
              "This model fits neatly into your windshield space without blocking your view. A clean look with no distractions, just smart recording.",
            tabtitle: "Need something compact?",
            image1: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
          },
          {
            heading: "Designed to Keep Things Simple ",
            subheading: "The VREC-H120SC is built for simplicity with a clean design, Full HD clarity and essential features that fit into any drive, without getting in the way.",
            compareHeading: "Built for Beginners",
            compareSubheading:
              "The VREC-H120SC keeps things simple with clear recording and no complicated setup, making it ideal if you're new to dashcams.",
            tabtitle: "First dashcam?",
            image1: "/productPageImages/comparisionImages/h120sc/120-1st  (1).webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-1st  (1).webp",
          },
          {
            heading: "Designed to Keep Things Simple ",
            subheading: "The VREC-H120SC is built for simplicity with a clean design, Full HD clarity and essential features that fit into any drive, without getting in the way.",
            compareHeading: "Clarity That Keeps Up With Your Commute",
            compareSubheading:
              "The VREC-H120SC records in 1296p with a 2MP sensor, giving you sharper footage that makes it easier to read plates, spot signs and review details when it matters.",
            tabtitle: "Crystal Clear, Every Drive",
            image2: "/productPageImages/comparisionImages/h120sc/120 AFTER.webp",
            image1: "/productPageImages/comparisionImages/h120sc/120 BEFORE.webp",
            afterImageText:"VREC-H120SC’s View",
            beforeImageText:"Normal Dashcams",
            compare:true,
          },
        ]}
      />
      <ZenVue />
      <section className="bg-black">
   <ProductFeatureTable

                     
                    // products={defaultProducts}
                    priorityProductIndex={3} />            </section>
<EverythingNeedToKnow collectionName="faq_detailed_specs_H120SC"  />     
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the Z820DC brings to every drive."
        image="/homePageImages/productDetailsImage/h120scImages/0057 3 (3).png"
        amazonLink='https://www.amazon.ae/Pioneer-VREC-H120SC-Resolution-Emergency-Recording/dp/B0F3P5TT8T/ref=sr_1_1?crid=3R4N0X0D03ADX&dib=eyJ2IjoiMSJ9.s-iSMezIPvu4bZM8oJxRfx52whbEZfwXiwZxGQyGJH5PgEHrPF-_7eXob3XB7-KGvWIfbOZmRpwKBL66cssjoA.a1SotwEmRrTfpKjy6hu9g8Sj_CLlQFYpfnNg87wsttA&dib_tag=se&keywords=vrec-h120sc&qid=1746093914&s=amazon-ereaders&sprefix=vrec-h120s%2Camazon-devices%2C208&sr=1-1'
      />
      <Footer />
    </div>
  )
}

export default page
