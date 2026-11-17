import { SeoHead } from "@/components/SeoHead";
import { useHashScroll } from "@/lib/use-hash-scroll";
import { AiImport } from "@/sections/AiImport";
import { Features } from "@/sections/Features";
import { FinalCta } from "@/sections/FinalCta";
import { Footer } from "@/sections/Footer";
import { Journey } from "@/sections/Journey";
import { LogoMarquee } from "@/sections/LogoMarquee";
import { Manifesto } from "@/sections/Manifesto";
import { Navbar } from "@/sections/Navbar";
import { PlayerApp } from "@/sections/PlayerApp";
import { Pricing } from "@/sections/Pricing";
import { Stats } from "@/sections/Stats";
import { Ticker } from "@/sections/Ticker";
import { WhatsAppButton } from "@/sections/WhatsAppButton";

export default function App() {
  useHashScroll();

  return (
    <>
      <SeoHead />
      <Ticker />
      <Navbar />
      <main>
        <LogoMarquee />
        <Stats />
        <AiImport />
        <Journey />
        <Manifesto />
        <Features />
        <PlayerApp />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
