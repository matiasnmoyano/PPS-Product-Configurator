import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import Model from "./components/Model";
import { Leva } from "leva";
function App() {
  return (
    <div className="App">
      <Leva
        hideTitleBar
        flat
        collapsed={false}
        theme={{
          colors: {
            elevation1: "#FFFFFF",
            elevation2: "#F5F5F5",
            elevation3: "#EEEEEE",
            accent1: "#6200EE",
            accent2: "#03DAC6",
            accent3: "#018786",
            highlight1: "#BB86FC",
            highlight2: "#CF6679",
            highlight3: "#FF0266",
            vivid1: "#FF9800",
            folderWidgetColor: "#1F1F1F",
            folderTextColor: "#000000",
            toolTipBackground: "#323232",
            toolTipText: "#FFFFFF",
          },
        }}
      />
      <Canvas
        gl={{ antialias: false, preserveDrawingBuffer: true }}
        shadows
        camera={{ position: [3, 3, 6], fov: 55, rotation: [0, Math.pi / 2, 0] }}
      >
        <Environment preset="night" background blur={1} />
        <Center top>
          <Model position={[0, 0, 0]} />
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
