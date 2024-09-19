import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@context": path.resolve(__dirname, "src/context"),
      "@data": path.resolve(__dirname, "src/data"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
      // Add more aliases as needed
    },
  },
});
