# Pei Wu Jewellery

## Project Overview

Pei Wu Jewellery is a professional portfolio website for a jewellery designer. The site features a hybrid architectural approach, seamlessly blending a robust React.js 2D UI overlay with a performant PlayCanvas 3D WebGL background rendering engine. 

## Tech Stack

- **Framework**: [React](https://react.dev/)
- **3D Engine**: [PlayCanvas Engine](https://playcanvas.com/) (Using ES6 Modules)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS for maximum flexibility and control
- **Package Manager**: **`pnpm`** (Required for all script executions in this project)

## Project Structure

```
src/
├── 2d/                    # React frontend, UI Overlay & Global Scroll State
│   ├── modals/            # Modal dialogs (AllBespoke, AllExhibitions, etc.)
│   ├── sections/          # Content sections (Hero, About, Exhibitions, Bespoke, etc.)
│   ├── App.tsx            # Main application component & Scroll listener root
│   ├── index.css          # Global styling definitions
│   └── main.tsx           # React mounting entry point
└── 3d/                    # PlayCanvas 3D scene & entity rendering scripts
    ├── scene.ts           # Central PlayCanvas Scene orchestrator
    ├── Camera.ts          # Scroll-driven camera rig and dynamic view overlays
    ├── Models.ts          # 3D glTF Models & WebGL Material parsing
    ├── Photos.ts          # TextureArray photo handling & dynamic scaling
    └── shaders/           # Custom GLSL shader files (Domain, Post-processing, etc.)
```

## Key Features

### Scroll-Driven Synchronization
- The React application (`App.tsx`) intercepts native scroll events (`window.scrollY`) to simulate overall page progress.
- This numerical progress state is passed to the underlying PlayCanvas application to scrub the timeline of the 3D camera rig, providing the immersive feeling of "moving through space" down the page.
- Interactive WebGL geometries (such as textured photo planes) dynamically scale depending on their calculated proximity to the camera's current world position.

### Modular Project Views
- **Componentized Sections**: The scrolling UI separates distinct information structures like Bespoke and Exhibitions.
- **Interactive Layers**: Fully responsive modals (`AllBespoke`, `BespokeDetail`, etc.) that cleanly halt background context without reloading.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (REQUIRED. Do not use npm or yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pei-wu-jewellery
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at location assigned by Vite (usually `http://localhost:5173`).

### Build

Build the project for production:

```bash
pnpm build
```

The build output will be placed in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
pnpm preview
```
