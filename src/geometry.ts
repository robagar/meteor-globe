export const EARTH_RADIUS: Km = 6371.37;

export type Radians = number;
export type Degrees = number;
export type Km = number;

export type LatLongHt = {
  latitude: Degrees;
  longitude: Degrees;
  height: Km;
};

export function radians(degrees: Degrees): Radians {
  return (Math.PI * degrees) / 180;
}

export type XYZ = [number, number, number];

export function position(
  latitude: Degrees,
  longitude: Degrees,
  altitude: Km
): XYZ {
  const lat = radians(latitude);
  const long = radians(longitude);
  const r = altitude + EARTH_RADIUS;
  const x = r * Math.cos(lat) * Math.cos(-long);
  const y = r * Math.sin(lat);
  const z = r * Math.cos(lat) * Math.sin(-long);
  return [x, y, z];
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
