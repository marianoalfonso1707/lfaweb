import { useGeo } from "@/geo/geo-provider";
import { LINKS, whatsappUrl } from "@/lib/links";
import { marquee } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useTranslation } from "react-i18next";

const MARKS = [false, true, false, true] as const;

export function FinalCta() {
  const { t } = useTranslation();
  const { hideTrial } = useGeo();
  const reduceMotion = usePrefersReducedMotion();
  const word = t("final.marquee");
  const prefill = t("footer.waPrefill");
  const primaryHref = hideTrial ? whatsappUrl(prefill) : LINKS.signup;
  const primaryLabel = hideTrial ? t("pricing.arCtaUnder") : t("final.ctaPrimary");

  return (
    <section className="final">
      <h2 className="sr-only">{word}</h2>
      <div
        className={cn("big", reduceMotion && "is-static")}
        style={reduceMotion ? undefined : { animationDuration: `${String(marquee.final)}s` }}
        aria-hidden="true"
      >
        {MARKS.map((outlined, index) => (
          <span key={index} className={outlined ? "o" : undefined}>
            {word}
          </span>
        ))}
      </div>
      <div className="ctas">
        <a className="btn btn-y" href={primaryHref} target="_blank" rel="noopener noreferrer">
          {primaryLabel}
        </a>
        <a className="btn btn-g" href={whatsappUrl(prefill)} target="_blank" rel="noopener noreferrer">
          {t("final.ctaWhatsapp")}
        </a>
      </div>
      <p>{t("final.company")}</p>
    </section>
  );
}
