"use client";

import {
  ChevronLeft,
  ChevronRight,
  Palette,
  Layers,
  Lightbulb,
} from "lucide-react";
import useStore from "../store/useStore";

const ControlPanel = () => {
  const {
    materialColors,
    floorTexture,
    setFloorTexture,
    lampSettings,
    updateLampSetting,
    controlPanel,
    setControlPanelOpen,
    setActiveTab,
    updateMaterialColor,
  } = useStore();

  const { isOpen, activeTab } = controlPanel;

  const materialNames = {
    Drywall: "Pared",
    White_Finish_Shiny: "Rack",
    Purple_Finish_Shiny: "Puertas Rack",
    Couch: "Sillón",
    material: "Alfombra",
    Wood_Dark: "Mesita",
    Moulding: "Moldura",
    Curtains: "Cortinas",
    material_21: "Macetas",
    Chrome: "Cromado lámpara",
    Lamp: "Lámpara",
  };

  const floorTextures = {
    oak: { name: "Roble", color: "#D2B48C" },
    walnut: { name: "Nogal", color: "#8B4513" },
    cherry: { name: "Cerezo", color: "#CD853F" },
    maple: { name: "Arce", color: "#F5DEB3" },
    mahogany: { name: "Caoba", color: "#C04000" },
    pine: { name: "Pino", color: "#DEB887" },
  };

  const handleLampToggle = () => {
    updateLampSetting("on", !lampSettings.on);
  };

  const handleLampIntensityChange = (intensity) => {
    updateLampSetting("intensity", Number.parseFloat(intensity));
  };

  const handleLampColorChange = (color) => {
    updateLampSetting("color", color);
  };

  return (
    <>
      <button
        onClick={() => setControlPanelOpen(!isOpen)}
        className={`fixed top-4 z-50 bg-white/90 ml-[20px] backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-lg transition-all duration-300 hover:bg-white ${
          isOpen ? "left-80" : "left-4"
        }`}
      >
        {isOpen ? (
          <ChevronLeft color="black" size={20} />
        ) : (
          <ChevronRight color="black" size={20} />
        )}
      </button>

      <div
        className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-xl transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Configurador</h1>
          <p className="text-sm text-gray-500 mt-1">Personaliza tu espacio</p>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("floor")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-xs font-medium transition-colors ${
              activeTab === "floor"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Layers size={14} />
            Pisos
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-xs font-medium transition-colors ${
              activeTab === "materials"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Palette size={14} />
            Materiales
          </button>
          <button
            onClick={() => setActiveTab("lighting")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-xs font-medium transition-colors ${
              activeTab === "lighting"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Lightbulb size={14} />
            Luces
          </button>
        </div>

        <div className="p-4 h-[90%] overflow-y-auto pb-20">
          {activeTab === "floor" && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Texturas de Madera
              </h3>
              {Object.entries(floorTextures).map(([key, texture]) => (
                <button
                  key={key}
                  onClick={() => setFloorTexture(key)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    floorTexture === key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: texture.color }}
                    />
                    <span className="font-medium text-gray-800">
                      {texture.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === "materials" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Colores de Materiales
              </h3>
              {Object.entries(materialNames).map(([materialId, label]) => {
                const colorHex = materialColors[materialId] || "ffffff";

                return (
                  <div key={materialId} className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                      {label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                        onChange={(e) =>
                          updateMaterialColor(materialId, e.target.value)
                        }
                        value={`#${colorHex}`}
                      />
                      <div className="flex-1 h-8 rounded border border-gray-200 bg-gray-50 flex items-center px-3">
                        <span className="text-xs text-gray-500">
                          #{colorHex}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "lighting" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Control de Iluminación
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Lámpara Principal
                  </label>
                  <button
                    onClick={handleLampToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      lampSettings.on ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        lampSettings.on ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {lampSettings.on && (
                  <>
                    <div className="space-y-2 mb-4">
                      <label className="text-xs text-gray-600">
                        Intensidad
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={lampSettings.intensity}
                        onChange={(e) =>
                          handleLampIntensityChange(e.target.value)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-xs text-gray-500 text-center">
                        {lampSettings.intensity}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-600">
                        Color de Luz
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={lampSettings.color}
                          onChange={(e) =>
                            handleLampColorChange(e.target.value)
                          }
                          className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <div className="flex-1 h-8 rounded border border-gray-200 bg-white flex items-center px-3">
                          <span className="text-xs text-gray-500">
                            {lampSettings.color}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
