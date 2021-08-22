import { Canvas } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";

import { EARTH_RADIUS, position } from "./geometry";

import { Marker, MarkerProps } from "./Marker";

export interface GlobeProps {
  markers: MarkerProps[];
}

const MIN_CAMERA_ALTITUDE = 100;

export function Globe(props: GlobeProps) {
  const { markers } = props;

  const camera = {
    fov: 75,
    near: 10,
    far: 100000,
    position: position(52, 0, 5000),
  };
  const material = useTexture({
    map: "/meteor-globe/textures/2_no_clouds_4k.jpeg",
    bumpMap: "/meteor-globe/textures/elev_bump_4k.jpeg",
    specularMap: "/meteor-globe/textures/water_4k.png",
  });
  return (
    <Canvas frameloop="demand" camera={camera}>
      <OrbitControls minDistance={EARTH_RADIUS + MIN_CAMERA_ALTITUDE} />
      {/* <axesHelper args={[10000]} /> */}
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={position(0, 0, 1)} />
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshPhongMaterial {...material} />
      </mesh>
      {markers.map((m) => (
        <Marker key={`marker-${m.identifier}`} {...m} />
      ))}
    </Canvas>
  );
}
