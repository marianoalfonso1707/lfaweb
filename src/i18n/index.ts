import { isPortuguesePath } from "@/lib/site";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ca from "./ca.json";
import en from "./en.json";
import es from "./es.json";
import pt from "./pt.json"; // DRAFT: Portuguese copy pending owner review before deploy.

export const languages = ["es", "en", "pt", "ca"] as const;
export type Language = (typeof languages)[number];

export const STORAGE_KEY = "i18nextLng";

function setDocumentLang(lng: string) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.lang = lng === "pt" ? "pt-BR" : lng;
}

function persistLanguage(lng: string) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* private mode / quota */
  }
}

function storedLanguage(): Language | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "es" || value === "en" || value === "pt" || value === "ca") {
      return value;
    }
  } catch {
    /* private mode */
  }
  return null;
}

function initialLanguage(): Language {
  if (typeof window !== "undefined" && isPortuguesePath()) {
    return "pt";
  }
  const stored = storedLanguage();
  if (stored && stored !== "pt") {
    return stored;
  }
  return "es";
}

function bundleOrEs(locale: object) {
  return Object.keys(locale).length === 0 ? es : locale;
}

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: bundleOrEs(en) },
    pt: { translation: bundleOrEs(pt) },
    ca: { translation: bundleOrEs(ca) },
  },
  lng: initialLanguage(),
  fallbackLng: "es",
  supportedLngs: [...languages],
  load: "languageOnly",
  interpolation: { escapeValue: false },
  saveMissing: false,
  initAsync: false,
});

setDocumentLang(i18n.resolvedLanguage ?? "es");

i18n.on("languageChanged", (lng) => {
  setDocumentLang(lng);
  persistLanguage(lng);
});

export default i18n;
