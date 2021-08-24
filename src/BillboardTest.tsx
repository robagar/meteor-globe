import { useRef } from "react";
import { Mesh, Vector3, Quaternion, Matrix4 } from "three";
import { useFrame } from "@react-three/fiber";

export function BillboardTest() {
  const ref = useRef<Mesh>();

  const direction = new Vector3(0, 1, 0);
  const position = new Vector3(0, 0, 0);

  useFrame(({ camera }) => {
    const view = position.clone();
    view.sub(camera.position).normalize();
    // const view = new Vector3(-1, 0, 0);
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
      // m.makeBasis(right, direction, up);
      //direction, right, up
      const xAxis = right;
      const yAxis = direction;
      const zAxis = up;
      m.makeBasis(xAxis, yAxis, zAxis);
      // console.info(m);
      mesh.quaternion.setFromRotationMatrix(m);
    }
  });

  return (
    <>
      <mesh ref={ref}>
        <axesHelper args={[3000]} />
        <planeGeometry args={[2000, 5000]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </>
  );
}
