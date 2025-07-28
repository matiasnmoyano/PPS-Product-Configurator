"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo, useEffect, useRef } from "react";
import useStore from "../store/useStore";

const Model = ({ position, onMaterialsReady }) => {
  const { scene } = useGLTF("living.glb");
  const materialsReadyRef = useRef(false);
  const { floorTexture } = useStore();

  const sceneMaterials = useMemo(() => {
    const mats = {};
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const arr = Array.isArray(child.material)
          ? child.material
          : [child.material];
        arr.forEach((mat) => {
          if (mat.name && !mats[mat.name]) mats[mat.name] = mat;
        });
      }
    });
    return mats;
  }, [scene]);

  useEffect(() => {
    if (sceneMaterials.Floor) {
      const floorMaterial = sceneMaterials.Floor;

      const woodColors = {
        oak: "#D2B48C",
        walnut: "#8B4513",
        cherry: "#CD853F",
        maple: "#F5DEB3",
        mahogany: "#C04000",
        pine: "#DEB887",
      };

      floorMaterial.color.set(woodColors[floorTexture]);
    }
  }, [sceneMaterials, floorTexture]);

  useEffect(() => {
    if (Object.keys(sceneMaterials).length > 0 && !materialsReadyRef.current) {
      materialsReadyRef.current = true;
      setTimeout(() => {
        onMaterialsReady(sceneMaterials);
      }, 300);
    }
  }, [sceneMaterials, onMaterialsReady]);

  return (
    <primitive
      object={scene}
      position={position}
      scale={[1, 1, 1]}
      rotation={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
};

export default Model;

useGLTF.preload("living.glb");
