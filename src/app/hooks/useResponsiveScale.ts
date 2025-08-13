import { useEffect, useState } from "react";

type Vector3 = [number, number, number];

export function useResponsiveScale(
  xl: Vector3,
  lg2: Vector3,
  lg: Vector3,
  md: Vector3,
  sm: Vector3,
  xs: Vector3
): Vector3 {
  const [scale, setScale] = useState<Vector3>(xl);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1580) setScale(xl); // xl
      else if (width >= 1200) setScale(lg2); // lg2
      else if (width >= 1024) setScale(lg); // lg
      else if (width >= 768) setScale(md);
      else if (width >= 640) setScale(sm);
      else setScale(xs);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [xl, lg2, lg, md, sm, xs]);

  return scale;
}
