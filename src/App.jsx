"use client";

import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import Model from "./components/Model";
import ControlPanel from "./components/ControlPanel";
import Lighting from "./components/Lighting";
import useStore from "./store/useStore";

function App() {
  const { floorTexture, lampSettings, setMaterials } = useStore();

  return (
    <div className="App">
      <ControlPanel />
      <Canvas
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        shadows
        camera={{ position: [3, 3, 6], fov: 55, rotation: [0, Math.pi / 2, 0] }}
      >
        <Environment preset="night" background blur={1} />
        <Lighting
          lampOn={lampSettings.on}
          lampIntensity={lampSettings.intensity}
          lampColor={lampSettings.color}
        />
        <Center top>
          <Model
            position={[0, 0, 0]}
            onMaterialsReady={setMaterials}
            floorTexture={floorTexture}
          />
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
