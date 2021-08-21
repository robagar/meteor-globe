import { Degrees, Km, position } from "./geometry";

export interface MarkerProps {
  latitude: Degrees;
  longitude: Degrees;
  altitude?: Km;
  radius?: Km;
}

export function Marker(props: MarkerProps) {
  const { latitude, longitude, altitude = 0, radius = 5 } = props;
  return (
    <mesh position={position(latitude, longitude, altitude)}>
      <sphereGeometry args={[radius, 16, 16]} />
    </mesh>
  );
}
