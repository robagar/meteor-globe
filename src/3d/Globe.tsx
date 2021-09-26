import { Canvas } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";
import { Color } from "three";

import { EARTH_RADIUS, position } from "./geometry";

import { /*Marker, */ MarkerProps } from "./Marker";
import { MeteorData, SettingsData } from "../interfaces";
import { InstancedMeteors } from "./InstancedMeteors";

import "./Globe.css";

export interface GlobeProps {
  markers: MarkerProps[];
  meteors: MeteorData[];
  selectedMeteor?: MeteorData;
  selectMeteor: (meteor: MeteorData) => void;
  filteredMeteors: boolean[];
  settings: SettingsData;
}

const MIN_CAMERA_HEIGHT = 200;
const MAX_CAMERA_HEIGHT = 10000;

const CLOUD_HEIGHT = 20;

const CITY_LIGHTS_COLOR = new Color(0xffff80);

export function Globe(props: GlobeProps) {
  const {
    /*markers,*/ meteors,
    selectedMeteor,
    selectMeteor,
    filteredMeteors,
    settings,
  } = props;

  const camera = {
    fov: 75,
    near: 10,
    far: 100000,
    position: position(50.22, -4.95, 1500),
  };
  const material = useTexture(chooseTextures(settings));
  const clouds = useTexture({
    map: "/meteor-globe/textures/fair_clouds_4k.jpeg",
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
      <directionalLight
        color="white"
        position={position(0, 0, 1)}
        visible={settings.light}
      />
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshPhongMaterial
          {...material}
          emissive={settings.light ? undefined : CITY_LIGHTS_COLOR}
        />
      </mesh>
      <mesh visible={settings.showClouds}>
        <sphereGeometry args={[EARTH_RADIUS + CLOUD_HEIGHT, 128, 128]} />
        <meshPhongMaterial color={0xffffff} alphaMap={clouds.map} transparent />
      </mesh>
      {/*      {markers.map((m) => (
        <Marker key={`marker-${m.identifier}`} {...m} />
      ))}
*/}
      <InstancedMeteors
        data={meteors}
        selectedMeteor={selectedMeteor}
        selectMeteor={selectMeteor}
        filteredMeteors={filteredMeteors}
      />
    </Canvas>
  );
}

function chooseTextures(settings: SettingsData): { [k: string]: string } {
  const { light } = settings;
  if (light) {
    return {
      map: "/meteor-globe/textures/2_no_clouds_4k.jpeg",
      bumpMap: "/meteor-globe/textures/elev_bump_4k.jpeg",
      specularMap: "/meteor-globe/textures/water_4k.png",
    };
  }
  return {
    specularMap: "/meteor-globe/textures/water_4k.png",
    emissiveMap: "/meteor-globe/textures/5_night_4k.jpeg",
  };
}
