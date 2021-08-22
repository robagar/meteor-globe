import { Canvas } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";

import { EARTH_RADIUS, position } from "./geometry";

import { Marker, MarkerProps } from "./Marker";

export interface GlobeProps {
  markers?: MarkerProps[];
}

export function Globe(props: GlobeProps) {
  const { markers } = props;

  const camera = {
    fov: 75,
    near: 10,
    far: 100000,
    position: position(52, 0, 5000),
  };
  const material = useTexture({
    map: "textures/2_no_clouds_4k.jpeg",
    bumpMap: "textures/elev_bump_4k.jpeg",
    specularMap: "textures/water_4k.png",
  });
  return (
    <Canvas frameloop="demand" camera={camera}>
      <OrbitControls />
      {/* <axesHelper args={[10000]} /> */}
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={position(0, 0, 1)} />
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshPhongMaterial {...material} />
      </mesh>
      {markers && markers.map((m) => <Marker {...m} />)}
    </Canvas>
  );
}
