import playerPoster from "@/assets/player-app.png";
import playerVideo from "@/assets/player_profile.mp4";
import { gsap } from "@/lib/gsap";
import { phoneScroll, scrollReveal } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export function PlayerApp() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) {
      return;
    }

    const sync = (visible: boolean) => {
      if (visible) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        sync(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.35));
      },
      { threshold: [0, 0.35, 0.7] },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <section className="app" id="app" ref={rootRef}>
      <div className="wrap">
        <div className={cn("phone rv", staticPhone && "is-static")} id="phone" ref={phoneRef}>
          <div className="scr">
            {reduceMotion ? (
              <img
                src={playerPoster}
                alt={t("app.eyebrow")}
                width={272}
                height={572}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <video
                ref={videoRef}
                poster={playerPoster}
                muted
                loop
                playsInline
                preload="none"
                disablePictureInPicture
                width={272}
                height={572}
                aria-label={t("app.eyebrow")}
              >
                <source src={playerVideo} type="video/mp4" />
              </video>
            )}
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
