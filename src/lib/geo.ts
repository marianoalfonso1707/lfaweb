import type { Language } from "@/i18n";
import { localeHome, pageLocale } from "@/lib/site";

export const EURO_PRICING_COUNTRIES = [
  "ES",
  "IT",
  "AT",
  "BE",
  "HR",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "BG",
  "CZ",
  "DK",
  "HU",
  "PL",
  "RO",
  "SE",
  "IS",
  "NO",
  "LI",
  "GB",
  "CH",
  "AD",
  "MC",
  "SM",
  "VA",
  "ME",
  "XK",
  "AL",
  "BA",
  "MK",
  "RS",
  "MD",
  "UA",
] as const;

const SPANISH_SPEAKING = [
  "AR",
  "MX",
  "CO",
  "CL",
  "PE",
  "VE",
  "EC",
  "GT",
  "CU",
  "BO",
  "DO",
  "HN",
  "PY",
  "SV",
  "NI",
  "CR",
  "PA",
  "PR",
  "UY",
] as const;

export type PricingRegion = "AR" | "EU" | "BR" | "ROW";
export type TeamTier = "under30" | "over30" | "over80";

export function isEuroCountry(country: string): boolean {
  return (EURO_PRICING_COUNTRIES as readonly string[]).includes(country);
}

export function regionForCountry(country: string): PricingRegion {
  if (country === "AR") {
    return "AR";
  }
  if (country === "BR") {
    return "BR";
  }
  if (isEuroCountry(country)) {
    return "EU";
  }
  return "ROW";
}

export function languageForCountry(country: string): Language {
  if (country === "ES") {
    const nav = typeof navigator === "undefined" ? "" : navigator.language.toLowerCase();
    return nav.startsWith("ca") ? "ca" : "es";
  }
  if (country === "BR") {
    return "pt";
  }
  if (country === "IT") {
    return "it";
  }
  if ((SPANISH_SPEAKING as readonly string[]).includes(country)) {
    return "es";
  }
  return "en";
}

/** Languages someone can pick on `/` without being sent back to `/it/`. */
const HOMEPAGE_LANGUAGE_STICKS: ReadonlySet<string> = new Set(["es", "en", "ca"]);

/**
 * Italy gets `/it/` when they open the Spanish homepage and have not already
 * chosen another language on that page. `/pt/` and `/it/` stay as they are.
 */
export function italianHomeIfNeeded(
  country: string,
  pathname: string,
  storedLanguage: string | null,
): string | null {
  if (pageLocale(pathname) !== "es") {
    return null;
  }
  if (languageForCountry(country) !== "it") {
    return null;
  }
  if (storedLanguage && HOMEPAGE_LANGUAGE_STICKS.has(storedLanguage)) {
    return null;
  }
  return localeHome("it");
}

export function countryFromQuery(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const value = new URLSearchParams(window.location.search).get("country");
  return value ? value.toUpperCase() : null;
}

type GeoJsCountry = {
  country?: string;
};

export async function detectCountry(signal?: AbortSignal): Promise<string> {
  const forced = countryFromQuery();
  if (forced) {
    return forced;
  }
  const response = await fetch("https://get.geojs.io/v1/ip/country.json", { signal });
  if (!response.ok) {
    throw new Error("geo lookup failed");
  }
  const data = (await response.json()) as GeoJsCountry;
  return data.country ? data.country.toUpperCase() : "ROW";
}
