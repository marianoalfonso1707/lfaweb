import { useGeo } from "@/geo/geo-provider";
import { gsap } from "@/lib/gsap";
import { LINKS, whatsappUrl } from "@/lib/links";
import { priceToggle, scrollReveal } from "@/lib/motion";
import { currencyFor, formatAmount, parseShownAmount, plansFor, showsBillingToggle } from "@/lib/pricing-geo";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { region } = useGeo();
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [tier, setTier] = useState<"under30" | "over30" | "over80">("under30");
  const [plan, setPlan] = useState(0);
  const plans = plansFor(region, tier);
  const selected = plans[plan] ?? plans[0];
  const currency = currencyFor(region);
  const billingToggle = showsBillingToggle(region, tier);

  useLayoutEffect(() => {
    if (region !== "EU" && tier === "over80") {
      setTier("over30");
    }
  }, [region, tier]);

  useLayoutEffect(() => {
    setPlan(0);
  }, [region, tier]);

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
  }, [plan, billingToggle, i18n.language]);

  const showAmount = (amount: number) => formatAmount(amount, region);

  const selectPlan = (index: number) => {
    const next = plans[index];
    const num = numRef.current;
    if (!next || !num || next.amount === null) {
      setPlan(index);
      return;
    }
    const from = parseShownAmount(num.textContent ?? "");
    const to = next.amount;
    setPlan(index);
    gsap.killTweensOf(num);
    if (reduceMotion) {
      num.textContent = showAmount(to);
      return;
    }
    const proxy = { v: from };
    gsap.to(proxy, {
      v: to,
      duration: priceToggle.duration,
      ease: priceToggle.ease,
      onUpdate: () => {
        num.textContent = showAmount(proxy.v);
      },
    });
    gsap.fromTo(
      num,
      { y: priceToggle.popY, opacity: 0.4 },
      { y: 0, opacity: 1, duration: priceToggle.popDuration, ease: priceToggle.popEase },
    );
  };

  const ctaHref = selected.href === LINKS.whatsapp ? whatsappUrl(t("footer.waPrefill")) : selected.href;
  const amountLabel = selected.amount === null ? t("pricing.arPrice") : showAmount(selected.amount);

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
          <div className="toggles rv">
            <div className="toggle tier" role="group" aria-label={t("pricing.tierUnder")}>
              <button
                type="button"
                className={cn(tier === "under30" && "on")}
                onClick={() => {
                  setTier("under30");
                }}
              >
                {t("pricing.tierUnder")}
              </button>
              <button
                type="button"
                className={cn(tier === "over30" && "on")}
                onClick={() => {
                  setTier("over30");
                }}
              >
                {t("pricing.tierOver")}
              </button>
              {region === "EU" ? (
                <button
                  type="button"
                  className={cn(tier === "over80" && "on")}
                  onClick={() => {
                    setTier("over80");
                  }}
                >
                  {t("pricing.tierOver80")}
                </button>
              ) : null}
            </div>
            {billingToggle ? (
              <div className="toggle" id="toggle" ref={toggleRef}>
                <div className="pill" ref={pillRef} />
                {plans.map((item, index) => (
                  <button
                    key={item.id}
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
            ) : null}
          </div>
        </div>
        <div className="pcard rv">
          <div className="l">
            <div className="eyebrow">{t(selected.labelKey === "pricing.arTitle" ? "pricing.arTitle" : "pricing.perLeague")}</div>
            <div className={cn("price", selected.amount === null && "is-consult", currency.suffix && "is-suffix")}>
              {currency.suffix ? null : <span className="cur">{currency.code}</span>}
              <span className="num" id="priceNum" ref={numRef}>
                {amountLabel}
              </span>
              {currency.suffix ? <span className="cur">{currency.code}</span> : null}
              {selected.amount === null ? null : <span className="per">{t("pricing.per")}</span>}
            </div>
            <div className="price-note" id="priceNote">
              {t(selected.noteKey)}
            </div>
            <span className="save" id="priceSave" style={{ opacity: selected.saveKey ? 1 : 0 }}>
              {selected.saveKey ? t(selected.saveKey) : "—"}
            </span>
          </div>
          <div className="r">
            <ul>
              {FEATURES.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <a className="btn btn-y" href={ctaHref} target="_blank" rel="noopener noreferrer">
              {t(selected.ctaKey)}
            </a>
            {region === "AR" ? null : <small>{t("pricing.fine")}</small>}
          </div>
        </div>
        <div className="custom rv">
          <span>{t("pricing.custom")}</span>
          <a href={whatsappUrl(t("footer.waPrefill"))} target="_blank" rel="noopener noreferrer">
            {t("pricing.customCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
