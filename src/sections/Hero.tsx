import i18n from "@/i18n";
import { heroFloat, heroParallax, heroSkipMs, heroTimeline } from "@/lib/motion";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function applyI18n(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    if (el.id === "aiState" || el.id === "liveScore") {
      return;
    }
    const key = el.dataset.i18n;
    if (!key) {
      return;
    }
    el.textContent = i18n.t(key);
  });
}

export function enhanceHero(root: HTMLElement) {
  const onLanguage = () => {
    applyI18n(root);
  };
  i18n.on("languageChanged", onLanguage);

  const reading = i18n.t("hero.aiReading");
  const startScore = i18n.t("hero.liveScoreStart");
  const paper = root.querySelector("#aiPaper");
  const aiState = root.querySelector("#aiState");
  const liveScore = root.querySelector("#liveScore");
  const lines = root.querySelectorAll<SVGGeometryElement>(".pitch .lines path, .pitch .lines ellipse");
  const panels = [...root.querySelectorAll<HTMLElement>(".panel")];
  const skipEntrance = prefersReducedMotion() || !hasFinePointer() || performance.now() > heroSkipMs;

  const showFinalCopy = () => {
    paper?.classList.add("done");
    if (aiState) {
      aiState.textContent = i18n.t("hero.aiReady");
    }
    if (liveScore) {
      liveScore.textContent = i18n.t("hero.liveScoreEnd");
    }
    root.querySelectorAll<HTMLElement>("#aiOut div").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    const done = root.querySelector<HTMLElement>("#aiDone");
    if (done) {
      done.style.opacity = "1";
    }
  };

  if (skipEntrance) {
    showFinalCopy();
    return () => {
      i18n.off("languageChanged", onLanguage);
    };
  }

  let cancelled = false;
  let ctx: { revert: () => void } | undefined;
  let raf = 0;
  let onMove: ((event: MouseEvent) => void) | undefined;

  void import("@/lib/gsap-core").then(({ gsap }) => {
    if (cancelled) {
      return;
    }

    ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll("h1 .w span"), {
        y: heroTimeline.h1.fromY,
        duration: heroTimeline.h1.duration,
        stagger: heroTimeline.h1.stagger,
        ease: heroTimeline.h1.ease,
        delay: heroTimeline.h1.at,
        immediateRender: false,
      });
      gsap.from(
        [...root.querySelectorAll(".rv")].filter((el) => el.tagName !== "P"),
        {
          y: heroTimeline.rv.fromY,
          duration: heroTimeline.rv.duration,
          stagger: heroTimeline.rv.stagger,
          delay: heroTimeline.rv.at,
          immediateRender: false,
        },
      );

      lines.forEach((node) => {
        const length = node.getTotalLength();
        gsap.set(node, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({ defaults: { ease: heroTimeline.defaultsEase } });
      tl.to(
        lines,
        {
          strokeDashoffset: 0,
          duration: heroTimeline.pitch.duration,
          stagger: heroTimeline.pitch.stagger,
          ease: heroTimeline.pitch.ease,
        },
        heroTimeline.pitch.at,
      )
        .from(
          panels,
          {
            y: heroTimeline.panels.fromY,
            opacity: 0,
            rotateX: heroTimeline.panels.fromRotateX,
            duration: heroTimeline.panels.duration,
            stagger: heroTimeline.panels.stagger,
            ease: heroTimeline.panels.ease,
          },
          heroTimeline.panels.at,
        )
        .to(
          "#aiOut div",
          {
            opacity: 1,
            x: 0,
            duration: heroTimeline.aiRows.duration,
            stagger: heroTimeline.aiRows.stagger,
            ease: heroTimeline.aiRows.ease,
          },
          heroTimeline.aiRows.at,
        )
        .add(() => {
          paper?.classList.add("done");
          if (aiState) {
            aiState.textContent = i18n.t("hero.aiReady");
          }
        }, heroTimeline.aiDone.at)
        .to("#aiDone", { opacity: 1, duration: heroTimeline.aiDone.duration }, heroTimeline.aiDone.at)
        .add(() => {
          if (!liveScore) {
            return;
          }
          gsap.fromTo(
            liveScore,
            { scale: heroTimeline.liveScore.scale, background: heroTimeline.liveScore.fromBg },
            {
              scale: 1,
              background: heroTimeline.liveScore.toBg,
              duration: heroTimeline.liveScore.duration,
              ease: heroTimeline.liveScore.ease,
            },
          );
          liveScore.textContent = i18n.t("hero.liveScoreEnd");
        }, heroTimeline.liveScore.at);

      gsap.to(".p1", {
        y: heroFloat.p1.y,
        duration: heroFloat.p1.duration,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".p2", {
        y: heroFloat.p2.y,
        duration: heroFloat.p2.duration,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: heroFloat.p2.delay,
      });
      gsap.to(".p3", {
        y: heroFloat.p3.y,
        duration: heroFloat.p3.duration,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: heroFloat.p3.delay,
      });
    }, root);

    const panelX = panels.map((panel) =>
      gsap.quickTo(panel, "x", { duration: heroParallax.panelDuration, ease: heroParallax.ease }),
    );
    const panelRotY = panels.map((panel) =>
      gsap.quickTo(panel, "rotateY", { duration: heroParallax.panelDuration, ease: heroParallax.ease }),
    );
    const panelRotX = panels.map((panel) =>
      gsap.quickTo(panel, "rotateX", { duration: heroParallax.panelDuration, ease: heroParallax.ease }),
    );
    const pitchEl = root.querySelector<SVGSVGElement>(".pitch");
    const pitchX = pitchEl
      ? gsap.quickTo(pitchEl, "x", { duration: heroParallax.pitchDuration, ease: heroParallax.ease })
      : null;
    const pitchY = pitchEl
      ? gsap.quickTo(pitchEl, "y", { duration: heroParallax.pitchDuration, ease: heroParallax.ease })
      : null;

    let nextX = 0;
    let nextY = 0;
    const applyParallax = () => {
      raf = 0;
      panels.forEach((panel, index) => {
        const depth = Number(panel.dataset.depth ?? 0);
        panelX[index]?.(nextX * depth);
        panelRotY[index]?.(nextX * heroParallax.rotate);
        panelRotX[index]?.(-nextY * heroParallax.rotate);
      });
      pitchX?.(nextX * heroParallax.pitchX);
      pitchY?.(nextY * heroParallax.pitchY);
    };

    onMove = (event: MouseEvent) => {
      nextX = event.clientX / window.innerWidth - 0.5;
      nextY = event.clientY / window.innerHeight - 0.5;
      if (raf === 0) {
        raf = window.requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
  });

  return () => {
    cancelled = true;
    i18n.off("languageChanged", onLanguage);
    if (onMove) {
      window.removeEventListener("mousemove", onMove);
    }
    if (raf !== 0) {
      window.cancelAnimationFrame(raf);
    }
    paper?.classList.remove("done");
    if (aiState) {
      aiState.textContent = reading;
    }
    if (liveScore) {
      liveScore.textContent = startScore;
    }
    ctx?.revert();
  };
}
