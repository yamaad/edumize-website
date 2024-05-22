import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../client/dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
