# Pei Wu Jewellery

Portfolio website for jewellery designer Pei Wu. A PlayCanvas 3D WebGL scene sits beneath a React UI overlay, with the camera scrubbing through a GLB animation track in sync with the user's scroll position.

## Stack

- **3D** — PlayCanvas Engine (ES Modules), custom GLSL shaders, HDR IBL skybox
- **UI** — React 18 + TypeScript, Vanilla CSS
- **Data** — Google Sheets → CSV → PapaParse
- **Build** — Vite 5, pnpm

## Structure

```
src/
├── 2d/             # React layer — sections, modals, lightbox, loading screen
│   ├── sections/   # 8 scroll-positioned content panels
│   ├── modals/     # List + detail overlays
│   ├── services/   # Google Sheets CSV fetching
│   └── index.css   # Global styles & responsive rules
├── 3d/             # PlayCanvas scene
│   ├── Camera.ts   # Orbit → transition → scroll-scrubbed GLB animation
│   ├── Models.ts   # glTF loading & material assignment
│   ├── Stars.ts    # Custom GPU star field
│   └── shaders/    # GLSL chunks (stars, stone diffuse)
└── hooks/          # usePortfolioData, useScrollReveal
```

## Getting Started

```bash
pnpm install
pnpm dev       # http://localhost:5173
pnpm build
```

> **Note:** pnpm is required. Do not use npm or yarn.

Configure Google Sheet CSV URLs in `.env` (see `.env.example` for keys).
