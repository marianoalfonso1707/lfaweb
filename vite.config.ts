import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

const LOCALE_PREFIXES = ["/pt", "/it"] as const;

function isLocalePath(pathname: string): boolean {
  return LOCALE_PREFIXES.some((prefix) => pathname === prefix || pathname === `${prefix}/`);
}

function rewriteLocales(): Plugin {
  return {
    name: "rewrite-locales",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        if (isLocalePath(pathname)) {
          req.url = "/index.html";
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        for (const prefix of LOCALE_PREFIXES) {
          const localeFile = path.join(rootDir, "dist", prefix.slice(1), "index.html");
          if (
            (pathname === prefix || pathname === `${prefix}/` || pathname === `${prefix}/index.html`) &&
            !fs.existsSync(localeFile)
          ) {
            req.url = "/index.html";
            break;
          }
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
    rewriteLocales(),
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
