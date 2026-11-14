import { gsap } from "@/lib/gsap";
import { featureTilt, scrollReveal } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const TILES = [
  { tag: "features.t1Tag", icon: "features.t1Icon", title: "features.t1Title", body: "features.t1Body", wide: true },
  { tag: "features.t2Tag", icon: "features.t2Icon", title: "features.t2Title", body: "features.t2Body", wide: true },
  { icon: "features.t3Icon", title: "features.t3Title", body: "features.t3Body", wide: false },
  { icon: "features.t4Icon", title: "features.t4Title", body: "features.t4Body", wide: false },
  { icon: "features.t5Icon", title: "features.t5Title", body: "features.t5Body", wide: false },
  { tag: "features.t6Tag", icon: "features.t6Icon", title: "features.t6Title", body: "features.t6Body", wide: true },
  { tag: "features.t7Tag", icon: "features.t7Icon", title: "features.t7Title", body: "features.t7Body", wide: true },
] as const;

export function Features() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const fine = useFinePointer();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const listeners: Array<() => void> = [];

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

      if (!fine || reduceMotion) {
        return;
      }

      gsap.utils.toArray<HTMLElement>(".tile").forEach((tile) => {
        const onMove = (event: MouseEvent) => {
          const box = tile.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width;
          const y = (event.clientY - box.top) / box.height;
          tile.style.setProperty("--mx", `${String(x * 100)}%`);
          tile.style.setProperty("--my", `${String(y * 100)}%`);
          gsap.to(tile, {
            rotateY: (x - 0.5) * featureTilt.max,
            rotateX: (0.5 - y) * featureTilt.max,
            transformPerspective: featureTilt.perspective,
            duration: featureTilt.moveDuration,
            ease: featureTilt.moveEase,
          });
        };
        const onLeave = () => {
          gsap.to(tile, {
            rotateY: 0,
            rotateX: 0,
            duration: featureTilt.leaveDuration,
            ease: featureTilt.leaveEase,
          });
        };
        tile.addEventListener("mousemove", onMove);
        tile.addEventListener("mouseleave", onLeave);
        listeners.push(() => {
          tile.removeEventListener("mousemove", onMove);
          tile.removeEventListener("mouseleave", onLeave);
        });
      });
    }, root);

    return () => {
      listeners.forEach((off) => {
        off();
      });
      ctx.revert();
    };
  }, [fine, i18n.language, reduceMotion, t]);

  return (
    <section className="bento" id="features" ref={rootRef}>
      <div className="wrap">
        <div className="eyebrow rv">{t("features.eyebrow")}</div>
        <h2 className="rv">
          {t("features.h2")} <span className="y it">{t("features.h2Accent")}</span> {t("features.h2End")}
        </h2>
        <div className="bgrid">
          {TILES.map((tile) => (
            <div className={cn("tile rv", tile.wide && "wide")} key={tile.title}>
              <div className="glow" />
              {"tag" in tile ? <span className="tag">{t(tile.tag)}</span> : null}
              <div className="ic">{t(tile.icon)}</div>
              <h3>{t(tile.title)}</h3>
              <p>{t(tile.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
