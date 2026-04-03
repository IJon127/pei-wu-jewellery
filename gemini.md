# Project Overview

This is a **PlayCanvas + React.js** web application. 
- **PlayCanvas** is utilized for performant 3D WebGL/WebGPU rendering.
- **React.js** is leveraged for a reactive, modern 2D UI overlay spanning across the screen or application window.

## Technology Stack and Rules
- **Package Manager**: **`pnpm`** MUST be used for all script executions and dependency installations.
- **Bundler**: Vite.
- **Language**: TypeScript (`.ts`, `.tsx`).
- **Styling**: Vanilla CSS for maximum flexibility (no Tailwind unless explicitly modified).
- **Communication Architecture**: Use an Event Bus or a global state manager (like Zustand) to proxy events between React components (declarative) and PlayCanvas scripts/entities (imperative).

## Key Implementation Details
1. **Canvas Management**: The PlayCanvas `<canvas>` element should sit under the React layer (e.g. `z-index: 0`).
2. **Lifecycle Sync**: The PlayCanvas `Application` instance should be wrapped cleanly in a React ref or custom hook to prevent premature destruction or unneeded re-rendering.
3. **Resizing**: Ensure the PlayCanvas internal resolution properly scales up and down during browser window `resize` events (React `useLayoutEffect` window listeners mapped to `app.resizeCanvas()`). 
4. **Performance**: Only call PlayCanvas methods directly when state changes rather than continuously syncing React tree elements to 3D entities every frame.
