import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { useControls } from "leva";
const Model = ({ position }) => {
  const { scene } = useGLTF("living.glb");
  const materialNames = {
    Floor: "Piso",
    Drywall: "Tablaroca",
    White_Finish_Shiny: "Acabado Blanco Brillante",
    Purple_Finish_Shiny: "Acabado Púrpura Brillante",
    Couch: "Sillón",
    material: "Material Genérico",
    Wood_Dark: "Madera Oscura",
    Moulding: "Moldura",
    Curtains: "Cortinas",
    material_21: "Material 21",
    Chrome: "Cromo",
    Lamp: "Lámpara",
  };

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
  const defaultColors = useMemo(() => {
    return Object.fromEntries(
      Object.entries(materialNames).map(([id, label]) => {
        const mat = materials[id];
        const hex = mat ? `#${mat.color.getHexString()}` : "#ffffff";
        return [id, { label, hex }];
      })
    );
  }, [materials]);

  useControls("Colores", () => {
    return Object.fromEntries(
      Object.entries(defaultColors).map(([id, { label, hex }]) => {
        return [
          id,
          {
            label,
            value: hex,
            onChange: (v) => {
              const mat = materials[id];
              if (mat) {
                mat.color.set(v);
                mat.needsUpdate = true;
              }
            },
          },
        ];
      })
    );
  });
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
