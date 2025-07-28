import { create } from "zustand";

const useStore = create((set, get) => ({
  // Estados de materiales
  materials: {},
  materialColors: {},
  setMaterials: (materials) => {
    const colors = {};
    Object.entries(materials).forEach(([key, material]) => {
      if (material?.color?.getHexString) {
        colors[key] = material.color.getHexString();
      }
    });
    set({ materials, materialColors: colors });
  },

  // Estado de textura del piso
  floorTexture: "oak",
  setFloorTexture: (texture) => set({ floorTexture: texture }),

  // Estados de la lámpara
  lampSettings: {
    on: true,
    intensity: 1,
    color: "#FFE4B5",
  },
  setLampSettings: (settings) => set({ lampSettings: settings }),
  updateLampSetting: (key, value) =>
    set((state) => ({
      lampSettings: {
        ...state.lampSettings,
        [key]: value,
      },
    })),

  // Estados de la cámara
  cameraPosition: [3, 3, 6],
  cameraTarget: [0, 0, 0],
  setCameraPosition: (position, target = [0, 0, 0]) =>
    set({ cameraPosition: position, cameraTarget: target }),

  // Posiciones predefinidas de cámara
  cameraPresets: {
    perspective: {
      name: "Perspectiva",
      position: [3, 3, 6],
      target: [0, 0, 0],
      icon: "📐",
    },
    front: {
      name: "Vista Frontal",
      position: [0, 2, 5],
      target: [0, 1, 0],
      icon: "👁️",
    },
    side: {
      name: "Vista Lateral",
      position: [5, 2, 0],
      target: [0, 1, 0],
      icon: "↔️",
    },
    top: {
      name: "Vista Superior",
      position: [0, 6, 0.1],
      target: [0, 0, 0],
      icon: "⬆️",
    },
  },

  // Estados del panel de control
  controlPanel: {
    isOpen: false,
    activeTab: "materials",
  },
  setControlPanelOpen: (isOpen) =>
    set((state) => ({
      controlPanel: {
        ...state.controlPanel,
        isOpen,
      },
    })),
  setActiveTab: (activeTab) =>
    set((state) => ({
      controlPanel: {
        ...state.controlPanel,
        activeTab,
      },
    })),

  updateMaterialColor: (materialId, color) => {
    const { materials } = get();
    if (materials[materialId]) {
      materials[materialId].color.set(color);
      materials[materialId].needsUpdate = true;

      const hexColor = color.replace("#", "");
      set((state) => ({
        materialColors: {
          ...state.materialColors,
          [materialId]: hexColor,
        },
      }));
    }
  },
}));

export default useStore;
