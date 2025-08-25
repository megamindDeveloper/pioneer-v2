"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/app/utils/Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";

// Retailer type from Firestore
type Retailer = {
  name: string;
  logo: string; // storage path like "retailer_logos/1_logo.png"
  productLink: string;
  countryCode: string; // e.g., "IN", "US", "AE"
};

// Props for DriveSmarter
type DriveSmarterProps = {
  subText?: string;
  image: string; // product image
  currentCountry: string; // filter retailers by this
  model: string; // Firestore doc ID e.g. "H120SC"
};

export default function DriveSmarter({
  subText,
  image,
  currentCountry,
  model,
}: DriveSmarterProps) {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [images, setImages] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(true);

  // Fetch retailers from Firestore + Storage
  useEffect(() => {
    async function fetchRetailers() {
      try {
        const docRef = doc(db, "retailerHyperlinks", model);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const fetchedRetailers: Retailer[] = data.retailers || [];
          setRetailers(fetchedRetailers);
          console.log(fetchedRetailers, "kjn");

          // Load logos from Firebase Storage
          const newImages: { [key: string]: string | null } = {};
          await Promise.all(
            fetchedRetailers.map(async (retailer) => {
              if (retailer.logo) {
                try {
                  const url = await getDownloadURL(ref(storage, retailer.logo));
                  newImages[retailer.name] = url;
                } catch (err) {
                  console.warn(`Logo not found in storage for ${retailer.name}`);
                  newImages[retailer.name] = null;
                }
              } else {
                newImages[retailer.name] = null;
              }
            })
          );

          setImages(newImages);
        } else {
          setRetailers([]);
          setImages({});
        }
      } catch (err) {
        console.error("Error fetching retailers:", err);
      } finally {
        setLoading(false);
      }
    }



    fetchRetailers();
  }, [model]);

  // Filter by country
  const availableRetailers = (retailers || []).filter(
    (retailer) => retailer.countryCode === currentCountry
  );

  return (
    <section className="bg-black text-white px-4 md:px-16 lg:px-32 py-12 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Title, Subtext, Retailer Logos */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-semibold text-center md:text-left leading-tight text-[#E2E2E2]">
            Drive Smarter, Safer & Sharper
          </h2>

          <p className="text-[#ABABAB] text-base md:text-lg max-w-md text-center md:text-left">
            {subText}
          </p>

          {/* Retailer Section */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 justify-center md:justify-start min-h-[40px]">
            {loading ? (
              <p className="text-[#666]">Loading retailers...</p>
            ) : availableRetailers.length > 0 ? (
              availableRetailers.map((retailer) => (
                <Link
                  href={retailer.productLink}
                  key={retailer.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-110 focus:scale-110"
                  aria-label={`Buy from ${retailer.name}`}
                >
                  {images[retailer.name] ? (
                    <Image
                      src={images[retailer.name]!}
                      alt={`${retailer.name} logo`}
                      className="h-8 w-auto md:h-10"
                      width={100}
                      height={40}
                      unoptimized
                    />
                  ) : (
                    <span className="text-[#666]">{retailer.name}</span>
                  )}
                </Link>
              ))
            ) : (
              <p className="text-[#666] text-center md:text-left">
                Currently not available for purchase in this region.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Product Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            width={500}
            height={500}
            src={image}
            alt="Pioneer Dashcam"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}
