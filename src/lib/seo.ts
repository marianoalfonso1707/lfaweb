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

const FAQ_KEYS = [
  ["faq.q1", "faq.a1"],
  ["faq.q2", "faq.a2"],
  ["faq.q3", "faq.a3"],
  ["faq.q4", "faq.a4"],
  ["faq.q5", "faq.a5"],
  ["faq.q6", "faq.a6"],
  ["faq.q7", "faq.a7"],
] as const;

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

  const faqText = (answerKey: (typeof FAQ_KEYS)[number][1]) => {
    if (answerKey === "faq.a6") {
      return `${t("faq.a6")} ${absoluteUrl(LINKS.privacy)}`;
    }
    return t(answerKey);
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        legalName: "Ligas Futbol Amateur, LLC",
        url: `${SITE_ORIGIN}/`,
        logo: LINKS.logo,
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
        mainEntity: FAQ_KEYS.map(([q, a]) => ({
          "@type": "Question",
          name: t(q),
          acceptedAnswer: {
            "@type": "Answer",
            text: faqText(a),
          },
        })),
      },
    ],
  };
}
