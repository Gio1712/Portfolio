import type { Variants } from "framer-motion";

export interface SlideTransition {
  from: number;
  to: number;
}

export const pageVariants: Variants = {
  enter: {
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0.985,
    filter: "blur(3px)",
  },

  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },

  exit: ({ from, to }: SlideTransition) => {
    // Slide 1 → Slide 2
    if (from === 0 && to === 1) {
      return {
        opacity: 0,
        x: -120,
        y: 0,
        scale: 0.97,
        filter: "blur(4px)",
      };
    }

    // Slide 2 → Slide 3
    if (from === 1 && to === 2) {
      return {
        opacity: 0,
        x: 0,
        y: -110,
        scale: 0.97,
        filter: "blur(4px)",
      };
    }

    // Slide 3 → Slide 2
    if (from === 2 && to === 1) {
      return {
        opacity: 0,
        x: 120,
        y: 0,
        scale: 0.97,
        filter: "blur(4px)",
      };
    }

    // Slide 2 → Slide 1
    if (from === 1 && to === 0) {
      return {
        opacity: 0,
        x: 0,
        y: 110,
        scale: 0.97,
        filter: "blur(4px)",
      };
    }

    return {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.97,
      filter: "blur(4px)",
    };
  },
};
