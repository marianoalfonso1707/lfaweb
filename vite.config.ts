import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

function rewritePortuguese(): Plugin {
  return {
    name: "rewrite-pt",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        if (pathname === "/pt" || pathname === "/pt/") {
          req.url = "/index.html";
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        const ptFile = path.join(rootDir, "dist", "pt", "index.html");
        if ((pathname === "/pt" || pathname === "/pt/" || pathname === "/pt/index.html") && !fs.existsSync(ptFile)) {
          req.url = "/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    rewritePortuguese(),
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
