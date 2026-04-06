/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SELECTED_DATA_URL: string
  readonly VITE_PROJECTS_DATA_URL: string
  readonly VITE_EXHIBITIONS_DATA_URL: string
  readonly VITE_PRESS_DATA_URL: string
  readonly VITE_BESPOKE_DATA_URL: string
  readonly VITE_NEWS_DATA_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
