import { lenisLerp } from "@/lib/motion";
import { setSmoothScroller } from "@/lib/smooth-scroll";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  on: (event: "scroll", handler: () => void) => void;
  scrollTo: (target: HTMLElement, options?: { offset?: number }) => void;
};

function subscribeDesktopPointer(onChange: () => void) {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const coarse = window.matchMedia("(pointer: coarse)");
  fine.addEventListener("change", onChange);
  coarse.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    coarse.removeEventListener("change", onChange);
  };
}

function getDesktopPointer() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

function useWindowLoaded() {
  return useSyncExternalStore(
    (onChange) => {
      if (document.readyState === "complete") {
        return () => undefined;
      }
      window.addEventListener("load", onChange);
      return () => {
        window.removeEventListener("load", onChange);
      };
    },
    () => document.readyState === "complete",
    () => false,
  );
}

export function LenisProvider({ children }: LenisProviderProps) {
  const reduceMotion = usePrefersReducedMotion();
  const windowLoaded = useWindowLoaded();
  const desktopPointer = useSyncExternalStore(
    subscribeDesktopPointer,
    getDesktopPointer,
    () => false,
  );
  const wantLenis = !reduceMotion && desktopPointer && windowLoaded;

  useEffect(() => {
    if (!wantLenis) {
      return;
    }

    let cancelled = false;
    let lenis: LenisInstance | undefined;
    let frame = 0;
    let onScroll: (() => void) | undefined;

    void Promise.all([import("lenis"), import("lenis/dist/lenis.css")]).then(([{ default: Lenis }]) => {
      if (cancelled) {
        return;
      }
      lenis = new Lenis({
        autoRaf: false,
        lerp: lenisLerp,
        duration: 1.1,
        smoothWheel: true,
      });
      setSmoothScroller(lenis);
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = window.requestAnimationFrame(loop);
      };
      frame = window.requestAnimationFrame(loop);

      void import("@/lib/gsap").then(({ ScrollTrigger }) => {
        if (cancelled || !lenis) {
          return;
        }
        onScroll = () => {
          ScrollTrigger.update();
        };
        lenis.on("scroll", onScroll);
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelled = true;
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      setSmoothScroller(null);
      lenis?.destroy();
    };
  }, [wantLenis]);

  return children;
}
