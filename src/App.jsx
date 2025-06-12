import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import { OrbitControls, Environment, Center } from "@react-three/drei";
function App() {
  return (
    <div className="App">
      <Canvas
        gl={{ antialias: false, preserveDrawingBuffer: true }}
        shadows
        camera={{ position: [4, 0, 6], fov: 35 }}
      >
        <Environment preset="night" background blur={1} />
        <Center top>
          <Experience />
        </Center>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

export default App;
