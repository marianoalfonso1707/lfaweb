export const SITE_ORIGIN = "https://ligasfutbolamateur.com";
export const SITE_NAME = "LFA";
export const ORG_NAME = "Ligas Futbol Amateur, LLC";

export type PageLocale = "es" | "pt";

export function isPortuguesePath(pathname = typeof window === "undefined" ? "/" : window.location.pathname): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/pt";
}

export function pageLocale(pathname?: string): PageLocale {
  return isPortuguesePath(pathname) ? "pt" : "es";
}

export function localeHome(lang: PageLocale): string {
  return lang === "pt" ? "/pt/" : "/";
}

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
