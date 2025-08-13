"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo/image.png";

// Desktop link data (your original)

// Desktop link data with href
const bottomLinks = [
  { label: "Our Products", href: "https://pioneer-mea.com/en/pioneer-operation-manual/" },
  { label: "Our History", href: "https://pioneer-mea.com/en/history/" },
  { label: "Pioneer Global", href: "https://global.pioneer/en/" },
  { label: "Contact Us", href: "https://pioneer-mea.com/en/contact-us/" },
  { label: "Dashcam EULA Document", href: "https://pioneer-mea.com/en/dash-camera-eula-document/" },
  { label: "Dashcam Privacy Policy", href: "https://pioneer-mea.com/en/dash-camera-privacy-policy/" },
  { label: "Distributors", href: "https://pioneer-mea.com/en/distributors/" },
];

// Mobile accordion link data
// Mobile accordion link data with href
const mobileLinks = [
  {
    title: "User Agreement & Privacy",
    links: [
      { label: "Dashcam EULA Document", href: "https://pioneer-mea.com/en/dash-camera-eula-document/" },
      { label: "Dashcam Privacy Policy", href: "https://pioneer-mea.com/en/dash-camera-privacy-policy/" },
    ],
  },
  {
    title: "More from Pioneer Middle East and Africa",
    links: [
      { label: "Our Products", href: "https://pioneer-mea.com/en/pioneer-operation-manual/" },
      { label: "Our History", href: "https://pioneer-mea.com/en/history/" },
      { label: "Pioneer Global", href: "https://global.pioneer/en/" },
    ],
  },
  {
    title: "Contact Us",
    links: [{ label: "Distributors", href: "https://pioneer-mea.com/en/distributors/" }],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <footer className="bg-gradient-to-t from-[#AD2239] to-transparent text-white">
      {/* ---------- DESKTOP / LAPTOP VERSION ---------- */}
      <div className="hidden md:block pt-20 pb-8">
        <div className="max-w-[90%] mx-auto w-full px-4 flex flex-col justify-center min-h-[300px]">
          {/* Top Link Groups */}
   

          {/* Logo + Bottom Links + Social Icons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 mt-8">
            {/* Left Side */}
            <div className="flex flex-col md:flex-row md:items-center lg2:gap-12 gap-3">
              <Image src={logo} alt="Pioneer" width={180} height={42} className="object-contain" />
              <div className="flex lg2:gap-8 lg:gap-4 flex-wrap lg:text-[10px] lg2:text-[13px] text-white/80">
                {bottomLinks.map((link, i) => (
                  <Link key={i} href={link.href} className="hover:text-white transition" target="_blank">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link href="https://www.instagram.com/pioneermea/" aria-label="Instagram" target="_blank">
                <Image src="/svgs/instagram.svg" alt="Instagram" width={20} height={20} />
              </Link>
              <Link href="https://www.facebook.com/PioneerMEA/" aria-label="Other" target="_blank">
                <Image src="/svgs/meta.svg" alt="Meta" width={20} height={20}  />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mb-6" />

          {/* Copyright */}
          <div className="text-center text-white/60 text-[11px]">© 2025 Pioneer Gulf FZE. All Rights Reserved</div>
        </div>
      </div>

      {/* ---------- MOBILE VERSION ---------- */}
      <div className="md:hidden bg-gradient-to-t from-[#AD2239] to-[#00000000] px-9 pt-8 pb-6">
        {/* Logo */}
        <Image
          src={logo}
          alt="Pioneer"
          width={180}
          className="mb-8 mt-12" // matches spacing in screenshot
        />

        {/* Accordion */}
        <div className="space-y-[2px] mb-6 ">
          {mobileLinks.map((group, i) => {
            // Special case: "Contact Us" — no accordion
            if (group.title === "Contact Us") {
              return (
                <div key={i} className="py-3 border-b border-white/20 text-[13px] font-medium">
                  {group.links.length > 0 ? (
                    <Link href={group.links[0].href} target="_blank" className="block hover:text-white">
                      {group.title}
                    </Link>
                  ) : (
                    group.title
                  )}
                </div>
              );
            }

            return (
              <div key={i} className="border-b border-white/20">
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i as any)}
                  className="w-full flex justify-between items-center py-3  text-[13px] font-medium"
                >
                  {group.title}
                  <span className={`transition-transform duration-300 text-[18px] font-light ${openIndex === i ? "rotate-180" : "rotate-0"}`}>
                    {openIndex === i ? "–" : "+"}
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out`}
                  style={{
                    maxHeight: openIndex === i ? `${group.links.length * 36}px` : "0",
                  }}
                >
                  <div className="p py-2 space-y-[6px] text-white/80 text-[12px] md:text-[16px]">
                    {group.links.map((link, idx) => (
                      <Link key={idx} href={link.href} target="_blank" className="block hover:text-white">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Follow Us */}
        <div className="flex justify-between">
          <p className="md:text-[18px] text-[12px] mb-3">Follow Us</p>
          <div className="flex gap-4 mb-5">
            <Link href="https://www.instagram.com/pioneermea/">
              <Image src="/svgs/instagram.svg" alt="Instagram" width={20} height={20} />
            </Link>
            <Link href="https://www.facebook.com/PioneerMEA/">
              <Image src="/svgs/meta.svg" alt="Meta" width={20} height={20} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-3">
          <p className="text-[10px] text-white  leading-snug text-center ">© 2025 Pioneer Gulf FZE. All Rights Reserved</p>
          {/* <p className="text-[10px] text-white/60 leading-snug">Powered by Megamind Advertising Private Limited</p> */}
        </div>
      </div>
    </footer>
  );
}
