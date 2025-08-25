


'use client';

import { db } from '@/app/utils/Firebase/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  specs: { label: string; value: string }[]; // <-- NEW prop
   modelKey: string;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose, modelKey }) => {
  const [specs, setSpecs] = useState<{ feature: string; value: string }[]>([]);


useEffect(() => {
  if (!isOpen || !modelKey) return;
  console.log(modelKey);

  const fetchSpecs = async () => {
    try {
      // 🔥 query Firestore with orderBy("priority")
      const q = query(
        collection(db, `detailed_specs_${modelKey}`),
        orderBy("priority", "asc") // or "desc" if you want reverse order
      );

      const snapshot = await getDocs(q);
      const specData: { feature: string; value: string; priority: number }[] = [];
      snapshot.forEach(doc => {
        specData.push(doc.data() as any);
      });

      console.log("de", specData);
      setSpecs(specData);
    } catch (error) {
      console.error('Error fetching specs:', error);
    }
  };

  fetchSpecs();
}, [isOpen, modelKey]);




  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-1000000 bg-black/10 backdrop-blur-md border border-white/20 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent 
        >
          <motion.div
            className="bg-[#0D0D0D] border-white/20 border-[0.5px] text-white rounded-2xl w-full max-w-3xl h-[90vh] relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute  top-2 right-2 p-2 rounded-full cursor-pointer transition "
              aria-label="Close"
            >
              <img src="/svgs/closeIcon.svg" className='w-8 md:w-10 md:h-12' alt="Close" />
            </button>

            {/* Scrollable Content */}
            <div
              className="overflow-y-auto h-full px-4 md:px-[6rem] py-8 md:py-12 bg-none"
              style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <h2 className="text-[22px] md:text-[37px] font-semibold mt-4 mb-8 md:mt-12 md:mb-17 text-center md:text-left">
                Detailed Specifications
              </h2>

              <div className="space-y-6">
              {specs.map((spec, index) => (
    <li key={index} className="flex gap-17 justify-start text-sm text-[#d0d0d0]">
  <span className="w-[240px]   text-[#ABABAB] text-[14px] sm:text-[15px]">{spec.feature}</span>
  <span className="w-[530px]  text-start  text-[14px]  sm:text-[17.5px] text-[white]">{spec.value}</span>
</li>
          ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-3 md:gap-6 text-[13px] md:text-sm">
    <span className="text-[#ABABAB] w-1/2">{label}</span>
    <span className="text-[#E2E2E2] text- w-1/2">{value}</span>
  </div>
);