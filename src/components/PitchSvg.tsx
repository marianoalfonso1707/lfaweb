import { forwardRef, type SVGProps } from "react";

export const PitchSvg = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(function PitchSvg(props, ref) {
  return (
    <svg
      ref={ref}
      className="pitch"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      stroke="#F3DD30"
      {...props}
    >
      <defs>
        <radialGradient id="vg" cx="50%" cy="70%" r="70%">
          <stop offset="40%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id="m">
          <rect width="1440" height="900" fill="url(#vg)" />
        </mask>
      </defs>
      <g mask="url(#m)" strokeWidth="1.2" className="lines">
        <path d="M120 900 L600 300 L840 300 L1320 900" opacity=".22" />
        <path d="M600 300 L840 300" opacity=".18" />
        <path d="M0 600 L1440 600" opacity=".26" />
        <ellipse cx="720" cy="600" rx="230" ry="62" opacity=".3" />
        <path d="M330 900 L470 640 L970 640 L1110 900" opacity=".22" />
        <path d="M470 640 L970 640" opacity=".22" />
        <path d="M520 900 L580 760 L860 760 L920 900" opacity=".22" />
        <path d="M580 760 L860 760" opacity=".22" />
        <circle cx="720" cy="600" r="4" fill="#F3DD30" opacity=".6" />
      </g>
    </svg>
  );
});
