
import { Euler, Vector3 } from "three";

export type DirectionalLightProps = {
  position?: [number, number, number] | Vector3;
  intensity?: number;
  color?: string;
  rotation?: [number, number, number] | Euler;
  castShadow?: boolean;
};


export type DirectionalLightConfig = {
    position: [number, number, number];
    hoveredPosition?: [number, number, number];
    intensity?: number;
    hoveredIntensity?: number;
    castShadow?: boolean;
    color?: string;
  };
  