import { gsap, ScrollTrigger } from "@/lib/gsap";
import { journeyPin, scrollReveal } from "@/lib/motion";
import { getSmoothScroller, subscribeSmoothScroller } from "@/lib/smooth-scroll";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

function FaceIdMark() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#F3DD30" strokeWidth="1.5">
      <path d="M20 35V22a4 4 0 014-4h13M80 35V22a4 4 0 00-4-4H63M20 65v13a4 4 0 004 4h13M80 65v13a4 4 0 01-4 4H63" opacity=".8" />
      <ellipse cx="50" cy="48" rx="16" ry="20" opacity=".5" />
      <path d="M42 44h3M55 44h3M45 58q5 4 10 0" opacity=".5" />
    </svg>
  );
}

export function Journey() {
  const { t, i18n } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scroller = useSyncExternalStore(subscribeSmoothScroller, getSmoothScroller, () => null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!root || !pin || !track) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".head .rv").forEach((el) => {
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

      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${String(journeyPin.minWidth)}px)`, () => {
        if (reduceMotion) {
          return;
        }

        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${String(dist())}`,
            pin: true,
            scrub: journeyPin.scrub,
            invalidateOnRefresh: true,
            anticipatePin: journeyPin.anticipatePin,
          },
        });

        gsap.utils.toArray<HTMLElement>(".scene").forEach((scene, index) => {
          if (index === 0) {
            return;
          }
          gsap.from(scene, {
            scale: journeyPin.sceneFromScale,
            opacity: journeyPin.sceneFromOpacity,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: journeyPin.sceneStart,
              end: journeyPin.sceneEnd,
              scrub: true,
            },
          });
        });
      });
    }, root);

    let raf = 0;
    const refresh = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener("resize", refresh);
    if (scroller) {
      refresh();
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [i18n.language, reduceMotion, scroller, t]);

  const vs = t("journey.s1m1Vs");

  return (
    <section className="journey" id="journey" ref={rootRef}>
      <div className="wrap head">
        <div className="eyebrow rv">{t("journey.eyebrow")}</div>
        <h2 className="rv">
          {t("journey.h2")} <span className="y it">{t("journey.h2Accent")}</span>
          {t("journey.h2End")}
        </h2>
        <p className="sub rv">{t("journey.sub")}</p>
      </div>
      <div className="pin" id="pin" ref={pinRef}>
        <div className="track" id="track" ref={trackRef}>
          <article className="scene" data-n="01">
            <div>
              <div className="t">{t("journey.s1Tag")}</div>
              <h3>{t("journey.s1Title")}</h3>
              <p>{t("journey.s1Body")}</p>
            </div>
            <div className="ui fx">
              <span className="chip">{t("journey.s1Chip")}</span>
              <div className="row">
                <span>{t("journey.s1m1Home")}</span>
                <span className="s">{vs}</span>
                <span className="r">{t("journey.s1m1Away")}</span>
              </div>
              <div className="row">
                <span>{t("journey.s1m2Home")}</span>
                <span className="s">{vs}</span>
                <span className="r">{t("journey.s1m2Away")}</span>
              </div>
              <div className="row">
                <span>{t("journey.s1m3Home")}</span>
                <span className="s">{vs}</span>
                <span className="r">{t("journey.s1m3Away")}</span>
              </div>
              <div className="row">
                <span>{t("journey.s1m4Home")}</span>
                <span className="s">{vs}</span>
                <span className="r">{t("journey.s1m4Away")}</span>
              </div>
            </div>
          </article>
          <article className="scene" data-n="02">
            <div>
              <div className="t">{t("journey.s2Tag")}</div>
              <h3>{t("journey.s2Title")}</h3>
              <p>{t("journey.s2Body")}</p>
            </div>
            <div className="ui">
              <span className="chip">{t("journey.s2Chip")}</span>
              <div className="face">
                <FaceIdMark />
                <div className="scan" />
                <div className="ok">{t("journey.s2Ok")}</div>
              </div>
            </div>
          </article>
          <article className="scene" data-n="03">
            <div>
              <div className="t">{t("journey.s3Tag")}</div>
              <h3>{t("journey.s3Title")}</h3>
              <p>{t("journey.s3Body")}</p>
            </div>
            <div className="ui fx">
              <span className="chip">{t("journey.s3Chip")}</span>
              <div className="row live">
                <span>{t("journey.s3Home")}</span>
                <span className="s">{t("journey.s3Score")}</span>
                <span className="r">{t("journey.s3Away")}</span>
              </div>
              <div className="evt">{t("journey.s3Goal")}</div>
              <div className="evt evt-2">{t("journey.s3Card")}</div>
              <div className="bar">
                <i style={{ width: "72%" }} />
              </div>
            </div>
          </article>
          <article className="scene" data-n="04">
            <div>
              <div className="t">{t("journey.s4Tag")}</div>
              <h3>{t("journey.s4Title")}</h3>
              <p>{t("journey.s4Body")}</p>
            </div>
            <div className="ui fx">
              <span className="chip">{t("journey.s4Chip")}</span>
              <div className="row">
                <span>{t("journey.s4p1")}</span>
                <span className="s s-sm">{t("journey.s4p1Card")}</span>
                <span className="r y">{t("journey.s4p1Ban")}</span>
              </div>
              <div className="row">
                <span>{t("journey.s4p2")}</span>
                <span className="s s-sm">{t("journey.s4p2Card")}</span>
                <span className="r y">{t("journey.s4p2Ban")}</span>
              </div>
              <div className="evt evt-3">{t("journey.s4Note")}</div>
            </div>
          </article>
          <article className="scene" data-n="05">
            <div>
              <div className="t">{t("journey.s5Tag")}</div>
              <h3>{t("journey.s5Title")}</h3>
              <p>{t("journey.s5Body")}</p>
            </div>
            <div className="ui">
              <span className="chip">{t("journey.s5Chip")}</span>
              <div className="bracket">
                <div>{t("journey.s5a")}</div>
                <div className="w">{t("journey.s5a")}</div>
                <div className="w">{t("journey.s5Winner")}</div>
                <div>{t("journey.s5b")}</div>
                <div>{t("journey.s5c")}</div>
                <div />
                <div className="w">{t("journey.s5c")}</div>
                <div />
                <div />
                <div>{t("journey.s5d")}</div>
                <div />
                <div />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
