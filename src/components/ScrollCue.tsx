import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => {
    window.removeEventListener("scroll", onChange);
  };
}

export function ScrollCue() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 80,
    () => false,
  );

  if (reduceMotion || scrolled) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
      <span className="font-heading text-xs uppercase tracking-[0.2em] text-muted">
        {t("hero.scroll")}
      </span>
      <span className="relative h-12 w-px bg-sinergy/40">
        <motion.span
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sinergy"
          animate={{ top: ["0%", "85%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </div>
  );
}
