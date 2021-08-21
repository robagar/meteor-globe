import { Billboard, Text } from "@react-three/drei";
import { Degrees, Km, position } from "./geometry";

export interface MarkerProps {
  latitude: Degrees;
  longitude: Degrees;
  altitude?: Km;
  radius?: Km;
  label?: string;
  labelSize?: Km;
}

export function Marker(props: MarkerProps) {
  const {
    latitude,
    longitude,
    altitude = 0,
    radius = 5,
    label,
    labelSize = 50,
  } = props;
  return (
    <>
      <mesh position={position(latitude, longitude, altitude)}>
        <sphereGeometry args={[radius, 16, 16]} />
      </mesh>
      {label && (
        <Billboard position={position(latitude, longitude, altitude + 10)}>
          <Text anchorX="left" anchorY="top" fontSize={labelSize} color="white">
            {label}
          </Text>
        </Billboard>
      )}
    </>
  );
}
