// src/app/hooks/useMediaQuery.ts

"use client"; // 👈 Add this directive at the very top

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    // Set the initial state
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    
    // Add event listener
    window.addEventListener('resize', listener);
    
    // Cleanup on unmount
    return () => window.removeEventListener('resize', listener);
    
  }, [query, matches]); // Dependencies for the effect

  return matches;
};