"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo, useEffect, useRef } from "react";

const Model = ({ position, onMaterialsReady, floorTexture }) => {
  const { scene } = useGLTF("living.glb");
  const materialsReadyRef = useRef(false);

  const materials = useMemo(() => {
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
    if (materials.Floor) {
      const floorMaterial = materials.Floor;

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
  }, [materials, floorTexture]);

  useEffect(() => {
    if (Object.keys(materials).length > 0) {
      onMaterialsReady(materials);
    }
  }, [materials, onMaterialsReady]);
  useEffect(() => {
    if (Object.keys(materials).length > 0 && !materialsReadyRef.current) {
      materialsReadyRef.current = true;
      setTimeout(() => {
        onMaterialsReady(materials);
      }, 300);
    }
  }, [materials, onMaterialsReady]);
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
