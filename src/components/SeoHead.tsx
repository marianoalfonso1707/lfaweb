import { buildJsonLd, HREFLANG, OG_IMAGE_SIZE, pageSeo } from "@/lib/seo";
import { absoluteUrl, pageLocale } from "@/lib/site";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) {
      el.hreflang = hreflang;
    }
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoHead() {
  const { t, i18n } = useTranslation();
  const locale = pageLocale();
  const seo = pageSeo(locale);
  const jsonLd = JSON.stringify(buildJsonLd(locale, t));

  useLayoutEffect(() => {
    document.title = seo.title;
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "es";
    upsertMeta("name", "description", seo.description);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", seo.canonical);
    upsertMeta("property", "og:locale", seo.locale);
    upsertMeta("property", "og:locale:alternate", seo.localeAlternate);
    upsertMeta("property", "og:image", absoluteUrl(seo.ogImage));
    upsertMeta("property", "og:image:width", String(OG_IMAGE_SIZE.width));
    upsertMeta("property", "og:image:height", String(OG_IMAGE_SIZE.height));
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", absoluteUrl(seo.ogImage));
    upsertLink("canonical", seo.canonical);
    for (const item of HREFLANG) {
      upsertLink("alternate", item.href, item.lang);
    }
    let ld = document.getElementById("ld-lfa");
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "ld-lfa";
      ld.setAttribute("type", "application/ld+json");
      document.head.appendChild(ld);
    }
    ld.textContent = jsonLd;
    document.documentElement.dataset.seoReady = "1";
  }, [i18n.language, jsonLd, locale, seo]);

  return null;
}
