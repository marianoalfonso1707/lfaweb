import { type League } from "@/data/leagues";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { type CSSProperties } from "react";

type InfiniteMovingCardsProps = {
  items: League[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

const durations = {
  fast: "20s",
  normal: "40s",
  slow: "60s",
} as const;

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const reduceMotion = useReducedMotion();
  const loop = reduceMotion ? items : [...items, ...items];

  return (
    <div
      className={cn(
        "relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      style={
        {
          "--animation-duration": durations[speed],
          "--animation-direction": direction === "left" ? "forwards" : "reverse",
        } as CSSProperties
      }
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-10 py-3",
          !reduceMotion && "animate-scroll",
          pauseOnHover && !reduceMotion && "hover:[animation-play-state:paused]",
        )}
      >
        {loop.map((league, index) => (
          <li key={`${league.href}-${String(index)}`} className="shrink-0">
            <a
              href={league.href}
              target="_blank"
              rel="noopener noreferrer"
              title={league.name}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sinergy"
            >
              <img
                src={league.logoUrl}
                alt={league.name}
                width={80}
                height={80}
                loading="lazy"
                className="h-20 w-20 rounded-full border-2 border-foul bg-powder object-cover shadow-[0_4px_10px_rgba(0,0,0,0.3)] grayscale-[30%] transition duration-300 group-hover:-translate-y-1 group-hover:grayscale-0 group-hover:brightness-110"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
