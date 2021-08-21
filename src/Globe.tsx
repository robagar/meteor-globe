import { Canvas } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";

const EARTH_RADIUS = 6371;

function radians(degrees: number) {
  return (Math.PI * degrees) / 180;
}

export function Globe() {
  const latitude = radians(52);
  const distance = 10000;
  const y = distance * Math.sin(latitude);
  const z = distance * Math.cos(latitude);
  const camera = {
    fov: 75,
    near: 1000,
    far: 100000,
    position: [0, y, z] as [number, number, number],
  };
  const material = useTexture({
    map: "textures/2_no_clouds_4k.jpeg",
    bumpMap: "textures/elev_bump_4k.jpeg",
    specularMap: "textures/water_4k.png",
  });
  return (
    <Canvas frameloop="demand" camera={camera}>
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshPhongMaterial {...material} />
      </mesh>
    </Canvas>
  );
}
