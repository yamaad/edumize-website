/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AIR_TABLE_AUTH_KEY: string;
  readonly VITE_AIR_TABLE_URL: string;
  readonly VITE_EDUMIZE_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}