import { LenisProvider } from "@/app/lenis-provider";
import App from "@/app/App";
import { GeoProvider } from "@/geo/geo-provider";
import { bindHeroCopy } from "@/sections/hero-i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root not found");
}

createRoot(root).render(
  <StrictMode>
    <GeoProvider>
      <LenisProvider>
        <App />
      </LenisProvider>
    </GeoProvider>
  </StrictMode>,
);

const hero = document.getElementById("static-hero");
if (hero) {
  bindHeroCopy(hero);
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fine && !reduceMotion && performance.now() <= 2500) {
    void import("@/sections/Hero").then(({ enhanceHero }) => {
      enhanceHero(hero);
    });
  }
}
