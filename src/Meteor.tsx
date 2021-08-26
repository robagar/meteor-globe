import { useRef } from "react";
import { Mesh, Vector3, Matrix4 } from "three";
import { useFrame } from "@react-three/fiber";

import { LatLongHt, xyz, XYZ, Km } from "./geometry";

export type UTCTime = number;
export type ShowerCode = string;
export type Seconds = number;
export type Magnitude = number;
export type Kg = number;
export type StationCode = string;

export interface MeteorProps {
  time: UTCTime;
  showerCode: ShowerCode;
  begin: LatLongHt;
  end: LatLongHt;
  peakHeight: Km;
  magnitude: Magnitude;
  duration: Seconds;
  mass: Kg;
  stationCodes: StationCode[];
}

const MIN_WIDTH = 0.1;
const MAG_ZERO_WIDTH = 2;

export function Meteor(props: MeteorProps) {
  const { begin, end, magnitude } = props;

  const brightness = 1 - magnitude * 0.2;

  const tail = xyz(begin);
  const head = xyz(end);

  const [tx, ty, tz] = tail;
  const [hx, hy, hz] = head;

  const center: XYZ = [(tx + hx) / 2, (ty + hy) / 2, (tz + hz) / 2];
  const [cx, cy, cz] = center;
  const position = new Vector3(cx, cy, cz);

  const vector = new Vector3(
    head[0] - tail[0],
    head[1] - tail[1],
    head[2] - tail[2]
  );
  const length = vector.length();
  const width = Math.max(MIN_WIDTH, MAG_ZERO_WIDTH * brightness);
  const direction = vector.clone();
  direction.normalize();

  const ref = useRef<Mesh>();

  useFrame(({ camera }) => {
    const view = position.clone().sub(camera.position).normalize();
    const perp = direction.clone().cross(view).normalize();
    const up = direction.clone().cross(perp).normalize();
    const right = direction.clone().cross(up);

    const mesh = ref.current;
    if (mesh) {
      const m = new Matrix4();
      const xAxis = right;
      const yAxis = direction;
      const zAxis = up;
      m.makeBasis(xAxis, yAxis, zAxis);
      mesh.quaternion.setFromRotationMatrix(m);
    }
  });

  return (
    <mesh ref={ref} position={center}>
      <planeGeometry args={[width, length]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}
