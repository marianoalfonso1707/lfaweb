import { useState, type MouseEvent } from "react";

export function usePointerTilt(enabled: boolean, maxDeg = 6) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Math.max(-maxDeg, Math.min(maxDeg, py * -maxDeg * 2)),
      y: Math.max(-maxDeg, Math.min(maxDeg, px * maxDeg * 2)),
    });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return { tilt, onMove, onLeave };
}
