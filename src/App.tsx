import { Canvas } from '@react-three/fiber'
import { useTexture } from "@react-three/drei"
import './App.css';

function App() {
  const material = useTexture({
    map: 'textures/2_no_clouds_4k.jpeg'
  })
  return (
    <div className="App">
      <Canvas frameloop="demand">
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <mesh>
          <sphereGeometry args={[2, 32, 32]}/>
          <meshStandardMaterial {...material} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
