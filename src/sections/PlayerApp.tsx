import { gsap } from "@/lib/gsap";
import { phoneScroll, scrollReveal } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const FEED = [
  { label: "app.next", value: "app.nextWhen", accent: true },
  { label: "app.vs", value: "app.pitch", accent: false },
  { label: "app.table", value: "app.tableValue", accent: true },
  { label: "app.scorers", value: "app.scorersValue", accent: true },
] as const;

export function PlayerApp() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const fine = useFinePointer();
  const staticPhone = !fine || reduceMotion;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const phone = phoneRef.current;
    if (!root || !phone) {
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

      if (staticPhone) {
        gsap.set(phone, { rotate: 0, y: 0 });
        return;
      }

      gsap.set(phone, { rotate: phoneScroll.fromRotate, y: 0 });
      gsap.to(phone, {
        rotate: phoneScroll.toRotate,
        y: phoneScroll.toY,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: phoneScroll.start,
          end: phoneScroll.end,
          scrub: phoneScroll.scrub,
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [i18n.language, reduceMotion, staticPhone, t]);

  return (
    <section className="app" id="app" ref={rootRef}>
      <div className="wrap">
        <div className={cn("phone rv", staticPhone && "is-static")} id="phone" ref={phoneRef}>
          <div className="notch" />
          <div className="scr">
            <div className="me">
              <i />
              <div>
                <b>{t("app.player")}</b>
                <small>{t("app.playerMeta")}</small>
              </div>
            </div>
            <div className="kpi">
              <div>
                <b>{t("app.kpiGoalsValue")}</b>
                <small>{t("app.kpiGoals")}</small>
              </div>
              <div>
                <b>{t("app.kpiAstValue")}</b>
                <small>{t("app.kpiAst")}</small>
              </div>
              <div>
                <b>{t("app.kpiYellowValue")}</b>
                <small>{t("app.kpiYellow")}</small>
              </div>
            </div>
            <div className="feed">
              {FEED.map((row) => (
                <div key={row.label}>
                  <span>{t(row.label)}</span>
                  <span className={row.accent ? "y" : undefined}>{t(row.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="eyebrow rv">{t("app.eyebrow")}</div>
          <h2 className="rv">
            {t("app.h2")} <span className="y it">{t("app.h2Accent")}</span>
            {t("app.h2End")}
          </h2>
          <p className="rv">{t("app.body")}</p>
          <ul className="rv">
            <li>{t("app.li1")}</li>
            <li>{t("app.li2")}</li>
            <li>{t("app.li3")}</li>
            <li>{t("app.li4")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
