import { LenisProvider } from "@/app/lenis-provider";
import App from "@/app/App";
import { GeoProvider } from "@/geo/geo-provider";
import { bindHeroCopy } from "@/sections/hero-i18n";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root not found");
}

const app = (
  <StrictMode>
    <GeoProvider>
      <LenisProvider>
        <App />
      </LenisProvider>
    </GeoProvider>
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

const hero = document.getElementById("static-hero");
if (hero) {
  bindHeroCopy(hero);
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fine && !reduceMotion && performance.now() <= 2500 && !window.__LFA_PRERENDER__) {
    void import("@/sections/Hero").then(({ enhanceHero }) => {
      enhanceHero(hero);
    });
  }
}
