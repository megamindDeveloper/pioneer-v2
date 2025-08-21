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
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "A Compact Fit for Every Drive",
            compareSubheading:
              "This model fits neatly into your windshield space without blocking your view. A clean look with no distractions, just smart recording.",
            tabtitle: "Need something compact?",
            image1: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Built for Beginners",
            compareSubheading:
              "The VREC-H120SC keeps things simple with clear recording and no complicated setup, making it ideal if you're new to dashcams.",
            tabtitle: "First dashcam?",
            image1: "/productPageImages/comparisionImages/h120sc/120-1st  (1).webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-1st  (1).webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Clarity That Keeps Up With Your Commute",
            compareSubheading:
              "The VREC-H120SC records in 1296p with a 2MP sensor, giving you sharper footage that makes it easier to read plates, spot signs and review details when it matters.",
            tabtitle: "Want a simple setup?",
            image2: "/productPageImages/comparisionImages/h120sc/120 BEFORE.webp",
            image1: "/productPageImages/comparisionImages/h120sc/120 AFTER.webp",
            afterImageText:"VREC-H120SC’s View",
            beforeImageText:"Normal Dashcams",
            compare:true,
          },
        ]}
      />
      <ZenVue />
      <section className="bg-black">
        <ProductFeatureTable products={defaultProducts} priorityProductIndex={3} />
      </section>
      <EverythingNeedToKnow faqData={faqData.set4} />
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the Z820DC brings to every drive."
        image="/homePageImages/productDetailsImage/h120scImages/0057 3 (3).png"
      />
      <Footer />
    </div>
  )
}

export default page
