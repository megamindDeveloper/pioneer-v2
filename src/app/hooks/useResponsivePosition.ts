import { useEffect, useState } from "react";

type Vector3 = [number, number, number];

export function useResponsivePosition(
  xl: Vector3,
  lg2: Vector3,
  lg: Vector3,
  md: Vector3,
  sm: Vector3,
  xs: Vector3
): Vector3 {
  const [position, setPosition] = useState<Vector3>(xl);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1580) setPosition(xl); // xl
      else if (width >= 1200) setPosition(lg2); // lg2
      else if (width >= 1024) setPosition(lg); // lg
      else if (width >= 768) setPosition(md);
      else if (width >= 640) setPosition(sm);
      else setPosition(xs);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [xl, lg2, lg, md, sm, xs]);

  return position;
}
