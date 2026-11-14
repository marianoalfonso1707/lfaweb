import { journeyPin } from "@/lib/motion";
import { getSmoothScroller, subscribeSmoothScroller } from "@/lib/smooth-scroll";
import { useEffect, useSyncExternalStore } from "react";

export function useHashScroll() {
  const scroller = useSyncExternalStore(subscribeSmoothScroller, getSmoothScroller, () => null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const anchor = target.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) {
        return;
      }
      const el = document.querySelector(id);
      if (!(el instanceof HTMLElement)) {
        return;
      }
      event.preventDefault();
      const offset = window.matchMedia("(max-width: 900px)").matches
        ? journeyPin.hashOffsetMobile
        : journeyPin.hashOffsetDesktop;
      if (scroller) {
        scroller.scrollTo(el, { offset });
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [scroller]);
}
