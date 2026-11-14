import { gsap, ScrollTrigger } from "@/lib/gsap";
import { aiDemoLoop, scrollReveal } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ROWS = [
  { labelKey: "ai.result", valueKey: "ai.resultValue", accent: true },
  { labelKey: "ai.goal1", valueKey: "ai.goal1Value", accent: false },
  { labelKey: "ai.goal2", valueKey: "ai.goal2Value", accent: false },
  { labelKey: "ai.yellow", valueKey: "ai.yellowValue", accent: false },
  { labelKey: "ai.red", valueKey: "ai.redValue", accent: false },
] as const;

export function AiImport() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef<HTMLSpanElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const demo = demoRef.current;
    if (!root || !demo) {
      return;
    }

    const reading = t("ai.reading");
    const ready = t("ai.ready");
    const paper = paperRef.current;
    const state = stateRef.current;
    const done = doneRef.current;
    const rows = outRef.current?.querySelectorAll(":scope > div");

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

      if (!rows || rows.length === 0 || !paper || !state || !done) {
        return;
      }

      if (reduceMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        gsap.set(done, { opacity: 1 });
        paper.classList.add("done");
        state.textContent = ready;
        state.classList.add("ok");
        return;
      }

      const loop = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: aiDemoLoop.repeatDelay,
        onRepeat: () => {
          paper.classList.remove("done");
          state.textContent = reading;
          state.classList.remove("ok");
        },
      });

      loop
        .set(rows, { opacity: 0, x: 16 })
        .set(done, { opacity: 0 })
        .to(
          rows,
          {
            opacity: 1,
            x: 0,
            duration: aiDemoLoop.rowsDuration,
            stagger: aiDemoLoop.rowsStagger,
            ease: "expo.out",
          },
          aiDemoLoop.rowsAt,
        )
        .add(() => {
          paper.classList.add("done");
          state.textContent = ready;
          state.classList.add("ok");
        }, aiDemoLoop.doneAt)
        .to(done, { opacity: 1, duration: aiDemoLoop.doneDuration }, aiDemoLoop.doneAt)
        .to({}, { duration: aiDemoLoop.hold });

      ScrollTrigger.create({
        trigger: demo,
        start: "top 80%",
        onEnter: () => {
          loop.play();
        },
        onLeave: () => {
          loop.pause();
        },
        onEnterBack: () => {
          loop.play();
        },
        onLeaveBack: () => {
          loop.pause();
        },
      });
    }, root);

    return () => {
      paper?.classList.remove("done");
      if (state) {
        state.textContent = reading;
        state.classList.remove("ok");
      }
      ctx.revert();
    };
  }, [i18n.language, reduceMotion, t]);

  return (
    <section className="signature" id="ia" ref={rootRef}>
      <div className="wrap">
        <div>
          <div className="eyebrow rv">{t("ai.eyebrow")}</div>
          <h2 className="rv">
            {t("ai.h2")} <span className="y it">{t("ai.h2Accent")}</span>
          </h2>
          <p className="rv">{t("ai.body")}</p>
          <ol className="steps rv">
            <li>
              <b>{t("ai.step1n")}</b>
              <span>{t("ai.step1")}</span>
            </li>
            <li>
              <b>{t("ai.step2n")}</b>
              <span>{t("ai.step2")}</span>
            </li>
            <li>
              <b>{t("ai.step3n")}</b>
              <span>{t("ai.step3")}</span>
            </li>
          </ol>
        </div>
        <div className="demo rv" id="demo" ref={demoRef}>
          <div className="dhead">
            <span className="chip" style={{ margin: 0 }}>
              {t("ai.chip")}
            </span>
            <span id="dState" className="dstate" ref={stateRef}>
              {t("ai.reading")}
            </span>
          </div>
          <div className="sheet sheet-xl">
            <div className="paper" id="dPaper" ref={paperRef}>
              <i />
              <span className="hand">{t("ai.sheetHandwriting")}</span>
            </div>
            <div className="out" id="dOut" ref={outRef}>
              {ROWS.map((row) => (
                <div key={row.labelKey}>
                  <span>{t(row.labelKey)}</span>
                  <span className={row.accent ? "y" : undefined}>{t(row.valueKey)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dfoot">
            <span id="dDone" ref={doneRef}>
              {t("ai.done")}
            </span>
            <span className="dtime">{t("ai.time")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
