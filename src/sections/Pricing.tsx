import { gsap } from "@/lib/gsap";
import { LINKS } from "@/lib/links";
import { priceToggle, scrollReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const PLANS = [
  { labelKey: "pricing.monthly", price: 10, noteKey: "pricing.monthlyNote", saveKey: "" },
  { labelKey: "pricing.semiannual", price: 8, noteKey: "pricing.semiannualNote", saveKey: "pricing.semiannualSave" },
  { labelKey: "pricing.annual", price: 6, noteKey: "pricing.annualNote", saveKey: "pricing.annualSave" },
] as const;

const FEATURES = [
  "pricing.f1",
  "pricing.f2",
  "pricing.f3",
  "pricing.f4",
  "pricing.f5",
  "pricing.f6",
  "pricing.f7",
  "pricing.f8",
  "pricing.f9",
] as const;

export function Pricing() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [plan, setPlan] = useState(0);
  const selected = PLANS[plan] ?? PLANS[0];

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

  useLayoutEffect(() => {
    const toggle = toggleRef.current;
    const pill = pillRef.current;
    if (!toggle || !pill) {
      return;
    }
    const active = toggle.querySelectorAll("button")[plan];
    if (!(active instanceof HTMLElement)) {
      return;
    }
    pill.style.left = `${String(active.offsetLeft)}px`;
    pill.style.width = `${String(active.offsetWidth)}px`;

    const onResize = () => {
      const btn = toggle.querySelectorAll("button")[plan];
      if (!(btn instanceof HTMLElement)) {
        return;
      }
      pill.style.left = `${String(btn.offsetLeft)}px`;
      pill.style.width = `${String(btn.offsetWidth)}px`;
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [plan]);

  const selectPlan = (index: number) => {
    const next = PLANS[index];
    const num = numRef.current;
    if (!num) {
      setPlan(index);
      return;
    }
    const from = Number(num.textContent);
    const to = next.price;
    setPlan(index);
    gsap.killTweensOf(num);
    if (reduceMotion) {
      num.textContent = String(to);
      return;
    }
    const proxy = { v: from };
    gsap.to(proxy, {
      v: to,
      duration: priceToggle.duration,
      ease: priceToggle.ease,
      onUpdate: () => {
        num.textContent = String(Math.round(proxy.v));
      },
    });
    gsap.fromTo(
      num,
      { y: priceToggle.popY, opacity: 0.4 },
      { y: 0, opacity: 1, duration: priceToggle.popDuration, ease: priceToggle.popEase },
    );
  };

  return (
    <section className="pricing" id="pricing" ref={rootRef}>
      <div className="wrap">
        <div className="top">
          <div>
            <div className="eyebrow rv">{t("pricing.eyebrow")}</div>
            <h2 className="rv">
              {t("pricing.h2")} <span className="y it">{t("pricing.h2Accent")}</span> {t("pricing.h2End")}
            </h2>
          </div>
          <div className="toggle rv" id="toggle" ref={toggleRef}>
            <div className="pill" ref={pillRef} />
            {PLANS.map((item, index) => (
              <button
                key={item.labelKey}
                type="button"
                className={cn(index === plan && "on")}
                onClick={() => {
                  selectPlan(index);
                }}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
        </div>
        <div className="pcard rv">
          <div className="l">
            <div className="eyebrow">{t("pricing.perLeague")}</div>
            <div className="price">
              <span className="cur">{t("pricing.currency")}</span>
              <span className="num" id="priceNum" ref={numRef}>
                {String(selected.price)}
              </span>
              <span className="per">{t("pricing.per")}</span>
            </div>
            <div className="price-note" id="priceNote">
              {t(selected.noteKey)}
            </div>
            <span className="save" id="priceSave" style={{ opacity: selected.saveKey ? 1 : 0 }}>
              {selected.saveKey ? t(selected.saveKey) : "—"}
            </span>
            <p className="limit">{t("pricing.limit")}</p>
          </div>
          <div className="r">
            <ul>
              {FEATURES.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <a className="btn btn-y" href={LINKS.signup} target="_blank" rel="noopener noreferrer">
              {t("pricing.cta")}
            </a>
            <small>{t("pricing.fine")}</small>
          </div>
        </div>
        <div className="custom rv">
          <span>{t("pricing.custom")}</span>
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
            {t("pricing.customCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
