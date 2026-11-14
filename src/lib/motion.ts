export const easeOut = [0.22, 1, 0.36, 1] as const;

export const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

export const duration = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
} as const;

export const stagger = {
  fast: 0.06,
  base: 0.08,
  slow: 0.1,
} as const;

export const viewport = { once: true, margin: "-10%" } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

/** Marquee loop durations from the prototype (seconds), plus logo speed. */
export const marquee = {
  ticker: 40,
  logosSpeedPx: 45,
  final: 18,
} as const;

export const navScrollBlurPx = 40;

export const lenisLerp = 0.09;

export const heroSkipMs = 2500;

export const heroTimeline = {
  defaultsEase: "expo.out",
  pitch: { at: 0, duration: 1.4, stagger: 0.07, ease: "power2.out" },
  h1: { at: 0.2, duration: 1.1, stagger: 0.08, ease: "expo.out", fromY: "115%" },
  rv: { at: 0.7, duration: 0.9, stagger: 0.1, fromY: 36 },
  panels: {
    at: 0.5,
    duration: 1.2,
    stagger: 0.15,
    ease: "expo.out",
    fromY: 80,
    fromRotateX: -12,
  },
  aiRows: { at: 2.0, duration: 0.5, stagger: 0.22, ease: "expo.out", fromX: 16 },
  aiDone: { at: 3.0, duration: 0.5 },
  liveScore: {
    at: 3.3,
    duration: 0.6,
    ease: "back.out(2)",
    scale: 1.35,
    fromBg: "#fff",
    toBg: "#F3DD30",
  },
} as const;

export const heroFloat = {
  p1: { y: -14, duration: 4, delay: 0 },
  p2: { y: -18, duration: 5, delay: 1 },
  p3: { y: -10, duration: 4.5, delay: 2 },
} as const;

export const heroParallax = {
  panelDuration: 1.2,
  pitchDuration: 1.4,
  ease: "power3.out",
  rotate: 6,
  pitchX: -12,
  pitchY: -8,
} as const;

export const scrollReveal = {
  duration: 1,
  ease: "expo.out",
  start: "top 88%",
  fromY: 36,
} as const;

export const statsCount = {
  duration: 1.8,
  ease: "power3.out",
  start: "top 85%",
} as const;

export const journeyPin = {
  minWidth: 901,
  scrub: 1,
  anticipatePin: 1,
  sceneFromScale: 0.92,
  sceneFromOpacity: 0.4,
  sceneStart: "left 95%",
  sceneEnd: "left 55%",
  hashOffsetDesktop: -98,
  hashOffsetMobile: -90,
} as const;

export const featureTilt = {
  max: 8,
  perspective: 900,
  moveDuration: 0.6,
  moveEase: "power3.out",
  leaveDuration: 0.8,
  leaveEase: "elastic.out(1,.6)",
} as const;

export const phoneScroll = {
  fromRotate: -6,
  toRotate: 0,
  toY: -20,
  start: "top 80%",
  end: "bottom 30%",
  scrub: 1,
} as const;

export const priceToggle = {
  duration: 0.6,
  ease: "power3.out",
  popDuration: 0.5,
  popEase: "expo.out",
  popY: -10,
} as const;

/** Signature / AI demo loop from the prototype (seconds). */
export const aiDemoLoop = {
  repeatDelay: 1.2,
  rowsAt: 1.6,
  rowsDuration: 0.5,
  rowsStagger: 0.28,
  doneAt: 3.2,
  doneDuration: 0.5,
  hold: 2.2,
  scan: 2.4,
} as const;
