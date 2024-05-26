import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "../client/dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
      },
    },
  },
  resolve: {
    alias: {
      "@": "./src/*",
    },
  },

  server: {
    port: 5000,
    host: true,
  },
});
