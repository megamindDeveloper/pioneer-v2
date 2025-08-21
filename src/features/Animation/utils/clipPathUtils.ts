import * as THREE from 'three';

// Define a reusable type for animation timings
export interface AnimationTimings {
  start: number;
  mid: number;
  end: number;
}

/**
 * Converts a CSS clip-path polygon string into a THREE.ShapeGeometry.
 * @param points - The CSS clip-path string, e.g., "polygon(...)".
 * @param options - Optional width and height for the resulting 3D shape.
 * @returns A THREE.ShapeGeometry.
 */
export function clipPathToShape(
  points: string,
  options: { width?: number; height?: number } = {}
): THREE.ShapeGeometry {
  const { width = 5, height = 5 } = options;

  const shape = new THREE.Shape();
  const coords = points
    .replace("polygon(", "")
    .replace(")", "")
    .split(",")
    .map((point) => {
      const [x, y] = point.trim().split(" ");
      return [
        (parseFloat(x) / 100 - 0.5) * width,
        ((100 - parseFloat(y)) / 100 - 0.5) * height,
      ];
    });

  shape.moveTo(coords[0][0], coords[0][1]);
  for (let i = 1; i < coords.length; i++) {
    shape.lineTo(coords[i][0], coords[i][1]);
  }
  shape.lineTo(coords[0][0], coords[0][1]);

  return new THREE.ShapeGeometry(shape);
}

/**
 * Interpolates between two clip-path shapes in an "open then close" animation
 * based on scroll progress and provided timings.
 * @param scrollProgress - The current scroll value (0 to 1).
 * @param closedShape - The CSS clip-path string for the closed state.
 * @param openShape - The CSS clip-path string for the open state.
 * @param timings - An object with start, mid, and end scroll values.
 * @returns The interpolated CSS clip-path string.
 */
export function getInterpolatedClip(
  scrollProgress: number,
  closedShape: string,
  openShape: string,
  timings: AnimationTimings
): string {
  const { start, mid, end } = timings;
  let blend: number;
  let shapeFrom: string, shapeTo: string;

  // Determine animation direction and calculate blend factor
  if (scrollProgress <= mid) {
    // Animate from closed to open
    blend = THREE.MathUtils.clamp((scrollProgress - start) / (mid - start), 0, 1);
    shapeFrom = closedShape;
    shapeTo = openShape;
  } else {
    // Animate from open back to closed
    blend = THREE.MathUtils.clamp((scrollProgress - mid) / (end - mid), 0, 1);
    shapeFrom = openShape;
    shapeTo = closedShape;
  }

  // Helper function to parse the polygon points
  const parse = (str: string): number[][] =>
    str.replace("polygon(", "").replace(")", "").split(",").map((pt: string) =>
      pt.trim().split(" ").map((v: string) => parseFloat(v)) as number[]
    );

  const a = parse(shapeFrom);
  const b = parse(shapeTo);

  // Check if shapes have the same number of points to avoid errors
  if (a.length !== b.length) {
    console.error("Clip-path shapes must have the same number of points.");
    return shapeFrom; // Return the starting shape on error
  }

  // Interpolate each point
  const points = a.map(([ax, ay]: number[], i: number) => {
    const [bx, by] = b[i];
    const ix = THREE.MathUtils.lerp(ax, bx, blend);
    const iy = THREE.MathUtils.lerp(ay, by, blend);
    return `${ix}% ${iy}%`;
  });

  return `polygon(${points.join(", ")})`;
}