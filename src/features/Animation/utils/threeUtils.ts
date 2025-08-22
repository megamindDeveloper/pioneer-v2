import * as THREE from "three";

/**
 * Converts a CSS clip-path polygon string into a THREE.ShapeGeometry.
 * @param points - The polygon string (e.g., "polygon(0% 0%, 100% 0%, ...)")
 * @param width - The desired width of the resulting shape.
 * @param height - The desired height of the resulting shape.
 * @returns A THREE.ShapeGeometry representing the clip path.
 */
export function clipPathToShape(points: string, width = 5, height = 5) {
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