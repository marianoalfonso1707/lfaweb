import { LazySection } from "@/components/LazySection";
import { useHashScroll } from "@/lib/use-hash-scroll";
import { Footer } from "@/sections/Footer";
import { LogoMarquee } from "@/sections/LogoMarquee";
import { Manifesto } from "@/sections/Manifesto";
import { Navbar } from "@/sections/Navbar";
import { Stats } from "@/sections/Stats";
import { Ticker } from "@/sections/Ticker";
import { WhatsAppButton } from "@/sections/WhatsAppButton";
import { lazy } from "react";

const AiImport = lazy(async () => {
  const mod = await import("@/sections/AiImport");
  return { default: mod.AiImport };
});
const Journey = lazy(async () => {
  const mod = await import("@/sections/Journey");
  return { default: mod.Journey };
});
const Features = lazy(async () => {
  const mod = await import("@/sections/Features");
  return { default: mod.Features };
});
const PlayerApp = lazy(async () => {
  const mod = await import("@/sections/PlayerApp");
  return { default: mod.PlayerApp };
});
const Pricing = lazy(async () => {
  const mod = await import("@/sections/Pricing");
  return { default: mod.Pricing };
});
const FinalCta = lazy(async () => {
  const mod = await import("@/sections/FinalCta");
  return { default: mod.FinalCta };
});

export default function App() {
  useHashScroll();

  return (
    <>
      <Ticker />
      <Navbar />
      <main>
        <LogoMarquee />
        <Stats />
        <LazySection minHeight={720}>
          <AiImport />
        </LazySection>
        <LazySection minHeight={900} id="journey">
          <Journey />
        </LazySection>
        <Manifesto />
        <LazySection minHeight={980} id="features">
          <Features />
        </LazySection>
        <LazySection minHeight={760} id="app">
          <PlayerApp />
        </LazySection>
        <LazySection minHeight={880} id="pricing">
          <Pricing />
        </LazySection>
        <LazySection minHeight={420}>
          <FinalCta />
        </LazySection>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
