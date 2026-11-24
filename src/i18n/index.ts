import { isItalianPath, isPortuguesePath } from "@/lib/site";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ca from "./ca.json";
import en from "./en.json";
import es from "./es.json";
import it from "./it.json";
import pt from "./pt.json";

export const languages = ["es", "en", "pt", "it", "ca"] as const;
export type Language = (typeof languages)[number];

export const STORAGE_KEY = "i18nextLng";

const URL_LOCKED: ReadonlySet<string> = new Set(["pt", "it"]);

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
    if (value === "es" || value === "en" || value === "pt" || value === "it" || value === "ca") {
      return value;
    }
  } catch {
    /* private mode */
  }
  return null;
}

function initialLanguage(): Language {
  if (typeof window !== "undefined") {
    if (isPortuguesePath()) {
      return "pt";
    }
    if (isItalianPath()) {
      return "it";
    }
  }
  const stored = storedLanguage();
  if (stored && !URL_LOCKED.has(stored)) {
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
    it: { translation: bundleOrEs(it) },
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
