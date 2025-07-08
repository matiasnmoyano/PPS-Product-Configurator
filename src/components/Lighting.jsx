"use client";

import { useRef } from "react";

const Lighting = ({
  lampOn = true,
  lampIntensity = 1,
  lampColor = "#FFE4B5",
}) => {
  const lampLightRef = useRef();

  return (
    <>
      <ambientLight intensity={0.3} color="#ffffff" />

      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.4}
        color="#E6F3FF"
      />

      <pointLight
        position={[0, 4, 0]}
        intensity={0.6}
        color="#FFFACD"
        distance={12}
        decay={2}
      />

      {lampOn && (
        <pointLight
          ref={lampLightRef}
          position={[1.8, 1.2, 1.7]}
          intensity={lampIntensity}
          color={lampColor}
          distance={8}
          decay={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      )}
    </>
  );
};

export default Lighting;
