export const SITE_ORIGIN = "https://ligasfutbolamateur.com";
export const SITE_NAME = "LFA";
export const ORG_NAME = "Ligas Futbol Amateur, LLC";

export type PageLocale = "es" | "pt" | "it";

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function isPortuguesePath(pathname = typeof window === "undefined" ? "/" : window.location.pathname): boolean {
  return normalizePath(pathname) === "/pt";
}

export function isItalianPath(pathname = typeof window === "undefined" ? "/" : window.location.pathname): boolean {
  return normalizePath(pathname) === "/it";
}

export function pageLocale(pathname?: string): PageLocale {
  const path = normalizePath(pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname));
  if (path === "/pt") {
    return "pt";
  }
  if (path === "/it") {
    return "it";
  }
  return "es";
}

export function localeHome(lang: PageLocale): string {
  if (lang === "pt") {
    return "/pt/";
  }
  if (lang === "it") {
    return "/it/";
  }
  return "/";
}

export function htmlLang(locale: PageLocale): string {
  if (locale === "pt") {
    return "pt-BR";
  }
  if (locale === "it") {
    return "it";
  }
  return "es";
}

export function hrefLang(locale: PageLocale): string {
  if (locale === "pt") {
    return "pt-BR";
  }
  if (locale === "it") {
    return "it";
  }
  return "es";
}

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
