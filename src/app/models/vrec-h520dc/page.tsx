import { faqData } from '@/app/utils/FaqData/FaqData'
import { defaultProducts } from '@/app/utils/ProductData/ProductData'
import { Compare } from '@/components/CommonComponents/Compare/page'
import DriveSmarter from '@/components/CommonComponents/DriveSmarter/page'
import EverythingNeedToKnow from '@/components/CommonComponents/EverythingNeedToKnow/page'
import Footer from '@/components/CommonComponents/Footer/page'
import ProductFeatureTable from '@/components/CommonComponents/ProductFeatureTable/page'
import ZenVue from '@/components/CommonComponents/ZenVue/page'
import Blender2JSPageModel2 from '@/components/Model2Components/Blender2JSPageModel2/page'
import Model2textOverlay from '@/components/Model2Components/TextOverlayModel2/page'
import React from 'react'


const page = () => {
  return (
    <div className='bg-black'>
      <Blender2JSPageModel2/>
      {/* <Model2textOverlay /> */}
      <Compare
        tabs={[
          {
            tabtitle: "Drive every day?",

            heading: "Discover the Tools Built for Real Roads",
            subheading:
              "Smartly built for everyday drives, the H520DC offers clear 2K HDR footage, wide-road coverage and helpful driving alerts, all tuned for real conditions.",
            compareHeading: "Clear Footage in Motion and Light",
            compareSubheading:
              "With 2K HDR recording, the H520DC keeps your video sharp across bright sun, moving traffic, and fast-changing streets.",
            image1: "/productPageImages/comparisionImages/h520dc/GLOW_BEFORE.webp",
            image2: "/productPageImages/comparisionImages/h520dc/GLOW_AFTER.webp",
            compare:true
          },
          {
            tabtitle: "Need Wider Visibility?",

            heading: "Discover the Tools Built for Real Roads",
            subheading:
              "Smartly built for everyday drives, the H520DC offers clear 2K HDR footage, wide-road coverage and helpful driving alerts, all tuned for real conditions.",
            compareHeading: "Built for a Broader View ",
            compareSubheading:
              "The VREC-H520DC captures a wider view with its 140-degree lens, letting you see more of the road, side lanes, and unexpected moments others often miss.",
               image1: "/productPageImages/comparisionImages/h520dc/NOISE_BEFORE.webp",
            image2: "/productPageImages/comparisionImages/h520dc/NOICE_AFTER.webp",
            compare: true,
            beforeImageText:"",
            afterImageText:""
          },
          {
            tabtitle: "Prefer Dual Coverage?",
            heading: "Discover the Tools Built for Real Roads",
            subheading:
              "Smartly built for everyday drives, the H520DC offers clear 2K HDR footage, wide-road coverage and helpful driving alerts, all tuned for real conditions.",
            compareHeading: "Coverage That Looks Both Ways",
            compareSubheading:
              "The dual-channel Dash Cam records front and rear in high resolution, with sharp 2K footage ahead and Full HD behind for clear synchronized coverage.",
                image1: "/productPageImages/comparisionImages/h520dc/520 - 3rd card.webp",
            image2: "/productPageImages/comparisionImages/h520dc/520 - 3rd card.webp",
          },
        ]}
      />
      <ZenVue />
      <ProductFeatureTable products={defaultProducts} priorityProductIndex={1} />
      <EverythingNeedToKnow faqData={faqData.set2} />
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the H520DC brings to every drive."
           image="/productPageImages/driveSmarterImages/h520dc.webp"
      />

      <Footer />
    </div>
  )
}

export default page
