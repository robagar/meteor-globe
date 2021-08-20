import { Canvas } from '@react-three/fiber'
import { useTexture } from "@react-three/drei"
import './App.css';

const EARTH_RADIUS=6371

function radians(degrees:number) {
  return Math.PI * degrees / 180
}

function App() {
  const latitude = radians(52)
  const distance = 10000;
  const y = distance * Math.sin(latitude)
  const z = distance * Math.cos(latitude)
  const camera = { 
    fov: 75, 
    near: 1000, 
    far: 100000, 
    position: [0, y, z] as [number, number, number] 
  }
  const material = useTexture({
    map: 'textures/2_no_clouds_4k.jpeg'
  })
  return (
    <div className="App">
      <Canvas frameloop="demand" camera={camera}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <mesh rotation={[0, -Math.PI/2, 0]}>
          <sphereGeometry args={[EARTH_RADIUS, 128, 128]}/>
          <meshStandardMaterial {...material} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
