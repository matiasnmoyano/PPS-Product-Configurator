# Product Configurator 3D

Configurador de producto en 3D que corre en el navegador: el usuario cambia colores de materiales, la textura del piso y la iluminación, y ve la escena actualizarse en tiempo real.

## Qué hace

- Modelo 3D con iluminación de estudio (`components/Model.jsx`, `components/Lighting.jsx`).
- Panel de control: color por material, piso (roble y otras texturas), lámpara con encendido, intensidad y color (`components/ControlPanel.jsx`).
- Estado global de la configuración con Zustand (`store/useStore.jsx`).

## Stack

React · Vite · React Three Fiber · drei · Zustand · Tailwind

## Desarrollo

```bash
npm install
npm run dev
```

Autor: [Matías Moyano](https://github.com/matiasnmoyano).
