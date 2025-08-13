import { useEffect, useState } from "react";

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState<string>("");
  
    useEffect(() => {
      const update = () => {
        const w = window.innerWidth;
        if (w <= 640) setBreakpoint("sm");
        else if (w <= 768) setBreakpoint("md");
        else if (w <= 1024) setBreakpoint("lg");
        else if (w <= 1200) setBreakpoint("lg2");
        else if (w <= 1580) setBreakpoint("xl");
        else setBreakpoint("2xl");
      };
  
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);
  
    return breakpoint;
  }
  