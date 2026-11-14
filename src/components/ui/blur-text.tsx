import { spring, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${String(index)}`}
          className="mr-[0.28em] inline-block last:mr-0 will-change-[transform,filter,opacity]"
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)", y: 18 }
          }
          animate={
            reduceMotion ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }
          }
          transition={{
            ...spring,
            delay: delay + index * stagger.fast,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
