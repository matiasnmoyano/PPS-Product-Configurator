"use client";

import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import Model from "./components/Model";
import ControlPanel from "./components/ControlPanel";
import Lighting from "./components/Lighting";
import useStore from "./store/useStore";
import { useRef, useEffect } from "react";

function App() {
  const {
    floorTexture,
    lampSettings,
    setMaterials,
    cameraPosition,
    cameraTarget,
  } = useStore();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;

      const startPosition = controls.object.position.clone();
      const startTarget = controls.target.clone();

      const endPosition = {
        x: cameraPosition[0],
        y: cameraPosition[1],
        z: cameraPosition[2],
      };
      const endTarget = {
        x: cameraTarget[0],
        y: cameraTarget[1],
        z: cameraTarget[2],
      };

      let startTime = null;
      const duration = 1000;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3);

        controls.object.position.x =
          startPosition.x + (endPosition.x - startPosition.x) * easeOut;
        controls.object.position.y =
          startPosition.y + (endPosition.y - startPosition.y) * easeOut;
        controls.object.position.z =
          startPosition.z + (endPosition.z - startPosition.z) * easeOut;

        controls.target.x =
          startTarget.x + (endTarget.x - startTarget.x) * easeOut;
        controls.target.y =
          startTarget.y + (endTarget.y - startTarget.y) * easeOut;
        controls.target.z =
          startTarget.z + (endTarget.z - startTarget.z) * easeOut;

        controls.update();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [cameraPosition, cameraTarget]);

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
          ref={controlsRef}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

export default App;
