type SmoothScroller = {
  scrollTo: (target: HTMLElement, options?: { offset?: number }) => void;
};

let scroller: SmoothScroller | null = null;
const listeners = new Set<() => void>();

export function setSmoothScroller(next: SmoothScroller | null) {
  scroller = next;
  listeners.forEach((listener) => {
    listener();
  });
}

export function getSmoothScroller() {
  return scroller;
}

export function subscribeSmoothScroller(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}
