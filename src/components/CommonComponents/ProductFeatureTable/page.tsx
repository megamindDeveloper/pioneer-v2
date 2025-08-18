"use client";

// // import { Typography } from "@/components/CommonComponents/Typography/Typography";
// import Image from "next/image";
// import React, { useState } from "react";
// import { ChevronRight } from "lucide-react";
// import { SpecsModal } from "../SpecsModal/SpecsModal";

// const features = [
//   "Video Resolution",
//   "AI Enabled Night Vision",
//   "Camera Setup",
//   "Model Dimensions",
//   "ADAS Alerts",
//   "ZenVue App Support",
//   "Storage Capacity",
// ];

// export default function ProductFeatureTable({ products,priorityProductIndex = 0,}: {products: typeof defaultProducts;priorityProductIndex?: number;}) {

//   const [open, setOpen] = useState(false);

//    const reorderedProducts = [
//     products[priorityProductIndex],
//     ...products.filter((_, i) => i !== priorityProductIndex),
//   ];
//   return (
//     <section className="b text-white px-4 md:px-8 py-20 max-w-6xl  xl:max-w-[90%] mx-auto mt-20">
//       <div className="max-w-7xl mx-auto text-center mb-16">
//         <h2 className=" text-center text-[48px] font-medium tracking-wide mb-2">
//           Which One’s Built for You?
//         </h2>
//         <p className="text-[#ABABAB]/80 text-sm md:text-base">Compare the key features across each model</p>
//       </div>

//       <div className="overflow-x-auto">
//         <div className="min-w-[800px] grid grid-cols-[200px_repeat(4,minmax(150px,1fr))] gap-x-6 text-left">
//           {/* Product Images and Links */}
//           <div />
//           {reorderedProducts.map((product, i) => (
//             <div key={i} className="text-center space-y-4">
//               <div className="relative w-40 h-28 mx-auto">
//                 {/* Gradient Overlay */}

//                 {/* Product Image */}
//                 <Image src={product.image} alt={product.name} fill className="object-contain w-full h-full relative z-0" />
//               </div>

//               <h3 className="text-[17px] font-bold">{product.name}</h3>
//               <div className="flex flex-col items-center">
//                 {product.name === "VREC - Z820DC" ? (
//                   <span className="text-[#8C8C8C] text-[14px] font-medium">Currently Viewing</span>
//                 ) : (
//                   <a href={product.link} className="text-[#AD2239] text-xs mb-1 font-extrabold">
//                     Learn More &gt;
//                   </a>
//                 )}
//                 <div className="my-6 w-[70%] h-[1px] bg-[#4B4B4B]/80" />
//               </div>
//             </div>
//           ))}
//           {/* Feature Rows */}
//           {features.map((feature, rowIndex) => (
//             <React.Fragment key={feature}>
//               <div className="py-6  text-[20px] font-bold">{feature}</div>
//               {products.map((product, colIndex) => (
//                 <div key={colIndex} className="py-6  text-[17px] text-center text-[#ABABAB] whitespace-pre-line">
//                   {product.features[rowIndex]}
//                 </div>
//               ))}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       <SpecsModal isOpen={open} onClose={() => setOpen(false)} />

//       <div className="modal py-12  flex items-center justify-center">
//         <button
//           onClick={() => setOpen(true)}
//           className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#262626] text-white text-md font-medium hover:bg-[#3a3a3a] transition"
//         >
//           Detailed Specs
//           <div className="bg-[#4F4C4C] rounded-full p-1">
//             <ChevronRight size={14} strokeWidth={2.5} />
//           </div>
//         </button>

//       </div>

//     </section>

//   );
// }

// why does this code have type error?

import Image from "next/image";
import React, { useState } from "react";



import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import { specsData } from "@/app/utils/specsData/specsData";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { SpecsModal } from "./SpecsModal";
import { Typography } from "../Typography/page";

const features = [
  "Video Resolution",
  "AI Enabled Night Vision",
  "Camera Setup",
  "Model Dimensions",
  "ADAS Alerts",
  "ZenVue App Support",
  "Storage Capacity",
];

// 👇 Accept `products` and `priorityProductIndex` as props
export default function ProductFeatureTable({
  products,
  priorityProductIndex = 0,
}: {
  products: typeof defaultProducts;
  priorityProductIndex?: number;
}) {
  const [open, setOpen] = useState(false);

  // Ensure priorityProductIndex is within bounds
  const safePriorityIndex = Math.max(0, Math.min(priorityProductIndex, products.length - 1));

  // Get specs data with fallback
  const currentSpecs = specsData[safePriorityIndex] || specsData[0] || [];

  // Reorder products so priority product comes first
  const reorderedProducts = [products[safePriorityIndex], ...products.filter((_, i) => i !== safePriorityIndex)];

  return (
    <section className="text-white bg-black md:pl-0 pl-4 md:px-8 py-20 max-w-6xl xl:max-w-[80%] mx-auto ">
      <div className="max-w-7xl mx-auto text-center mb-16">
      <Typography variant="section-heading" className="!font-semibold ">Which One’s Built for You?</Typography>
      <Typography variant="section-body" className="text-[#ABABAB]/80 lg:pt-[0.8em] xl:pt-0  text-sm md:text-base px-12 md:px-0">Compare the key features across each model</Typography>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] grid grid-cols-[200px_repeat(4,minmax(150px,1fr))] gap-x-6 text-left">
          {/* Product Columns */}
          <div />
          {reorderedProducts.map((product, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="relative w-40 h-28 mx-auto">
              {product.name === "VREC - H120SC" ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain md:!w-[80%] !w-[40%] mx-auto my-auto md:!h-[70%] relative z-0"
                  />
                ) : (
                  <Image src={product.image} alt={product.name} fill className="object-contain w-full h-full relative z-0" />
                )}
              </div>

              <Typography variant="comparison-grid-side-heading" className="font-bold">{product.name}</Typography>
              <div className="flex flex-col items-center">
                {i === 0 ? (
                  <span className="text-[#8C8C8C] text-[14px] font-medium">Currently Viewing</span>
                ) : (
                  <Link href={product.link} className="text-[#AD2239] text-xs mb-1 font-extrabold">
                    Learn More &gt;
                  </Link>
                )}
                <div className="my-6 w-[70%] h-[1px] bg-[#4B4B4B]/80" />
              </div>
            </div>
          ))}

          {/* Feature Rows */}
          {features.map((feature, rowIndex) => (
            <React.Fragment key={feature}>
            <Typography variant="comparison-grid-side-subheading" className="py-6  font-bold">{feature}</Typography>
              {reorderedProducts.map((product, colIndex) => (
                <div key={colIndex} className="py-6  text-center text-[#ABABAB] whitespace-pre-line">
                 <Typography variant="comparison-grid-body"> {product.features[rowIndex]}</Typography>   
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Modal Trigger */}
      <SpecsModal isOpen={open} onClose={() => setOpen(false)} specs={currentSpecs} />

      <div className="modal py-12 flex items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="bg-[#262626]  px-2 pl-4 py-2 cursor-pointer rounded-full text-white mt-12 flex text-[16px] font-medium items-center"
        >
          Detailed Specs
          <div className="bg-[#4F4C4C] rounded-full p-1 ml-2">
            <IconChevronRight size={14} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </section>
  );
}
