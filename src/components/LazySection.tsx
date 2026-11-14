import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

type LazySectionProps = {
  minHeight: number;
  id?: string;
  children: ReactNode;
};

export function LazySection({ minHeight, id, children }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px 180px 0px" },
    );
    io.observe(el);
    const onClick = (event: MouseEvent) => {
      if (!id) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const anchor = target.closest(`a[href="#${id}"]`);
      if (anchor) {
        setActive(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, [id]);

  return (
    <div ref={ref}>
      {active ? (
        <Suspense fallback={<div id={id} className="lazy-slot" style={{ minHeight }} aria-hidden="true" />}>
          {children}
        </Suspense>
      ) : (
        <div id={id} className="lazy-slot" style={{ minHeight }} aria-hidden="true" />
      )}
    </div>
  );
}
