import { Vector3 } from "three";
import { Degrees, Radians, Km, XYZ, LatLongHt } from "../interfaces";
import { EARTH_RADIUS } from "../constants";

export function radians(degrees: Degrees): Radians {
  return (Math.PI * degrees) / 180;
}

export function position(
  latitude: Degrees,
  longitude: Degrees,
  altitude: Km
): XYZ {
  const [x, y, z] = localUp(latitude, longitude);
  const r = altitude + EARTH_RADIUS;
  return [r * x, r * y, r * z];
}

export function xyz(point: LatLongHt): XYZ {
  const { latitude, longitude, height } = point;
  const lat = radians(latitude);
  const long = radians(longitude);
  const r = EARTH_RADIUS + height;
  const x = r * Math.cos(lat) * Math.cos(-long);
  const y = r * Math.sin(lat);
  const z = r * Math.cos(lat) * Math.sin(-long);
  return [x, y, z];
}

export function localUp(latitude: Degrees, longitude: Degrees): XYZ {
  const lat = radians(latitude);
  const long = radians(longitude);
  const x = Math.cos(lat) * Math.cos(-long);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.sin(-long);
  return [x, y, z];
}

export function vector3EqualsXYZ(v: Vector3, xyz: XYZ): boolean {
  const [x, y, z] = xyz;
  return v.x === x && v.y === y && v.z === z;
}
