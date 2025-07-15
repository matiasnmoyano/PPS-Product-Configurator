import { create } from "zustand";

const useStore = create((set, get) => ({
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

  floorTexture: "oak",
  setFloorTexture: (texture) => set({ floorTexture: texture }),

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
