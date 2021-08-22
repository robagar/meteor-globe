import { Degrees, Km, position } from "./geometry";

export interface MeteorProps {
  beginLatitude: Degrees;
  beginLongitude: Degrees;
  beginHeight: Km;
}

export function Meteor(props: MeteorProps) {
  const { beginLatitude, beginLongitude, beginHeight } = props;

  return (
    <>
      <mesh position={position(beginLatitude, beginLongitude, beginHeight)}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </>
  );
}
