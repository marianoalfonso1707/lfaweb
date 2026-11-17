import { gsap } from "@/lib/gsap";
import { scrollReveal } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ITEMS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2", pricing: true },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
  { q: "faq.q9", a: "faq.a9" },
  { q: "faq.q10", a: "faq.a10" },
] as const;

export function Faq() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        if (reduceMotion) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: scrollReveal.duration,
          ease: scrollReveal.ease,
          scrollTrigger: { trigger: el, start: scrollReveal.start },
        });
      });
    }, root);
    return () => {
      ctx.revert();
    };
  }, [i18n.language, reduceMotion, t]);

  return (
    <section className="faq" id="faq" ref={rootRef} aria-labelledby="faq-heading">
      <div className="wrap">
        <div className="eyebrow rv">{t("faq.eyebrow")}</div>
        <h2 className="rv" id="faq-heading">
          {t("faq.h2")}
        </h2>
        <div className="faq-list">
          {ITEMS.map((item) => (
            <article className="faq-item rv" key={item.q}>
              <h3>{t(item.q)}</h3>
              <p>
                {t(item.a)}
                {"pricing" in item && item.pricing ? (
                  <>
                    {" "}
                    <a href="#pricing">{t("faq.pricingLink")}</a>
                  </>
                ) : null}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
