import { leagues } from "@/data/leagues";
import { marquee } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export function LogoMarquee() {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const [durationSec, setDurationSec] = useState<number | null>(null);
  const items = reduceMotion ? leagues : [...leagues, ...leagues];

  useLayoutEffect(() => {
    if (reduceMotion) {
      return;
    }
    const el = stripRef.current;
    if (!el) {
      return;
    }

    const update = () => {
      const loopWidth = el.scrollWidth / 2;
      if (loopWidth <= 0) {
        return;
      }
      const next = loopWidth / marquee.logosSpeedPx;
      setDurationSec((prev) => (prev !== null && Math.abs(prev - next) < 0.01 ? prev : next));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    void document.fonts.ready.then(update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [reduceMotion]);

  return (
    <section className="logos" aria-label={t("logos.label")}>
      <div className="lbl">{t("logos.label")}</div>
      <div
        ref={stripRef}
        className={durationSec !== null && !reduceMotion ? "strip is-ready" : "strip"}
        style={durationSec !== null ? { animationDuration: `${String(durationSec)}s` } : undefined}
      >
        {items.map((league, index) => (
          <a
            key={`${league.href}-${String(index)}`}
            href={league.href}
            target="_blank"
            rel="noopener noreferrer"
            title={league.name}
          >
            <img src={league.logoUrl} alt="" width={26} height={26} loading="lazy" decoding="async" />
            {league.name}
          </a>
        ))}
      </div>
    </section>
  );
}
