"use client";

import { db } from "@/app/utils/Firebase/firebaseConfig";
import { Typography } from "@/components/CommonComponents/Typography/page";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const products = [
  {
    key: "Z820DC",
    name: "VREC - Z820DC",
    image: "/modelImages/VREC-Z820DC/thumb.png", // Replace with actual image path
    link: "/models/vrec-z820dc",
    features: ["4K", "Yes", "Front\n+\nRear", "104mm x 26.7mm\n x  43mm", "Yes", "Yes", "Up to 512GB"],
  },
  {
    key: "H520DC",
    name: "VREC - H520DC",
    image: "/modelImages/VREC-H520DC/thumb.png",
    link: "/models/vrec-h520dc",
    features: ["2K", "-", "Front\n+\nRear", "90mm x 34.8mm \n x 54.25mm", "Yes", "Yes", "Up to 512GB"],
  },
  {
    key: "H320SC",
    name: "VREC - H320SC",
    image: "/modelImages/VREC-H320SC/thumb.png",
    link: "/models/vrec-h320sc",
    features: ["Full HD", "-", "Front \n+\n Rear (Optional)", "90mm x 34.8mm\n  x 54.25mm", "Yes", "Yes", "Up to 512GB"],
  },
  {
    key: "H120SC",
    name: "VREC - H120SC",
    image: "/modelImages/VREC-H120SC/thumb.png",
    link: "/models/vrec-h120sc",
    features: ["1.5K", "-", "Front", "31.12mm x 28.8mm\n  x 37.33mm", "-", "Yes", "Up to 128GB"],
  },
];

const features = [
  "Video Resolution",
  "AI Enabled Night Vision",
  "Camera Setup",
  "Model Dimensions",
  "ADAS Alerts",
  "ZenVue App Support",
  "Storage Capacity",
];

export default function ProductComparisonTable({ priorityProductIndex = 0, }: { priorityProductIndex?: number }) {

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [featureRows, setFeatureRows] = useState<any[]>([]);
  const pathname = usePathname(); // e.g., "/vrec-z820sc"

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

  const reorderedProducts = [
    products[priorityProductIndex],
    ...products.filter((_, i) => i !== priorityProductIndex),
  ];
  console.log(reorderedProducts)
  // Model keys matching Firestore field names
  const modelKeys = reorderedProducts.map((product) => product.key);

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
    <section className=" text-white md:px-4 px-0  md:pl-0  py-20  max-w-[100%] xl:max-w-[90%] mx-auto md:mt-20">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <Typography variant="section-heading" className="!font-semibold ">
          Pick Your Level of Performance
        </Typography>
        <Typography variant="section-body" className="text-[#ABABAB]/80 lg:pt-[0.8em] xl:pt-0  text-sm md:text-base px-12 md:px-0">
          See how each dashcam delivers on clarity, safety and control.
        </Typography>
      </div>

      <div className="overflow-x-auto" ref={scrollerRef}>
        <div className="min-w-[800px] pl-12 grid grid-cols-[200px_repeat(4,minmax(140px,1fr))] gap-x-6  text-left">
          {/* Product Images and Links */}
          <div />
          {products.map((product, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="relative w-32 lg2:w-40 h-28 mx-auto">
                {/* Gradient Overlay */}

                {/* Product Image */}
                {product.name === "VREC - H120SC" ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain md:!w-[80%] !w-[55%] lg:mx-auto my-auto md:!h-[70%] relative z-0"
                  />
                ) : (
                  <Image src={product.image} alt={product.name} fill className="object-contain w-full h-full relative z-0" />
                )}
              </div>

              <Typography variant="comparison-grid-side-heading" className="font-bold">
                {product.name}
              </Typography>
              <div className="flex flex-col items-center">
                <Typography variant="comparison-grid-body" className="text-[#AD2239] cursor-pointer  mb-1 font-extrabold">
                  <Link href={product.link}>Learn More &gt;</Link>
                </Typography>
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
    </section>
  );
}