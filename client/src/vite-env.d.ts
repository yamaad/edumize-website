/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AIR_TABLE_AUTH_KEY: string;
  readonly VITE_AIR_TABLE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}