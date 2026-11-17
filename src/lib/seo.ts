import type { TFunction } from "i18next";
import { LINKS } from "@/lib/links";
import { SITE_NAME, SITE_ORIGIN, absoluteUrl, type PageLocale } from "@/lib/site";

export const SEO = {
  es: {
    title: "Software para torneos y campeonatos de fútbol amateur | LFA",
    description:
      "Fixture automático, planilla de partido con IA, resultados en vivo y app para jugadores. Organizá tu liga de fútbol amateur. 30 días gratis.",
    locale: "es_AR",
    localeAlternate: "pt_BR",
    ogImage: "/og-es.jpg",
    canonical: `${SITE_ORIGIN}/`,
  },
  pt: {
    title: "Software para campeonatos de futebol amador com súmula por IA | LFA",
    description:
      "Tabela automática, súmula lida por IA a partir de uma foto, resultados ao vivo, Face ID e app para atletas. Teste grátis por 30 dias.",
    locale: "pt_BR",
    localeAlternate: "es_AR",
    ogImage: "/og-pt.jpg",
    canonical: `${SITE_ORIGIN}/pt/`,
  },
} as const;

export const HREFLANG = [
  { lang: "es", href: `${SITE_ORIGIN}/` },
  { lang: "pt-BR", href: `${SITE_ORIGIN}/pt/` },
  { lang: "x-default", href: `${SITE_ORIGIN}/` },
] as const;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

const FAQ_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

// TODO: add Instagram URL to Organization.sameAs once the official profile is confirmed.

export function pageSeo(locale: PageLocale) {
  return SEO[locale];
}

export function buildJsonLd(locale: PageLocale, t: TFunction) {
  const seo = SEO[locale];
  const featureList = [
    t("pricing.f1"),
    t("pricing.f2"),
    t("pricing.f3"),
    t("pricing.f4"),
    t("pricing.f5"),
    t("pricing.f6"),
    t("pricing.f7"),
    t("pricing.f8"),
    t("pricing.f9"),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        legalName: "Ligas Futbol Amateur, LLC",
        url: `${SITE_ORIGIN}/`,
        logo: absoluteUrl("/logo.png"),
        sameAs: [LINKS.youtube],
        email: t("footer.email"),
      },
      {
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "SportsApplication",
        operatingSystem: "Web, iOS, Android",
        url: seo.canonical,
        image: absoluteUrl(seo.ogImage),
        description: seo.description,
        offers: [
          {
            "@type": "Offer",
            price: "10",
            priceCurrency: "USD",
            unitText: "USD / liga / mes",
            description: t("pricing.monthly"),
          },
          {
            "@type": "Offer",
            price: "8",
            priceCurrency: "USD",
            unitText: "USD / liga / mes",
            description: t("pricing.semiannual"),
          },
          {
            "@type": "Offer",
            price: "6",
            priceCurrency: "USD",
            unitText: "USD / liga / mes",
            description: t("pricing.annual"),
          },
        ],
        featureList,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_IDS.map((id) => ({
          "@type": "Question",
          name: t(`faq.q${String(id)}`),
          acceptedAnswer: {
            "@type": "Answer",
            text: id === 2 ? `${t("faq.a2")} ${t("faq.pricingLink")}` : t(`faq.a${String(id)}`),
          },
        })),
      },
    ],
  };
}
