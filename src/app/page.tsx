"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FadeLoader from "@/components/CommonComponents/Loader/page";
import Footer from "@/components/CommonComponents/Footer/page";
import DashcamShowcaseMobile from "@/components/HomePageComponent/DashcamShowcase/DashcamShowcaseMobile";
import DashcamShowcase from "@/components/HomePageComponent/DashcamShowcase/DashcamShowcase";
import ProductDetails from "@/components/HomePageComponent/ProductDetials/page";
import ProductComparisonTable from "@/components/HomePageComponent/ProductComparisonTable/page";
import FeatureAccordion from "@/components/HomePageComponent/FeatureAccordion/page";
const CameraScene = dynamic(() => import("../components/HomePageComponent/CameraScene/page"), {
  ssr: false,
});

export default function Home() {
  const [modelReady, setModelReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg: <1024px
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <>
      {/* ✅ Loader rendered from the page itself */}
      {!modelReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <div className="w-full h-full px-0  bg-gradient-to-b ">
        <CameraScene onModelReady={() => setModelReady(true)} />
        {isMobile ? <DashcamShowcaseMobile /> : <DashcamShowcase />}
        <ProductDetails />
        <ProductComparisonTable />
        <FeatureAccordion />
        <Footer />
        {/* <CameraScenetest/> */}
      </div>
    </>
  );
}
