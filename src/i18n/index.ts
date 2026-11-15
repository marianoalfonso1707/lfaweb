import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ca from "./ca.json";
import en from "./en.json";
import es from "./es.json";
import pt from "./pt.json";

export const languages = ["es", "en", "pt", "ca"] as const;
export type Language = (typeof languages)[number];

export const STORAGE_KEY = "i18nextLng";

function setDocumentLang(lng: string) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.lang = lng;
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
  lng: "es",
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
