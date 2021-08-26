import { Billboard, Text } from "@react-three/drei";
import { Degrees, Km, position } from "./geometry";
import { store } from "./store";

export interface MarkerProps {
  identifier: string;
  latitude: Degrees;
  longitude: Degrees;
  altitude?: Km;
  radius?: Km;
  label?: string;
  labelSize?: Km;
}

export function Marker(props: MarkerProps) {
  const {
    identifier,
    latitude,
    longitude,
    altitude = 5,
    radius = 5,
    label,
    labelSize = 30,
  } = props;

  const highlighted = store.useState((s) => s.highlightedMarker) === identifier;
  const setHighlighted = (highlighted: boolean) => {
    if (highlighted) {
      store.update((s) => {
        s.highlightedMarker = identifier;
      });
    } else {
      store.update((s) => {
        if (s.highlightedMarker === identifier) s.highlightedMarker = "";
      });
    }
  };

  return (
    <>
      <mesh
        onPointerOver={(e) => setHighlighted(true)}
        onPointerOut={(e) => setHighlighted(false)}
        position={position(latitude, longitude, altitude)}
      >
        <sphereGeometry args={[radius * 4, 8, 8]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <mesh position={position(latitude, longitude, altitude)}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
      {label && (
        <Billboard
          visible={highlighted}
          position={position(latitude, longitude, altitude + 10)}
        >
          <Text anchorX="left" anchorY="top" fontSize={labelSize} color="white">
            {label}
          </Text>
        </Billboard>
      )}
    </>
  );
}
