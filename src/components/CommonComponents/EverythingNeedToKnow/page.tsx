'use client'

import React, { useEffect, useState } from 'react'

import {  IconMinus, IconPlus } from '@tabler/icons-react';
import { Minus, Plus } from 'lucide-react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../../app/utils/Firebase/firebaseConfig' // adjust the path based on your folder structure



type FAQItem = {
  id:string;
  question: string;
  answer: string;
  disclaimer?:string
};
 
type Props = {
  faqData: {
 collectionName: string;
  }[];
};
export default function EverythingNeedToKnow({ collectionName }: Props) {
  const [faqData, setFaqData] = useState<FAQItem[]>([]); 
   const [openIndex, setOpenIndex] = useState<number | null>(null);

  
useEffect(() => {
  const fetchFAQ = async () => {
    try {
      // Create a query with ordering
      const q = query(
        collection(db, collectionName),
        orderBy("priority", "asc") // change to "desc" for reverse order
      );

      const querySnapshot = await getDocs(q);

      const data: FAQItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // keep ID if needed later
        ...doc.data(),
      })) as FAQItem[];

      setFaqData(data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };

  fetchFAQ();
}, [collectionName]);// refetch when the prop changes


  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-black text-white px-4 py-12 md:px-20 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20 items-start max-w-6xl xl:max-w-[80%]  mx-auto">
        {/* LEFT COLUMN - HEADING */}
        <div className="min-h-full">
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-[#E2E2E2] max-w-sm lg:top-6 sticky top-5 self-start">
            Everything You Need to Know
          </h2>
        </div>

        {/* RIGHT COLUMN - ACCORDION */}
        <div className="divide-y divide-[#4B4B4B] w-full">
         {faqData.map((item, index) => (
            <div key={index} className="py-4 mt-5">
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="text-[18px] md:text-[20px] font-semibold text-[#E2E2E2]">
                  {item.question}
                </span>
                <span className="ml-4">
                  {openIndex === index ? (
                    <IconMinus className="w-5 h-5 md:w-6 md:h-6 text-[#ABABAB]" />
                  ) : (
                    <IconPlus className="w-5 h-5 md:w-6 md:h-6 text-[#ABABAB]" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'max-h-96 opacity-100 mt-2'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[16px] mt-5 md:text-[18px] text-[#ABABAB]">
                   {item.answer}
                </p>
               {item.disclaimer&&(
                   <p className="text-[11px] mt-5 md:text-[12px] tracking-wide text-[#ABABAB]">
                    Disclaimer:  {item.disclaimer}
                </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}