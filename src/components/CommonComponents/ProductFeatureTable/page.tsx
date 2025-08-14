'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import { db } from "@/app/utils/Firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { SpecsModal } from "./SpecsModal";

export default function ProductFeatureTable({
  priorityProductIndex = 0,
}: {
  priorityProductIndex?: number;
}) {
  const [open, setOpen] = useState(false);
  const [featureRows, setFeatureRows] = useState<any[]>([]);

  const pathname = usePathname(); // e.g., "/vrec-z820sc"


  // Map each page path to the priority product index
  const pageToIndexMap: Record<string, number> = {
    "/vrec-z820dc": 0, // index of Z820DC in defaultProducts
    "/vrec-h120dc": 1,
    "/vrec-h320sc": 2,
    "/vrec-h520dc": 3,
  };


  // Fetch comparison chart data from Firestore
useEffect(() => {
  const fetchData = async () => {
    const q = query(
      collection(db, "comparison_chart"),
      orderBy("priority", "asc") // smallest number appears first
    );

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


    const snapshot = await getDocs(q);
    const rows: any[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
        console.log(doc.id, doc.data(),"maa");
      rows.push(data);
    console.log(snapshot,"add");
    });

    setFeatureRows(rows);
  };

  fetchData();
}, []);

  // Reorder products to make the priority one first
  const reorderedProducts = [
    defaultProducts[priorityProductIndex],
    ...defaultProducts.filter((_, i) => i !== priorityProductIndex),
  ];

  // Model keys matching Firestore field names
  const modelKeys = reorderedProducts.map((product) => {
    const match = product.name.match(/\s*-\s*(\w+)/);
    return match ? match[1] : ""; // e.g., "Z820DC"
  });
  return (
    <section className="text-white px-4 md:px-8 py-20 max-w-6xl xl:max-w-[90%] mx-auto mt-20">
      <div className="max-w-7xl mx-auto text-center mb-18">
        <h2 className="text-center text-[27px] md:text-[48px] font-medium tracking-wide mb-2">
          Which One’s Built for You?
        </h2>
        <p className="text-[#ABABAB]/80 text-xs md:text-sm ">
          Compare the key features across each model
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px] grid grid-cols-[200px_repeat(4,minmax(150px,1fr))] sm:gap-x-15 gap-x-10 text-left">
          {/* Product Headers with Image */}
          <div />
          {reorderedProducts.map((product, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="relative w-40 h-28 mx-auto">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain w-full h-full relative z-0"
                />
              </div>
              <h3 className="text-[17px] font-bold">{product.name}</h3>
              <div className="flex flex-col items-center">
                {i === 0 ? (
                  <span className="text-[#8C8C8C] text-[14px] font-medium">Currently Viewing</span>
                ) : (
                  <a href={product.link} className="text-[#AD2239] text-xs mb-1 font-extrabold">
                    Learn More &gt;
                  </a>
                )}
                <div className="my-6 w-[70%] h-[1px] bg-[#4B4B4B]/80" />
              </div>
            </div>
          ))}

            {/* Features from Firestore */}
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

       <SpecsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        modelKey={modelKeys[0]} // 👈 Use first (priority) model's key
      />
      <div className="modal py-12 flex items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#262626] text-white text-md font-medium hover:bg-[#3a3a3a] transition"
        >
          Detailed Specs
          <div className="bg-[#4F4C4C] rounded-full p-1">
            <ChevronRight size={14} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </section>
  );
}
