"use client";



// why does this code have type error?

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import { specsData } from "@/app/utils/specsData/specsData";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { SpecsModal } from "./SpecsModal";
import { Typography } from "../Typography/page";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { db } from "@/app/utils/Firebase/firebaseConfig";

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
  // products,
  priorityProductIndex = 0,
}: {
  // products: typeof defaultProducts;
  priorityProductIndex?: number;
}) {


  const scrollerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [featureRows, setFeatureRows] = useState<any[]>([]);
  const pathname = usePathname(); // e.g., "/vrec-z820sc"



  // // Ensure priorityProductIndex is within bounds
  // const safePriorityIndex = Math.max(0, Math.min(priorityProductIndex, products.length - 1));

  // // Get specs data with fallback
  // const currentSpecs = specsData[safePriorityIndex] || specsData[0] || [];

  // // Reorder products so priority product comes first
  // const reorderedProducts = [products[safePriorityIndex], ...products.filter((_, i) => i !== safePriorityIndex)];






  // Map each page path to the priority product index
  const pageToIndexMap: Record<string, number> = {
    "/vrec-z820dc": 0, // index of Z820DC in defaultProducts
    "/vrec-h120sc": 1,
    "/vrec-h320sc": 2,
    "/vrec-h520dc": 3,
  };

  const prioritySpecIndex = pageToIndexMap[pathname] ?? 0;





useEffect(() => {
  const fetchData = async () => {
    try {
      // 🔥 Query Firestore collection ordered by priority
      const q = query(
        collection(db, "comparison_chart"),
        orderBy("priority", "asc") // or "desc" depending on your needs
      );

      const snapshot = await getDocs(q);
      const rows: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push(data); 
        // Example: { feature: "ZenVue App Support", H120SC: "NPP", H320SC: "Yes", ... , priority: 1 }
      });

      setFeatureRows(rows);
    } catch (error) {
      console.error("Error fetching comparison chart:", error);
    }
  };

  fetchData();
}, []);

  // Reorder products to make the priority one first
  const reorderedProducts = [
    defaultProducts[priorityProductIndex],
    ...defaultProducts.filter((_, i) => i !== priorityProductIndex),
  ];
  console.log(reorderedProducts)
  // Model keys matching Firestore field names
  const modelKeys = reorderedProducts.map((product) => {
    const match = product.name.match(/\s*-\s*(\w+)/);
    return match ? match[1] : ""; // e.g., "Z820DC"
  });


  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const el = scrollerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // calculate max shift
            const maxShift = Math.min(260, el.scrollWidth - el.clientWidth);
            if (maxShift <= 0) return;

            // play GSAP animation
            gsap.timeline({ defaults: { ease: "power1.inOut" } })
              .to(el, { scrollLeft: maxShift, duration: 1 })
              .to(el, { scrollLeft: 0, duration: 1 }, "+=0");
          } else {
            // reset scroll if needed when leaving
            gsap.set(el, { scrollLeft: 0 });
          }
        });
      },
      { threshold: 0.6 } // play when 60% of the element is visible
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="text-white bg-black md:pl-0 pl-4 md:px-8 py-20 max-w-6xl xl:max-w-[80%] mx-auto ">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <Typography variant="section-heading" className="!font-semibold ">Which One’s Built for You?</Typography>
        <Typography variant="section-body" className="text-[#ABABAB]/80 lg:pt-[0.8em] xl:pt-0  text-sm md:text-base px-12 md:px-0">Compare the key features across each model</Typography>
      </div>

      <div className="overflow-x-auto" ref={scrollerRef}>
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
         {featureRows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="py-6 text-[20px] font-semibold">{row.feature}</div>
              {modelKeys.map((modelKey, colIndex) => (
                <div
                  key={colIndex}
                  className="py-6 text-[17px] text-center text-[#ABABAB] whitespace-pre-line"
                >
                  {row[modelKey] || "-"}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Modal Trigger */}
  <SpecsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        modelKey={modelKeys[0]} // 👈 Use first (priority) model's key
      />
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
