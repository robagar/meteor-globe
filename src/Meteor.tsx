import { useRef } from "react";
import { Mesh, Vector3, Quaternion, Matrix4 } from "three";
import { useFrame } from "@react-three/fiber";

import { LatLongHt, xyz, XYZ } from "./geometry";

export interface MeteorProps {
  begin: LatLongHt;
  end: LatLongHt;
}

export function Meteor(props: MeteorProps) {
  const { begin, end } = props;

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
  const width = 3;
  const direction = vector.clone();
  direction.normalize();
  // console.info(direction);

  const ref = useRef<Mesh>();

  useFrame(({ camera }) => {
    const view = position.clone();
    view.sub(camera.position).normalize();
    const perp = direction.clone();
    perp.cross(view).normalize();
    const up = direction.clone();
    up.cross(perp).normalize();
    const right = direction.clone().cross(up);

    // console.info("position", position);
    // console.info("direction", direction);

    // console.info("camera", camera.position);
    // console.info("view", view);
    // console.info("right", right);
    // console.info("up", up);

    // console.info(direction.dot(right), direction.dot(up), right.dot(up));
    // console.info(direction.length(), up.length(), right.length());

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
    <>
      {/*      <mesh position={tail}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
*/}
      <mesh ref={ref} position={center}>
        {/*        <axesHelper args={[100]} /> */}
        <planeGeometry args={[width, length]} />
        <meshBasicMaterial color="white" />
      </mesh>
      {/*      <mesh position={head}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="orange" />
      </mesh>
*/}
    </>
  );
}

// function setQuaternion(
//   forward: Vector3,
//   right: Vector3,
//   up: Vector3,
//   q: Quaternion
// ) {
//   const m00 = right.x;
//   const m01 = up.x;
//   const m02 = forward.x;
//   const m10 = right.y;
//   const m11 = up.y;
//   const m12 = forward.y;
//   const m20 = right.z;
//   const m21 = up.z;
//   const m22 = forward.z;

//   const w = Math.sqrt(1 + m00 + m11 + m22) / 2;
//   const r = 1 / (4 * w);
//   const x = (m21 - m12) * r;
//   const y = (m02 - m20) * r;
//   const z = (m10 - m01) * r;

//   q.set(x, y, z, w);
//   q.normalize();
// }
