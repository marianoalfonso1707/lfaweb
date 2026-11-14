import { scrollReveal, statsCount } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Real counts go in src/i18n/es.json: stats.torneosValue, stats.equiposValue,
// stats.jugadoresValue, stats.partidosValue. Keep them "0" to hide this section.
const STATS = [
  { valueKey: "stats.torneosValue", labelKey: "stats.torneos" },
  { valueKey: "stats.equiposValue", labelKey: "stats.equipos" },
  { valueKey: "stats.jugadoresValue", labelKey: "stats.jugadores" },
  { valueKey: "stats.partidosValue", labelKey: "stats.partidos" },
] as const;

function readCount(value: string): number {
  const parsed = Number(value.replaceAll(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function countLocale(language: string): string {
  if (language.startsWith("es")) {
    return "es-AR";
  }
  if (language.startsWith("pt")) {
    return "pt-BR";
  }
  if (language.startsWith("it")) {
    return "it-IT";
  }
  return "en-US";
}

function formatCount(value: number, locale: string): string {
  const formatted = Math.round(value).toLocaleString(locale, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });
  if (locale === "es-AR") {
    return formatted.replaceAll(/[\u00a0\u202f\s]/g, ".");
  }
  return formatted;
}

export function Stats() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const locale = countLocale(i18n.resolvedLanguage ?? i18n.language);
  const values = STATS.map((stat) => readCount(t(stat.valueKey)));
  const allZero = values.every((value) => value === 0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || allZero) {
      return;
    }

    const ends = STATS.map((stat) => readCount(t(stat.valueKey)));

    let reverted = false;
    let ctx: { revert: () => void } | undefined;

    void import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (reverted || !rootRef.current) {
        return;
      }
      ctx = gsap.context(() => {
        const counters = root.querySelectorAll<HTMLElement>("[data-count]");

        if (reduceMotion) {
          gsap.set(".rv", { opacity: 1, y: 0 });
          counters.forEach((el, index) => {
            const end = ends[index] ?? 0;
            el.textContent = formatCount(end, locale);
          });
          return;
        }

        gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: scrollReveal.duration,
            ease: scrollReveal.ease,
            scrollTrigger: { trigger: el, start: scrollReveal.start },
          });
        });

        counters.forEach((el, index) => {
          const end = ends[index] ?? 0;
          ScrollTrigger.create({
            trigger: el,
            start: statsCount.start,
            once: true,
            onEnter: () => {
              const proxy = { v: 0 };
              gsap.to(proxy, {
                v: end,
                duration: statsCount.duration,
                ease: statsCount.ease,
                onUpdate: () => {
                  el.textContent = formatCount(proxy.v, locale);
                },
                onComplete: () => {
                  el.textContent = formatCount(end, locale);
                },
              });
            },
          });
        });

        ScrollTrigger.refresh();
      }, root);
    });

    return () => {
      reverted = true;
      ctx?.revert();
    };
  }, [allZero, i18n.language, locale, reduceMotion, t]);

  if (allZero) {
    return null;
  }

  return (
    <section className="stats" ref={rootRef}>
      <div className="wrap">
        <div className="eyebrow rv">{t("stats.eyebrow")}</div>
        <div className="grid">
          {STATS.map((stat, index) => (
            <div className="stat rv" key={stat.valueKey}>
              <div className="n">
                <span data-count={String(values[index] ?? 0)}>0</span>
                <sup>+</sup>
              </div>
              <div className="l">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
        <div className="note rv">{t("stats.note")}</div>
      </div>
    </section>
  );
}
