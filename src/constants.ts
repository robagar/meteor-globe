import { Color } from "three";
import { XYZ, Km, Magnitude, CameraControlData } from "./interfaces";

export const EARTH_RADIUS: Km = 6371.37;

export const MIN_MAGNITUDE: Magnitude = -10;
export const MAX_MAGNITUDE: Magnitude = 10;

const MIN_CAMERA_HEIGHT: Km = 200;
const MAX_CAMERA_HEIGHT: Km = 10000;

export const DEFAULT_UP: XYZ = [0, 1, 0];

export const DEFAULT_CAMERA_CONTROL: CameraControlData = {
  target: [0, 0, 0],
  up: DEFAULT_UP,
  minDistance: EARTH_RADIUS + MIN_CAMERA_HEIGHT,
  maxDistance: EARTH_RADIUS + MAX_CAMERA_HEIGHT,
};

export const CLOUD_HEIGHT = 10;

export const CITY_LIGHTS_COLOR = new Color(0xffff80);
export const BLACK = new Color(0x000000);
export const AMBIENT_LIGHT_INTENSITY = 0.075;
