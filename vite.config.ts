import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "async-css",
      transformIndexHtml(html) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="(\/assets\/(?!lenis)[^"]+\.css)">/,
          `<link rel="stylesheet" href="$1" media="print" onload="this.media='all'" /><noscript><link rel="stylesheet" href="$1" /></noscript>`,
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  build: {
    modulePreload: false,
  },
});
