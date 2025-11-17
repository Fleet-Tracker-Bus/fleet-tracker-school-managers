import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",          // ensures assets and routing work at root
  build: {
    outDir: "dist",   // Vercel will serve files from here
  },
});
