import { createRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { CameraControlData } from "../interfaces";
import { DEFAULT_UP } from "../constants";
import { position, vector3EqualsXYZ } from "./geometry";

export const CAMERA_CONFIG = {
  fov: 75,
  near: 10,
  far: 100000,
  position: position(50.22, -4.95, 1500),
};

export interface CameraControlsProps extends CameraControlData {}

export function CameraControls(props: CameraControlsProps) {
  const { up } = props;

  console.info("[CameraControls]", up);

  const ref = createRef<OrbitControlsImpl>();
  useEffect(() => {
    console.info("[CameraControls] ref", ref.current);
  });

  const state = useThree();
  useFrame(() => {
    const [x, y, z] = up;
    const { camera } = state;
    if (!vector3EqualsXYZ(camera.up, up)) {
      if (up === DEFAULT_UP && ref.current) {
        ref.current.reset();
      }

      camera.up.set(x, y, z);
      camera.updateProjectionMatrix();
    }
  });

  return (
    <OrbitControls ref={ref} {...props} zoomSpeed={0.1} rotateSpeed={0.1} />
  );
}
