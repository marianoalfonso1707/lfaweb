import { scrollReveal } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export function Manifesto() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let reverted = false;
    let ctx: { revert: () => void } | undefined;

    const start = () => {
      void import("@/lib/gsap").then(({ gsap }) => {
        if (reverted || !rootRef.current) {
          return;
        }
        ctx = gsap.context(() => {
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
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(root);

    return () => {
      reverted = true;
      io.disconnect();
      ctx?.revert();
    };
  }, [i18n.language, reduceMotion, t]);

  return (
    <section className="manifesto" ref={rootRef}>
      <div className="wrap">
        <div className="eyebrow rv">{t("manifesto.eyebrow")}</div>
        <h2 className="rv">
          {t("manifesto.h2")} <span className="y it">{t("manifesto.h2Accent")}</span>
        </h2>
        <p className="rv">
          {t("manifesto.bodyBefore")}
          <b>{t("manifesto.bodyBold")}</b>
          {t("manifesto.bodyAfter")}
        </p>
      </div>
    </section>
  );
}
