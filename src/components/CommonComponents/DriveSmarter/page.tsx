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
  // currentCountry: string; // filter retailers by this
  model: string; // Firestore doc ID e.g. "H120SC"
};

export default function DriveSmarter({
  subText,
  image,

  model,
}: DriveSmarterProps) {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [images, setImages] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(true);
  const [currentCountry, setCurrentCountry] = useState<string>("");

  // Fetch retailers from Firestore + Storage
  // Fetch retailers from Firestore (no need for getDownloadURL)

  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setCurrentCountry(data.country);
        console.log(res, "ressss");
        // e.g. "IN", "US"
      } catch (err) {
        console.error("Failed to detect country, defaulting to US:", err);
        setCurrentCountry("US"); // fallback
      }
    }

    detectCountry();
  }, []);


  useEffect(() => {
    if (!currentCountry) return;
    async function fetchRetailers() {
      try {
        // ✅ fix doc path
        const docRef = doc(db, "retailerHyperlinks", `detailed_specs_${model}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const fetchedRetailers: Retailer[] = data.retailers || [];
          setRetailers(fetchedRetailers);

          // ✅ logos are already full URLs, no need for getDownloadURL
          const newImages: { [key: string]: string | null } = {};
          fetchedRetailers.forEach((retailer) => {
            newImages[retailer.name] = retailer.logo || null;
          });

          setImages(newImages);
        } else {
          console.warn(`No doc found for ${model}`);
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
  }, [model, currentCountry]);


  // Filter by country
  const availableRetailers = (retailers || []).filter(
    (retailer) => retailer.countryCode === currentCountry
  );
  console.log(currentCountry, "sssssss");


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
                  className="transition-transform duration-200 "
                  aria-label={`Buy from ${retailer.name}`}
                >
                  {retailer.logo ? (
                    <Image
                      src={retailer.logo}
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