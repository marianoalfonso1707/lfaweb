import { detectCountry, regionForCountry, type PricingRegion } from "@/lib/geo";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type GeoContextValue = {
  country: string;
  region: PricingRegion;
  hideTrial: boolean;
  ready: boolean;
};

const GeoContext = createContext<GeoContextValue>({
  country: "ROW",
  region: "ROW",
  hideTrial: false,
  ready: false,
});

function applyDocumentFlags(country: string, hideTrial: boolean) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.dataset.country = country;
  document.documentElement.dataset.hideTrial = hideTrial ? "true" : "false";
}

function isPrerender(): boolean {
  return typeof window !== "undefined" && window.__LFA_PRERENDER__ === true;
}

export function GeoProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState("ROW");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isPrerender()) {
      setCountry("ROW");
      setReady(true);
      return;
    }
    const controller = new AbortController();
    void detectCountry(controller.signal)
      .then((next) => {
        setCountry(next);
      })
      .catch((error: unknown) => {
        if (typeof error === "object" && error !== null && "name" in error && error.name === "AbortError") {
          return;
        }
        setCountry("ROW");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setReady(true);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

  const region = regionForCountry(country);
  const hideTrial = region === "AR";

  useEffect(() => {
    applyDocumentFlags(country, hideTrial);
  }, [country, hideTrial]);

  const value = useMemo(
    () => ({ country, region, hideTrial, ready }),
    [country, hideTrial, ready, region],
  );

  return <GeoContext.Provider value={value}>{children}</GeoContext.Provider>;
}

export function useGeo(): GeoContextValue {
  return useContext(GeoContext);
}
