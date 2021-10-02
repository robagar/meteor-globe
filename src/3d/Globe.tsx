import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import { MeteorData, SettingsData, CameraControlData } from "../interfaces";
import {
  EARTH_RADIUS,
  DEFAULT_CAMERA_CONTROL,
  CLOUD_HEIGHT,
  CITY_LIGHTS_COLOR,
  AMBIENT_LIGHT_INTENSITY,
} from "../constants";

import { position } from "./geometry";

import { /*Marker, */ MarkerProps } from "./Marker";
import { InstancedMeteors } from "./InstancedMeteors";
import { CameraControls, CAMERA_CONFIG } from "./CameraControls";

import "./Globe.css";

export interface GlobeProps {
  markers: MarkerProps[];
  meteors: MeteorData[];
  selectedMeteor?: MeteorData;
  selectMeteor: (meteor: MeteorData, focus: boolean) => void;
  filteredMeteors: boolean[];
  settings: SettingsData;
  cameraControl: CameraControlData;
  setCameraControl: (cameraControl: CameraControlData) => void;
}

export function Globe(props: GlobeProps) {
  const {
    /*markers,*/ meteors,
    selectedMeteor,
    selectMeteor,
    filteredMeteors,
    settings,
    cameraControl,
    setCameraControl,
  } = props;

  console.info("[Globe]", cameraControl);

  const material = useTexture(chooseTextures(settings));
  const clouds = useTexture({
    map: "/meteor-globe/textures/fair_clouds_4k.jpeg",
  });
  return (
    <Canvas className="globeCanvas" frameloop="demand" camera={CAMERA_CONFIG}>
      <CameraControls {...cameraControl} />
      <ambientLight
        intensity={AMBIENT_LIGHT_INTENSITY}
        visible={settings.light}
      />
      <directionalLight
        color="white"
        position={position(0, 0, 1)}
        visible={settings.light}
      />
      <mesh
        onDoubleClick={() => {
          setCameraControl(DEFAULT_CAMERA_CONTROL);
        }}
      >
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshPhongMaterial
          {...material}
          emissive={
            settings.light || !settings.cityLights
              ? undefined
              : CITY_LIGHTS_COLOR
          }
        />
      </mesh>
      <mesh visible={settings.showClouds}>
        <sphereGeometry args={[EARTH_RADIUS + CLOUD_HEIGHT, 128, 128]} />
        <meshBasicMaterial color={0xffffff} alphaMap={clouds.map} transparent />
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

function chooseTextures(settings: SettingsData): {
  [k: string]: string;
} {
  const { light, cityLights } = settings;
  const textures: any = {
    map: "/meteor-globe/textures/2_no_clouds_4k.jpeg",
    bumpMap: "/meteor-globe/textures/elev_bump_4k.jpeg",
    specularMap: "/meteor-globe/textures/water_4k.png",
  };

  if (!light && cityLights)
    textures["emissiveMap"] = "/meteor-globe/textures/5_night_4k.jpeg";

  return textures;
}
