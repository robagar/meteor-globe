import { Canvas } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";

import { EARTH_RADIUS, position } from "./geometry";

import { /*Marker, */ MarkerProps } from "./Marker";
import { MeteorData } from "../interfaces";
import { InstancedMeteors } from "./InstancedMeteors";

import "./Globe.css";

export interface GlobeProps {
  markers: MarkerProps[];
  meteors: MeteorData[];
  selectedMeteor?: MeteorData;
  selectMeteor: (meteor: MeteorData) => void;
  touched: number;
}

const MIN_CAMERA_HEIGHT = 200;
const MAX_CAMERA_HEIGHT = 10000;

export function Globe(props: GlobeProps) {
  const { /*markers,*/ meteors, selectedMeteor, selectMeteor } = props;

  const camera = {
    fov: 75,
    near: 10,
    far: 100000,
    position: position(50.22, -4.95, 1500),
  };
  const material = useTexture({
    map: "/meteor-globe/textures/2_no_clouds_4k.jpeg",
    bumpMap: "/meteor-globe/textures/elev_bump_4k.jpeg",
    specularMap: "/meteor-globe/textures/water_4k.png",
  });
  return (
    <Canvas className="globeCanvas" frameloop="demand" camera={camera}>
      <OrbitControls
        minDistance={EARTH_RADIUS + MIN_CAMERA_HEIGHT}
        maxDistance={EARTH_RADIUS + MAX_CAMERA_HEIGHT}
        zoomSpeed={0.1}
        rotateSpeed={0.1}
      />
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={position(0, 0, 1)} />
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshPhongMaterial {...material} />
      </mesh>
      {/*      {markers.map((m) => (
        <Marker key={`marker-${m.identifier}`} {...m} />
      ))}
*/}
      <InstancedMeteors
        data={meteors}
        selectedMeteor={selectedMeteor}
        selectMeteor={selectMeteor}
      />
    </Canvas>
  );
}
